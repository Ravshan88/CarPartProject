import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../Header/Header";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {
    getProducts,
} from "../../../redux/reducers/AdminProductSlice";
import {useDispatch, useSelector} from "react-redux";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Divider} from "antd";
import {AddShoppingCart} from "@mui/icons-material";


function InfoProduct(props) {
    // ... (previous code)

    const productInfoStyles = {
        padding: '0.8em 0',
    };

    const titleStyles = {
        h1: {
            marginBottom: '0.1em',
            color: '#4c4c4c',
            fontSize: '30px',
            fontWeight: '900',
        },
        span: {
            fontSize: '0.7em',
            color: '#a6a6a6',
        },
    };

    const priceStyles = {
        margin: '1.5em 0',
        color: '#ff3f40',
        fontSize: '1.2em',
        span: {
            paddingLeft: '0.15em',
            fontSize: '2.9em',
        },
    };

    const variantStyles = {
        overflow: 'auto',
        h3: {
            marginBottom: '1.1em',
        },
        li: {
            float: 'left',
            width: '35px',
            height: '35px',
            padding: '3px',
            border: '1px solid transparent',
            borderRadius: '3px',
            cursor: 'pointer',
        },
        'li:first-child, li:hover': {
            border: '1px solid #a6a6a6',
        },
        'li:not(:first-child)': {
            marginLeft: '0.1em',
        },
    };

    const descriptionStyles = {
        clear: 'left',
        margin: '2em 0',
        h3: {
            marginBottom: '1em',
        },
        ul: {
            fontSize: '0.8em',
            listStyle: 'disc',
            marginLeft: '1em',
        },
        li: {
            textIndent: '-0.6em',
            marginBottom: '0.5em',
        },
    };

    const buyButtonStyles = {
        padding: '1.5em 3.1em',
        border: 'none',
        borderRadius: '7px',
        fontSize: '0.8em',
        fontWeight: '700',
        letterSpacing: '1.3px',
        color: '#fff',
        backgroundColor: '#ff3f40',
        boxShadow: '2px 2px 25px -7px #4c4c4c',
        cursor: 'pointer',
    };

// ... (rest of the code)


    const globalStyles = {
        '*': {
            boxSizing: 'border-box',
        },
        html: {
            height: '100%',
        },
        body: {
            display: 'grid',
            gridTemplateRows: '1fr',
            fontFamily: '"Raleway", sans-serif',
            backgroundColor: '#01e37f',
        },
        h3: {
            fontSize: '0.7em',
            letterSpacing: '1.2px',
            color: '#a6a6a6',
        },
        img: {
            maxWidth: '100%',
            filter: 'drop-shadow(1px 1px 3px #a6a6a6)',
        },
        // Add more global styles as needed
    };

    const productSectionStyles = {
        display: 'grid',
        gridTemplateColumns: '0.9fr 1fr',
        margin: 'auto',
        padding: '2.5em 0',
        minWidth: '600px',
        backgroundColor: 'white',
        borderRadius: '5px',
    };

    const productPhotoStyles = {
        width: '50%',
        position: 'relative',
    };

    const photoMainStyles = {
        borderRadius: '6px 6px 0 0',
    };

    const controlsStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.8em',
        color: '#fff',
    };

    const imgStyles = {
        marginLeft: 10,
        maxWidth: '550px',
    };

    const photoAlbumStyles = {
        padding: '0.7em 1em',
        borderRadius: '0 0 6px 6px',
        backgroundColor: '#fff',
    };

    const ulStyles = {
        display: 'flex',
        justifyContent: 'space-around',
    };

    const liStyles = {
        float: 'left',
        width: '55px',
        height: '55px',
        padding: '7px',
        border: '1px solid #a6a6a6',
        borderRadius: '3px',
    };


    const navigate = useNavigate()
    const dispatch = useDispatch();
    const currentProductId = useParams().productId

    const {products} = useSelector(state => state.adminProduct)


    const [basket, setBasket] = useState([])


    useEffect(() => {
        dispatch(getProducts())

    }, [dispatch])
    useEffect(() => {
        dispatch(getProducts())


        let bas = JSON.parse(localStorage.getItem('basket'))
        if (bas == null) {
            localStorage.setItem('basket', JSON.stringify([]))
        } else {
            setBasket(bas)
        }

    }, [])


    function addToBasket(item) {
        if (basket && basket?.filter(i => i.id === item.id).length !== 0) {
            return;
        }
        console.log(basket)
        basket.push({...item, amount: 1})
        setBasket([...basket])
        localStorage.setItem("basket", JSON.stringify(basket))
    }

    function deleteFromBasket(id) {
        let arr = basket.filter(item => item.id !== id);
        setBasket(arr)
        localStorage.setItem("basket", JSON.stringify(arr))
    }

    function addToBasketAndNavigate(item) {
        addToBasket(item)
        navigate('/basket')
    }

    function addToBasket(item) {
        if (basket && basket?.filter(i => i.id === item.id).length !== 0) {
            return;
        }
        console.log(basket)
        basket.push({...item, amount: 1})
        setBasket([...basket])
        localStorage.setItem("basket", JSON.stringify(basket))
    }

    function deleteFromBasket(id) {
        let arr = basket.filter(item => item.id !== id);
        setBasket(arr)
        localStorage.setItem("basket", JSON.stringify(arr))
    }

    function addToBasketAndNavigate(item) {
        addToBasket(item)
        navigate('/basket')
    }

    return (
        <div>
            <Header/>
            <div className={"container"}>
                <div>
                    <ArrowBackIcon className={"cursor-pointer hover:scale-110"} color={"primary"} onClick={() => {
                        navigate(-1)
                    }}/>
                </div>
                {
                    products?.content?.filter(product => product?.id === currentProductId).map(item =>
                        <section className="text-gray-600 body-font overflow-hidden">
                            <div className="container px-5 py-10 mx-auto">
                                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                                    <LazyLoadImage
                                        width={300}
                                        height={300}
                                        effect="blur"
                                        className="w-full h-full block text-center"
                                        style={imgStyles}
                                        src={`http://localhost:8080/api/v1/file/getFile/${item?.photo?.id}`}
                                        alt="Product Image"
                                    />
                                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                        <div className={"mb-2"}>
                                            <h2 className="text-sm title-font text-gray-500 tracking-widest">MAHSULOT
                                                NOMI</h2>
                                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{item.name}</h1>
                                        </div>

                                        <div className={"mb-2"}>
                                            <h2 className="text-sm title-font text-gray-500 tracking-widest">MAHSULOT
                                                HAQIDA</h2>
                                            <p className="leading-relaxed">{item.description}</p>
                                        </div>

                                        <hr className={"my-2"}/>
                                        <div className="flex">
                                        <span
                                            className="title-font font-medium text-2xl text-green-500">{item.price} so`m</span>

                                            <button
                                                onClick={() => addToBasketAndNavigate(item)}
                                                className="flex ml-auto text-white hover:border-green-600 transition duration-75 ease-in-out bg-green-600 border-0 py-2 px-6 focus:outline-none hover:bg-green-500 rounded">Sotib
                                                olish
                                            </button>
                                            <button
                                                className="rounded-full hover:scale-110 transition duration-75 w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                                <svg fill="currentColor"
                                                     className="w-5 h-5" viewBox="0 0 24 24">
                                                    <AddShoppingCart onClick={() => addToBasket(item)}
                                                                     color={basket.filter(i => i.id === item.id).length !== 0 ? "primary" : ''}
                                                                     fontSize={"large"}/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
                }
            </div>

        </div>
    );
}

export default InfoProduct;
