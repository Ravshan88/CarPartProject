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

function Home(props) {
    const dispatch = useDispatch()
    const {carousel} = useSelector(state => state.advertisement)
    useEffect(() => {
        dispatch(getAdvertisementStart())
        dispatch(getCarouselStart())
    }, [])

    const navigate=useNavigate();
    const [carId, setCarId] = useState('');
    const [carPartId, setCarPartId] = useState('');
    const [brandId, setBrandId] = useState("");
    const { } = useSelector(state => state.adminProduct);

    const { cars } = useSelector(state => state.adminCar);
    const { brands } = useSelector(state => state.adminBrand);
    const { carParts } = useSelector(state => state.adminCarPart);

    useEffect(() => {
        dispatch(getCarStart());
        dispatch(getCarPart());
        dispatch(getBrands());
    }, []);
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
        <div className={"overflow-x-scroll h-full"}>
            <Header/>
            <div className={'col-5 p-5 '}>
                <div className={'p-3'} style={{ backgroundColor: '#fafafa' }}>
                    <div className={'d-flex align-items-center justify-content-evenly gap-2'}>
                        <img width={60} src={carSearch} alt={'..'} />
                        <p>QISMLARNI IZLASH UCHUN MOSHINANI TANLANG</p>
                    </div>
                    <div className={'my-2'}>
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-primary text-white">1</span>
                            <select
                                className={`form-select w-75 ${brandId === "" && error? "is-invalid" : ""}`}
                                id={'brand'}
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
                            {brandId === "" &&error&& <div className="invalid-feedback">Please select a brand.</div>}
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
                            {carId === ""&&error && <div className="invalid-feedback">Please select a car.</div>}
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
                        <img src={searchPhoto} alt={'..'} width={30} />
                        Qidirsh
                    </button>
                </div>
            </div>
            <div className={'col-7'}>
                <div className={"vh-100"}>
                    {
                        carousel?.length > 0 &&
                        <Carousel infiniteLoop={true} showThumbs={false} autoPlay className={"w-[200px] h-[150px]"}>
                            {
                                carousel?.map(item =>
                                    <div key={item.id}>
                                        <img width={150} height={100}
                                             src={`http://localhost:8080/api/v1/file/getFile/${item.attachment.id}`}
                                             alt="Image"/>
                                    </div>
                                )
                            }
                        </Carousel>
                    }

                </div>
            </div>

            <Footer/>
        </div>
    );
}

export default Home;