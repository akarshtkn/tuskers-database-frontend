export type SelectFieldType = {
    id:number;
    value:string;
}

export type SelectProps = {
    options:SelectFieldType[];
    field:string;
    selectValue:SelectFieldType;
    selectfn:(selected:SelectFieldType) => void;
}