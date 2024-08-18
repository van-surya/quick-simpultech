import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, subMonths, eachDayOfInterval, isToday } from 'date-fns'; // Menggunakan library date-fns
import images from '../../assets/images';
import { Button } from '../';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putData } from '../../hooks/useRequest';

export const InputDatepicker = ({ description, listId, category, title, date, status }) => {
    const [selectedDate, setSelectedDate] = useState(date);
    const [isOpen, setIsOpen] = useState(false);
    const [calendarDate, setCalendarDate] = useState(new Date());
    const queryClient = useQueryClient();

    const { mutate: updateTaskDate } = useMutation({
        mutationFn: () => putData(`/tasks/${listId}`, {
            description,
            category,
            title,
            date: format(selectedDate, 'yyyy-MM-dd'), // Format tanggal sesuai kebutuhan API
            status
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
            console.log('Date updated successfully');
        }
    });

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setIsOpen(false);
    };

    const handleToggleCalendar = () => {
        setIsOpen(!isOpen);
    };

    const handleDateChange = (event) => {
        const date = new Date(event.target.value);
        setCalendarDate(date);
    };

    const handlePrevMonth = () => {
        setCalendarDate(subMonths(calendarDate, 1));
    };

    const handleNextMonth = () => {
        setCalendarDate(addMonths(calendarDate, 1));
    };

    const onSubmit = () => {
        updateTaskDate();
    };

    const renderCalendar = () => {
        const startOfMonthDate = startOfMonth(calendarDate);
        const endOfMonthDate = endOfMonth(calendarDate);
        const startDay = startOfWeek(startOfMonthDate);
        const endDay = endOfWeek(endOfMonthDate);
        const days = eachDayOfInterval({ start: startDay, end: endDay });

        return (
            <div className="absolute top-12 z-20 bg-white border rounded-md mt-1 p-2 shadow-lg w-64">
                <div className="flex items-center justify-between mb-2">
                    <Button
                        onClick={handlePrevMonth}
                        className="text-gray-600 hover:text-gray-800 rotate-90 w-4 h-4"
                        icon={images.arrow_down_dark}
                    />
                    <p className='font-bold'>
                        {format(calendarDate, 'MMMM yyyy')}
                    </p>
                    <Button
                        onClick={handleNextMonth}
                        className="text-gray-600 hover:text-gray-800 -rotate-90 w-4 h-4"
                        icon={images.arrow_down_dark}
                    />
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {['M', 'T', 'W', 'Th', 'F', 'S', 'S'].map(day => (
                        <div key={day} className="font-bold">{day}</div>
                    ))}
                    {days.map(day => (
                        <div
                            key={day.toString()}
                            className={`cursor-pointer p-1 rounded-full 
                                } ${selectedDate && format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                                    ? 'border-2 border-blue-500 hover:bg-primary hover:text-neutral-50'
                                    : 'hover:bg-primary hover:text-[#FFF]'
                                }`}
                            onClick={() => handleDateClick(day)}
                        >
                            {format(day, 'd')}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="relative inline-flex items-center">
            <Button onClick={onSubmit} icon={images.schedule} className="w-6 h-6 me-2" />
            <input
                type="text"
                value={selectedDate ? format(selectedDate, 'dd/MM/yyyy') : ''}
                onClick={handleToggleCalendar}
                onChange={handleDateChange}
                placeholder="Select Date"
                className="border p-2 rounded-md pe-2 ring-0"
                readOnly
            />
            <img
                src={images.calendar}
                alt="Calendar Icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
            />
            {isOpen && renderCalendar()}
        </div>
    );
};
