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
    editAdmin,
    addAdmin,
    getAdminData,
} from "../../../redux/reducers/AdminAdminSlice";
import {ToastContainer, toast} from "react-toastify";
import PageTitle from "../PageTitle";
import {Modal} from 'react-bootstrap';
import {Tooltip} from "@nextui-org/react";
import {EyeIcon} from "../EyeIcon";
import {EditIcon} from "../EditIcon";
import {DeleteIcon} from "../DeleteIcon";

function AdminAdmins() {
    const dispatch = useDispatch();
    const {admins, isLoading} = useSelector((state) => state.adminAdmins);
    const [edit, setEdit] = useState('')

    const [form, setForm] = useState({
        name: "",
        phone: "+998",
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
            name: form.name,
            phone: form.phone,
            password: form.password
        };
        if (edit === '') {
            if (form.password === '' || form.password.length < 8) {
                toast.error("Password 8 ta belgidan kam bo'lmasligi kerek !")
                return;
            }
            if (newAdminData.phone.startsWith("+998") && newAdminData.phone.length === 13) {
                dispatch(addAdmin(newAdminData));

            } else {
                toast.error("Telefon raqam xato kiritildi!");
                return;
            }
        } else {

            if (form.name !== '' && form.phone !== '') {
                if (newAdminData.phone.startsWith("+998") && newAdminData.phone.length === 13) {

                    dispatch(editAdmin({data: newAdminData, id: edit.id}));
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
                    Adminlar
                </PageTitle>

                <div>
                    <Button onClick={openModal} size='' className={' btn h-140  border-0 '}>Yangi admin
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
                                {admins? <TableBody>
                                    {admins?.map((admin, i) => (
                                        <TableRow key={i}>

                                            <TableCell>
                                                <span className="text-sm"> {admin.name}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm"> {admin.phone}</span>
                                            </TableCell>

                                            <TableCell>
                                                <div className="relative flex items-center gap-2">
                                                    <Tooltip content="Details">
                                                  <span
                                                      className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <EyeIcon/>
                                                  </span>
                                                    </Tooltip>
                                                    <Tooltip content="Edit user">
                                                  <span onClick={() => editData(admin)}
                                                        className=" text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <EditIcon/>
                                                  </span>
                                                    </Tooltip>
                                                    <Tooltip color="danger" content="Delete user">
                                                  <span onClick={() => handleDeleteAdmin(admin.id)}
                                                        className="text-lg text-danger cursor-pointer active:opacity-50">
                                                    <DeleteIcon/>
                                                  </span>
                                                    </Tooltip>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>:""}

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
                            placeholder={"ism familya"}
                            onChange={(e) => setForm(({...form, name: e.target.value}))}
                        />
                        <label className={'my-2'}>Admin uchun Telefon raqam</label>
                        <input
                            className={"form-control "}
                            type={'phone'}
                            pattern={'^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$'}
                            value={form.phone}

                            onChange={(e) => setForm(({...form, phone: e.target.value}))}
                        />

                        <div className="mb-3 col-5 my-2">
                            <label htmlFor="para" className="form-label">Admin uchun Parol</label>
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

export default AdminAdmins;
