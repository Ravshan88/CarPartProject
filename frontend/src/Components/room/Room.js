import React, {useContext, useEffect, useState} from 'react';
import PageTitle from "../Admin/PageTitle";
import {Modal} from 'react-bootstrap';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
    TableRow,
    Button
} from '@windmill/react-ui'
import apiCall from "../../Config/apiCall";
import {toast} from "react-toastify";
import {SuccessNotify} from "../../utils/Alerts";
import Loading from "../Loading/Loading";

function Room(props) {
    const [loading, setLoading] = useState(false);
    const [editingID, setEditingID] = useState(false);
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    function getData(){
        setLoading(true)
        setTimeout(() => {
            apiCall('/room', 'get').then(data => {
                setData(data.data)
                setLoading(false)
            })
        }, 1000)

    }

    useEffect(()=>{
        getData()
    },[])


    function saveData() {
        if (roomName.trim() === '' || isSaving) {
            toast.error(`Xona ismi bo'sh bo'lishi mumkin emas`);
            return;
        }

        if (isSaving) return;
        setIsSaving(true);
        let newData={name:roomName}

        if (!editingID) {

            apiCall('/room', 'post', newData)
                .then((res) => {
                    toast.success(`Xona muvaffaqiyatli qo'shildi`);
                    closeModal();
                    getData()
                })
                .catch((err) => {
                    toast.error(`Xona qo'shishda xatolik`);
                })
                .finally(() => {
                    setIsSaving(false);
                });

        }else{

            apiCall('/room/'+editingID, 'put', newData)
                .then((res) => {
                    toast.success(`Xona muvaffaqiyatli taxrirlandi`);
                    closeModal();
                    getData()
                    setIsModalOpen(false);
                })
                .catch((err) => {
                    toast.error(`Xona taxrirlashda xatolik`);
                })
                .finally(() => {
                    setIsSaving(false);
                });
            setEditingID(false)
            }
    }

    function closeModal() {
        setIsModalOpen(false);
        setRoomName('');
    }

    function editItem(item) {
        setRoomName(item.name);
        setEditingID(item.id);
        setIsModalOpen(true);
    };


    function deleteItem(id) {
        setLoading(true)
        setTimeout(() => {
            apiCall("/room/" + id, "DELETE", null).then(res => {
                SuccessNotify("Xona Muvaffaqiyatli O'chirildi!")
                getData();
            })
        }, 1000);
    }
    function formatTimestamp(timestamp) {
        const originalDate = new Date(timestamp);

        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Intl.DateTimeFormat('en-GB', options).format(originalDate);
    }
    return (
        <div className={` h-screen  bg-gray-900 `}>
            <PageTitle>
                Xonalar
            </PageTitle>
            <Button className={' border-0'} onClick={()=>setIsModalOpen(true)}>Yangi Xona qo'shish</Button>

            {loading ? <Loading/> :  <TableContainer className={'bg-gray-800 my-2'}>
                <Table >
                    <TableHeader className={'bg-gray-800'}>
                        <tr>

                            <TableCell>Name</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell></TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody className={'bg-gray-800'}>
                        {data.length===0?<div className={"bg-gray-800 text-white text-center"} style={{width:"300%"}}>
                            Malumotlar Yo'q
                        </div>:data?.map((user, i) => (
                            <TableRow key={i} className={'bg-gray-800 text-white'}>
                                <TableCell>
                                    <div className="flex items-center text-sm">
                                        <div>
                                            <p className="font-semibold">{user.name}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center text-sm">
                                        <div>
                                            <p className="font-semibold">{formatTimestamp(user.time)}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => deleteItem(user.id)}
                                            className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full">
                                            <i className="ri-delete-bin-line"></i>
                                        </button>
                                        <button
                                            onClick={() => editItem(user)}
                                            className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full">
                                            <i className="ri-pencil-line"></i>
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TableFooter className={'bg-gray-800'}>

                </TableFooter>
            </TableContainer>}





            <div className={'umodal'}>
                <Modal show={isModalOpen} onHide={closeModal} >
                    <Modal.Header closeButton>
                        <Modal.Title>Yangi Xona xonasi qo'shish</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            className={"form-control"}
                            type={'text'}
                            value={roomName}
                            placeholder={"Xona nomi "}
                            onChange={(e)=>setRoomName(e.target.value)}
                        />

                        <Button type={"submit"} className={'my-3 border-0 border-r-2'}
                                onClick={saveData}
                                disabled={isSaving}
                        >
                            Saqlash
                        </Button>
                    </Modal.Body>

                </Modal>
            </div>

        </div>
    );
}

export default Room;