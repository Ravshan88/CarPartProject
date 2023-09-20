import React, {useEffect, useState} from 'react';
import PageTitle from "../PageTitle";
import {toast, ToastContainer} from "react-toastify";
import {
    changeIsEdit,
    getCarPart,
    setBase64, setEditingId,
    setImageFileForBackend, setObjForBrand,
    setPhotoIdForEdit
} from "../../../redux/reducers/AdminCartPartSlice";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Table, TableBody, TableCell, TableContainer, TableHeader, TableRow} from "@windmill/react-ui";
import {Button} from "antd";
import {EditIcon, TrashIcon} from "../Sidebar/icons";
import {Modal} from "react-bootstrap";
import {LazyLoadImage} from "react-lazy-load-image-component";
import uploadImg from "../../images/upload.png";
import {Delete} from "@mui/icons-material";
import ImgModal from "../ImgModal";


function AdminCarPart(props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isImgModalOpen, setIsImgModalOpen] = useState(false)
    const [carPartInfo, setCarPartInfo] = useState({})
    const {
        imgFileForBackend,
        photoIdForEdit,
        editingId,
        isEditing,
        carParts,
        base64
    } = useSelector(state => state.adminCarPart)
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    useEffect(() => {
        dispatch(getCarPart())
    }, [dispatch])

    function handleOpenModal() {
        setIsModalOpen(true)
        dispatch(changeIsEdit(false))
    }

    function handleOpenImgModal() {
        setIsImgModalOpen(p => !p)
    }

    function handleCloseModal() {
        setIsModalOpen(false)
        dispatch(setBase64(""))
        setName("")
        dispatch(setImageFileForBackend(""))
        dispatch(setPhotoIdForEdit(""))
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

    function handleAddCarPart() {
        if (name === "") {
            toast.error("Iltimos mahsulot nomini kiriting");
        } else if ((imgFileForBackend === null || imgFileForBackend === "") && !photoIdForEdit) {
            toast.error("Iltimos mahsulot rasmini yuklang");
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


    function editCarPart(item) {
        dispatch(changeIsEdit(true))
        setIsModalOpen(true)
        dispatch(setEditingId(item.id))
        setName(item.name)
        dispatch(setPhotoIdForEdit(item.photo.id))
    }

    return (
        <div className={` h-screen  bg-gray-900 `}>
            <ToastContainer/>
            <ImgModal infoData={carPartInfo} isImgModalOpen={isImgModalOpen}
                      handleCloseImgModal={handleOpenImgModal}/>
            <div className={"flex flex-col justify-between my-2"}>
                <div className={"flex justify-between"}>
                    <PageTitle>
                        Avto ehtiyot qism
                    </PageTitle>

                    <div>
                        <button className={"border-none small text-white p-1 rounded bg-fuchsia-700"}
                                onClick={handleOpenModal}>
                            Yangi ehtiyot qism qo'shish
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
                                {carParts.content?.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <div onClick={() => {
                                                setCarPartInfo(item)
                                                handleOpenImgModal()
                                            }}
                                                 className="flex items-center text-sm cursor-pointer">
                                                <Avatar className={"w-[50px]"}
                                                        width={50} height={50}
                                                        src={`http://localhost:8080/api/v1/file/getFile/${item?.photo?.id}`}
                                                        alt="User avatar"/>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="font-semibold">{item.name}</p>
                                            </div>
                                        </TableCell><TableCell>
                                        <div>
                                            <p className="font-semibold">{new Date(item.createdAt).getDate() + "." + (new Date(item.createdAt).getMonth() + 1) + "." + new Date(item.createdAt).getFullYear()}</p>
                                        </div>
                                    </TableCell><TableCell>
                                        <div>
                                            <p className="font-semibold">{new Date(item.updatedAt).getDate() + "." + (new Date(item.updatedAt).getMonth() + 1) + "." + new Date(item.updatedAt).getFullYear()}</p>

                                        </div>
                                    </TableCell>

                                        <TableCell>
                                            <div className="flex items-center space-x-4">
                                                <Button onClick={() => editCarPart(item)} layout="link" size="icon"
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
                        <Modal.Title>Yangi ehtiyot qism qo'shish</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>Ehtiyot qism nomi:</label>
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
                            onClick={handleAddCarPart}
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

export default AdminCarPart;