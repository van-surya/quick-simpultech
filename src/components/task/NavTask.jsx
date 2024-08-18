import React, { useState, useEffect, useRef } from 'react';
import images from "../../assets/images";
import { Button } from "../Button";

export const NavTask = ({ onCategorySelect }) => {  
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('My Task');  
    const dropdownRef = useRef(null);

    const showDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        onCategorySelect(option);
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-row items-center">
            <div className="relative ms-14" ref={dropdownRef}>
                <Button
                    onClick={showDropdown}
                    className="font-bold text-base border border-gray-900 rounded-md p-2"
                    iconRight={images.arrow_down_dark}
                    label={selectedOption}  
                    iconClassName="w-3 h-3"
                />
                {isDropdownOpen && (
                    <div className="absolute top-12 z-10 w-48 left-[50%] translate-x-[-50%] bg-[#FFF] border border-gray-900 rounded-md">
                        <Button
                            className="font-bold text-sm w-full p-1 border-b border-gray-900"
                            label="Personal Errands"
                            onClick={() => handleOptionSelect('Personal Errands')}  
                        />
                        <Button
                            className="font-bold text-sm w-full p-1"
                            label="Urgent To-Do"
                            onClick={() => handleOptionSelect('Urgent To-Do')}  
                        />
                    </div>
                )}
            </div>
            <Button
                label="New Task"
                className="ms-auto rounded-md bg-primary p-2 text-[#FFF] text-base font-bold"
            />
        </div>
    );
};
