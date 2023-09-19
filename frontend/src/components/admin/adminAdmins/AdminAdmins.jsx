import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Badge,
    Avatar,
    Button,
    Pagination,

} from "@windmill/react-ui";
import {
    editAdmin,
    setAdmins,
    setLoading,
    setError,
    addAdmin,
    deleteAdmin, getAdminData,
} from "../../../redux/reducers/AdminAdminSlice";
import {ToastContainer, toast} from "react-toastify";
import { EditIcon, TrashIcon } from '../Sidebar/icons'
import PageTitle from "../PageTitle";
import {Modal} from 'react-bootstrap';

function AdminAdmins() {
    const dispatch = useDispatch();
    const {admins,isLoading} = useSelector((state) => state.adminAdmins);
    const [form, setForm] = useState({
        name: "",
        login: "",
        password: ""
    })


    useEffect(() => {
        dispatch(getAdminData())
    }, [dispatch]);
    useEffect(() => {
        dispatch(getAdminData())

    }, []);

    const handleAddAdmin = () => {
        const newAdminData = {
            name:form.name,
            phone:form.login,
            password:form.password
        };
        if(form.login===''){
            toast.success("login bo'sh bo'lishi mumkin emas  !")
            return;
        }
        if (form.password===''){
            toast.success("Password bo'sh bo'lishi mumkin emas  !")
            return;
        }
        if(edit==''){
            dispatch(addAdmin(newAdminData));
        }else{
            dispatch(editAdmin(newAdminData));
            setEdit('')
        }
        closeModal()
    };

    const handleDeleteAdmin = (adminId) => {
        dispatch({ type: "adminAdmins/deleteAdmin", payload: adminId });
    };


    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
        setForm({
            name: "",
            login: "",
            password: ""
        })
    }
    const [edit, setEdit]=useState('')
    function editData(admin) {
        setEdit(admin.id)
        setIsModalOpen(true)
        setForm({
            name: admin.name,
            login: admin.phone,
            password: ""
        })
    }

    return (
        <div className={`h-screen bg-gray-900 `}>
            <div className={'d-flex justify-content-between my-3'}>
                <PageTitle>
                    AdminOperators
                </PageTitle>

                <div>
                    <Button onClick={openModal} size='' className={' btn h-140  border-0 '}>Yangi admin qo'shish</Button>
                </div>
            </div>

            <div>




                <TableContainer className="my-3">
                    {
                        isLoading?"loading":(
                            <Table>
                                <TableHeader>
                                    <tr>
                                        <TableCell>FIO</TableCell>
                                        <TableCell>Login</TableCell>

                                        <TableCell></TableCell>
                                    </tr>
                                </TableHeader>
                                <TableBody>
                                    {admins?.map((admin, i) => (
                                        <TableRow key={i}>

                                            <TableCell>
                                                <span className="text-sm"> {admin.name}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm"> {admin.phone}</span>
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex items-center space-x-4">
                                                    <Button onClick={()=>editData(admin)} layout="link" size="icon" aria-label="Edit">
                                                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                                                    </Button>
                                                    <Button layout="link" size="icon" aria-label="Delete">
                                                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                        )
                    }

                </TableContainer>

            </div>


            <div className={'umodal'}>
                <Modal show={isModalOpen} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title> Admin </Modal.Title>
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
            <ToastContainer/>
        </div>
    );
}

export default AdminAdmins;
