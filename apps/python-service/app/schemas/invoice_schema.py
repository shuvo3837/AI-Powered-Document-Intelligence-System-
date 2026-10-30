from pydantic import BaseModel
from typing import List, Optional

class LineItem(BaseModel):
    description: Optional[str] = None
    quantity: Optional[float] = 0.0
    unit_price: Optional[float] = 0.0
    total: Optional[float] = 0.0

class InvoiceSchema(BaseModel):
    invoice_number: Optional[str] = None
    invoice_date: Optional[str] = None
    supplier_name: Optional[str] = None
    customer_name: Optional[str] = None
    subtotal: Optional[float] = 0.0
    tax: Optional[float] = 0.0
    total: Optional[float] = 0.0
    currency: Optional[str] = "USD"
    line_items: List[LineItem] = []
