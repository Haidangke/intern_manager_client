export interface ResponsePagination<T> {
    content: T[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface PageInfo {
    size: number;
    page: number;
}
