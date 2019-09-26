import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
} from '@nestjs/common';

import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    async createOrder(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') price: number,
        @Body('quantity') quantity: number,
    ) {
        const generatedId = await this.ordersService.insertOrder(
            prodTitle,
            prodDesc,
            price,
            quantity,
        );
        const paymentResponce = await this.ordersService.sendPayment();
        if (paymentResponce === 'success') {
            this.ordersService.confirmOrder(generatedId);
        } else {
            this.ordersService.cancelOrder(generatedId);
        }
        return { id: generatedId };
    }

    @Get(':id')
    checkOrderStatus(@Param('id') prodId: string) {
        return this.ordersService.getOrderById(prodId);
    }

    @Patch('cancel/:id')
    async cancelOrder(
        @Param('id') prodId: string,
    ) {
        await this.ordersService.cancelOrder(prodId);
        return {};
    }

}
