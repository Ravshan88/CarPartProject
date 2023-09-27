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

import {LazyLoadImage} from 'react-lazy-load-image-component'
import {useDispatch, useSelector} from "react-redux";
import {
    changeIsEdit,
    getBrands,
    setBase64, setEditingId,
    setImageFileForBackend,
    setObjForBrand, setPhotoIdForEdit,
    deleteCarBrand
} from "../../../redux/reducers/AdminBrandSlice";
import uploadImg from "../../images/upload.png"
import {Delete} from "@mui/icons-material";
import 'react-lazy-load-image-component/src/effects/blur.css';
import {Button} from "antd";
import {toast, ToastContainer} from "react-toastify";
import ImgModal from "../ImgModal";
import {deleteCarPart} from "../../../redux/reducers/AdminCartPartSlice";
import {Tooltip} from "@nextui-org/react";
import {EyeIcon} from "../EyeIcon";
import {DeleteIcon} from "../DeleteIcon";
import {EditIcon} from "../EditIcon";


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
    useEffect(() => {
        dispatch(getBrands())
    }, [dispatch])

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

    function getImg(id) {

    }

    const [askDelete, setAskDelete] = useState(false)
    const [deletedItem, setDeletedItem] = useState('')

    function deletedCarBrand(item) {
        setAskDelete(true)
        setDeletedItem(item)
    }

    function reallyDelete() {
        dispatch(deleteCarBrand(deletedItem.id))
        closeAskModal()
    }

    function closeAskModal() {
        setAskDelete(false)
        setDeletedItem('')
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
                                    <TableCell></TableCell>

                                    <TableCell>Action</TableCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {brands.content?.map((brand, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <div
                                                className="flex items-center text-sm">
                                                <LazyLoadImage effect={"blur"} className={"rounded-3xl"}
                                                               width={50} height={50}
                                                               src={`http://localhost:8080/api/v1/file/getFile/${brand?.photo?.id}`}
                                                               alt="User avatar"/>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div>
                                                <p className="font-semibold text-area"> {brand.name} </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>

                                        </TableCell>
                                        <TableCell>
                                            <div className="relative flex items-center gap-2">
                                                <Tooltip content="Details">
                                                  <span onClick={() => {
                                                      setBrandInfo(brand)
                                                      handleOpenImgModal()
                                                  }}
                                                        className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <EyeIcon/>
                                                  </span>
                                                </Tooltip>
                                                <Tooltip content="Edit user">
                                                  <span onClick={() => editBrand(brand)}
                                                        className=" text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <EditIcon/>
                                                  </span>
                                                </Tooltip>
                                                <Tooltip color="danger" content="Delete user">
                                                  <span onClick={() => deletedCarBrand(brand)}
                                                        className="text-lg text-danger cursor-pointer active:opacity-50">
                                                    <DeleteIcon/>
                                                  </span>
                                                </Tooltip>
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
                <Modal show={askDelete} onHide={closeAskModal}>
                    <Modal.Header closeButton>
                        <div className={'d-flex justify-content-around '}>
                            <LazyLoadImage effect={"blur"} className={"rounded-3xl"}
                                           width={50} height={50}
                                           src={`http://localhost:8080/api/v1/file/getFile/${deletedItem?.photo?.id}`}
                                           alt="User avatar"/>
                            <Modal.Title className={'mx-2'}>{deletedItem.name} </Modal.Title>
                            <p className={'my-2'}>
                                Brand rostdan ham o'chirilsinmi?
                            </p>
                        </div>

                    </Modal.Header>
                    <Modal.Body>

                        <div className={'d-flex'}>
                            <button
                                onClick={reallyDelete}
                                className="p-1 rounded my-2 w-full text-white text-center bg-blue-400">
                                Ha
                            </button>
                            <button
                                onClick={closeAskModal}
                                className="p-1 rounded my-2 mx-2 w-full text-white text-center bg-red-400">
                                Yo'q
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>


            <div className={'umodal'}>
                <Modal show={isModalOpen} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Yangi brand qo'shish</Modal.Title>
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