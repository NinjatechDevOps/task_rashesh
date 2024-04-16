'use client'
import { api } from '@/trpc/react';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [customData, setCustomdata] = useState<any[]>()
    const userId: number = +(localStorage.getItem('userId') || 0)

    const { mutate: addFavorite } = api.favorites.addFavorite.useMutation();
    const { mutate: removeFavorite } = api.favorites.removeFavorite.useMutation();
    const { mutate: store } = api.cates.store.useMutation();

    const getList = api.cates.get.useMutation({
        onSuccess: (data: any) => {
            setCustomdata(data);
        },
        onError: (error: any) => {
            console.log(error);
        }
    });
    useEffect(() => {
        store()
        getList.mutate({ userId: userId });
    }, []);


    function handleCheckboxChange(categoryId: number) {
        const isSelected = customData?.find(cat => cat.id === categoryId)?.isSelected;

        if (isSelected) {
            removeFavorite({ userId: userId, categoryId });
        } else {
            addFavorite({ userId: userId, categoryId });
        }

        setCustomdata(customData?.map(cat => {
            if (cat.id === categoryId) return { ...cat, isSelected: !isSelected };
            return cat;
        }));
    }


    return (
        < >
            <div className=" mt-10 py-5 main-section   max-w-full flex justify-center items-center ">
                <div className=" px-5 customshadow rounded-xl shadow-xl font-sans    flex flex-col justify-center">
                    <div className="">
                        <h4 className=" text-3xl font-semibold max-md:text-xl text-center text-nowrap">
                            Please mark your interset!
                        </h4>
                        <h6 className=" text-xs py-6 font-medium text-center">
                            We will keep your notfied
                        </h6>
                    </div>
                    <ul className=" text-sm font-medium">
                        <h4 className=" text-lg font-semibold">My Saved intersets!</h4>
                        {customData?.map((category) => (
                            <li key={category.id}>
                                <input
                                    type="checkbox"
                                    checked={category.isSelected}
                                    onChange={() => handleCheckboxChange(category.id)}
                                />
                                {category.name}
                            </li>

                        ))}
                    </ul>
                    {/* <div className=" flex items-center mx-auto mt-2 gap-3">
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            className=" w-2 h-2 text-black "
                        />
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            className=" w-2 h-2 text-black "
                        />
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            className=" w-2 h-2 text-black "
                        />
                        <div className="flex gap-1  text-xs">
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>
                        </div>
                        <FontAwesomeIcon icon={faChevronRight} className=" w-2 h-2" />
                        <FontAwesomeIcon icon={faChevronRight} className=" w-2 h-2" />
                        <FontAwesomeIcon icon={faChevronRight} className=" w-2 h-2" />
                        <FontAwesomeIcon icon={faChevronRight} className=" w-2 h-2" />
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default page
