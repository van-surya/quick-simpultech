import { useState, useRef, useEffect } from 'react';
import { Button, Quick, Task, ListInbox, Modal, Input, DetailInbox } from '../';
import images from '../../assets/images';
import { useMutation } from '@tanstack/react-query';
import { putData } from '../../hooks/useRequest';

export const Inbox = () => {
    const [showButtonQuick, setShowButtonQuick] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const [showTask, setShowTask] = useState(false);
    const [showDetailInbox, setShowDetailInbox] = useState(false);
    const [inboxStatusData, setInboxStatusData] = useState(false);
    const [idInbox, setIdInbox] = useState('');
    const [titleInbox, setTitleInbox] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); 
    const modalRef = useRef(null);

    const handleButtonQuick = () => {
        setShowButtonQuick(true);
        setShowModal(false);
    };

    const showTaskHandler = () => {
        setShowModal(false);
        setShowTask(true);
    };


    const openDetailInbox = (id, title, participant, message, name, date, time) => {
        setShowDetailInbox(true);
        setIdInbox(id);
        setTitleInbox(title);
        setInboxStatusData({ title, participant, message, name, date, time, status: false })

        updateStatusInbox();
    };

    const { mutate: updateStatusInbox } = useMutation({
        mutationFn: () => putData(`/inbox/${idInbox}`, inboxStatusData),
        onSuccess: () => {
            console.log('Description updated successfully');
        }
    });

    const showListInbox = () => {
        setShowDetailInbox(false);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.value);
    };


    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleButtonQuick();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            {showTask && <Task />}
            {showModal && (
                <div className="flex flex-col" ref={modalRef}>
                    {!showDetailInbox && (
                        <Modal className="px-6 py-4">
                            <Input
                                onChange={handleSearch}
                                className="px-6 border h-8 border-gray-900 rounded-md"
                                placeholder="Search"
                                icon={images.searchdark}
                                inputClassName="p-0 text-gray-900 placeholder-gray-900 font-bold text-sm"
                                iconClassName="order-2 w-4 h-4"
                            />
                            <div className="h-[520px] 3xl:h-[540px] mt-2 overflow-y-auto">
                                <ListInbox
                                    openDetailInbox={openDetailInbox}
                                    idInbox={setIdInbox}
                                    titleInbox={setTitleInbox}
                                    searchQuery={searchQuery}
                                />
                            </div>
                        </Modal>
                    )}
                    {showDetailInbox && <DetailInbox titleInbox={titleInbox} idInbox={idInbox} showListInbox={showListInbox} handleButtonQuick={handleButtonQuick} />}
                    <div className="ms-auto flex flex-row gap-2 items-center">
                        <Button
                            onClick={showTaskHandler}
                            className={`w-12 h-12 bg-[#F2F2F2] rounded-full !p-2 `}
                            icon={images.chrome_reader_mode_yellow}
                            iconClassName="w-6 h-6"
                        />
                        <div className="relative ml-4">
                            <div className="absolute right-4 z-0 bottom-0 w-14 h-14 bg-gray-900 rounded-full"></div>
                            <Button
                                onClick={handleButtonQuick}
                                className={`w-14 h-14 z-10 relative bg-purple-dark rounded-full !p-2 `}
                                icon={images.question_answer}
                                iconClassName="w-8 h-8"
                            />
                        </div>
                    </div>
                </div>
            )}
            {showButtonQuick && <Quick />}
        </>
    );
}
