import React from 'react';
import {Modal, ModalTitle} from "react-bootstrap";
import {LazyLoadImage} from "react-lazy-load-image-component";


function ImgModal(props) {
    return (
        <Modal show={props?.isImgModalOpen} onHide={props?.handleCloseImgModal}>
            <div className="flex flex-col items-center h-[450px] w-[500px]">
                <div className="flex justify-between w-full items-center bg-gray-800 text-white rounded-t-lg">
                    <p className="text-lg font-monospace p-3">{props?.infoData?.name}</p>
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
                <div className="p-2 flex items-center justify-center">
                    <LazyLoadImage
                        effect="blur"
                        style={{width: '350px', height: '350px'}}
                        src={`http://localhost:8080/api/v1/file/getFile/${props?.infoData?.photo?.id}`}
                        alt={props?.infoData?.name}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default ImgModal;