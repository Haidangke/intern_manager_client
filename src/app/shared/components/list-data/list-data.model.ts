export interface ColListData {
    field: string;
    header?: string;
    url?: string[];
    type?: 'link' | 'date' | 'child' | 'status';
    child?: {
        field: string;
        url: string[];
    };
}
