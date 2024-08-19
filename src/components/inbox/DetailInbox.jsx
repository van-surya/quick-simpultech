import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, InputInbox } from '..';
import images from '../../assets/images';
import { Spinner } from '../';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getData, deleteData } from '../../hooks/useRequest';

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

export const DetailInbox = ({ idInbox, titleInbox, showListInbox, handleButtonQuick }) => {
    const [openCollapse, setOpenCollapse] = useState(null);
    const [dataReplay, setDataReplay] = useState({ message: '', name: '' });
    const collapseRef = useRef(null);

    const handleReply = (message, name) => {
        setDataReplay({ message, name });
    };

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

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['detail_inbox', idInbox],
        queryFn: () => getData('/detail_inbox'),
    });

    const { mutate: removeInboxDetail } = useMutation({
        mutationFn: (inboxDetailId) => deleteData(`/detail_inbox/${inboxDetailId}`),
        onSuccess: () => {
            handleOptionInboxDetail(null);
            refetch();
        }
    });

    useEffect(() => {
        if (data) {
            setInboxDetail(data);
        }
    }, [data]);

    const inboxDetailData = inboxDetail.filter(detail_inbox => detail_inbox.inbox_id === idInbox);

    const displayedDates = new Set();
    const filteredInboxData = inboxDetailData.map(detail_inbox => {
        const displayDate = !displayedDates.has(detail_inbox.date);
        if (displayDate) {
            displayedDates.add(detail_inbox.date);
        }
        return { ...detail_inbox, date: displayDate ? detail_inbox.date : '' };
    });

    const participantCount = new Set(
        inboxDetail
            .filter(detail_inbox => detail_inbox.inbox_id === idInbox && detail_inbox.name !== 'You')
            .map(detail_inbox => detail_inbox.name)
    ).size;

    const handleOptionInboxDetail = (inboxDetailId) => {
        setOpenCollapse(openCollapse === inboxDetailId ? null : inboxDetailId);
    };

    const handleRemove = (inboxDetailId) => {
        removeInboxDetail(inboxDetailId);
    };

    return (
        <Modal className="overflow-hidden flex flex-col">
            <div className="flex flex-row px-6 py-4 items-center justify-center border-b border-gray-200">
                <Button icon={images.arrow_back_dark} onClick={showListInbox} className="w-4 h-4" />
                <div className="ms-3">
                    <h2 className='text-md font-bold text-primary'>{titleInbox}</h2>
                    <p className='text-sm font-regular text-gray-900'>{participantCount} Participant</p>
                </div>
                <Button icon={images.close_dark} onClick={handleButtonQuick} className="ms-auto w-4 h-4" />
            </div>
            <div className='h-[440px] 3xl:h-[480px] overflow-y-auto mt-auto px-6'>
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <Spinner label="Loading Chats..." />
                    </div>
                ) : (
                    <>
                            {filteredInboxData.map((chat, chatIndex) => {
                                const { textClass, bgClass } = getConsistentClasses(chatIndex);
                                const isCollapseOpen = openCollapse === chat.id;

                                return (
                                    <React.Fragment key={chatIndex}>
                                        {chat.date && (
                                            <div className="flex flex-row w-full py-2 items-center">
                                                <div className="flex-1 bg-gray-900 h-[1px] w-full"></div>
                                                <p className='text-gray-900 text-sm font-bold mx-3'>
                                                    {chat.date}
                                                </p>
                                                <div className="flex-1 bg-gray-900 h-[1px]"></div>
                                            </div>
                                        )}

                                        <div className={`flex flex-col py-2 ${chat.name === 'You' ? 'items-end' : ''}`}>
                                            <p className={`font-bold text-sm ${chat.name === 'You'
                                                ? 'text-purple-dark'
                                                : textClass}`}>
                                                {chat.name}
                                            </p>
                                            {chat?.replay && (
                                                <div className="w-[85%] text-sm p-2 text-gray-900 mb-2 bg-[#F2F2F2] border border-gray-200 rounded-md">
                                                    {chat.replay}
                                                </div>
                                            )}
                                            <div className="w-[80%] flex flex-row gap-2">
                                                {chat.name === 'You' && (
                                                    <div className='relative'>
                                                        <Button
                                                            icon={images.more_horiz_dark}
                                                            onClick={() => handleOptionInboxDetail(chat.id)}
                                                            className="w-4 h-4"
                                                        />
                                                        {isCollapseOpen && (
                                                            <div ref={collapseRef} className="absolute t-2 bg-[#FFF] rounded-md border border-gray-200">
                                                                <Button className="text-primary p-1 px-2 w-full text-sm font-bold border-b border-gray-200" label="Edit" />
                                                                <Button onClick={() => handleRemove(chat.id)} className="text-red p-1 px-2 w-full text-sm font-bold" label="Delete" />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                                <div className={`p-2 rounded-md w-full ${chat.name === 'You'
                                                    ? 'bg-sticker-purple'
                                                    : bgClass}`}>
                                                    <p className='text-sm text-gray-900'>
                                                        {chat.message}
                                                    </p>
                                                    <p className='text-sm text-gray-900'>
                                                        {chat.time}
                                                    </p>
                                                </div>
                                                {chat.name !== 'You' && (
                                                    <div className='relative'>
                                                        <Button
                                                            icon={images.more_horiz_dark}
                                                            onClick={() => handleOptionInboxDetail(chat.id)}
                                                            className="w-4 h-4"
                                                        />
                                                        {isCollapseOpen && (
                                                            <div ref={collapseRef} className="absolute t-2 bg-[#FFF] rounded-md border border-gray-200">
                                                                <Button onClick={() => console.log(chat.message)} className="text-primary p-1 px-2 w-full text-sm font-bold border-b border-gray-200" label="Share" />
                                                                <Button
                                                                    onClick={() => handleReply(chat.message, chat.name)}
                                                                    className="text-primary p-1 px-2 w-full text-sm font-bold"
                                                                    label="Reply"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                );
                            })}
                    </>
                )}
            </div>
            <InputInbox idInbox={idInbox} dataReplay={dataReplay} setDataReplay={setDataReplay} />
        </Modal>
    );
};
