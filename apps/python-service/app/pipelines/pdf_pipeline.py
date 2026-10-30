import fitz  # PyMuPDF

def extract_pdf_text(pdf_bytes: bytes) -> str:
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    text_content = []
    for page in doc:
        page_text = page.get_text()
        if page_text.strip():
            text_content.append(page_text)
    doc.close()
    return "\n".join(text_content)
