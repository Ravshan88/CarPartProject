import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    getAdvertisementStart,
    getCarouselStart, setPhotoForBackend,
    workEditAdvertisement
} from '../../../redux/reducers/AdvertisementSlice';
import {Button} from 'antd';
import {LazyLoadImage} from "react-lazy-load-image-component";
import {DeleteIcon} from "../DeleteIcon";
import {Tooltip} from "@nextui-org/react";


function AdminNews(props) {
    const {data, isLoading, carousel} = useSelector(state => state.advertisement);
    const initialNews = {
        id: data[0]?.id || '',
        title: data[0]?.title || ''
    };
    const [news, setNews] = useState(initialNews);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAdvertisementStart());
        dispatch(getCarouselStart())
    }, []);

    function editAdvertisementText() {
        dispatch(workEditAdvertisement({news, data}));
        setNews({id: "", title: ""})
    }

    const handleChange = (e) => {
        dispatch(setPhotoForBackend(e.target.files[0]))
    };

    function deletedCarouselPhoto(item) {
        dispatch({type: "deleteCarouselPhoto", payload: item})
    }

    return (
        <div>
            <div className={"flex justify-between gap-1"}>
                <div
                    className={'flex w-full align-items-center justify-center gap-5 bg-orange-600 h-7 text-white'}>
                    <h2 className={'flex font-semibold'}>{data[0]?.title}</h2>
                </div>
                <div>
                    <Button onClick={() => dispatch({type: "deleteText", payload: data[0]?.id})}
                            className={"border-none bg-white text-blue-500 rounded-2xl  text-2xl"}><DeleteIcon/></Button>
                </div>
            </div>
            <div className={'my-2 flex input-group w-[400px]'}>
                <input
                    className={'form-control'}
                    placeholder={"Yangilikni tahrirlash"}
                    type={'text'}
                    value={news.title}
                    onChange={e => setNews({...news, id: data[0]?.id, title: e.target.value})}
                />
                <Button onClick={editAdvertisementText} className={'h-[45px] bg-blue-700 border-none text-white'}>
                    Tahrirlash
                </Button>
            </div>

            <div className={"bg-white min-h-full p-2"}>
                {
                    carousel.length <5 && <label>
                        <input onChange={handleChange} type="file" hidden/>
                        <div className={"border hover:bg-gray-200 cursor-pointer  rounded p-2"}>
                            <p className={"text-gray-600"}>
                                Upload...
                            </p>
                        </div>
                    </label>
                }
                <div className={"flex gap-2 flex-wrap mt-2 "}>
                    {carousel?.map(item => (
                        <div
                            className={"rounded-b-2xl shadow-2xl transition-all duration-100 ease-linear"}
                            key={item.id}
                        >
                            <div className={"w-[180px] min-h-[200px] p-2 text-center"}
                                 key={item.id}>
                                <LazyLoadImage
                                    effect="blur"
                                    className="w-full h-full block text-center"
                                    width={150}
                                    height={180}
                                    src={`http://localhost:8080/api/v1/file/getFile/${item?.attachment?.id}`}
                                    alt="Product Image"
                                />
                            </div>
                            <div
                                className={"flex justify-center p-2"}>
                                <Tooltip color="danger" size={"sm"} content="Delete photo">
                                    <span
                                        onClick={() => deletedCarouselPhoto(item)}
                                        className="text-xl text-danger cursor-pointer active:opacity-50"
                                    >
                                        <DeleteIcon/>
                                    </span>
                                </Tooltip>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default AdminNews;
