import { Module } from '@nestjs/common';
import { DocumentsController } from './modules/documents/documents.controller';
import { DocumentsService } from './modules/documents/documents.service';

@Module({
  imports: [],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class AppModule {}
