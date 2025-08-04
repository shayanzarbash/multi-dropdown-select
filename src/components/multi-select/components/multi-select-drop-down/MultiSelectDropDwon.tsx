import { ArrowIcon } from '../../../icons/ArrowIcon';
import styles from "./MultiSelectDropDwon.module.scss";
import DropdownItem from '../dorp-down-item/DropDownItem';
import React, { useState, useRef, useEffect } from "react";
import type { IMultiSelectProps, IOption } from '../../libraries/multi-select-types';


export const MultiSelectDropDwon: React.FC<IMultiSelectProps> = ({
    items,
    placeholder,
    defaultSelected
}) => {
    const [selected, setSelected] = useState<IOption[]>(defaultSelected || []);
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState<IOption[]>(items);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
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

    const handleSelectBoxClick = () => {
        setIsOpen(true);
        setIsFocused(true);
    };

    const handleRemoveItem = (
        e: React.MouseEvent<HTMLButtonElement>,
        valueToRemove: string
    ) => {
        e.stopPropagation();
        setSelected(prev => prev.filter(item => item.value !== valueToRemove));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            const exists = options.find(
                (opt) => opt.value.toLowerCase() === inputValue.toLowerCase()
            );

            if (!exists) {
                const newItem = {
                    label: inputValue,
                    value: inputValue,
                    icon: getRandomEmoji(),
                };
                setOptions((prev) => [...prev, newItem]);
                setSelected((prev) => [...prev, newItem]);
            } else if (!isSelected(exists)) {
                setSelected((prev) => [...prev, exists]);
            }

            resetInput();
        } else if (e.key === "Escape") {
            resetInput();
        }
    };

    const resetInput = () => {
        setInputValue("");
        setIsOpen(false);
    };

    const emojiList = ["🌟", "🔥", "🚀", "💡", "🎯", "🍀", "🎉", "💎", "⚡", "🌈"];

    const getRandomEmoji = () => {
        const randomIndex = Math.floor(Math.random() * emojiList.length);
        return emojiList[randomIndex];
    };

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            <div
                className={`${styles.selectBox} ${isFocused ? styles.focused : ''}`}
                onClick={handleSelectBoxClick}
                tabIndex={0}
            >
                <div className={styles.selectedContainer}>
                    {selected.map((s) => (
                        <span key={s.value} className={styles.selectedItem}>
                            {s.label}
                            <button
                                className={styles.removeButton}
                                onClick={(e) => handleRemoveItem(e, s.value)}
                            >
                                ×
                            </button>
                        </span>
                    ))}
                    <input
                        className={styles.input}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        ref={inputRef}
                    />
                </div>
                <span className={`${styles.arrow} ${isOpen ? styles.rotated : ""}`}>
                    <ArrowIcon />
                </span>
            </div>
            {isOpen && (
                <DropdownItem
                    options={filteredOptions}
                    isSelected={isSelected}
                    toggleOption={toggleOption}
                />
            )}
        </div>
    );
};
