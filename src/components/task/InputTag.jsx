import React, { useState, useRef, useEffect } from 'react';
import images from '../../assets/images';
import { Button } from '../';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putData } from '../../hooks/useRequest';

export const InputTag = ({ description, listId, category, title, date, status, schedule }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isSchedule, setSchedule] = useState(schedule || []);

    const showDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionSelect = (option) => {
        setSchedule(prevSchedule => {
            if (prevSchedule.includes(option)) {
                return prevSchedule.filter(item => item !== option);
            }
            return [...prevSchedule, option];
        });
    };


    const dataTag = {
        "Important ASAP": 'bg-[#E5F1FF]',
        "Offline Meeting": 'bg-sticker-orange',
        "Virtual Meeting": 'bg-sticker-yellow',
        "ASAP": 'bg-sticker-teal',
        "Client Related": 'bg-sticker-emerald',
        "Self Task": 'bg-sticker-purple',
        "Appointments": 'bg-sticker-pink',
        "Court Related": 'bg-[#9DD0ED]',
    };

    const getBackgroundClass = (item) => {
        return dataTag[item] || 'bg-default';
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

    const queryClient = useQueryClient();

    const { mutate: updateTaskSchedule } = useMutation({
        mutationFn: () => putData(`/tasks/${listId}`, { description, category, title, date, status, schedule: isSchedule }),
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
            console.log('Schedule updated successfully');
        }
    });

    const onSubmit = () => {
        updateTaskSchedule();
    };

    return (
        <>
            <div className="flex flex-row gap-2 mt-2 w-[95%] bg-[#F9F9F9] pb-1 pt-1 rounded-md">
                <Button icon={images.bookmarks} className="w-4 h-4 mt-3 ms-2" onClick={onSubmit} />
                <div className="w-full pe-4" onClick={showDropdown} ref={dropdownRef}>
                    <div className="w-full">
                        <div className="flex flex-row flex-wrap gap-2">
                            {isSchedule.map((item, index) => (
                                <div
                                    key={index}
                                    className={`py-1 px-2 rounded-md text-gray-900 font-bold ${getBackgroundClass(item)}`}
                                    style={{ marginBottom: '2px' }}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative" >
                        {isDropdownOpen && (
                            <div className="absolute left-0 top-1 z-10 w-48 p-2 gap-2 flex flex-col bg-[#FFF] border border-gray-500 rounded-md">
                                {Object.keys(dataTag).map((option) => (
                                    <Button
                                        key={option}
                                        className={`font-bold text-sm w-full p-1 rounded-md border border-transparent hover:border-primary ${dataTag[option]}`}
                                        label={option}
                                        onClick={() => handleOptionSelect(option)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
