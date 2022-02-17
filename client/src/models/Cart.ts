export interface CartModel {
  _id: string;
  title: string;
  category: string;
  description: string;
  inStock: number;
  imgUrl: string;
  price: number;
  quantity: number;
}

export interface CartObject {
  _id: string;
  ownerId: string;
  cart: [
    {
      _id: string;
      title: string;
      category: string;
      description: string;
      inStock: number;
      imgUrl: string;
      price: number;
      quantity: number;
    }
  ];
}
