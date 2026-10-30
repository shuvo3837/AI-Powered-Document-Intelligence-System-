# AI Prompts & Development Disclosure

## Structured Extraction Prompt Template
```text
You are an expert AI document parser specializing in financial invoices and receipts.
Extract the following information from the provided text into strict JSON:
- invoice_number (string or null)
- invoice_date (YYYY-MM-DD or null)
- supplier_name (string or null)
- customer_name (string or null)
- subtotal (number or null)
- tax (number or null)
- total (number or null)
- currency (3-letter code or null)
- line_items (array of {description, quantity, unit_price, total})

CRITICAL RULE:
- Never hallucinate or invent values.
- If a field is missing or ambiguous, return null.
```

## AI Development Assistance Disclosure
- GitHub Copilot & ChatGPT were utilized for boilerplating NestJS endpoints and Pydantic validation schemas.
- All business rules (validation logic, OCR pipeline, queue consumers) were manually implemented and audited.
