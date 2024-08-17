import { useState } from 'react';
import { Button, Task, Inbox } from './index';
import images from '../assets/images';

export function Quick() {
    const [activeComponent, setActiveComponent] = useState(null);
    const [isHidden, setIsHidden] = useState(true);

    const showTask = () => {
        setActiveComponent('task');
    };

    const showInbox = () => {
        setActiveComponent('inbox');
    };

    const resetComponent = () => {
        setActiveComponent(null);
        setIsHidden(!isHidden);
    };

    return (
        <>
            {activeComponent === 'task' && <Task />}
            {activeComponent === 'inbox' && <Inbox />}
            {!activeComponent && (
                <div className="flex items-center gap-2">
                    <Button
                        onClick={showTask}
                        className={`w-12 h-12 bg-[#F2F2F2] rounded-full p-2 ${isHidden ? 'hidden' : ''}`}
                        icon={images.chrome_reader_mode_yellow}
                        iconClassName="w-6 h-6"
                    />
                    <Button
                        onClick={showInbox}
                        className={`w-12 h-12 bg-[#F2F2F2] rounded-full p-2 ${isHidden ? 'hidden' : ''}`}
                        icon={images.question_answer_purple}
                        iconClassName="w-6 h-6"
                    />
                    <Button
                        onClick={resetComponent}
                        className={`w-14 h-14 bg-primary rounded-full ${activeComponent ? 'hidden' : ''}`}
                        icon={images.lightning}
                        iconClassName="!w-12 !h-12"
                    />
                </div>
            )}
        </>
    );
}
