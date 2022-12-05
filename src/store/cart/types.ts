export type CartItem = {
    id: string,
    imageUrl: string,
    name: string,
    price: number,
    size: number,
    type: string,
    count: number
};

export type CartSliceState = {
    totalPrice: number,
    items: CartItem[]
}