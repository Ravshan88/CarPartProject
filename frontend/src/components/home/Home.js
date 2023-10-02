import React, {useEffect, useState} from 'react';
import Header from "../home/Header/Header";
import Footer from "./Footer/Footer";
import {useDispatch, useSelector} from "react-redux";
import {getAdvertisementStart, getCarouselStart} from "../../redux/reducers/AdvertisementSlice";
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import carSearch from "./UserFilter/carSearch.png";
import searchPhoto from "./UserFilter/search.png";
import {useNavigate} from "react-router-dom";
import {getCarStart} from "../../redux/reducers/AdminCarSlice";
import {getCarPart} from "../../redux/reducers/AdminCartPartSlice";
import {getBrands} from "../../redux/reducers/AdminBrandSlice";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {getProducts} from "../../redux/reducers/AdminProductSlice";

function Home(props) {
    const dispatch = useDispatch()
    const {carousel} = useSelector(state => state.advertisement)
    useEffect(() => {
        dispatch(getAdvertisementStart())
        dispatch(getCarouselStart())
        dispatch(getProducts())
    }, [])

    const navigate = useNavigate();
    const [carId, setCarId] = useState('');
    const [carPartId, setCarPartId] = useState('');
    const [brandId, setBrandId] = useState("");
    const {products, isLoading} = useSelector(state => state.adminProduct);

    const {cars} = useSelector(state => state.adminCar);
    const {brands} = useSelector(state => state.adminBrand);
    const {carParts} = useSelector(state => state.adminCarPart);

    useEffect(() => {
        dispatch(getCarStart());
        dispatch(getCarPart());
        dispatch(getBrands());
    }, []);
    const [error, setError] = useState(false)

    function searchAndNavigate() {
        if (brandId === "") {
            setError(true)
            return;
        }
        if (carId === "") {
            setError(true)
            return;
        }
        if (carPartId === "") {
            navigate('/search/' + brandId + "/" + carId + '/' + "carPart")
            return;
        }
        navigate('/search/' + brandId + "/" + carId + '/' + carPartId)

    }

    return (
        <div className={"overflow-x-scroll h-full"}>
            <Header/>
            <div className={"container max-w-[1260px]"}>
                <div
                    className={'flex sm:flex-row flex-col justify-between sm:px-[50px]  mt-[43px] mb-[9px] pb-[43px] border-b-1 max-h-[422px]'}>
                    <div className={'max-w-[440px] border-t-2 border-blue-500'}>
                        <div className={'p-3'} style={{backgroundColor: '#fafafa'}}>
                            <div className={'d-flex align-items-center justify-content-evenly gap-2'}>
                                <img width={60} src={carSearch} alt={'..'}/>
                                <p className={"sm:text-lg text-sm"}>QISMLARNI IZLASH UCHUN MOSHINANI TANLANG</p>
                            </div>
                            <div className={'my-2'}>
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-primary text-white">1</span>
                                    <select
                                        className={`form-select w-75 ${brandId === "" && error ? "is-invalid" : ""}`}
                                        id={'brand'}
                                        value={brandId}
                                        onChange={(e) => setBrandId(e.target.value)}
                                    >
                                        <option value={''}>Brand tanlang</option>
                                        {brands.content?.map((item) => (
                                            <option className={" bg-gray-200"} key={item.id} value={item.id}>
                                                <span className={"font-mono text-white"}>{item.name}</span>
                                            </option>
                                        ))}
                                    </select>
                                    {brandId === "" && error &&
                                        <div className="invalid-feedback">Please select a brand.</div>}
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-primary text-white">2</span>
                                    <select
                                        id={'car'}
                                        className={`form-select ${carId === "" && error ? "is-invalid" : ""}`}
                                        value={carId}
                                        onChange={(e) => setCarId(e.target.value)}
                                    >
                                        <option value={''}>Mashina tanlang</option>
                                        {cars?.filter(car => car.brand.id === brandId).map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                    {carId === "" && error &&
                                        <div className="invalid-feedback">Please select a car.</div>}
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-primary text-white">3</span>
                                    <select
                                        className={`form-select `}
                                        value={carPartId}
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
                                <img src={searchPhoto} alt={'..'} width={25}/>
                                Qidirsh
                            </button>
                        </div>
                    </div>
                    <div className={' '}>
                        <div className={" sm:max-w-[660px] max-w-full"}>
                            {
                                carousel?.length > 0 &&
                                <Carousel infiniteLoop={true} showThumbs={false} autoPlay
                                          className={"sm:max-w-[660px] max-w-full max-h-[350px]"}>
                                    {
                                        carousel?.map(item =>
                                            <div key={item.id}>
                                                <LazyLoadImage
                                                    className={"max-h-[348px] max-w-[660px]"}
                                                    src={`http://localhost:8080/api/v1/file/getFile/${item.attachment.id}`}
                                                    alt="Image"
                                                />
                                            </div>
                                        )
                                    }
                                </Carousel>
                            }

                        </div>
                    </div>
                </div>
                <div className={"pb-10 pt-[10px]"}>
                    <h3>
                        Ehtiyot qismlar
                    </h3>
                    {
                        isLoading ? (
                            "Loading..."
                        ) : (
                            <div className="px-[3px]">
                                {carParts?.content?.map((item, index) => (
                                    index % 6 === 0 && (
                                        <ul key={`row-${index}`}
                                            className="w-full flex-col md:flex-row flex border-b pt-[10px] items-center justify-center">
                                            {carParts.content.slice(index, index + 6).map(subItem => (
                                                <li key={subItem.id} className="w-[220px] h-[180px]">
                                                    <div className="text-center">
                                                        <LazyLoadImage
                                                            height={130}
                                                            width={130}
                                                            effect="blur"
                                                            src={`http://localhost:8080/api/v1/file/getFile/${subItem.photo.id}`}
                                                        />
                                                        <p className="text-center">{subItem.name}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )
                                ))}
                            </div>
                        )
                    }


                </div>
                <Footer/>
            </div>
        </div>
    );
}

export default Home;