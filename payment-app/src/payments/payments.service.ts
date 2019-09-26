import { Injectable } from '@nestjs/common';
import * as casual from 'casual';

@Injectable()
export class PaymentsService {
  send(paymentData): object {
    const response = casual.random_value({
      a: {
        id: '693bb4cd-3f20-444a-8315-6369f582c68a',
        status: 'success',

      }, b: {
        id: '693bb4fd-3f20-444a-8315-3334f582c68a',
        status: 'fail',
      },
    });
    return { response, paymentData };
  }
}
