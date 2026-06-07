import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartItem, UnitType } from '../models';
import { OrderService } from '../order.service';

@Component({
  standalone: true,
  selector: 'app-create-order',
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <section class="page-header">
      <div>
        <p class="eyebrow">Nuevo pedido</p>
        <h1>Arma tu bandeja paisa</h1>
        <p>Selecciona los ingredientes, define porciones o gramos y agrega una bebida.</p>
      </div>
      <a routerLink="/pedidos" class="secondary-link">Ver pedidos creados</a>
    </section>

    <section class="grid-layout">
      <article class="card">
        <h2>Agregar ingrediente</h2>

        <form class="form-grid" (ngSubmit)="addItem()">
          <label>
            Producto
            <select name="product" [(ngModel)]="selectedProduct">
              <option *ngFor="let product of products" [value]="product">{{ product }}</option>
            </select>
          </label>

          <label>
            Medida
            <select name="unit" [(ngModel)]="selectedUnit" (ngModelChange)="onUnitChange()">
              <option value="Porción">Porción</option>
              <option value="Gramos">Gramos</option>
            </select>
          </label>

          <label>
            {{ selectedUnit === 'Gramos' ? 'Gramos' : 'Cantidad de porciones' }}
            <input
              name="quantity"
              type="number"
              min="1"
              [step]="selectedUnit === 'Gramos' ? 10 : 1"
              [(ngModel)]="quantity"
              required>
          </label>

          <button type="submit">Agregar al carrito</button>
        </form>

        <p class="hint" *ngIf="selectedUnit === 'Gramos'">
          Puedes escribir manualmente los gramos que necesita el cliente.
        </p>
      </article>

      <article class="card">
        <h2>Bebida</h2>
        <label>
          Bebida para el pedido
          <select [(ngModel)]="drink" name="drink">
            <option *ngFor="let option of drinks" [value]="option">{{ option }}</option>
          </select>
        </label>
      </article>
    </section>

    <section class="card cart-card">
      <div class="section-title">
        <div>
          <p class="eyebrow">Carrito temporal</p>
          <h2>Detalle seleccionado</h2>
        </div>
        <button type="button" class="ghost" (click)="clearCart()" [disabled]="!cart.length">Vaciar</button>
      </div>

      <div class="empty" *ngIf="!cart.length">
        Aún no has agregado productos. El carrito se conserva temporalmente en este navegador.
      </div>

      <div class="cart-item" *ngFor="let item of cart; trackBy: trackByItemId">
        <div>
          <strong>{{ item.product }}</strong>
          <span>{{ item.quantity }} {{ item.unit }}</span>
        </div>

        <label>
          Medida
          <select [(ngModel)]="item.unit" [name]="'unit-' + item.id" (change)="updateItem(item)">
            <option value="Porción">Porción</option>
            <option value="Gramos">Gramos</option>
          </select>
        </label>

        <label>
          Cantidad
          <input
            type="number"
            min="1"
            [step]="item.unit === 'Gramos' ? 10 : 1"
            [(ngModel)]="item.quantity"
            [name]="'quantity-' + item.id"
            (change)="updateItem(item)">
        </label>

        <button type="button" class="danger" (click)="removeItem(item.id)">Eliminar</button>
      </div>

      <div class="summary" *ngIf="cart.length">
        <span>Total de productos: {{ cart.length }}</span>
        <span>Bebida: {{ drink }}</span>
      </div>

      <button class="send" type="button" (click)="sendOrder()" [disabled]="!cart.length">
        Enviar pedido
      </button>

      <p class="success" *ngIf="successMessage">{{ successMessage }}</p>
      <p class="error" *ngIf="errorMessage">{{ errorMessage }}</p>
    </section>
  `
})
export class CreateOrderComponent implements OnInit, OnDestroy {
  products = [
    'Frijoles',
    'Arroz',
    'Carne molida',
    'Chicharrón',
    'Chorizo',
    'Aguacate',
    'Arepa',
    'Huevo frito',
    'Tajada de maduro',
    'Morcilla'
  ];

  drinks = ['Coca-Cola', 'Colombiana', 'Limonada', 'Agua', 'Jugo natural', 'Ninguna'];

  selectedProduct = this.products[0];
  selectedUnit: UnitType = 'Porción';
  quantity = 1;
  drink = this.drinks[0];
  cart: CartItem[] = [];
  successMessage = '';
  errorMessage = '';

  private subscription?: Subscription;

  constructor(private readonly orderService: OrderService) {}

  ngOnInit(): void {
    this.subscription = this.orderService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onUnitChange(): void {
    this.quantity = this.selectedUnit === 'Gramos' ? 100 : 1;
  }

  addItem(): void {
    this.clearMessages();

    if (!this.quantity || this.quantity <= 0) {
      this.errorMessage = 'La cantidad debe ser mayor a cero.';
      return;
    }

    this.orderService.addCartItem({
      product: this.selectedProduct,
      quantity: Number(this.quantity),
      unit: this.selectedUnit
    });

    this.quantity = this.selectedUnit === 'Gramos' ? 100 : 1;
  }

  updateItem(item: CartItem): void {
    this.clearMessages();
    const quantity = Number(item.quantity);

    if (!quantity || quantity <= 0) {
      this.errorMessage = `La cantidad de ${item.product} debe ser mayor a cero.`;
      return;
    }

    this.orderService.updateCartItem(item.id, quantity, item.unit);
  }

  removeItem(itemId: number): void {
    this.clearMessages();
    this.orderService.removeCartItem(itemId);
  }

  clearCart(): void {
    this.clearMessages();
    this.orderService.clearCart();
  }

  sendOrder(): void {
    this.clearMessages();

    try {
      const order = this.orderService.createOrder(this.drink);
      this.successMessage = `Pedido #${order.id} enviado correctamente.`;
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : 'No fue posible enviar el pedido.';
    }
  }

  trackByItemId(_: number, item: CartItem): number {
    return item.id;
  }

  private clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }
}
