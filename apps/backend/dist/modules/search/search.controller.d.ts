export declare class SearchController {
    search(query: string, type: string): {
        query: string;
        type: string;
        results: {
            id: string;
            filename: string;
            score: number;
            text_snippet: string;
        }[];
    };
}
