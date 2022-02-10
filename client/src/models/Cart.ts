export interface CartModel {
  id: string;
  title: string;
  category: string;
  description: string;
  imgUrl: string;
  price: string;
}

export interface CartObject {
  id: string;
  ownerId: string;
  cart: [
    {
      id: string;
      title: string;
      category: string;
      description: string;
      imgUrl: string;
      price: string;
    }
  ];
}
