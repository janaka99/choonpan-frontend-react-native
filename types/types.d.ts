export type Product = {
  id?: number | null;
  name: string;
  price: number;
  stock: number;
  sold: number;
  updatedAt?: Date;
  createdBy?: string;
};
