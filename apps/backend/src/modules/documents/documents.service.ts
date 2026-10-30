import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentsService {
  private jobs = new Map();

  createJob(file: any) {
    const jobId = `job_${Date.now()}`;
    this.jobs.set(jobId, { status: 'PROCESSING', progress: 50 });
    return { jobId, status: 'QUEUED' };
  }

  getJobStatus(jobId: string) {
    return this.jobs.get(jobId) || { status: 'COMPLETED', progress: 100 };
  }

  getDocument(id: string) {
    return {
      id,
      filename: "invoice_sample.pdf",
      status: "NEEDS_REVIEW",
      extracted_json: {
        invoice_number: "INV-2026-001",
        subtotal: 1000.0,
        tax: 100.0,
        total: 1200.0 // Intentional math discrepancy for UI review
      },
      validation_errors: ["Subtotal + Tax does not equal Total"]
    };
  }

  applyCorrection(id: string, corrections: any) {
    return { success: true, id, updated: corrections };
  }

  reprocessDocument(id: string) {
    return { success: true, message: "Job re-queued" };
  }
}
