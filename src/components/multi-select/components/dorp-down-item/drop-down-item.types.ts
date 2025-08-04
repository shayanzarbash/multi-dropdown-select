import type { IOption } from '../../libraries/multi-select-types';

export interface IDropDownItem {
    options: IOption[];
    isSelected: (item: IOption) => boolean;
    toggleOption: (item: IOption) => void;
}