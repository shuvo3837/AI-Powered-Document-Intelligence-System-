import { Controller, Get, Query } from '@nestjs/common';

@Controller('api/documents/search')
export class SearchController {
  @Get()
  search(@Query('q') query: string, @Query('type') type: string) {
    return {
      query,
      type: type || 'hybrid',
      results: [
        { id: 'doc_1', filename: 'invoice_2026.pdf', score: 0.95, text_snippet: 'Acme Corp total $1100.00' }
      ]
    };
  }
}
