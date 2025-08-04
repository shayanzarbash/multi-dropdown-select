
export interface IOption {
    label: string;
    value: string;
    icon: string
}

export interface IMultiSelectProps {
    items: IOption[];
    placeholder?: string;
}