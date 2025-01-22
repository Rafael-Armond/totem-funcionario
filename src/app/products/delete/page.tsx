"use client";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";

interface Product {
  id: number;
  name: string;
  value: number;
  description: string;
  categoryId: number;
}

const DeletePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState<number | "">("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();

  // Buscar os produtos no backend ao carregar a página
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/v1/products")
      .then((response) => response.json())
      .then((response) => setProducts(response.data))
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
        toast.error("Não foi possível carregar os produtos.");
      });
  }, []);

  const handleProductChange = (productId: number) => {
    setProductId(productId);
    const selected =
      products.find((product) => product.id === productId) || null;
    setSelectedProduct(selected);
  };

  const deleteProduct = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/v1/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Produto deletado com sucesso.");

        setTimeout(() => {
          router.push("/products");
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      toast.error("Erro ao deletar o produto. Tente novamente.");
    }
  };

  return (
    <div className="defaultRootPageContainer">
      <Header title="Deletar Produtos" />
      <div style={{ padding: "20px" }}>
        <h1>Deletar Produtos</h1>
        <form
          onSubmit={deleteProduct}
          style={{ maxWidth: "400px", margin: "auto" }}
        >
          <div style={{ marginBottom: "10px" }}>
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
          <button
            type="submit"
            style={{
              backgroundColor: "#ff4d4f",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Deletar
          </button>
        </form>

        {selectedProduct && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "black",
              maxWidth: "400px",
              margin: "20px auto",
            }}
          >
            <h2>Produto Selecionado</h2>
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

        <ToastContainer />
      </div>
    </div>
  );
};

export default DeletePage;
