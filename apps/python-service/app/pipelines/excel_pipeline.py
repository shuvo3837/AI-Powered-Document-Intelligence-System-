import pandas as pd
import io

def parse_spreadsheet(file_bytes: bytes, extension: str) -> str:
    if extension == ".csv":
        df = pd.read_csv(io.BytesIO(file_bytes))
    else:
        df = pd.read_excel(io.BytesIO(file_bytes))
    return df.to_json(orient="records")
