export interface IProduct {
    product_id: number,
    description: string,
    emoji: string,
}

export interface IStore {
    cart_id: number,
    product: IProduct,
    ammount: number,
    state: boolean
}