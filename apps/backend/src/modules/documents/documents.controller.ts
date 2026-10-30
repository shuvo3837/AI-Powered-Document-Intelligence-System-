import { Controller, Post, Get, Param, Body, UseInterceptors, UploadedFile, Patch } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';

@Controller('api/documents')
export class DocumentsController {
  constructor(private readonly docsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadDocument(@UploadedFile() file: any) {
    return this.docsService.createJob(file);
  }

  @Get('status/:jobId')
  getStatus(@Param('jobId') jobId: string) {
    return this.docsService.getJobStatus(jobId);
  }

  @Get(':id')
  getDocument(@Param('id') id: string) {
    return this.docsService.getDocument(id);
  }

  @Patch(':id/correct')
  applyCorrection(@Param('id') id: string, @Body() corrections: any) {
    return this.docsService.applyCorrection(id, corrections);
  }

  @Post(':id/reprocess')
  reprocess(@Param('id') id: string) {
    return this.docsService.reprocessDocument(id);
  }
}
