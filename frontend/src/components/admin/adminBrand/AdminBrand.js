import React, {useEffect, useState} from 'react';
import PageTitle from "../PageTitle";
import {Modal} from "react-bootstrap";
import {
    ModalHeader,
    ModalBody,
    ModalFooter,
    TableContainer,
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    Avatar,
    Badge, TableFooter, Pagination,
} from "@windmill/react-ui";

import {EditIcon, TrashIcon} from '../Sidebar/icons'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import {useDispatch, useSelector} from "react-redux";
import {getBrands, setBase64, setImageFileForBackend, setObjForBrand} from "../../../redux/reducers/AdminBrandSlice";
import uploadImg from "../../images/upload.png"
import {Delete} from "@mui/icons-material";
import 'react-lazy-load-image-component/src/effects/blur.css';
import {Button} from "antd";
import {toast, ToastContainer} from "react-toastify";
import Tables from "./Tables";


function AdminBrand(props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {base64, brands, imgFileForBackend} = useSelector(state => state.adminBrand)
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    useEffect(() => {
        dispatch(getBrands())
    }, [])

    function handleModal() {
        setIsModalOpen(p => !p)
        dispatch(setBase64(""))
        setName("")
        dispatch(setImageFileForBackend(""))
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

    function handleAddBrand() {
        if (name === "") {
            toast.error("Iltimos brand nomini kiriting");
        } else if (imgFileForBackend === null || imgFileForBackend === "") {
            toast.error("Iltimos brand rasmini yuklang");
        } else {
            dispatch(setObjForBrand({name, photo: imgFileForBackend}));
        }
    }


    return (
        <div className={` h-screen  bg-gray-900 `}>
            <ToastContainer/>
            <div className={"flex flex-col justify-between my-2"}>
                <div className={"flex justify-between"}>
                    <PageTitle>
                        Brand
                    </PageTitle>

                    <div>
                        <button className={"border-none small text-white p-1 rounded bg-fuchsia-700"}
                                onClick={handleModal}>
                            Yangi brand qo'shish
                        </button>
                    </div>
                </div>

                <div>

                    <TableContainer className="mb-8">
                        <Table>
                            <TableHeader>
                                <tr>
                                    <TableCell>Photo</TableCell>
                                    <TableCell>Name</TableCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {brands.content?.map((brand, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <div className="flex items-center text-sm">
                                                <img className="hidden mr-3 md:block"
                                                     src={`http://localhost:8080/api/v1/file/getFile/${brand.photo.id}`}
                                                     alt="User avatar"/>
                                                <div>
                                                    {console.log(brand.photo.id)}
                                                    <p className="font-semibold">{brand.name}</p>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center space-x-4">
                                                <Button layout="link" size="icon" aria-label="Edit">
                                                    <EditIcon className="w-5 h-5" aria-hidden="true"/>
                                                </Button>
                                                <Button layout="link" size="icon" aria-label="Delete">
                                                    <TrashIcon className="w-5 h-5" aria-hidden="true"/>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </TableContainer>
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
                            className={`form-control`}
                            type={'text'}
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder={""}
                        />
                        <div className={"my-2 flex justify-center position-relative"}>
                            <label>
                                <input
                                    className={"form-control "}
                                    type={'file'}
                                    hidden
                                    onChange={handleFile}
                                />
                                <div
                                    className={`border w-[80px] h-[80px] rounded-[50%] p-1 hover:scale-[1.1] transition-[1s] flex justify-center mx-auto`}>
                                    {
                                        base64 ?
                                            <LazyLoadImage style={{borderRadius: "50%"}} height={80} width={80}
                                                           src={base64} alt=""/>
                                            :
                                            <LazyLoadImage style={{borderRadius: "50%"}} height={80} width={80}
                                                           src={uploadImg} alt=""/>
                                    }
                                </div>
                            </label>
                            <div className={"deleteFileButton "}>
                                {
                                    base64 &&
                                    (<Button title={"Delete"} type={"dashed"} shape={"circle"}
                                             icon={<Delete color={"error"}/>} onClick={() => dispatch(setBase64(""))}
                                             className={"flex justify-center"}/>)
                                }
                            </div>

                        </div>
                        <button
                            onClick={handleAddBrand}
                            className="p-1 rounded my-2 w-full text-white text-center bg-blue-400">
                            Saqlash
                        </button>

                    </Modal.Body>
                </Modal>
            </div>

        </div>
    );
}

export default AdminBrand;