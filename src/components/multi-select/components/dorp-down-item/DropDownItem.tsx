import { CheckIcon } from "../../../icons/CheckIcon";
import type { IDropDownItem } from './drop-down-item.types';
import styles from "../multi-select-drop-down/MultiSelectDropDwon.module.scss";

const DropdownItem: React.FC<IDropDownItem> = ({ options, isSelected, toggleOption }) => {
    return (
        <ul className={styles.dropdown}>
            {options.length > 0 ? (
                options.map((item) => (
                    <li
                        key={item.value}
                        className={`${styles.option} ${isSelected(item) ? styles.selected : ""}`}
                        onClick={() => toggleOption(item)}
                    >
                        <span className={styles.name}>{item.label} {item.icon}</span>
                        {isSelected(item) && (
                            <span className={styles.check}>
                                <CheckIcon />
                            </span>
                        )}
                    </li>
                ))
            ) : (
                <li className={styles.noOption}>
                    <span>No results found. Press Enter to add</span>
                </li>
            )}
        </ul>
    );
};

export default DropdownItem;
