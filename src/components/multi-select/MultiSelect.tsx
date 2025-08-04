import React, { useState, useRef, useEffect } from "react";
import styles from "./MultiSelect.module.scss";
import { ArrowIcon } from '../icons/ArrowIcon';
import { CheckIcon } from "../icons/CheckIcon";
import type { IMultiSelectProps, IOption } from './multi-select-types';

export const MultiSelect: React.FC<IMultiSelectProps> = ({
    items,
    placeholder = "Select or add items...",
}) => {
    const [selected, setSelected] = useState<IOption[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState<IOption[]>(items);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                setIsFocused(false);
                setInputValue("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleOption = (option: IOption) => {
        const exists = selected.find((item) => item.value === option.value);
        if (exists) {
            setSelected(selected.filter((item) => item.value !== option.value));
        } else {
            setSelected([...selected, option]);
        }
    };

    const isSelected = (option: IOption) =>
        selected.some((item) => item.value === option.value);

    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    const emojiList = ["🌟", "🔥", "🚀", "💡", "🎯", "🍀", "🎉", "💎", "⚡", "🌈"];

    const getRandomEmoji = () => {
        const randomIndex = Math.floor(Math.random() * emojiList.length);
        return emojiList[randomIndex];
    };

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            <div
                className={`${styles.selectBox} ${isFocused ? styles.focused : ''}`}
                onClick={() => {
                    setIsOpen(true);
                    setIsFocused(true);
                }}
                tabIndex={0}
            >
                <div className={styles.selectedContainer}>
                    {selected.map((s) => (
                        <span key={s.value} className={styles.selectedItem}>
                            {s.label}
                            <button
                                className={styles.removeButton}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelected(prev => prev.filter(item => item.value !== s.value));
                                }}
                            >
                                ×
                            </button>
                        </span>
                    ))}
                    <input
                        className={styles.input}
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setIsOpen(true);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && inputValue.trim() !== "") {
                                const exists = options.find(
                                    (opt) => opt.value.toLowerCase() === inputValue.toLowerCase()
                                );
                                if (!exists) {
                                    const newItem = { label: inputValue, value: inputValue, icon: getRandomEmoji() };
                                    setOptions((prev) => [...prev, newItem]);
                                    setSelected((prev) => [...prev, newItem]);
                                } else {
                                    if (!isSelected(exists)) {
                                        setSelected((prev) => [...prev, exists]);
                                    }
                                }
                                setInputValue("");
                                setIsOpen(false);
                            } else if (e.key === "Escape") {
                                setIsOpen(false);
                                setInputValue("");
                            }
                        }}
                        placeholder={placeholder}
                    />
                </div>

                <span className={`${styles.arrow} ${isOpen ? styles.rotated : ""}`}>
                    <ArrowIcon />
                </span>
            </div>
            {isOpen && (
                <ul className={styles.dropdown}>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((item) => (
                            <li
                                key={item.value}
                                className={`${styles.option} ${isSelected(item) ? styles.selected : ""}`}
                                onClick={() => toggleOption(item)}
                            >
                                <span className={styles.name}>{item.label} {item.icon}</span>
                                {isSelected(item) && <span className={styles.check}><CheckIcon /></span>}
                            </li>
                        ))
                    ) : (
                        <li className={styles.noOption}><span>No results found. Press Enter to add</span></li>
                    )}
                </ul>
            )}
        </div>
    );
};
