import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, InputInbox } from '..';
import images from '../../assets/images';
import { Spinner } from '../';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../../hooks/useRequest';

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
    const collapseRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (collapseRef.current && !collapseRef.current.contains(event.target)) {
                setOpenCollapse(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [collapseRef]);

    const [inboxDetail, setInboxDetail] = useState([]);

    const { data, isLoading } = useQuery({
        queryKey: ['inbox', idInbox],
        queryFn: () => getData('/inbox/' + idInbox),
    });

    useEffect(() => {
        if (data) {
            setInboxDetail(data);
        }
    }, [data]);


    const chatData = inboxDetail.chat || [];
    const participantCount = new Set(
        chatData.flatMap(chat => chat.detail?.map(detail => detail.id) || [])
    ).size;

    const handleOptionChat = (detailId) => {
        setOpenCollapse(openCollapse === detailId ? null : detailId);
    };

    return (
        <Modal className="overflow-hidden flex flex-col">
            <div className="flex flex-row px-6 py-4 items-center justify-center border-b border-gray-200">
                <Button icon={images.arrow_back_dark} onClick={showListInbox} className="w-4 h-4" />
                <div className="ms-3">
                    <h2 className='text-md font-bold text-primary'>{inboxDetail.title}</h2>
                    <p className='text-sm font-regular text-gray-900'>{participantCount} Participant</p>
                </div>
                <Button icon={images.close_dark} onClick={handleButtonQuick} className="ms-auto w-4 h-4" />
            </div>
            <div className='h-[480px] overflow-y-auto mt-auto px-6'>
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <Spinner label="Loading Chats..." />
                    </div>
                ) : (
                    <>
                        {chatData.map((chat, chatIndex) => (
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
                                            <div className="w-[80%] flex flex-row gap-2">
                                                {detail.name == 'You' && (
                                                    <div className='relative'>
                                                        <Button
                                                            icon={images.more_horiz_dark}
                                                            onClick={() => handleOptionChat(detail.id)}
                                                            className="w-4 h-4"
                                                        />
                                                        {isCollapseOpen && (
                                                            <div ref={collapseRef} className="absolute t-2 bg-[#FFF] rounded-md border border-gray-200">
                                                                <Button className="text-primary p-1 px-2 w-full text-sm font-bold border-b border-gray-200" label="Edit" />
                                                                <Button className="text-red p-1 px-2 w-full text-sm font-bold" label="Delete" />
                                                            </div>
                                                        )}
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
                                                {detail.name != 'You' && (
                                                    <div className='relative'>
                                                        <Button
                                                            icon={images.more_horiz_dark}
                                                            onClick={() => handleOptionChat(detail.id)}
                                                            className="w-4 h-4"
                                                        />
                                                        {isCollapseOpen && (
                                                            <div ref={collapseRef} className="absolute t-2 bg-[#FFF] rounded-md border border-gray-200">
                                                                <Button className="text-primary p-1 px-2 w-full text-sm font-bold border-b border-gray-200" label="Share" />
                                                                <Button className="text-primary p-1 px-2 w-full text-sm font-bold" label="Reply" />
                                                            </div>
                                                        )}
                                                    </div>
                                                )} 
                                            </div>
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </>
                )}
            </div>
            <InputInbox idInbox={idInbox} />
        </Modal>
    );
};
