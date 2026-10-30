import pytest
from app.services.validator import validate_extraction

def test_validation_math_success():
    data = {
        "invoice_number": "INV-101",
        "subtotal": 100.0,
        "tax": 10.0,
        "total": 110.0,
        "line_items": [{"total": 100.0}]
    }
    res = validate_extraction(data)
    assert res["is_valid"] is True

def test_validation_math_failure():
    data = {
        "invoice_number": "INV-102",
        "subtotal": 100.0,
        "tax": 10.0,
        "total": 150.0  # Mismatch
    }
    res = validate_extraction(data)
    assert res["is_valid"] is False
    assert res["requires_manual_review"] is True
