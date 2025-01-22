"use client";

import { Header } from "@/components/header";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: number;
  name: string;
  value: number;
  description: string;
  categoryId: number;
}

const ShipmentPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/v1/products")
      .then((response) => response.json())
      .then((response) => setProducts(response.data))
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
        toast.error("Não foi possível carregar os produtos.");
      });
  }, []);

  const handleProductChange = (id: number) => {
    setProductId(id);
    const selected = products.find((product) => product.id === id) || null;
    setSelectedProduct(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !quantity) {
      toast.error("Por favor, selecione um produto e informe a quantidade.");
      return;
    }

    const shipmentData = {
      productId,
      quantity: Number(quantity),
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/v1/shipments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shipmentData),
      });

      if (response.ok) {
        toast.success("Remessa cadastrada com sucesso!");
        setProductId("");
        setQuantity("");
        setSelectedProduct(null);
      } else {
        const errorData = await response.json();
        toast.error(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erro ao cadastrar remessa:", error);
      toast.error("Erro ao cadastrar remessa. Tente novamente.");
    }
  };

  return (
    <div>
      <Header title="Lançar Remessa de Produto" />
      <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
        <h1>Cadastrar Remessa de Produtos</h1>
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="productId">Produto:</label>
            <select
              id="productId"
              value={productId}
              onChange={(e) => handleProductChange(Number(e.target.value))}
              required
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Selecione um produto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="quantity">Quantidade:</label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              min="1"
            />
          </div>

          {selectedProduct && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "black",
              }}
            >
              <h3>Produto Selecionado</h3>
              <p>
                <strong>Nome:</strong> {selectedProduct.name}
              </p>
              <p>
                <strong>Preço:</strong> R$ {selectedProduct.value.toFixed(2)}
              </p>
              <p>
                <strong>Descrição:</strong> {selectedProduct.description}
              </p>
              <p>
                <strong>Categoria ID:</strong> {selectedProduct.categoryId}
              </p>
            </div>
          )}

          <button
            type="submit"
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "20px",
              width: "100%",
            }}
          >
            Cadastrar Remessa
          </button>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default ShipmentPage;
