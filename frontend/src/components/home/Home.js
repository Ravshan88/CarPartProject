import React, {useEffect} from 'react';
import Header from "../home/Header/Header";
import Footer from "./Footer/Footer";
import {useDispatch, useSelector} from "react-redux";
import {getAdvertisementStart, getCarouselStart} from "../../redux/reducers/AdvertisementSlice";
import first from "../images/autoImg.jpg"
import second from "../images/loading.gif"
import third from "../images/upload.png"
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Home(props) {
    const dispatch = useDispatch()
    const {carousel} = useSelector(state => state.advertisement)
    useEffect(() => {
        dispatch(getAdvertisementStart())
        dispatch(getCarouselStart())
    }, [])
    return (
        <div className={"overflow-x-scroll h-full"}>
            <Header/>
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
            <Footer/>
        </div>
    );
}

export default Home;