import React, {useContext, useEffect, useState} from 'react';
import PageTitle from "../PageTitle";
import {useDispatch, useSelector} from "react-redux";
import {
    changeIsEdit,
    getProducts,
    setBase64, setEditingId,
    setImageFileForBackend, setObjForBrand,
    setPhotoIdForEdit
} from "../../../redux/reducers/AdminProductSlice";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Modal} from "react-bootstrap";
import uploadImg from "../../images/upload.png"
import {Delete} from "@mui/icons-material";
import {Button} from "antd";
import {toast, ToastContainer} from "react-toastify";
import {getCarStart} from "../../../redux/reducers/AdminCarSlice";
import {getCarPart} from "../../../redux/reducers/AdminCartPartSlice";
import {Table, TableBody, TableCell, TableContainer, TableHeader, TableRow} from "@windmill/react-ui";
import {Tooltip} from "@nextui-org/react";
import {EyeIcon} from "../EyeIcon";
import {DeleteIcon} from "../DeleteIcon";
import {EditIcon} from "../EditIcon"
import ImgModal from "../ImgModal";


function AdminProduct(props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [carId, setCarId] = useState('');
    const [carPartId, setCarPartId] = useState('');
    const [productInfo, setProductInfo] = useState('');
    const [isImgModalOpen, setIsImgModalOpen] = useState(false)


    const dispatch = useDispatch();
    const {
        products,
        isEditing,
        base64,
        editingId,
        photoIdForEdit,
        imgFileForBackend
    } = useSelector(state => state.adminProduct)
    const {cars} = useSelector(state => state.adminCar)
    const {carParts} = useSelector(state => state.adminCarPart)
    useEffect(() => {
        dispatch(getProducts())
        dispatch(getCarStart())
        dispatch(getCarPart())
    }, [])

    function handleCloseModal() {
        setIsModalOpen(false)
        dispatch(setBase64(""))
        setName("")
        dispatch(setImageFileForBackend(""))
        dispatch(setPhotoIdForEdit(""))
        setCarPartId("")
        setCarId("")
        setDescription("")
    }

    function handleFile(e) {
        let file = e.target.files[0];
        dispatch(setImageFileForBackend(e.target.files[0]))
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
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

    function handleAddProduct() {
        if (name === "") {
            toast.error("Iltimos mahsulot nomini kiriting");
        } else if (carId === '') {
            toast.error("Iltimos mashina tanlang!");
        } else if (carPartId === '') {
            toast.error("Iltimos ehtiyot qism tanlang!");
        } else if ((imgFileForBackend === null || imgFileForBackend === "") && !photoIdForEdit) {
            toast.error("Iltimos mahsulot rasmini yuklang");
        } else {
            dispatch(setObjForBrand({
                name,
                description,
                carPartId,
                carId,
                photo: imgFileForBackend,
                photoId: photoIdForEdit,
                id: editingId,
                isEditing
            }));
            handleCloseModal()
        }
    }

    function handleOpenModal() {
        setIsModalOpen(true)
        dispatch(changeIsEdit(false))
    }

    function editProduct(item) {
        console.log(item)
        dispatch(changeIsEdit(true))
        setIsModalOpen(true)
        dispatch(setEditingId(item.id))
        setName(item.name)
        setDescription(item.description)
        dispatch(setPhotoIdForEdit(item.photo.id))
        setCarPartId(item?.carPart.id)
        setCarId(item?.car.id)
    }

    function handleOpenImgModal() {
        setIsImgModalOpen(p => !p)
    }

    return (
        <div className={` h-screen  bg-gray-900 `}>
            <ImgModal infoData={productInfo} isImgModalOpen={isImgModalOpen}
                      handleCloseImgModal={handleOpenImgModal}/>
            <ToastContainer/>
            <div className={"flex justify-between my-2"}>
                <PageTitle>
                    Product
                </PageTitle>

                <div>
                    <button onClick={handleOpenModal}
                            className={"border-none small text-white p-1 rounded bg-fuchsia-700"}>
                        Yangi mahsulot qo'shish
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
                                <TableCell>Description</TableCell>
                                <TableCell>Car</TableCell>
                                <TableCell>CarPart</TableCell>
                                <TableCell>Action</TableCell>
                            </tr>
                        </TableHeader>
                        <TableBody>
                            {products.content?.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <div
                                            className="flex items-center text-sm cursor-pointer">
                                            <LazyLoadImage effect={"blur"} className={"rounded-3xl"}
                                                           width={50} height={50}
                                                           src={`http://localhost:8080/api/v1/file/getFile/${item?.photo?.id}`}
                                                           alt="User avatar"/>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="font-semibold">{item.name}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="font-semibold">{item.description}</p>
                                        </div>
                                    </TableCell><TableCell>
                                    <div>
                                        <p className="font-semibold">{item.car?.name}</p>
                                    </div>
                                </TableCell><TableCell>
                                    <div>
                                        <p className="font-semibold">{item.carPart?.name}</p>
                                    </div>
                                </TableCell>
                                    <TableCell>
                                        <div className="relative flex items-center gap-2">
                                            <Tooltip content="Details">
                                                  <span onClick={() => {
                                                      setProductInfo(item)
                                                      handleOpenImgModal()
                                                  }}
                                                        className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <EyeIcon/>
                                                  </span>
                                            </Tooltip>
                                            <Tooltip content="Edit user">
                                                  <span onClick={() => editProduct(item)}
                                                        className=" text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <EditIcon/>
                                                  </span>
                                            </Tooltip>
                                            <Tooltip color="danger" content="Delete user">
                                                  <span
                                                      className="text-lg text-danger cursor-pointer active:opacity-50">
                                                    <DeleteIcon/>
                                                  </span>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                    {/*<TableCell>*/}
                                    {/*    <div className="flex items-center space-x-4">*/}
                                    {/*        <Button onClick={() => editCarPart(item)} layout="link" size="icon"*/}
                                    {/*                aria-label="Edit">*/}
                                    {/*            <EditIcon className="w-5 h-5" aria-hidden="true"/>*/}
                                    {/*        </Button>*/}
                                    {/*        <Button onClick={() => deletedCar(item)} layout="link" size="icon"*/}
                                    {/*                aria-label="Delete">*/}
                                    {/*            <TrashIcon className="w-5 h-5" aria-hidden="true"/>*/}
                                    {/*        </Button>*/}
                                    {/*    </div>*/}
                                    {/*</TableCell>*/}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </TableContainer>
            </div>

            <Modal show={isModalOpen} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Mahsulot qo'shish</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Mahsulot nomi:</label>
                    <input
                        className={`form-control mb-2`}
                        type={'text'}
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        placeholder={""}
                    />
                    <label>Description:</label>
                    <input
                        className={`form-control`}
                        type={'text'}
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        placeholder={""}
                    />

                    <label className={'my-3'}>Mashina:</label>
                    {cars === [] ? <h3>Iltimos oldin mashina qo'shing</h3> :
                        <select
                            className={'form-select'}
                            value={carId}
                            onChange={(e) => setCarId(e.target.value)}
                        >
                            <option value={''}>Mashina tanlang</option>
                            {cars?.map((item, index) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>}
                    <label className={'my-3'}>Ehtiyot qism:</label>
                    {carParts?.content === [] ? <h3>Iltimos ehtiyot qism qo'shing</h3> :
                        <select
                            className={'form-select'}
                            value={carPartId}
                            onChange={(e) => setCarPartId(e.target.value)}
                        >
                            <option value={''}>Ehtiyot qism tanlang</option>
                            {carParts?.content?.map((item, index) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>}
                    <div className={"my-3 flex justify-center position-relative"}>
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
                        onClick={handleAddProduct}
                        className="p-1 rounded my-2 w-full text-white text-center bg-blue-400">
                        {
                            isEditing ? "Tahrirlash" : "Saqlash"
                        }
                    </button>

                </Modal.Body>
            </Modal>

        </div>
    );
}

export default AdminProduct;