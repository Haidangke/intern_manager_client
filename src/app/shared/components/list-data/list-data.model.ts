export interface ColListData {
    field: string;
    header?: string;
    url?: string[];
    type?: 'link' | 'date' | 'child' | 'password' | 'quantity';
    child?: ColListData;
}
