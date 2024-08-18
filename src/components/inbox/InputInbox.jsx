import React, { useState } from 'react';
import { Button, Input } from '..';
export const InputInbox = ({ }) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = ({ value }) => {
        setMessage(value);
        setError('');
    };

    const onSubmit = async () => {
        if (message.trim() === '') {
            setError('Message cannot be empty');
            console.log(error);
            return;
        }

        const dataToSend = {
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            detail: [
                {
                    id: "1",
                    name: "You",
                    time: new Date().toLocaleTimeString(),
                    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                    message: message,
                    read: false,
                    image: "/images/person_dark.svg"
                }
            ]
        };

        console.log(dataToSend);

        setMessage('');
    };

    return (
        <div className="px-6 my-auto flex flex-row gap-2 items-center">
            <Input
                placeholder="Type a new message"
                value={message}
                onChange={handleChange}
                inputClassName="rounded-md p-2 border !border-gray-900 text-[#333333] placeholder-[#333333] font-regular text-sm"
            />
            <Button
                label="Send"
                className="bg-primary text-base rounded-md font-bold text-[#FFF] py-2 px-4"
                onClick={onSubmit}
            />
        </div>
    );
};
