import { Injectable } from '@nestjs/common';

@Injectable()
export class ExtractionsService {
  saveExtraction(docId: string, data: any) {
    return { id: `ext_${docId}`, saved: true };
  }
}
