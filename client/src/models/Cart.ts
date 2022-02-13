export interface CartModel {
  _id: string;
  title: string;
  category: string;
  description: string;
  imgUrl: string;
  price: string;
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
      imgUrl: string;
      price: string;
    }
  ];
}
