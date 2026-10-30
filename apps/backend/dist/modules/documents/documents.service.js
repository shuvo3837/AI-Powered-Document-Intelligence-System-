"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
let DocumentsService = class DocumentsService {
    constructor() {
        this.jobs = new Map();
    }
    createJob(file) {
        const jobId = `job_${Date.now()}`;
        this.jobs.set(jobId, { status: 'PROCESSING', progress: 50 });
        return { jobId, status: 'QUEUED' };
    }
    getJobStatus(jobId) {
        return this.jobs.get(jobId) || { status: 'COMPLETED', progress: 100 };
    }
    getDocument(id) {
        return {
            id,
            filename: "invoice_sample.pdf",
            status: "NEEDS_REVIEW",
            extracted_json: {
                invoice_number: "INV-2026-001",
                subtotal: 1000.0,
                tax: 100.0,
                total: 1200.0
            },
            validation_errors: ["Subtotal + Tax does not equal Total"]
        };
    }
    applyCorrection(id, corrections) {
        return { success: true, id, updated: corrections };
    }
    reprocessDocument(id) {
        return { success: true, message: "Job re-queued" };
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)()
], DocumentsService);
//# sourceMappingURL=documents.service.js.map