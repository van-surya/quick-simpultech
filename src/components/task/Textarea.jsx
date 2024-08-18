import React, { useState } from 'react';
import images from '../../assets/images';
import { Button } from '../';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putData } from '../../hooks/useRequest';

export const Textarea = ({ description, listId, category, title, date, status }) => {
    const [desc, setDesc] = useState(description);
    const queryClient = useQueryClient();

    const { mutate: updateTaskDescription } = useMutation({
        mutationFn: () => putData(`/tasks/${listId}`, { description: desc, category, title, date, status }),
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
            console.log('Description updated successfully');
        }
    });

    const onSubmit = () => {
        updateTaskDescription();
    };

    return (
        <>
            <div className="flex flex-row gap-2 mt-2 w-full">
                <Button onClick={onSubmit} icon={images.pen} className="w-4 h-4 mt-2" />
                <textarea
                    className='w-[80%] p-2 mb-2 bg-[#FFF]'
                    rows={desc ? 4 : 1}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
            </div>
        </>
    );
};
