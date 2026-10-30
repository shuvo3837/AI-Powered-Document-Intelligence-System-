from fastapi import FastAPI, UploadFile, File, HTTPException
from app.pipelines.pdf_pipeline import extract_pdf_text
from app.pipelines.ocr_pipeline import run_ocr
from app.pipelines.excel_pipeline import parse_spreadsheet
from app.services.llm_extractor import extract_structured_json
from app.services.validator import validate_extraction
import os

app = FastAPI(title="AI Document Intelligence Processing Engine")

@app.get("/")
def read_root():
    return {"status": "online", "service": "Python OCR & AI Service"}

@app.post("/process")
async def process_document(file: UploadFile = File(...)):
    filename = file.filename
    ext = os.path.splitext(filename)[1].lower()
    contents = await file.read()
    
    raw_text = ""
    if ext in [".pdf"]:
        raw_text = extract_pdf_text(contents)
    elif ext in [".png", ".jpg", ".jpeg", ".tiff"]:
        raw_text = run_ocr(contents)
    elif ext in [".xlsx", ".xls", ".csv"]:
        raw_text = parse_spreadsheet(contents, ext)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file format")
        
    extracted_data = extract_structured_json(raw_text)
    validation_results = validate_extraction(extracted_data)
    
    return {
        "filename": filename,
        "raw_text": raw_text,
        "extracted": extracted_data,
        "validation": validation_results
    }
