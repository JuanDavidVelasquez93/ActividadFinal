import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order, OrderStatus } from '../models';
import { OrderService } from '../order.service';

@Component({
  standalone: true,
  selector: 'app-orders',
  imports: [CommonModule, FormsModule, RouterLink, DatePipe],
  template: `
    <section class="page-header">
      <div>
        <p class="eyebrow">Gestión</p>
        <h1>Pedidos creados</h1>
        <p>Consulta el detalle de cada pedido y actualiza su estado.</p>
      </div>
      <a routerLink="/" class="secondary-link">Crear nuevo pedido</a>
    </section>

    <section class="empty card" *ngIf="!orders.length">
      No hay pedidos registrados todavía.
    </section>

    <section class="orders-list" *ngIf="orders.length">
      <article class="card order-card" *ngFor="let order of orders; trackBy: trackByOrderId">
        <div class="order-header">
          <div>
            <p class="eyebrow">Pedido</p>
            <h2>#{{ order.id }}</h2>
            <small>{{ order.createdAt | date:'dd/MM/yyyy, h:mm a' }}</small>
          </div>

          <label class="status-field">
            Estado
            <select [(ngModel)]="order.status" [name]="'status-' + order.id" (change)="changeStatus(order.id, order.status)">
              <option *ngFor="let status of statuses" [value]="status">{{ status }}</option>
            </select>
          </label>
        </div>

        <div class="details">
          <h3>Ingredientes</h3>
          <ul>
            <li *ngFor="let item of order.items">
              <span>{{ item.product }}</span>
              <strong>{{ item.quantity }} {{ item.unit }}</strong>
            </li>
          </ul>
        </div>

        <p class="drink"><strong>Bebida:</strong> {{ order.drink }}</p>
      </article>
    </section>
  `
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  statuses: OrderStatus[] = ['En preparación', 'Entregado'];

  private subscription?: Subscription;

  constructor(private readonly orderService: OrderService) {}

  ngOnInit(): void {
    this.subscription = this.orderService.orders$.subscribe(orders => {
      this.orders = orders;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  changeStatus(id: number, status: OrderStatus): void {
    this.orderService.updateStatus(id, status);
  }

  trackByOrderId(_: number, order: Order): number {
    return order.id;
  }
}
