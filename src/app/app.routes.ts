import { Routes } from '@angular/router';
import { CreateOrderComponent } from './pages/create-order.component';
import { OrdersComponent } from './pages/orders.component';

export const routes: Routes = [
  { path: '', component: CreateOrderComponent, title: 'Crear pedido' },
  { path: 'pedidos', component: OrdersComponent, title: 'Pedidos creados' },
  { path: '**', redirectTo: '' }
];
