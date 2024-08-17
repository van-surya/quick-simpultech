import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Input } from '..';
import data from '../../dummy';
import images from '../../assets/images';

const getConsistentClasses = (seed) => {
    const randomValue = (parseInt(seed, 10) % 2 === 0) ? 0.5 : 1.5;
    if (randomValue > 1) {
        return {
            textClass: 'text-green-dark',
            bgClass: 'bg-sticker-teal'
        };
    }
    return {
        textClass: 'text-orange-dark',
        bgClass: 'bg-sticker-yellow'
    };
};

export const DetailInbox = ({ idInbox, showListInbox, handleButtonQuick }) => {
    const [openCollapse, setOpenCollapse] = useState(null);
    const colapseRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (colapseRef.current && !colapseRef.current.contains(event.target)) {
                setOpenCollapse(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [colapseRef]);

    const inbox = data.inbox.find(item => item.id === idInbox);
    if (!inbox) return null;

    const participantCount = new Set(
        inbox.chat.flatMap(chat => chat.detail.map(detail => detail.id))
    ).size;

    const handleOptionChat = (detailId) => {
        console.log(detailId);
        setOpenCollapse(openCollapse === detailId ? null : detailId);
    };

    return (
        <Modal className="overflow-hidden flex flex-col">
            <div className="flex flex-row px-6 py-4 items-center justify-center border-b border-gray-200">
                <Button icon={images.arrow_back_dark} onClick={showListInbox} className="w-4 h-4" />
                <div className="ms-3">
                    <h2 className='text-md font-bold text-primary'>{inbox.title}</h2>
                    <p className='text-sm font-regular text-gray-900'>{participantCount} Participant</p>
                </div>
                <Button icon={images.close_dark} onClick={handleButtonQuick} className="ms-auto w-4 h-4" />
            </div>
            <div className='h-[460px] overflow-y-auto mt-auto px-6'>
                {inbox.chat.map((chat, chatIndex) => (
                    <React.Fragment key={chatIndex}>
                        <div className="flex flex-row w-full py-2 items-center">
                            <div className="flex-1 bg-gray-900 h-[1px] w-full"></div>
                            <p className='text-gray-900 text-sm font-bold mx-3'>
                                {chat.date}
                            </p>
                            <div className="flex-1 bg-gray-900 h-[1px]"></div>
                        </div>
                        {chat.detail.map((detail, detailIndex) => {
                            const { textClass, bgClass } = getConsistentClasses(detailIndex);
                            const isCollapseOpen = openCollapse === detail.id;
                            return (
                                <div key={detailIndex}
                                    className={`flex flex-col py-2 ${detail.name === 'You' ? 'items-end' : ''}`}
                                >
                                    <p className={`font-bold text-sm ${detail.name === 'You'
                                        ? 'text-purple-dark'
                                        : textClass}`}>
                                        {detail.name}
                                    </p>
                                    <div className="w-[80%] flex flex-row gap-2 relative">
                                        <Button
                                            icon={images.more_horiz_dark}
                                            onClick={() => handleOptionChat(detail.id)}
                                            className="w-4 h-4"
                                        />
                                        {isCollapseOpen && (
                                            <div ref={colapseRef} className="absolute t-2 bg-[#FFF] rounded-sm border border-gray-200">
                                                <Button className="text-primary p-1 px-2 w-full text-sm font-bold border-b border-gray-200" label="Edit" />
                                                <Button className="text-red p-1 px-2 w-full text-sm font-bold" label="Delete" />
                                            </div>
                                        )}
                                        <div className={`p-2 rounded-md w-full ${detail.name === 'You'
                                            ? 'bg-sticker-purple'
                                            : bgClass}`}>
                                            <p className='text-sm text-gray-900'>
                                                {detail.message}
                                            </p>
                                            <p className='text-sm text-gray-900'>
                                                {detail.time}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>
            <div className="px-6 my-auto flex flex-row gap-2 items-center">
                <Input placeholder="Type a new message"
                    inputClassName="rounded-md p-2 border !border-gray-900 text-[#333333] placeholder-[#333333] font-regular text-sm" />
                <Button label="Send" className="bg-primary text-base rounded-md font-bold text-[#FFF] py-2 px-4" />
            </div>
        </Modal>
    );
};
