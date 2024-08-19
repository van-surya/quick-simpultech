import { useState, useEffect } from 'react';
import images from '../../assets/images';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../../hooks/useRequest';
import { Spinner } from '../Spinner';

export const ListInbox = ({ openDetailInbox, searchQuery }) => {
    const [inboxData, setInboxData] = useState([]);

    const { data, isLoading } = useQuery({
        queryKey: ['inbox'],
        queryFn: () => getData('/inbox'),
    });

    useEffect(() => {
        if (data) {
            setInboxData(data);
        }
    }, [data]);

    const filteredInboxData = searchQuery
        ? inboxData.filter(list =>
            list.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            list.chat?.some(chat =>
                chat.detail?.some(detail =>
                    detail.message.toLowerCase().includes(searchQuery.toLowerCase())
                )
            )
        )
        : inboxData;

    const truncateMessage = (message, maxLength) => {
        if (!message) return '';
        return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;
    };

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center h-full">
                    <Spinner label="Loading Chats..." />
                </div>
            ) : (
                <>
                        {filteredInboxData.map((list, index) => {
                        return (
                            <div key={index} onClick={() => openDetailInbox(list.id, list.title, list.participant, list.message, list.name, list.date, list.time)}>
                                {index !== 0 && <hr className='border-t-gray-900' />}
                                <div className='w-full flex flex-row py-4'>
                                    {list?.participant >= 2 ? (
                                        <div className="w-20 h-12 me-2">
                                            <div className="relative w-20 me-2">
                                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                                    <img className='w-4 h-4' src={images.person_dark} alt="person" />
                                                </div>
                                                <div className="absolute left-6 top-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                                    <img
                                                        className='w-4 h-4'
                                                        src={images.person}
                                                        alt="person"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-20 h-12 me-2 flex justify-center">
                                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                                <img
                                                    className='w-4 h-4'
                                                        src={images.person}
                                                    alt="person"
                                                />
                                            </div>
                                        </div>)}
                                    <div className="w-full">
                                        <div className="flex gap-2">
                                            <p className='text-primary font-bold text-base'>{list.title}</p>
                                            <p className='text-gray-900'>{list?.date || ''} {list?.time || ''}</p>
                                        </div>
                                        {list?.name && (
                                            <p className='text-gray-900 font-bold text-sm'>{list.name} {list.name ? ':' : ''}</p>
                                        )}
                                        <div className="flex flex-row justify-between items-end">
                                            <p className='text-gray-900 text-sm'>{truncateMessage(list.message, 76)}</p>
                                            {list?.unread && (
                                                <div className="w-2 h-2 rounded-full bg-red"></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    </>
            )}
        </>
    );
};
