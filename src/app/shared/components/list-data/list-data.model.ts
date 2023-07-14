export interface ColListData {
    field: string;
    header?: string;
    url?: string[];
    type?: 'link' | 'date' | 'child' | 'status' | 'password';
    child?: {
        field: string;
        url: string[];
    };
}
