import React, {useState} from 'react';
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Spinner} from "@nextui-org/react";

function Render(props) {
    const [isImgCame, setIsImgCame] = useState(null)
    return (
        <section className="text-gray-600 body-font shadow-inner rounded">
            <div className="container mx-auto flex px-5 items-center justify-center flex-col">
                <div className={"text-center relative p-1.5 shadow-xl mb-2 rounded"}>
                    <LazyLoadImage effect={"blur"}
                                   className={"h-[170px] w-[200px]"}
                                   beforeLoad={() => setIsImgCame(true)}
                                   afterLoad={() => setIsImgCame(false)}
                                   src={`http://localhost:8080/api/v1/file/getFile/${props?.product?.photo?.id}`}
                                   alt=""/>
                    {
                        isImgCame &&
                        <div className={"mx-auto absolute top-[50%] left-0 right-0"}><Spinner color="success"/>
                        </div>

                    }
                </div>
                <div className="text-center w-[70%]">
                    <div className={"flex items-center justify-between w-full"}>
                        <h1 className={"text-sm sm:text-lg"}>Mahsulot Nomi:</h1>
                        <h1 className="title-font  font-semibold sm:text-lg text-sm text-gray-900">{props?.product?.name}</h1>
                    </div>
                    <div className={"flex items-center justify-between w-full"}>
                        <h1 className={"text-sm sm:text-lg"}>Ehtiyot qism:</h1>
                        {
                            props?.product?.carPart?.name ?
                                <h1 className="title-font  font-semibold sm:text-lg text-sm text-gray-900">{props?.product?.carPart?.name}</h1>
                                :
                                <h1 className="title-font sm:text-lg text-sm text-yellow-600">Mavjud emas</h1>
                        }
                    </div>
                    <div className={"flex items-center justify-between w-full"}>
                        <h1 className={"text-sm sm:text-lg"}>Mashina turi:</h1>
                        <h1 className="title-font  font-semibold sm:text-lg text-sm text-gray-900">{props?.product?.car.name}</h1>
                    </div>
                    <h1 className={"text-sm sm:text-lg mx-auto"}>Description</h1>
                    <p className="mb-8 leading-relaxed">{props?.product?.description}</p>
                    <div className="flex justify-center">
                        <button
                            className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button
                        </button>
                        <button
                            className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Render;