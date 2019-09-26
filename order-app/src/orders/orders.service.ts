import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './orders.model';
import axios from 'axios';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
  ) { }

  async insertOrder(title: string, description: string, price: number, quantity: number) {
    const newOrder = new this.orderModel({
      title,
      description,
      price,
      quantity,
    });
    const result = await newOrder.save();
    return result.id as string;
  }

  async getOrderById(orderId: string) {
    const order = await this.findOrder(orderId);
    return {
      id: order.id,
      title: order.title,
      description: order.description,
      price: order.price,
      status : order.status,
    };
  }

  async cancelOrder(
    ordertId: string,
  ) {
   await this.updateOrderStatus(ordertId, 'declined');
  }

  async confirmOrder(
    ordertId: string,
  ) {
    await this.updateOrderStatus(ordertId, 'confirmed');
    setTimeout(async () => {
      await this.updateOrderStatus(ordertId, 'delivered');
    }, 10000);
  }

  async sendPayment() {
    const res = await axios({
      method: 'post',
      url: 'http://payment-service:3001/payments/send',
      data: {
        brand: 'VISA',
        expiryMonth: 9,
        token: '050a1e5c982e5905288ec5ec33f292772762033a070a45g434qfb16bf1940b51ef',
        paymentMethodid: 'stripe.card',
      },
    });
    return res.data.response.status;
  }

  private async updateOrderStatus(
    ordertId: string,
    status,
  ) {
    const updatedOrder = await this.findOrder(ordertId);
    if (updatedOrder) {
      updatedOrder.status = status;
      updatedOrder.save();
    }
  }

  private async findOrder(id: string): Promise<Order> {
    let order;
    try {
      order = await this.orderModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find order.');
    }
    if (!order) {
      throw new NotFoundException('Could not find order.');
    }
    return order;
  }
}
