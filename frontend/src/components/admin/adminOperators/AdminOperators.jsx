import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
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

    editOperator,
    addOperator,getOperatorData

} from "../../../redux/reducers/AdminOperatorSlice";
import {ToastContainer, toast} from "react-toastify";
import {EditIcon, TrashIcon} from '../Sidebar/icons'
import PageTitle from "../PageTitle";
import {Modal} from 'react-bootstrap';
import {UserLogIn} from "../../../redux/reducers/LoginSlice";

function AdminOperators() {
    const dispatch = useDispatch();
    const {operators, isLoading} = useSelector((state) => state.adminOperators);
    const [edit, setEdit] = useState('')

    const [form, setForm] = useState({
        name: "",
        phone: "+998",
        password: ""
    })
    useEffect(() => {
        dispatch(getOperatorData())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getOperatorData())

    }, []);

    const handleAddAdmin = () => {
        const newAdminData = {
            name: form.name,
            phone: form.phone,
            password: form.password
        };
        if (edit === '') {
            if (form.password === '' || form.password.length<8) {
                toast.error("Password 8 ta belgidan kam bo'lmasligi kerek !")
                return;
            }
            if (newAdminData.phone.startsWith("+998") && newAdminData.phone.length === 13) {
                dispatch(addOperator(newAdminData));

            } else {
                toast.error("Telefon raqam xato kiritildi!");
                return;
            }
        } else {

            if (form.name !== '' && form.phone !== '') {
                if (newAdminData.phone.startsWith("+998") && newAdminData.phone.length === 13) {

                    dispatch(editOperator({data: newAdminData, id: edit.id}));
                    setEdit('')

                } else {
                    toast.error("Telefon raqam xato kiritildi!");
                    return;
                }
            }
        }
        closeModal()

    };
    const handleDeleteAdmin = (adminId) => {
        dispatch({type: "adminAdmins/deleteAdmin", payload: adminId});
    };

    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
        setIsModalOpen(true)

    }

    function closeModal() {
        setIsModalOpen(false)
        setForm({
            name: "",
            phone: "+998",
            password: ""
        })
        setEdit('')
    }

    function editData(admin) {
        setEdit(admin)
        setIsModalOpen(true)
        setForm({
            name: admin.name,
            phone: admin.phone,
            password: ""
        })
    }

    return (
        <div className={`h-screen bg-gray-900 `}>
            <div className={'d-flex justify-content-between my-3'}>
                <PageTitle>
                    Operatorlar
                </PageTitle>

                <div>
                    <Button onClick={openModal} size='' className={' btn h-140  border-0 '}>Yangi operator
                        qo'shish</Button>
                </div>
            </div>

            <div>


                <TableContainer className="my-3">
                    {
                        isLoading ? "loading" : (
                            <Table>
                                <TableHeader>
                                    <tr>
                                        <TableCell>FIO</TableCell>
                                        <TableCell>phone</TableCell>

                                        <TableCell></TableCell>
                                    </tr>
                                </TableHeader>
                                <TableBody>
                                    {operators?.map((admin, i) => (
                                        <TableRow key={i}>

                                            <TableCell>
                                                <span className="text-sm"> {admin.name}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm"> {admin.phone}</span>
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex items-center space-x-4">
                                                    <Button onClick={() => editData(admin)} layout="link" size="icon"
                                                            aria-label="Edit">
                                                        <EditIcon className="w-5 h-5" aria-hidden="true"/>
                                                    </Button>
                                                    <Button onClick={() => handleDeleteAdmin(admin.id)} layout="link"
                                                            size="icon" aria-label="Delete">
                                                        <TrashIcon className="w-5 h-5" aria-hidden="true"/>
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
                        <Modal.Title> Operator </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <label>Operator Ism Familyasi:</label>
                        <input
                            className={"form-control"}
                            type={'text'}
                            value={form.name}
                            placeholder={"ism familya"}
                            onChange={(e) => setForm(({...form, name: e.target.value}))}
                        />
                        <label className={'my-2'}>Operator uchun Telefon raqam</label>
                        <input
                            className={"form-control "}
                            type={'text'}
                            pattern={'^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$'}
                            value={form.phone}
                            placeholder={"phone.."}
                            onChange={(e) => setForm(({...form, phone: e.target.value}))}
                        />
                        <div className="mb-3 col-5 my-2">
                            <label htmlFor="para" className="form-label">Operator uchun Parol</label>
                            <input
                                className={"form-control "}
                                type={'password'}
                                value={form.password}
                                placeholder={'password'}
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

export default AdminOperators;
