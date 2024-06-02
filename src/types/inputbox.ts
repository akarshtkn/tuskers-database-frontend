export interface InputBoxProps {
    label:string;
    placeholder:string;
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
}