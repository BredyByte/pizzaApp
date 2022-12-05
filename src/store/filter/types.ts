export enum SortProperty {
    RATING = 'rating',
    MRATING = '-rating',
    PRICE = 'price',
    MPRICE = '-price',
    TITLE = 'title',
    MTITLE = '-title'
}

export type SortType = {
    name: string,
    sortProperty: SortProperty
}

export type FilterSliceState = {
    searchValue: string,
    pageCount: number,
    categoryId: number | null,
    sort: SortType
}