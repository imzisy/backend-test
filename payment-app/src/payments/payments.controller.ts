import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentModel } from './payments.model';

@Controller('payments')
@UsePipes(new ValidationPipe())
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Post('send')
  send(@Body() paymentData: PaymentModel): object {
    return this.paymentsService.send(paymentData);
  }

}
