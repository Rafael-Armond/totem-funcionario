"use client";

import Link from "next/link";

import { CardButton } from "@/components/card_button";
import { Header } from "@/components/header";
import "./style.css";
import "../globals.css";

const Products = () => {
  return (
    <div className="defaultRootPageContainer">
      <Header title="Produtos" />
      <div className="contentPage">
        <Link href="products/create">
          <CardButton title="Cadastrar produtos" />
        </Link>
        <Link href="products/delete">
          <CardButton title="Deletar produtos" />
        </Link>
      </div>
    </div>
  );
};

export default Products;
