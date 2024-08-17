import React, { useState } from 'react';
import images from '../../assets/images';
import data from '../../dummy';
import { Button } from '../Button';
import { InputDatepicker } from './InputDatepicker';

export const ListTask = () => {
    const lists = data.tasks;

    return (
        <>
            {lists.map((list, index) => (
                <div key={index} className="my-2">
                    {index !== 0 && <hr className='border-t-gray-200' />}
                    <div className="flex flex-row py-2">
                        <div className="me-2 mt-1">
                            <Button className="w-4 h-4" icon={images.check_box} />
                        </div>
                        <div className="w-2/3">
                            <p className="text-gray-900 font-bold text-base">{list?.title}</p>
                        </div>
                        <div className="gap-2 flex flex-row ms-auto items-center">
                            <p className='text-gray-900 text-sm font-regular'>{list?.date}</p>
                            <Button icon={images.arrow_down_dark} className="rotate-180 w-4 h-4" />
                            <Button icon={images.more_horiz_dark} className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="ms-6">
                        <div className="flex flex-row gap-2 items-center">
                            <img className='w-6 h-6' src={images.schedule} alt="schedule" />
                            <InputDatepicker />
                        </div>
                        <div className="flex flex-row gap-2 mt-2 w-full">
                            <img className='w-6 h-6' src={images.pen} alt="pen" />
                            <textarea className='w-[80%] p-2 mb-2' rows={list.description ? 4 : 1} name="" id="">
                                {list?.description}
                            </textarea>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
