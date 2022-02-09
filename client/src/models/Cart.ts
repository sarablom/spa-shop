export interface CartModel {
    title: string;
    imgUrl: string;
    price: string
}

export interface CartObject {
    _id: string;
    ownerId: string;
    cart: [
        {
            title: string;
            imgUrl: string;
            price: string
        }
    ]
}