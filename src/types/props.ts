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

export type InputBoxProps = {
    label:string;
    placeholder:string;
    value:string;
    debounce:boolean;
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ButtonProps {
    type:"button" | "submit" | "reset";
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    width:number;
    onClick?:() => void
}

export type ApiResponse = {
    value:boolean;
    message:string;
}

export type AlertProps = {
    type:"Success" | "Error" | null;
    response:ApiResponse;
}