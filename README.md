# AI-Powered Document Intelligence System

A full-stack, enterprise-grade AI system designed to process, extract, validate, and search financial documents (invoices, receipts, spreadsheets, scanned PDFs, images).

## Architecture Overview
- **Frontend**: Next.js 14 App Router, Tailwind CSS, Lucide Icons, React Hook Form.
- **Backend API**: NestJS (TypeScript), Prisma ORM, BullMQ for job queues.
- **AI/OCR Microservice**: FastAPI (Python), PyMuPDF (`fitz`), PaddleOCR, Pandas, LangChain/OpenAI, Pydantic.
- **Databases**: PostgreSQL (Metadata & Results), Redis (Queue state), Qdrant (Vector search).

## Quick Start
1. Start infrastructure services:
   ```bash
   docker-compose up -d
   ```
2. Start Python Processing Engine:
   ```bash
   cd apps/python-service
   py -3.11 -m venv .venv
   .venv\Scripts\python.exe -m pip install -r requirements.txt
   .venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
   ```
3. Start NestJS Backend API:
   ```bash
   cd apps/backend
   npm install
   npm run start:dev
   ```
   The backend runs at `http://localhost:3000`.
4. Start Next.js Frontend Dashboard:
   ```bash
   cd apps/web
   npm install
   npm run dev
   ```
   The frontend runs at `http://localhost:3001` to avoid colliding with the backend.
