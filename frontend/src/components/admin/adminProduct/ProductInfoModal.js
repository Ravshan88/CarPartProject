import React from 'react';
import {Modal} from "react-bootstrap";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Popover, PopoverContent, PopoverTrigger, ScrollShadow, Textarea} from "@nextui-org/react";

function ProductInfoModal(props) {
    const {infoData} = props
    return (
        <Modal show={props?.isImgModalOpen} onHide={props?.handleCloseImgModal}>
            <div className="flex flex-col  h-[450px] w-[500px]">
                <div className="flex justify-between w-full items-center bg-gray-800 text-white rounded-t-lg">
                    <p className="text-lg font-monospace p-3">{infoData?.name}</p>
                    <button
                        onClick={props?.handleCloseImgModal}
                        className="p-2 rounded mx-2 hover:bg-red-600 hover:text-white focus:outline-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="p-2 border h-full flex gap-3 items-center justify-center">
                    <div className={"w-[150px] h-[150px]  rounded"}>
                        <LazyLoadImage
                            effect="blur"
                            src={`http://localhost:8080/api/v1/file/getFile/${infoData?.photo?.id}`}
                            alt={infoData?.name}
                        />
                    </div>
                    <div>
                        <div className="flex items-center mb-2">
                            <h1 className="text-gray-500 tracking-widest title-font">Name:</h1>
                            <p className="ml-2">{infoData?.name}</p>
                        </div>
                        <div className="flex items-center mb-2">
                            <h1 className="text-gray-500 tracking-widest title-font">Description:</h1>
                            <Textarea
                                isReadOnly
                                // variant="bordered"
                                placeholder="Enter your description"
                                defaultValue={infoData?.description}
                                className="max-w-xs"
                            />
                            {/*<ScrollShadow hideScrollBar className="w-[150px] h-[50px]">*/}
                            {/*    <p*/}
                            {/*        className="ml-2">*/}
                            {/*        {infoData?.description}*/}
                            {/*    </p>*/}
                            {/*</ScrollShadow>*/}
                        </div>
                        <div className="flex items-center mb-2">
                            <h1 className="text-gray-500 tracking-widest title-font">Brand:</h1>
                                <p className="ml-2">{infoData?.car?.brand?.name}</p>
                        </div>
                        <div className="flex items-center mb-2">
                            <h1 className="text-gray-500 tracking-widest title-font">CarName:</h1>
                            <Popover showArrow key={"blur"} backdrop={"blur"} placement="bottom">
                                <PopoverTrigger>
                                    <p
                                        className="ml-2 overflow-hidden overflow-ellipsis line-clamp-1">
                                        {infoData?.car?.name}
                                    </p>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <p
                                        className="ml-2 overflow-hidden overflow-ellipsis">
                                        {infoData?.car?.name}
                                    </p>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex items-center mb-2">
                            <h1 className="text-gray-500 tracking-widest title-font">CarPart:</h1>
                            {
                                infoData?.carPart?.name ?
                                    <p className="ml-2">{infoData?.carPart?.name}</p> :
                                    <p className="ml-2 text-gray-400">Mavjud emas</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ProductInfoModal;