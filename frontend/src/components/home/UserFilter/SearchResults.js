// SearchResults.js
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../Header/Header";
import {Button, Dropdown} from 'react-bootstrap';

import {
    getProducts,
} from "../../../redux/reducers/AdminProductSlice";
import {useDispatch, useSelector} from "react-redux";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Divider} from "antd";
import carSearch from "./carSearch.png";
import searchPhoto from "./search.png";
import {getCarStart} from "../../../redux/reducers/AdminCarSlice";
import {getCarPart} from "../../../redux/reducers/AdminCartPartSlice";
import {getBrands} from "../../../redux/reducers/AdminBrandSlice";
function SearchResults(props) {
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const currentBrandId=useParams().brandId
    let currentCarId=useParams().carId
    const {  currentCarPartId } = useParams();
    const {products,  } = useSelector(state => state.adminProduct)
    const { cars } = useSelector(state => state.adminCar);
    const { brands } = useSelector(state => state.adminBrand);
    const { carParts } = useSelector(state => state.adminCarPart);
    const [carId, setCarId] = useState('');
    const [carPartId, setCarPartId] = useState('');
    const [brandId, setBrandId] = useState("");


    useEffect(()=>{
        dispatch(getProducts())
        dispatch(getCarStart());
        dispatch(getCarPart());
        dispatch(getBrands());
    },[dispatch])
    useEffect(()=>{
        dispatch(getProducts())

    },[])
    const [error, setError]=useState(false)
    function searchAndNavigate() {
        if (brandId === "") {
            setError(true)
            return;
        }
        if (carId === "") {
            setError(true)
            return;
        }
        if(carPartId===""){
            navigate('/search/'+brandId+"/"+carId+'/'+"carPart")
            return;
        }
        navigate('/search/'+brandId+"/"+carId+'/'+carPartId)

    }

    return (
        <div>
            <Header/>
            <div>
                <nav className="navbar bg-body-tertiary text-center">
                    <div className="container text-center">
                       <div className={'d-flex align-items-center'}>
                           <h2 style={{fontSize:20}}>Qidiruv natijasi:</h2>
                           <h2 style={{fontSize:25, marginLeft:10}}>{brands?.content.filter(item=>item.id===currentBrandId)[0].name}</h2>
                       </div>
                        <Dropdown  className={'bg-primary '}>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                   O'zgartirish

                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{width:350}} className={'p-2'}>
                                <div className={'d-flex align-items-center  justify-content-evenly gap-2'}>
                                    <img width={60} src={carSearch} alt={'..'} />
                                    <p>QISMLARNI IZLASH UCHUN MOSHINANI TANLANG</p>
                                </div>
                                <div className={'my-2'}>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text bg-primary text-white">1</span>
                                        <select
                                            className={`form-select w-75 ${brandId === "" && error? "is-invalid" : ""}`}
                                            id={'brand'}
                                            value={brandId===""?currentBrandId:brandId}
                                            onChange={(e) => {
                                                setBrandId(e.target.value)

                                            }
                                            }
                                        >
                                            <option value={''}>Brand tanlang</option>
                                            {brands.content?.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        {brandId === "" &&error&& <div className="invalid-feedback">Please select a brand.</div>}
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text bg-primary text-white">2</span>
                                        <select
                                            id={'car'}
                                            className={`form-select ${carId === "" && error ? "is-invalid" : ""}`}
                                            value={carId===""?currentCarId:carId}
                                            onChange={(e) => setCarId(e.target.value)}
                                        >
                                            <option value={''}>Mashina tanlang</option>
                                            {cars?.filter(car => car.brand.id === (brandId===""?currentBrandId:brandId)).map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        {carId === ""&&error && <div className="invalid-feedback">Please select a car.</div>}
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text bg-primary text-white">3</span>
                                        <select
                                            className={`form-select `}
                                            value={currentCarPartId}
                                            onChange={(e) => setCarPartId(e.target.value)}
                                        >
                                            <option value={''}>Ehtiyot qism tanlang</option>
                                            {carParts?.content?.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <button
                                    onClick={searchAndNavigate}
                                    className={'btn btn-primary w-100 d-flex align-items-center justify-content-center'}>
                                    <img src={searchPhoto} alt={'..'} width={30} />
                                    Qidirsh
                                </button>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </nav>
            </div>
            <div className={'d-flex gap-2'}>
                {products.content?.filter(product=>product?.car.id===currentCarId)
                    .map((item, i)=>
                        <div className={'my-2 mx-3'}>
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
                                        <h1 className="text-gray-500 tracking-widest title-font">{item.name}</h1>

                                    </div>
                                    {/*<div className="flex items-center mb-2">*/}
                                    {/*    <h1 className="text-gray-500 tracking-widest title-font">Description:</h1>*/}
                                    {/*    <Popover showArrow key={"blur"} backdrop={"blur"} placement="bottom">*/}
                                    {/*        <PopoverTrigger>*/}
                                    {/*            <p*/}
                                    {/*                className="ml-2 overflow-hidden overflow-ellipsis line-clamp-1">*/}
                                    {/*                {item?.description}*/}
                                    {/*            </p>*/}
                                    {/*        </PopoverTrigger>*/}
                                    {/*        <PopoverContent>*/}
                                    {/*            <p*/}
                                    {/*                className="ml-2 overflow-hidden overflow-ellipsis">*/}
                                    {/*                {item?.description}*/}
                                    {/*            </p>*/}
                                    {/*        </PopoverContent>*/}
                                    {/*    </Popover>*/}
                                    {/*</div>*/}
                                    {/*<div className="flex items-center mb-2">*/}
                                    {/*    <h1 className="text-gray-500 tracking-widest title-font">CarName:</h1>*/}
                                    {/*    <Popover showArrow key={"blur"} backdrop={"blur"} placement="bottom">*/}
                                    {/*        <PopoverTrigger>*/}
                                    {/*            <p*/}
                                    {/*                className="ml-2 overflow-hidden overflow-ellipsis line-clamp-1">*/}
                                    {/*                {item?.car?.name}*/}
                                    {/*            </p>*/}
                                    {/*        </PopoverTrigger>*/}
                                    {/*        <PopoverContent>*/}
                                    {/*            <p*/}
                                    {/*                className="ml-2 overflow-hidden overflow-ellipsis">*/}
                                    {/*                {item?.car?.name}*/}
                                    {/*            </p>*/}
                                    {/*        </PopoverContent>*/}
                                    {/*    </Popover>*/}
                                    {/*</div>*/}
                                    {/*<div className="flex items-center mb-2">*/}
                                    {/*    <h1 className="text-gray-500 tracking-widest title-font">CarPart:</h1>*/}
                                    {/*    {*/}
                                    {/*        item?.carPart?.name ?*/}
                                    {/*            <p className="ml-2">{item?.carPart?.name}</p> :*/}
                                    {/*            <p className="ml-2 text-gray-400">Mavjud emas</p>*/}
                                    {/*    }*/}
                                    {/*</div>*/}
                                </div>
                                <Divider className={"m-2"}/>
                            </div>

                        </div>
                    )
                }
            </div>

        </div>
    );
}

export default SearchResults;
