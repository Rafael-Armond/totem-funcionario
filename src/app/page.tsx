"use client";

import { Header } from "@/components/header";
import Link from "next/link";
import { useEffect } from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useOrders } from "@/context/orderContext";
import { Order } from "@/models/order";
import { Product } from "@/models/product";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
});

export default function Home() {
  const { orders, addOrder, removeOrder } = useOrders();

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("Conectado ao WebSocket!");
    });

    socket.on("new_order", (orders) => {
      for (const orderData of orders) {
        const formattedOrder = new Order(
          orderData.client_name,
          orderData.client_cpf,
          orderData.products.map(
            (product: any) =>
              new Product(
                product.id || Math.random(),
                product.name,
                product.value,
                product.description,
                product.categoryId
              )
          )
        );
        addOrder(formattedOrder);
      }
      toast.success(`Novo pedido recebido`);
    });

    socket.on("server_message", (data) => {
      console.log("Mensagem do servidor:", data.message);
    });

    return () => {
      socket.off("connect");
      socket.off("new_order");
      socket.off("server_message");
      socket.disconnect();
    };
  }, [addOrder]);

  return (
    <div>
      <Header title="Menu Principal" />
      <div>
        <div>
          <h2>Pedidos</h2>
          <div>
            {orders.map((order, index) => {
              const total =
                order.products?.reduce(
                  (sum, product) => sum + product.value,
                  0
                ) || 0;

              return (
                <div
                  key={index}
                  style={{
                    marginBottom: "20px",
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <div>
                    <h3>Cliente: {order.client_name}</h3>
                    <p>CPF: {order.client_cpf}</p>
                    <h4>Produtos:</h4>
                    <ul>
                      {order.products.map((product, idx) => (
                        <li key={idx} style={{ marginBottom: "10px" }}>
                          <strong>Nome:</strong> {product.name} <br />
                          <strong>Preço:</strong> R$ {product.value.toFixed(2)}{" "}
                          <br />
                          <strong>Descrição:</strong> {product.description}{" "}
                          <br />
                        </li>
                      ))}
                    </ul>
                    <h3>Total: R$ {total.toFixed(2)}</h3>
                  </div>
                  <div>
                    <button
                      onClick={() => removeOrder(index)}
                      style={{
                        marginTop: "10px",
                        padding: "8px 16px",
                        backgroundColor: "#ff4d4f",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Finalizar Pedido
                    </button>
                  </div>
                </div>
              );
            })}
            {orders.length === 0 && <p>Não há pedidos no momento.</p>}
          </div>
        </div>
        <div
          style={{ display: "flex", gap: "20px", margin: "40px 0px 40px 0px " }}
        >
          <Link href="/products">
            <div
              style={{
                cursor: "pointer",
                padding: "20px",
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "10px",
                textAlign: "center",
                width: "200px",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h3 style={{ color: "black" }}>Produtos</h3>
              <p style={{ color: "black" }}>Gerenciar todos os produtos.</p>
            </div>
          </Link>

          <Link href="/shipment">
            <div
              style={{
                cursor: "pointer",
                padding: "20px",
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "10px",
                textAlign: "center",
                width: "200px",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h3 style={{ color: "black" }}>Lançar Remessa</h3>
              <p style={{ color: "black" }}>Registrar uma nova remessa.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
