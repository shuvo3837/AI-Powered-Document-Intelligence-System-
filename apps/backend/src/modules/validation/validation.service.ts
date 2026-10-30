import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationService {
  verify(data: any) {
    return { valid: data.subtotal + data.tax === data.total };
  }
}
