export interface CartModel {
  _id: string;
  title: string;
  category: string;
  description: string;
  inStock: string;
  imgUrl: string;
  price: string;
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
      inStock: string;
      imgUrl: string;
      price: string;
      quantity: number;
    }
  ];
}
