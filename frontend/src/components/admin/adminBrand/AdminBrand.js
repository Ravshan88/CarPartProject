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
import {
    changeIsEdit,
    getBrands,
    setBase64, setEditingId,
    setImageFileForBackend,
    setObjForBrand, setPhotoIdForEdit
} from "../../../redux/reducers/AdminBrandSlice";
import uploadImg from "../../images/upload.png"
import {Delete} from "@mui/icons-material";
import 'react-lazy-load-image-component/src/effects/blur.css';
import {Button} from "antd";
import {toast, ToastContainer} from "react-toastify";
import ImgModal from "../ImgModal";


function AdminBrand(props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isImgModalOpen, setIsImgModalOpen] = useState(false)
    const [brandInfo, setBrandInfo] = useState({})
    const {
        base64,
        brands,
        imgFileForBackend,
        isEditing,
        editingId,
        photoIdForEdit
    } = useSelector(state => state.adminBrand)
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    useEffect(() => {
        dispatch(getBrands())
    }, [])

    function handleOpenModal() {
        setIsModalOpen(true)
        dispatch(changeIsEdit(false))
    }

    function handleCloseModal() {
        setIsModalOpen(false)
        dispatch(setBase64(""))
        setName("")
        dispatch(setImageFileForBackend(""))
        dispatch(setPhotoIdForEdit(""))
    }

    function handleOpenImgModal() {
        setIsImgModalOpen(p => !p)
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
        } else if ((imgFileForBackend === null || imgFileForBackend === "") && !photoIdForEdit) {
            toast.error("Iltimos brand rasmini yuklang");
        } else {
            dispatch(setObjForBrand({
                name,
                photo: imgFileForBackend,
                photoId: photoIdForEdit,
                id: editingId,
                isEditing
            }));
            handleCloseModal()
        }
    }


    function editBrand(brand) {
        dispatch(changeIsEdit(true))
        setIsModalOpen(true)
        dispatch(setEditingId(brand.id))
        setName(brand.name)
        dispatch(setPhotoIdForEdit(brand.photo.id))
    }

    return (
        <div className={` h-screen  bg-gray-900 `}>
            <ToastContainer/>
            <ImgModal infoData={brandInfo} handleCloseImgModal={handleOpenImgModal} isImgModalOpen={isImgModalOpen}/>
            <div className={"flex flex-col justify-between my-2"}>
                <div className={"flex justify-between"}>
                    <PageTitle>
                        Brand
                    </PageTitle>

                    <div>
                        <button className={"border-none small text-white p-1 rounded bg-fuchsia-700"}
                                onClick={handleOpenModal}>
                            Yangi brand qo'shish
                        </button>
                    </div>
                </div>

                <div className={"mt-2"}>
                    <TableContainer className="mb-8">
                        <Table>
                            <TableHeader>
                                <tr>
                                    <TableCell>Photo</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Yaratilgan sana</TableCell>
                                    <TableCell>Tahrirlangan sana</TableCell>
                                    <TableCell></TableCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {brands.content?.map((brand, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <div
                                                onClick={() => {
                                                    setBrandInfo(brand)
                                                    handleOpenImgModal()
                                                }}
                                                className="flex items-center text-sm">
                                                <Avatar className={"w-[50px]"}
                                                        width={50} height={50}
                                                        src={`http://localhost:8080/api/v1/file/getFile/${brand?.photo?.id}`}
                                                        alt="User avatar"/>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="font-semibold">{brand.name}</p>
                                            </div>
                                        </TableCell><TableCell>
                                        <div>
                                            <p className="font-semibold">{new Date(brand.createdAt).getDate() + "." + (new Date(brand.createdAt).getMonth() + 1) + "." + new Date(brand.createdAt).getFullYear()}</p>
                                        </div>
                                    </TableCell><TableCell>
                                        <div>
                                            <p className="font-semibold">{new Date(brand.updatedAt).getDate() + "." + (new Date(brand.updatedAt).getMonth() + 1) + "." + new Date(brand.updatedAt).getFullYear()}</p>

                                        </div>
                                    </TableCell>

                                        <TableCell>
                                            <div className="flex items-center space-x-4">
                                                <Button onClick={() => editBrand(brand)} layout="link" size="icon"
                                                        aria-label="Edit">
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
                <Modal show={isModalOpen} onHide={handleCloseModal}>
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
                                                           src={base64}
                                                           alt=""/>
                                            :
                                            isEditing ?
                                                <LazyLoadImage style={{borderRadius: "50%"}} height={80} width={80}
                                                               src={`http://localhost:8080/api/v1/file/getFile/${photoIdForEdit}`}
                                                               alt=""/> :
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
                            {
                                isEditing ? "Tahrirlash" : "Saqlash"
                            }
                        </button>

                    </Modal.Body>
                </Modal>
            </div>

        </div>
    );
}

export default AdminBrand;