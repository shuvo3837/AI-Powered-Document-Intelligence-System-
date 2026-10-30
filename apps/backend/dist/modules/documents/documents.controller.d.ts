import { DocumentsService } from './documents.service';
export declare class DocumentsController {
    private readonly docsService;
    constructor(docsService: DocumentsService);
    uploadDocument(file: any): {
        jobId: string;
        status: string;
    };
    getStatus(jobId: string): any;
    getDocument(id: string): {
        id: string;
        filename: string;
        status: string;
        extracted_json: {
            invoice_number: string;
            subtotal: number;
            tax: number;
            total: number;
        };
        validation_errors: string[];
    };
    applyCorrection(id: string, corrections: any): {
        success: boolean;
        id: string;
        updated: any;
    };
    reprocess(id: string): {
        success: boolean;
        message: string;
    };
}
