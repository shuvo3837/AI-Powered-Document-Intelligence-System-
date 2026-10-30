def validate_extraction(data: dict) -> dict:
    errors = []
    requires_review = False
    
    subtotal = data.get("subtotal") or 0.0
    tax = data.get("tax") or 0.0
    total = data.get("total") or 0.0
    
    # 1. Math check
    if abs((subtotal + tax) - total) > 0.01:
        errors.append(f"Subtotal ({subtotal}) + Tax ({tax}) does not equal Total ({total})")
        requires_review = True
        
    # 2. Line items check
    calculated_subtotal = sum(item.get("total", 0.0) for item in data.get("line_items", []))
    if data.get("line_items") and abs(calculated_subtotal - subtotal) > 0.01:
        errors.append("Sum of line items does not match subtotal")
        requires_review = True
        
    # 3. Missing critical metadata check
    if not data.get("invoice_number"):
        errors.append("Missing invoice number")
        requires_review = True
        
    return {
        "is_valid": len(errors) == 0,
        "requires_manual_review": requires_review,
        "validation_errors": errors
    }
