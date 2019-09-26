import { IsNotEmpty } from 'class-validator';

export class PaymentModel {
    @IsNotEmpty()
    paymentMethodid: string;

    @IsNotEmpty()
    brand: string;

    @IsNotEmpty()
    expiryMonth: number;

    @IsNotEmpty()
    token: string;
}
