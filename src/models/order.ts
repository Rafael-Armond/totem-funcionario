import { Product } from "./product";

export class Order {
  client_name: string;
  client_cpf: string;
  products: Product[];

  constructor(
    client_name: string,
    client_cpf: string,
    products: Product[] = []
  ) {
    this.client_name = client_name;
    this.client_cpf = client_cpf;
    this.products = products;
  }
}
