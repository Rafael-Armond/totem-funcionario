"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";

const CreatePage = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/v1/categories")
      .then((response) => response.json())
      .then((response) => setCategories(response.data))
      .catch((error) => {
        console.error("Erro ao buscar categorias:", error);
        toast.error("Não foi possível carregar as categorias.");
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const product = {
      name,
      value: Number(value),
      description,
      categoryId: Number(categoryId),
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        toast.success("Produto cadastrado com sucesso!");
        setTimeout(() => {
          router.refresh();
          router.push("/products");
        }, 1300);
      } else {
        const errorData = await response.json();
        toast.error(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      toast.error("Erro ao cadastrar o produto. Tente novamente.");
    }
  };

  return (
    <div className="defaultRootPageContainer">
      <Header title="Cadastrar Produtos" />
      <div style={{ padding: "20px" }}>
        <h1>Cadastrar Produtos</h1>
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: "400px", margin: "auto" }}
        >
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="name">Nome:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="value">Preço:</label>
            <input
              id="value"
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              required
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="categoryId">Categoria:</label>
            <select
              id="categoryId"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
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
              <option value="">Selecione uma categoria</option>
              {categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cadastrar
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreatePage;
