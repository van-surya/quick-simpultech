import { useState } from 'react';
import { Button, Quick, Inbox, Modal, NavTask, ListTask } from '../';
import images from '../../assets/images';

export const Task = () => {
    const [showButtonQuick, setShowButtonQuick] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const [showInbox, setShowInbox] = useState(false);

    const handleButtonQuick = () => {
        setShowButtonQuick(true);
        setShowModal(false);
    };

    const showInboxHandler = () => {
        setShowModal(false);
        setShowInbox(true);
    };

    return (
        <>
            {showInbox && <Inbox />}
            {showModal && (
                <div className="flex flex-col">
                    <Modal className="px-6 py-4">
                        <NavTask />
                        <div className="h-[520px] mt-2 overflow-y-auto">
                            <ListTask />
                        </div>
                    </Modal>
                    <div className="ms-auto flex flex-row gap-2 items-center">
                        <Button
                            onClick={showInboxHandler}
                            className={`w-12 h-12 bg-[#F2F2F2] rounded-full !p-2 `}
                            icon={images.question_answer_purple}
                            iconClassName="w-6 h-6"
                        />
                        <div className="relative ml-4">
                            <div className="absolute right-4 z-0 bottom-0 w-14 h-14 bg-gray-900 rounded-full"></div>
                            <Button
                                onClick={handleButtonQuick}
                                className={`w-14 h-14 z-10 relative bg-yellow rounded-full !p-2 `}
                                icon={images.chrome_reader_mode}
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
