import { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  cartKey: string;
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  serviceOption?: string;
  providerId: number;
  providerName: string;
  providerColor: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  removeItem: (cartKey: string) => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('campus-cart');
      if (!saved) return [];
      const parsed: CartItem[] = JSON.parse(saved);
      // Migrate old items that don't have cartKey
      return parsed.map(item => ({
        ...item,
        cartKey:       item.cartKey       || `${item.id}-${item.serviceOption || 'default'}`,
        providerId:    item.providerId    ?? 0,
        providerName:  item.providerName  || 'Unknown Provider',
        providerColor: item.providerColor || 'bg-gray-200',
      }));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('campus-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<CartItem, 'quantity'>, qty: number = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.cartKey === newItem.cartKey);
      if (existing) {
        return prev.map(item =>
          item.cartKey === newItem.cartKey
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: qty }];
    });
  };

  const removeItem = (cartKey: string) => {
    setItems(prev => prev.filter(item => item.cartKey !== cartKey));
  };

  const updateQuantity = (cartKey: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartKey);
      return;
    }
    setItems(prev => prev.map(item =>
      item.cartKey === cartKey ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}