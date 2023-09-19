import React, {useState} from 'react';
import PageTitle from "../PageTitle";
import {Modal} from "react-bootstrap";
import {
    Button,
    ModalHeader, ModalBody, ModalFooter,
} from "@windmill/react-ui";
// import {LazyLoadImage} from 'react-lazy-load-image-component'
import {useDispatch, useSelector} from "react-redux";
import {setBase64, setImageFileForBackend} from "../../../redux/reducers/AdminBrandSlice";
import uploadImg from "../../images/upload.png"


function AdminBrand(props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {base64} = useSelector(state => state.adminBrand)
    const dispatch = useDispatch();

    function handleModal() {
        setIsModalOpen(p => !p)
        dispatch(setBase64(""))
    }

    function handleFile(e) {
        let file = e.target.files[0];
        dispatch(setImageFileForBackend(e.target.files[0]))
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                // setAttachmentId("")
                dispatch(setBase64(reader.result))
            };
            reader.readAsDataURL(file);
        }
        // axios({
        //     url: "http://localhost:8080/api/v1/file/upload",
        //     method: "POST",
        //     data: formData,
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //         Authorization: localStorage.getItem("access_token")
        //     }
        // }).then(res => {
        //     dispatch(UploadFileStart(res.data));
        // });
    }

    return (
        <div className={` h-screen  bg-gray-900 `}>
            <div className={"flex justify-between my-2"}>
                <PageTitle>
                    Brand
                </PageTitle>

                <div>
                    <Button onClick={handleModal} size="small" className={'h-140  border-0 '}>Yangi brand
                        qo'shish</Button>
                </div>
            </div>

            <div className={'umodal'}>
                <Modal show={isModalOpen} onHide={handleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Yangi Admin qo'shish</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>Brand nomi:</label>
                        <input
                            className={"form-control"}
                            type={'text'}
                            // value={form.name}
                            placeholder={""}
                        />
                        <div className={"my-2 flex justify-center"}>
                            <label>
                                <input
                                    className={"form-control "}
                                    type={'file'}
                                    hidden
                                    onChange={handleFile}
                                />
                                <div
                                    className={"border w-[80px] h-[80px] rounded-[50%] p-1 hover:scale-[1.1] transition-[1s] flex justify-center mx-auto"}>
                                    {
                                        // base64 ?
                                    //         <LazyLoadImage style={{borderRadius: "50%"}} height={80} width={80}
                                    //                        src={base64} alt=""/> :
                                    //         <LazyLoadImage style={{borderRadius: "50%"}} height={80} width={80}
                                    //                        src={uploadImg} alt=""/>
                                    // }
                                    }
                                </div>
                            </label>

                        </div>
                        <div type={"submit"}
                            // onClick={handleAddAdmin}
                            // disabled={isSaving}
                             className=" p-1 rounded my-2 text-white text-center bg-blue-400">Saqlash
                        </div>

                    </Modal.Body>

                </Modal>
            </div>

        </div>
    );
}

export default AdminBrand;