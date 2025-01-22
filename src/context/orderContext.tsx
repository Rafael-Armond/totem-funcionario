"use client";

import { createContext, useContext, useState } from "react";
import { Order } from "@/models/order";

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  removeOrder: (index: number) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (order: Order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  const removeOrder = (index: number) => {
    setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, removeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders deve ser usado dentro de um OrderProvider");
  }
  return context;
}
