import images from '../../assets/images';
import data from '../../dummy';
import { Button } from '../Button';

export const ListTask = () => {
    const lists = data.tasks;

    return (
        <>
            {lists.map((list, index) => (
                <div className="" key={index}>
                    {index !== 0 && <hr className='border-t-gray-200' />}
                    <div className="flex flex-row py-2">
                        <div className="me-2">
                            <Button className="w-4 h-4" icon={images.check_box} />
                        </div>
                        <div className="w-2/3">
                            <p className="text-gray-900 font-bold text-base">{list?.title}</p>
                        </div>
                        <div className="gap-2 flex flex-row ms-auto">
                            <p className='text-red text-sm font-regular'></p>
                            <p className='text-gray-900 text-sm font-regular'>{list?.date}</p>
                            <Button icon={images.arrow_down_dark} className="rotate-180 w-4 h-4" />
                            <Button icon={images.more_horiz_dark} className="w-4 h-4" />
                        </div>
                    </div>

                </div>
            ))}
        </>
    );
};
