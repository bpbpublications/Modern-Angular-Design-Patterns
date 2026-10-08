import { Order } from './order.model';

export class OrderAdapter {
  adapt(apiOrder: any): Order {
    return {
      id: apiOrder.order_id,
      customerName: apiOrder.client_name,
      total: parseFloat(apiOrder.amount),
      date: new Date(apiOrder.order_date)
    };
  }
}
