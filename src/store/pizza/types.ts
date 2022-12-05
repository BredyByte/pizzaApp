export enum Statuses {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
};
export type FetchPizzasParams = {
    sortBy: string,
    order: string,
    category: string,
    search: string,
    pageCount: number
};
export type PizzaStructure = {
    img: string,
    title: string,
    id: number
};
export type PizzaItem = {
    id: string,
    imageUrl: string,
    name: string,
    types: number[],
    sizes: number[],
    price: number,
    category: number,
    rating: number,
    description: string,
    structure: PizzaStructure[]
};
export type PizzaSliceState = {
    items: PizzaItem[],
    status: Statuses
};