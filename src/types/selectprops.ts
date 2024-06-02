export interface SelectProps<T> {
    options:T[];
    selectedfn:(selected:T) => void
}