
import React, {useContext, useEffect, useState} from 'react';
import PageTitle from "../../PageTitle"
import './showProduct.css'

function Render(props) {
    console.log(props.product)
return (
    <div className={`  bg-gray-900 `} >
        <main className='mainjon'>
            <div className="card">

                <div className="card__body p-3 d-flex align-items-center justify-content-around">
                    <div className="half">
                        <div className="featured_text">
                            <h1>{props?.product?.name}</h1>
                            <div className={'d-flex align-items-center justify-around'}>
                                <p>carPart:</p>
                                <p className="sub">{props?.product?.carPart?.name}</p>
                            </div>

                        </div>
                        <div className="image">
                            <img
                                src={`http://localhost:8080/api/v1/file/getFile/${props?.product?.photo?.id}`}
                                alt=""/>
                        </div>
                    </div>
                    <div className="half">
                        <div className="description p-2">
                            <h3>Mahsulot haqida</h3>
                            <p>

                                {props?.product?.description}

                            </p>
                        </div>

                    </div>
                </div>
                <div className="card__footer">
                    <div className="recommend d-flex justify-around align-items-center">
                        <p>Mashina turi:</p>
                        <h3>{props?.product?.car.name}</h3>
                    </div>

                </div>
            </div>
        </main>
    </div>





);
}

export default Render;