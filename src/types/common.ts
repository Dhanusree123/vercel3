export type ITableColumn = {
    key:string|null;
    label:string;
    image?:string;
    textTransform?:string;
    align?:'right'|'left'|'center';
    action?:(item:IBaseSchema)=>React.ReactNode;
    currency?:boolean;
    minWidth?:number;
    sortable?:boolean;
}

export type IBaseSchema = {
    id?:string;
    url?:string;
    active:boolean;
    path?:string;
    slug?:string;
    isPublished?:boolean;
    categoryPath?:string;
    productId?:string
}