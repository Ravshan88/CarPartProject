import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { AddShoppingCart, HdrPlus} from "@mui/icons-material";
import Header from "../Header/Header";
function Index(props) {
    const [basket , setBasket] = useState([])
    const navigate=useNavigate()

    const paymentOptions = ['payMe', 'uzum', 'click', 'cash'];
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('');
    useEffect(()=>{
        let y = localStorage.getItem("basket");
        if (y!=null){
           setBasket(JSON.parse(y))
        }
    },[])

    function calcTotal(){
        let s=0;
        basket.map(item=>{
            s+=item.price*item.amount;
        })
        return s;
    }

    function plus(id){
        basket.map(item=>{
            if(item.id==id){
                item.amount++
            }
        })
        setBasket([...basket])
        savaToLocal(basket)
    }
    
    function minus(id){
        basket.map(item=>{
            if(item.id==id){
                if(item.amount===0){

                }else{
                item.amount--
                }
            }
        })
        setBasket([...basket])
        console.log(basket);
      savaToLocal(basket)
    }
    function savaToLocal(b){
        localStorage.setItem('basket', JSON.stringify(basket))
    }


    const openModal = () => {
        setModalIsVisible(true);
      };
    
      const closeModal = () => {
        setModalIsVisible(false);
        saveOrder()
      };
    
      const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // Perform the form submission or further processing here
        console.log('Selected payment:', selectedPayment);
        closeModal();
      };

   

    function saveOrder(){

        if(selectedPayment===""){
            alert("Siz to'lov turini tanlamagansiz!")
            return;
        }
        if(basket.length===0){
            alert("Siz mahsulot tanlamagansiz")
            return;
        }
        let arr=basket.filter(item=> item.id!==0);
        const newOrderArray = arr.map(({ id, amount }) => ({ productId:id, amount }));

        // console.log(newOrderArray);
        
         let reqToOrders={
            reqOrders:newOrderArray,
            payment:{
                type:selectedPayment,
                amount:calcTotal()
            }
         }
    
         console.log(reqToOrders);
       

    }

    function deleteFromBasket(id){
        let arr=basket.filter(item=>item.id!==id);
        setBasket(arr)
        localStorage.setItem("basket", JSON.stringify(arr))
    }
    return (
        <div >
            <Header/>

            <h1>Basket</h1>
            <hr/>
            {basket.length==0&&
            <div>
                Siz maxsulot tanlamagansiz hali!
            </div>
            }

         <div className={'container'}>
             <ul className='List-group'>

                 {
                     basket.map(item=> <li key={item.id} className='my-1 list-group-item'>
                             <div className='d-flex justify-content-between '>
                                 <img width={100} height={100}
                                      src={`http://localhost:8080/api/v1/file/getFile/${item?.photo?.id}`}
                                      alt="d" />

                                 <div>
                                     <h2 style={{width:200}}>{item.name}</h2>
                                     <p>{item.description}</p>
                                 </div>
                                 <div className='flex align-items-center gap-5 border-2 p-1 h-75'>


                                     <button onClick={()=>plus(item.id)} style={{fontSize:25}}>+</button>
                                     <h3> {item.amount}</h3>
                                     <button onClick={()=>minus(item.id)} style={{fontSize:25, padding:2}}>-</button>

                                 </div>
                                 <div>
                                     <h2>{item.price} </h2>
                                     <p>so'm</p>
                                 </div>
                                 <div>
                                     <button onClick={()=>deleteFromBasket(item.id)} style={{fontSize:22}} >x</button>
                                 </div>
                             </div>
                         </li>
                     )
                 }
             </ul>
         </div>
            <h2 className='text-end'>total: {calcTotal()} so'm</h2>
            <hr/>
            <hr/>
<button className='btn btn-dark' onClick={openModal}>buy</button>



        </div>
    );
}

export default Index;