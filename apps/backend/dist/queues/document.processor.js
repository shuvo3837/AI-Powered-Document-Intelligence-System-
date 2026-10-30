"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentProcessor = void 0;
class DocumentProcessor {
    async processJob(job) {
        console.log(`Processing background document job: ${job.id}`);
        return { status: 'SUCCESS' };
    }
}
exports.DocumentProcessor = DocumentProcessor;
//# sourceMappingURL=document.processor.js.map