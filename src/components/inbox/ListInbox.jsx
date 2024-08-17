import images from '../../assets/images';
import data from '../../dummy';
export const ListInbox = ({ openDetailInbox }) => {
    const lists = data.inbox;

    return (
        <>
            {lists.map((list, index) => {
                const latestChat = list.chat.slice(-1)[0];
                const latestChatDetail = latestChat?.detail.slice(-1)[0];
                const previousChatDetail = latestChat?.detail.slice(-2, -1)[0];

                const truncatedMessage = latestChatDetail?.message.length > 60
                    ? latestChatDetail.message.slice(0, 60) + '...'
                    : latestChatDetail?.message;

                const imagePreviousChatDetail = latestChatDetail?.image ? latestChatDetail.image : images.person;

                return (
                    <div key={index} onClick={() => openDetailInbox(list.id)}>
                        {index !== 0 && <hr className='border-t-gray-900' />}
                        <div className='w-full flex flex-row py-4'>
                            {previousChatDetail?.image ? (
                                <div className="w-20 h-12 me-2">
                                    <div className="relative w-20 me-2">
                                        {previousChatDetail?.image && (
                                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                                <img className='w-4 h-4' src={previousChatDetail.image} alt="person" />
                                            </div>
                                        )}
                                        <div className="absolute left-6 top-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                            <img
                                                className='w-4 h-4'
                                                src={imagePreviousChatDetail}
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
                                            src={imagePreviousChatDetail}
                                            alt="person"
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="w-full">
                                <div className="flex gap-2">
                                    <p className='text-primary font-bold text-base'>{list.title}</p>
                                    <p className='text-gray-900'>{latestChat?.date} {latestChatDetail?.time}</p>
                                </div>
                                {latestChatDetail?.name && (
                                    <p className='text-gray-900 font-bold text-sm'>{latestChatDetail.name} {latestChatDetail.name ? ':' : ''}</p>
                                )}
                                <div className="flex flex-row justify-between items-end">
                                    <p className='text-gray-900 text-sm'>{truncatedMessage}</p>
                                    {latestChatDetail?.read && (
                                        <div className="w-2 h-2 rounded-full bg-red"></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};
