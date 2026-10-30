export declare class DocumentsService {
    private jobs;
    createJob(file: any): {
        jobId: string;
        status: string;
    };
    getJobStatus(jobId: string): any;
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
    reprocessDocument(id: string): {
        success: boolean;
        message: string;
    };
}
