import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Order, OrderStatus } from './models';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly ordersKey = 'bandeja-paisa-orders';
  private readonly cartKey = 'bandeja-paisa-cart';

  private readonly ordersSubject = new BehaviorSubject<Order[]>(this.loadOrders());
  readonly orders$ = this.ordersSubject.asObservable();

  private readonly cartSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  readonly cart$ = this.cartSubject.asObservable();

  getCurrentCart(): CartItem[] {
    return this.cloneCart(this.cartSubject.value);
  }

  addCartItem(item: Omit<CartItem, 'id'>): void {
    const current = this.getCurrentCart();
    const newItem: CartItem = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      ...item
    };

    this.saveCart([...current, newItem]);
  }

  updateCartItem(itemId: number, quantity: number, unit: CartItem['unit']): void {
    const updated = this.getCurrentCart().map(item =>
      item.id === itemId ? { ...item, quantity, unit } : item
    );

    this.saveCart(updated);
  }

  removeCartItem(itemId: number): void {
    this.saveCart(this.getCurrentCart().filter(item => item.id !== itemId));
  }

  clearCart(): void {
    this.saveCart([]);
  }

  createOrder(drink: string): Order {
    const items = this.getCurrentCart();

    if (!items.length) {
      throw new Error('Debes agregar al menos un producto al carrito.');
    }

    const orders = this.loadOrders();
    const order: Order = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      items,
      drink,
      status: 'En preparación'
    };

    this.saveOrders([order, ...orders]);
    this.clearCart();
    return order;
  }

  updateStatus(id: number, status: OrderStatus): void {
    const updated = this.loadOrders().map(order =>
      order.id === id ? { ...order, status } : order
    );

    this.saveOrders(updated);
  }

  private loadOrders(): Order[] {
    return this.readFromStorage<Order[]>(this.ordersKey, []);
  }

  private loadCart(): CartItem[] {
    return this.readFromStorage<CartItem[]>(this.cartKey, []);
  }

  private saveOrders(orders: Order[]): void {
    localStorage.setItem(this.ordersKey, JSON.stringify(orders));
    this.ordersSubject.next(orders);
  }

  private saveCart(cart: CartItem[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartSubject.next(this.cloneCart(cart));
  }

  private readFromStorage<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) as T : fallback;
    } catch {
      localStorage.removeItem(key);
      return fallback;
    }
  }

  private cloneCart(cart: CartItem[]): CartItem[] {
    return cart.map(item => ({ ...item }));
  }
}
