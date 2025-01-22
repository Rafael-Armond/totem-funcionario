export class Product {
  id: number;
  name: string;
  value: number;
  description?: string;
  categoryId: number;
  amount?: number;

  constructor(
    id: number,
    name: string,
    value: number,
    categoryId: number,
    description?: string,
    amount?: number
  ) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.description = description;
    this.categoryId = categoryId;
    this.amount = amount;
  }
}
