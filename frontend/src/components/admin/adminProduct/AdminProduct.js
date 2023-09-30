import React, {useEffect, useState} from 'react';
import PageTitle from "../PageTitle";
import {useDispatch, useSelector} from "react-redux";
import {
    changeIsEdit, deleteProduct,
    getProducts,
    setBase64, setEditingId,
    setImageFileForBackend, setObjForBrand,
    setPhotoIdForEdit
} from "../../../redux/reducers/AdminProductSlice";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Modal} from "react-bootstrap";
import uploadImg from "../../images/upload.png"
import {Delete} from "@mui/icons-material";
import {Divider} from "antd";
import {toast, ToastContainer} from "react-toastify";
import {getCarStart} from "../../../redux/reducers/AdminCarSlice";
import {deleteCarPart, getCarPart} from "../../../redux/reducers/AdminCartPartSlice";
import {Avatar, Card} from 'antd';
import {button, Chip, Tooltip} from "@nextui-org/react";
import {EyeIcon} from "../EyeIcon";
import {DeleteIcon} from "../DeleteIcon";
import {EditIcon} from "../EditIcon"
import ImgModal from "../ImgModal";
import {getBrands} from "../../../redux/reducers/AdminBrandSlice";
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import ProductInfoModal from "./ProductInfoModal";

const {Meta} = Card;

function AdminProduct(props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [carId, setCarId] = useState('');
    const [carPartId, setCarPartId] = useState('');
    const [productInfo, setProductInfo] = useState('');
    const [isImgModalOpen, setIsImgModalOpen] = useState(false)
    const [brandId, setBrandId] = useState("")
    const [imgLoading, setImgLoading] = useState(false)
    const [deletedItem, setDeletedItem] = useState('')
    const [askDelete, setAskDelete] = useState(false)
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
    const {brands} = useSelector(state => state.adminBrand)
    const {carParts} = useSelector(state => state.adminCarPart)
    useEffect(() => {
        dispatch(getProducts())
        dispatch(getCarStart())
        dispatch(getCarPart())
        dispatch(getBrands())
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
        setBrandId("")
        setPrice("")
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
        } else if ((imgFileForBackend === null || imgFileForBackend === "") && !photoIdForEdit) {
            toast.error("Iltimos mahsulot rasmini yuklang");
        } else {
            dispatch(setObjForBrand({
                name,
                description,
                price,
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
        dispatch(changeIsEdit(true))
        setIsModalOpen(true)
        dispatch(setEditingId(item?.id))
        setName(item?.name)
        setDescription(item?.description)
        dispatch(setPhotoIdForEdit(item?.photo?.id))
        setCarPartId(item?.carPart?.id)
        setCarId(item?.car?.id)
    }

    function handleOpenImgModal() {
        setIsImgModalOpen(p => !p)
    }

    function removeProduct(item) {
        setAskDelete(true)
        setDeletedItem(item)
    }

    function reallyDelete() {
        dispatch(deleteProduct({
            id: deletedItem.id,
            attachmentName: deletedItem.photo.name
        }))
        closeAskModal()
    }

    function closeAskModal() {
        setAskDelete(false)
        setDeletedItem('')
    }

    return (
        <div className={` h-screen  bg-gray-900 `}>


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
                                Mahsulot rostdan ham o'chirilsinmi?
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

            <ProductInfoModal infoData={productInfo} isImgModalOpen={isImgModalOpen}
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

            <div className="flex flex-wrap gap-2">
                {products?.content?.map((item, i) => (
                    <div key={i} className="flex-wrap bg-gray-100 rounded p-4">
                        <LazyLoadImage
                            effect="blur"
                            className="w-full h-full block text-center"
                            width={200}
                            height={200}
                            src={`http://localhost:8080/api/v1/file/getFile/${item?.photo?.id}`}
                            alt="Product Image"
                        />
                        <div className="mt-4 w-[200px]">
                            <div className="flex items-center mb-2">
                                <h1 className="text-gray-500 tracking-widest title-font">Name:</h1>
                                <p className="ml-2">{item.name}</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <h1 className="text-gray-500 tracking-widest title-font">Price:</h1>
                                <p className="ml-2">{item.price}$</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <h1 className="text-gray-500 tracking-widest title-font">Description:</h1>
                                <Popover showArrow key={"blur"} backdrop={"blur"} placement="bottom">
                                    <PopoverTrigger>
                                        <p
                                            className="ml-2 overflow-hidden overflow-ellipsis line-clamp-1">
                                            {item?.description}
                                        </p>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <p
                                            className="ml-2 overflow-hidden overflow-ellipsis">
                                            {item?.description}
                                        </p>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="flex items-center mb-2">
                                <h1 className="text-gray-500 tracking-widest title-font">CarName:</h1>
                                <Popover showArrow key={"blur"} backdrop={"blur"} placement="bottom">
                                    <PopoverTrigger>
                                        <p
                                            className="ml-2 overflow-hidden overflow-ellipsis line-clamp-1">
                                            {item?.car?.name}
                                        </p>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <p
                                            className="ml-2 overflow-hidden overflow-ellipsis">
                                            {item?.car?.name}
                                        </p>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="flex items-center mb-2">
                                <h1 className="text-gray-500 tracking-widest title-font">CarPart:</h1>
                                {
                                    item?.carPart?.name ?
                                        <p className="ml-2">{item?.carPart?.name}</p> :
                                        <p className="ml-2 text-gray-400">Mavjud emas</p>
                                }
                            </div>
                        </div>
                        <Divider className={"m-2"}/>
                        <div className="relative flex items-center justify-center gap-3 mt-2">
                            <Tooltip content="Details">
                                  <span
                                      onClick={() => {
                                          setProductInfo(item);
                                          handleOpenImgModal();
                                      }}
                                      className="text-2xl text-default-400 cursor-pointer active:opacity-50"
                                  >
                                    <EyeIcon/>
                                  </span>
                            </Tooltip>
                            <Tooltip content="Edit user">
                                  <span
                                      onClick={() => editProduct(item)}
                                      className="text-2xl text-default-400 cursor-pointer active:opacity-50"
                                  >
                                    <EditIcon/>
                                  </span>
                            </Tooltip>
                            <Tooltip color="danger" content="Delete user">
                                  <span onClick={() => removeProduct(item)}
                                        className="text-2xl text-danger cursor-pointer active:opacity-50">
                                    <DeleteIcon/>
                                  </span>
                            </Tooltip>
                        </div>
                    </div>
                ))}
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
                    <label className={"mt-2"}>Price:</label>
                    <input
                        className={`form-control`}
                        type={'number'}
                        value={price}
                        onChange={(e) =>
                            setPrice(e.target.value)
                        }
                        placeholder={""}
                    />
                    <label className={"mt-2"}>Brand:</label>
                    <select
                        className={'form-select'}
                        value={brandId}
                        onChange={(e) => setBrandId(e.target.value)}
                    >
                        <option value={''}>Brand tanlang</option>
                        {brands.content?.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>

                    <label className={'mt-2'}>Mashina:</label>
                    {cars === [] ? <h3>Iltimos oldin mashina qo'shing</h3> :
                        <select
                            className={'form-select'}
                            value={carId}
                            onChange={(e) => setCarId(e.target.value)}
                        >
                            <option value={''}>Mashina tanlang</option>
                            {cars?.filter(car => car.brand.id === brandId).map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>}
                    <label className={'mt-2'}>Ehtiyot qism:</label>
                    {carParts?.content === [] ? <h3>Iltimos ehtiyot qism qo'shing</h3> :
                        <select
                            className={'form-select'}
                            value={carPartId}
                            onChange={(e) => setCarPartId(e.target.value)}
                        >
                            <option value={''}>Ehtiyot qism tanlang</option>
                            {carParts?.content?.map((item) => (
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
                                < Button size={"sm"} className={"rounded-3xl border-dashed "} isIconOnly
                                         aria-label="Like">
                                    <Delete color={"error"} onClick={() => dispatch(setBase64(""))}/>
                                < /Button>
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