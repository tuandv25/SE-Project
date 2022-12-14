import { connect } from "react-redux";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Popup from 'reactjs-popup';

import { updateUserList, deleteUserList, addUserList } from "../../actions/admin";
import Header from "../../components/HomeComponents/Header";
import PageLoading from "../../pages/PageLoading";
import { toast, ToastContainer } from "react-toastify";
import currencyFormat from "../../utils/displayPrice";
const DELETE_USER = gql`
    mutation DeleteUser($deleteUserId: Int!) {
        deleteUser(id: $deleteUserId) {
            id
            email
            name
            phoneNumber
            address
            point
  }
}
`
const UPDATE_USER = gql`
    mutation UpdateUser($data: updateUserInput!, $email: String!) {
        updateUser(data: $data, email: $email) {
            id
            name
            phoneNumber
            address
            point
            email
            birthday
            admin
            staff
    }
}
`
const ADD_USER = gql`
    mutation Mutation($data: createUserInput!) {
        createUser(data: $data) {
            id
            email
            name
            phoneNumber
            address
            point
            orders {
            id
            createdAt
            updatedAt
            namePro
            price
            status
            }
            admin
            staff
        }
    }
`
const ManagerUser = ({ userList, addUserList, deleteUserList, updateUserList }) => {
    const [data, setData] = useState({ name: '', email: '', phoneNumber: '', address: '', point: 0 })
    const [staff, setStaff] = useState(false);
    const newUserList = userList.filter((user) => user.staff === staff && user.admin === false);

    const [add] = useMutation(ADD_USER, {
        onCompleted: (data) => {
            addUserList(data.createUser)
        }
    });
    const [update] = useMutation(UPDATE_USER, {
        onCompleted: (data) => {
            updateUserList(data.updateUser.id, data.updateUser)
        }
    });
    const [deleteUser] = useMutation(DELETE_USER);
    const [isLoading, setIsLoading] = useState(false);
    const [inputSearch, setInputSearch] = useState('')

    const newUserListFinal = newUserList.filter((user) => user.email.includes(inputSearch) || user.id === parseInt(inputSearch))
    const onClickButton = (isUpdate, user) => {
        if (!data.name || !data.email || !data.phoneNumber || !data.address) {
            toast.warning("Vui l??ng ??i???n ?????y ????? c??c tr?????ng")
        } else {
            if (isUpdate) {
                handleUpdateUser(user);
            } else handleAddUser();
        }

    }
    const handleAddUser = async () => {
        setIsLoading(true);
        await add({
            variables: {
                data: {
                    ...data,
                    point: 0,
                    admin: false,
                    staff: staff,
                }
            }
        })
        setData({ name: "", email: "", phoneNumber: "", address: "" });
        setIsLoading(false);
        toast.success("Th??m th??nh c??ng");
    }
    const handleUpdateUser = async (user) => {
        setIsLoading(true);
        await update({
            variables: {
                data: {
                    name: user.name,
                    phoneNumber: user.phoneNumber,
                    address: user.address
                },
                email: user.email
            }
        })
        setData({ name: "", email: "", phoneNumber: "", address: "" });
        setIsLoading(false);
        toast.success("Ch???nh s???a th??nh c??ng");
    }
    const handleDeleteUser = async (user) => {
        setIsLoading(true);
        await deleteUser({
            variables: {
                deleteUserId: user.id
            }
        })
        deleteUserList(user.id);
        setIsLoading(false);
        toast.success("X??a th??nh c??ng");
    }
    if (isLoading) return <PageLoading />;
    return (
        <div>
            <Header />
            <section className="ftco-section">
                <div className="float-right mr-5">
                    <Popup trigger={<button type="button" className='btn-add btn btn-success'><div><i className="fas fa-plus" /> Th??m M???i</div></button>} modal nested>
                        {close => (
                            <div>
                                <div className="modal-header d-flex justify-content-center">
                                    {!staff? <h4 className="modal-title text-uppercase">Th??m Kh??ch H??ng</h4> : <h4 className="modal-title text-uppercase">Th??m Nh??n Vi??n</h4>}
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <div className="row justify-content-center">
                                            <div className="col-xl-8 ftco-animate">
                                                <form id="checkout-form" className="p-md-1">
                                                    <div className="row align-items-end">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="fullname">T??n Ng?????i D??ng</label>
                                                                <input type="text" value={data.name}
                                                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                                                    className="form-control"
                                                                />
                                                                <span className="form-message"></span>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="fullname">Email</label>
                                                                <input type="text" value={data.email}
                                                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                                                    className="form-control"
                                                                />
                                                                <span className="form-message"></span>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="fullname">S??? ??T</label>
                                                                <input type="text" value={data.phoneNumber}
                                                                    onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
                                                                    className="form-control"
                                                                />
                                                                <span className="form-message"></span>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="fullname">?????a Ch???</label>
                                                                <input type="text" value={data.address}
                                                                    onChange={(e) => setData({ ...data, address: e.target.value })}
                                                                    className="form-control"
                                                                />
                                                                <span className="form-message"></span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="d-flex justify-content-end orders-footer">
                                        <button className="ml-3 px-3 py-1 btn-warning" onClick={() => {
                                            setData({
                                                name: "",
                                                email: "",
                                                phoneNumber: "",
                                                address: ""
                                            })
                                        }}>
                                            Reset
                                        </button>
                                        <button className="ml-3 px-3 py-1 btn-success"
                                            onClick={() => {
                                                onClickButton(false, data)
                                            }}
                                        >Th??m</button>
                                        <button className="ml-3 px-3 py-1 btn-danger"
                                            onClick={close}
                                        >H???y</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
                <div className="float-left mr-5">
                    <button type="button" className={`mx-1 btn btn-outline-secondary ${!staff && "active"}`} onClick={() => { setStaff(false) }}>Kh??ch H??ng</button>
                    <button type="button" className={`mx-1 btn btn-outline-secondary ${staff && "active"}`} onClick={() => { setStaff(true) }}>Nh??n Vi??n</button>
                </div>
                <div className="float-right mr-5">
                    <div className="search-box-wrapper mb-2">
                        <form action="search" className="d-flex justify-content-start">
                            <input required type="text"
                                className="search-input ml-2"
                                autoFocus={true}
                                placeholder="T??m Ki???m"
                                value={inputSearch}
                                onChange={(e) => { setInputSearch(e.target.value) }}
                            />
                            <button type="submit" value="" className="btn-search fas fa-search submit" />
                        </form>
                    </div>
                </div>
                <div className="table-product">
                    <table className="table">
                        <thead className="thead-primary">
                            <tr className="text-center">
                                <th scope="col" className="table-title-pro" style={{ width: '5%' }}>STT</th>
                                <th scope="col" className="table-title-pro" style={{ width: '5%' }}>ID</th>
                                <th scope="col" className="table-title-pro" style={{ width: '17%' }}>T??n Ng?????i D??ng</th>
                                <th scope="col" className="table-title-pro" style={{ width: '20%' }}>Email</th>
                                <th scope="col" className="table-title-pro" style={{ width: '13%' }}>S??? ??T</th>
                                <th scope="col" className="table-title-pro" style={{ width: '26%' }}>?????a Ch???</th>
                                <th scope="col" className="table-title-pro" style={{ width: '7%' }}>??i???m</th>
                                <th scope="col" className="table-title-pro" style={{ width: '7%' }}>L???a Ch???n</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {
                                newUserListFinal.map((item, index) => {
                                    return (
                                        <tr>
                                            <td className='content'>{index + 1}</td>
                                            <td className='content'>{item.id}</td>
                                            <td className='content'>{item.name}</td>
                                            <td className='content'>{item.email}</td>
                                            <td className='content'>{item.phoneNumber}</td>
                                            <td className='content'>{item.address}</td>
                                            <td className='content'>{currencyFormat(item.point)} ??i???m</td>
                                            <td className='content'>
                                                <Popup trigger={<button type="button" className='btn-update btn btn-warning'><div><i className="fas fa-edit"></i></div></button>} modal nested>
                                                    {close => (
                                                        <div>
                                                            <div className="modal-header d-flex justify-content-center">
                                                                <h4 className="modal-title text-uppercase">C???p Nh???t Ng?????i D??ng</h4>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className="container">
                                                                    <div className="row justify-content-center">
                                                                        <div className="col-xl-8 ftco-animate">
                                                                            <form id="checkout-form" className="p-md-1">
                                                                                <div className="row align-items-end">
                                                                                    <div className="col-md-12">
                                                                                        <div className="form-group">
                                                                                            <label htmlFor="fullname">T??n Ng?????i D??ng</label>
                                                                                            <input type="text" value={data.name}
                                                                                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                                                                                className="form-control"
                                                                                            />
                                                                                            <span className="form-message"></span>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="col-md-6">
                                                                                        <div className="form-group">
                                                                                            <label htmlFor="fullname">Email</label>
                                                                                            <input type="text" value={data.email}
                                                                                                readOnly={true}
                                                                                                className="form-control"
                                                                                            />
                                                                                            <span className="form-message"></span>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="col-md-6">
                                                                                        <div className="form-group">
                                                                                            <label htmlFor="fullname">S??? ??T</label>
                                                                                            <input type="text" value={data.phoneNumber}
                                                                                                onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
                                                                                                className="form-control"
                                                                                            />
                                                                                            <span className="form-message"></span>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="col-md-12">
                                                                                        <div className="form-group">
                                                                                            <label htmlFor="fullname">?????a Ch???</label>
                                                                                            <input type="text" value={data.address}
                                                                                                onChange={(e) => setData({ ...data, address: e.target.value })}
                                                                                                className="form-control"
                                                                                            />
                                                                                            <span className="form-message"></span>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <div className="d-flex justify-content-end orders-footer">
                                                                    <button className="ml-3 px-3 py-1 btn-warning" onClick={() => {
                                                                        setData({
                                                                            name: item.name,
                                                                            email: item.email,
                                                                            phoneNumber: item.phoneNumber,
                                                                            address: item.address
                                                                        })
                                                                    }}>
                                                                        L???y D??? Li???u
                                                                    </button>
                                                                    <button className="ml-3 px-3 py-1 btn-success"
                                                                        onClick={() => {
                                                                            onClickButton(true, data)
                                                                        }}
                                                                    >C???p Nh???t</button>
                                                                    <button className="ml-3 px-3 py-1 btn-danger"
                                                                        onClick={close}
                                                                    >H???y</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Popup>
                                                <br />
                                                <Popup trigger={<button className="btn-remove btn btn-danger btn-sm px-3 mt-2 fas fa-trash-alt" style={{ outline: 'none' }}></button>} modal nested>
                                                    {close => (
                                                        <div>
                                                            <div className="modal-header text-uppercase" style={{ background: '#ffc107' }}>
                                                                <h6 className="modal-title d-flex justify-content-center">X??c Nh???n X??a Ng?????i D??ng</h6>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button className="btn-light" style={{ outline: 'none' }} onClick={() => handleDeleteUser(item)}>OK</button>
                                                                <button className="btn-light" style={{ outline: 'none' }} onClick={close}>H???y</button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Popup>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <ToastContainer />
            </section>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        userList: state.UserList,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateUserList: (id, data) => dispatch(updateUserList(id, data)),
        addUserList: (data) => dispatch(addUserList(data)),
        deleteUserList: (id) => dispatch(deleteUserList(id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManagerUser);