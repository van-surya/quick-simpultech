import React, { useState, useEffect, useRef } from 'react';
import images from '../../assets/images';
import { Button, Spinner, Textarea, InputTag } from '../';
import { InputDatepicker } from './InputDatepicker';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getData, putData, deleteData } from '../../hooks/useRequest';
import { differenceInDays, parseISO } from 'date-fns';

export const ListTask = ({ selectedCategory }) => {
    const [taskData, setTaskData] = useState([]);
    const [openDropdowns, setOpenDropdowns] = useState([]);
    const [showDelete, setShowDelete] = useState(null);
    const containerRef = useRef(null);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => getData('/tasks'),
    });

    const { mutate: updateTaskStatus } = useMutation({
        mutationFn: (task) => putData(`/tasks/${task.id}`, task),
        onSuccess: () => {
            refetch();
        }
    });

    const { mutate: removeTask } = useMutation({
        mutationFn: (taskId) => deleteData(`/tasks/${taskId}`),
        onSuccess: () => {
            setShowDelete(null);
            refetch();
        }
    });

    useEffect(() => {
        if (data) {
            setTaskData(data);
        }
    }, [data]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowDelete(null);
                setOpenDropdowns([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleStatus = (taskId) => {
        const updatedTask = taskData.find(task => task.id === taskId);
        if (updatedTask) {
            const updatedTaskData = {
                ...updatedTask,
                status: !updatedTask.status
            };
            updateTaskStatus(updatedTaskData);
        }
    };

    const handleDropdown = (index) => {
        setOpenDropdowns((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    const handleRemove = (taskId) => {
        removeTask(taskId);
    };

    const calculateDaysLeft = (date) => {
        const taskDate = parseISO(date);
        const today = new Date();
        return differenceInDays(today, taskDate);
    };

    const filteredTasks = selectedCategory === 'My Task' ? taskData : taskData.filter(task => task.category === selectedCategory);

    return (
        <div ref={containerRef}>
            {isLoading ? (
                <div className="flex justify-center items-center h-full">
                    <Spinner label="Loading Task..." />
                </div>
            ) : (
                <>
                        {filteredTasks.map((list, index) => (
                        <div key={index} className="my-2">
                            {index !== 0 && <hr className='border-t-gray-200' />}
                            <div className="flex flex-row py-2">
                                <div className="me-2 mt-1">
                                    <Button
                                        onClick={() => handleStatus(list.id)}
                                        className="w-4 h-4"
                                        icon={list?.status ? images.check_box : images.check_box_outline_blank}
                                    />
                                </div>
                                    <div className="w-1/2 2xl:w-3/5">
                                    <p className={`text-gray-900 font-bold text-base ${list?.status ? 'line-through' : ''}`}>
                                        {list?.title}
                                    </p>
                                </div>
                                <div className="gap-2 flex flex-row ms-auto items-center">
                                        {calculateDaysLeft(list?.date) !== 0 && (
                                            <p className='text-red font-regular text-sm'>{`${calculateDaysLeft(list?.date)} Days Left`}</p>
                                        )}
                                    <p className='text-gray-900 text-sm font-regular'>{list?.date}</p>
                                    <Button
                                        onClick={() => handleDropdown(index)}
                                        icon={images.arrow_down_dark}
                                        className={`w-4 h-4 ${openDropdowns.includes(index) ? '' : 'rotate-180'}`}
                                    />
                                    <div className="relative">
                                        <Button
                                            onClick={() => setShowDelete(showDelete === index ? null : index)}
                                            icon={images.more_horiz_dark}
                                            className="w-4 h-4"
                                        />
                                        <Button
                                            onClick={() => handleRemove(list.id)}
                                                className={`absolute z-10 right-0 top-6 bg-white p-2 font-bold text-sm border border-gray-900 rounded-md text-red ${showDelete === index ? 'block' : 'hidden'}`}
                                            label="DELETE"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={`ms-6 ${openDropdowns.includes(index) ? '' : 'hidden'}`}>
                                <div className="flex flex-row gap-2 items-center">
                                    <InputDatepicker description={list.description}
                                        listId={list.id}
                                        category={list.category}
                                        title={list.title}
                                        date={list.date}
                                            status={list.status}
                                            schedule={list.schedule} />
                                </div>
                                <Textarea
                                    description={list.description}
                                    listId={list.id}
                                    category={list.category}
                                    title={list.title}
                                    date={list.date}
                                    status={list.status}
                                        schedule={list.schedule}
                                />

                                    <InputTag description={list.description}
                                        listId={list.id}
                                        schedule={list.schedule}
                                        category={list.category}
                                        title={list.title}
                                        date={list.date}
                                        status={list.status} />
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};
