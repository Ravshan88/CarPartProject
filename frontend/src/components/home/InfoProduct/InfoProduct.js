
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../Header/Header";

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
        width:'50%',
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
        marginLeft:10,
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


    const navigate=useNavigate()
    const dispatch = useDispatch();
    const currentProductId=useParams().productId

    const {products  } = useSelector(state => state.adminProduct)



    const [basket , setBasket] = useState([])



    useEffect(()=>{
        dispatch(getProducts())

    },[dispatch])
    useEffect(()=>{
        dispatch(getProducts())


        let bas=JSON.parse(localStorage.getItem('basket'))
        if(bas==null){
            localStorage.setItem('basket', JSON.stringify([]))
        }else {
            setBasket(bas)
        }

    },[])


    function addToBasket(item){
        if( basket && basket?.filter(i=>i.id===item.id).length!==0){
            return;
        }
        console.log(basket)
        basket.push({...item, amount:1})
        setBasket([...basket])
        localStorage.setItem("basket", JSON.stringify(basket))
    }
    function deleteFromBasket(id){
        let arr=basket.filter(item=>item.id!==id);
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
            <div>
                <h1>Home</h1>
            </div>

            <div className={'d-flex gap-1 p-3'}>
                {products?.content?.filter(product=>product?.id===currentProductId)
                    .map(item=>
                        <div>
                            {/* Global Styles */}
                            <div  className={'text-center'}>
                                {/* Product Section */}
                                <div className={'flex align-items-center  justify-between'}>
                                    {/* Product Photo */}
                                    <div  style={productPhotoStyles}>
                                        {/* Photo Main */}
                                        <div style={photoMainStyles}>


                                            <LazyLoadImage
                                                effect="blur"
                                                className="w-full h-full block text-center"
                                                style={imgStyles}
                                                src={`http://localhost:8080/api/v1/file/getFile/${item?.photo?.id}`}
                                                alt="Product Image"
                                            />
                                        </div>

                                    </div>
                                    {/* Product Info */}
                                    <div  className={'text-start'} style={productInfoStyles}>
                                        {/* Title */}
                                        <div style={titleStyles}>
                                            <h1 style={{fontSize:"20px"}}>{item.name}</h1>
                                        </div>
                                        {/* Price */}
                                        <div style={priceStyles}>
                                            R$ <span>7.93</span>
                                        </div>
                                       <div className={'text-start'}>
                                           <h2>Mahsulot haqida:</h2>
                                           <p>{item.description}</p>
                                           <p>dwfqwef wqefqwefqw wqefqwefwe</p>
                                       </div>
                                        {/* Description */}
                                        <div style={descriptionStyles}>
                                            <h3>Qo'shimcha</h3>
                                            <ul style={ulStyles}>
                                                <li>{item.car.name}</li>
                                                <li>{item.car.brand.name}</li>
                                                <li>{}</li>
                                                <li></li>
                                            </ul>
                                        </div>
                                        {/* Buy Button */}
                                        <div className={'flex gap-7'}>
                                            <button onClick={() => addToBasketAndNavigate(item)} style={buyButtonStyles}>Sotib olish</button>
                                            <AddShoppingCart onClick={() => addToBasket(item)}
                                                             color={basket.filter(i => i.id === item.id).length !== 0 ? "primary" : ''}
                                                             fontSize={"large"}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                }



            </div>

        </div>
    );
}

export default InfoProduct;
