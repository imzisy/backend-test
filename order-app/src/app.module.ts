import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    OrdersModule,
    MongooseModule.forRoot(
      process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
