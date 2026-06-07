export type UnitType = 'Porción' | 'Gramos';
export type OrderStatus = 'En preparación' | 'Entregado';

export interface CartItem {
  id: number;
  product: string;
  quantity: number;
  unit: UnitType;
}

export interface Order {
  id: number;
  createdAt: string;
  items: CartItem[];
  drink: string;
  status: OrderStatus;
}
