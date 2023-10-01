export interface IProduct {
    id: number,
    description: string,
    emoji: string,
}

export interface IStore {
    id: number,
    product: IProduct,
    ammount: number,
    state: boolean
}