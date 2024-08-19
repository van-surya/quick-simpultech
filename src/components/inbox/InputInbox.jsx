import React, { useState } from 'react';
import { Button, Input } from '..';
import { postData } from '../../hooks/useRequest';
import { useQueryClient } from '@tanstack/react-query';
import images from '../../assets/images';

export const InputInbox = ({ idInbox, dataReplay, setDataReplay }) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const queryClient = useQueryClient();

    const handleChange = ({ value }) => {
        setMessage(value);
        setError('');
    };



    const onSubmit = async () => {
        if (message.trim() === '') {
            setError('Message cannot be empty');
            return;
        } 

        const dataToSend = {
            name: "You",
            inbox_id: idInbox,
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            message: message,
            read: false,
            replay: dataReplay?.message  
        };

        try {
            await postData('/detail_inbox', dataToSend);
            queryClient.invalidateQueries('detail_inbox');
            setMessage('');
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }; 


    return (
        <div className="relative px-6 my-auto flex flex-row gap-2 items-center">
            <div className="w-full">
                {dataReplay?.message && (
                    <div className="absolute w-[457px] bottom-[37px] border border-gray-900 p-2 bg-[#F2F2F2] rounded-t-md">
                        <div className="flex items-start flex-row justify-between">
                            <p className='text-sm font-bold'>Replying to {dataReplay?.name} </p>
                            <Button onClick={() => setDataReplay(null)} icon={images.close_dark} className="w-3 h-3" />
                        </div>
                        <p className="text-sm font-regular">{dataReplay?.message}</p>
                    </div>)}
                <Input
                    placeholder="Type a new message"
                    value={message}
                    onChange={handleChange}
                    inputClassName="rounded-md p-2 border !border-gray-900 text-[#333333] placeholder-[#333333] font-regular text-sm"
                />
            </div>
            <Button
                label="Send"
                className="bg-primary text-base rounded-md font-bold text-[#FFF] py-2 px-4"
                onClick={onSubmit}
            />
        </div>
    );
};
