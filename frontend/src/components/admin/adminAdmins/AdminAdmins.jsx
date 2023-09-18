import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Table,
    Button,

    ModalHeader, ModalBody, ModalFooter,
} from "@windmill/react-ui";
import {
    setAdmins,
    setLoading,
    setError,
    addAdmin,
    deleteAdmin,
} from "../../../redux/reducers/AdminAdminSlice";
import PageTitle from "../PageTitle";
import {Modal} from 'react-bootstrap';

function AdminAdmins() {
    const dispatch = useDispatch();
    const admins = useSelector((state) => state.adminAdmins.admins);
    const isLoading = useSelector((state) => state.adminAdmins.isLoading);
    const error = useSelector((state) => state.adminAdmins.error);


    const [form, setForm] = useState({
        name: "",
        login: "",
        password: ""
    })


    useEffect(() => {
        dispatch(setLoading(true));

        dispatch(setLoading(false));
    }, [dispatch]);

    const handleAddAdmin = () => {
        const newAdminData = {
           name:form.name,
            phone:form.login,
            password:form.password
        };
        console.log(newAdminData)
        dispatch({ type: "adminAdmins/postAdmin", payload: newAdminData });
    };

    const handleDeleteAdmin = (adminId) => {
        // Dispatch an action to delete admin
        dispatch({ type: "adminAdmins/deleteAdmin", payload: adminId });
    };


    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    return (
        <div className={`h-screen bg-gray-900 `}>
           <div className={'d-flex justify-content-between my-2'}>
               <PageTitle>
                   AdminOperators
               </PageTitle>

               <div>
                   <Button onClick={openModal} size="small" className={'h-140  border-0 '}>Yangi admin qo'shish</Button>
               </div>
           </div>




            <div className={'umodal'}>
                <Modal show={isModalOpen} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Yangi Admin qo'shish</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <label>Admin Ism Familyasi:</label>
                        <input
                            className={"form-control"}
                            type={'text'}
                            value={form.name}
                            placeholder={""}
                            onChange={(e) => setForm(({...form, name: e.target.value}))}
                        />
                        <label className={'my-2'}>Admin uchun Login</label>
                        <input
                            className={"form-control "}
                            type={'text'}
                            value={form.login}
                            placeholder={"Login.."}
                            onChange={(e) => setForm(({...form, login: e.target.value}))}
                        />
                        <div className="mb-3 col-5 my-2">
                            <label htmlFor="para" className="form-label">Admin uchun Parol</label>
                            <input
                                className={"form-control "}
                                type={'password'}
                                value={form.password}
                                onChange={(e) => setForm(({...form, password: e.target.value}))}
                            />

                        </div>
                        <div type={"submit"}
                             onClick={handleAddAdmin}
                             // disabled={isSaving}
                             className="button button_color_1 text-center trans_200 btn btn-warning">saqlash
                        </div>

                    </Modal.Body>

                </Modal>
            </div>
        </div>
    );
}

export default AdminAdmins;
