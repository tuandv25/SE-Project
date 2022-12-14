import Header from "../../components/HomeComponents/Header"
import { connect } from "react-redux"
import { useState } from "react";
import { addVoucher, updateVoucher, removeVoucher } from '../../actions/voucher';
import { addVoucherPremium, updateVoucherPremium, removeVoucherPremium } from "../../actions/voucherPremium";
import { addVoucherBirthday, updateVoucherBirthday, removeVoucherBirthday } from "../../actions/voucherBirthday";
import { useMutation, gql } from "@apollo/client";
import PageLoading from "../../pages/PageLoading";
import Modal from "react-modal"
import { toast, ToastContainer } from "react-toastify";
import Popup from "reactjs-popup";
import currencyFormat from "../../utils/displayPrice";


const ADD_VOUCHER = gql`
    mutation Mutation($data: createVoucherInput!) {
        createVoucher(data: $data) {
            id
            updatedAt
            createdAt
            name
            disCount
            disCount2
            condition
            expireAt
        }
    }
`
const UPDATE_VOUCHER = gql`
    mutation UpdateVoucher($data: updateVoucherInput!, $id: Int!) {
        updateVoucher(data: $data, id: $id) {
            id
            updatedAt
            createdAt
            name
            disCount
            disCount2
            condition
            expireAt
    }
}
`
const DELETE_VOUCHER = gql`
    mutation DeleteVoucher($deleteVoucherId: Int!) {
        deleteVoucher(id: $deleteVoucherId) {
            id
            updatedAt
            createdAt
            name
            disCount
            disCount2
            condition
            expireAt
  }
}
`
const ADD_VOUCHER_PREMIUM = gql`
    mutation Mutation($data: createVoucherPremiumInput!) {
        createVoucherPremium(data: $data) {
            id
            updatedAt
            createdAt
            name
            disCount
            disCount2
            categoryId
            condition
            expireAt
        }
    }
`
const UPDATE_VOUCHER_PREMIUM = gql`
    mutation UpdateVoucherPremium($data: updateVoucherPremiumInput!, $id: Int!) {
        updateVoucherPremium(data: $data, id: $id) {
            id
            updatedAt
            createdAt
            name
            disCount
            disCount2
            categoryId
            condition
            expireAt
    }
}
`
const DELETE_VOUCHER_PREMIUM = gql`
    mutation DeleteVoucherPremium($deleteVoucherPremiumId: Int!) {
        deleteVoucherPremium(id: $deleteVoucherPremiumId) {
            id
            updatedAt
            createdAt
            name
            disCount
            disCount2
            categoryId
            condition
            expireAt
  }
}
`
const ADD_VOUCHER_BIRTHDAY = gql`
    mutation Mutation($data: createVoucherBirthdayInput!) {
        createVoucherBirthday(data: $data) {
            id
            updatedAt
            createdAt
            name
            disCount
            condition
        }
    }
`
const UPDATE_VOUCHER_BIRTHDAY = gql`
    mutation UpdateVoucherBirthday($data: updateVoucherBirthdayInput!, $id: Int!) {
        updateVoucherBirthday(data: $data, id: $id) {
            id
            updatedAt
            createdAt
            name
            disCount
            condition
    }
}
`
const DELETE_VOUCHER_BIRTHDAY = gql`
    mutation DeleteVoucherBirthday($deleteVoucherBirthdayId: Int!) {
        deleteVoucherBirthday(id: $deleteVoucherBirthdayId) {
            id
            updatedAt
            createdAt
            name
            disCount
            condition
  }
    }
`
const Voucher = ({ voucher, addVoucher, updateVoucher, removeVoucher, voucherPremium, addVoucherPremium, updateVoucherPremium, removeVoucherPremium, voucherBirthday, addVoucherBirthday, updateVoucherBirthday, removeVoucherBirthday }) => {
    const [showVoucher, setShowVoucher] = useState(true)
    const [showVoucherPremium, setVoucherPremium] = useState(false);
    const [showVoucherBirthday, setVoucheBirthday] = useState(false);
    const [showVoucherExpired, setShowVoucherExpired] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const today = new Date();
    var flag = 1, flagPre = 1, flagBD = 1, flagEx = 1;
    const handleShowVoucher = () => {
        setShowVoucher(true);
        setVoucherPremium(false);
        setVoucheBirthday(false);
        setShowVoucherExpired(false);
        setData(
            {
                name: "",
                disCount: 0,
                disCount2: 0,
                condition: 0,
                expireAt: "",
            }
        )
    }
    const handleShowVoucherPremium = () => {
        setShowVoucher(false);
        setVoucherPremium(true);
        setVoucheBirthday(false);
        setShowVoucherExpired(false);
        setData(
            {
                name: "",
                disCount: 0,
                disCount2: 0,
                categoryId: 0,
                condition: 0,
                expireAt: "",
            }
        )
    }
    const handleShowVoucherBirthday = () => {
        setShowVoucher(false);
        setVoucherPremium(false);
        setVoucheBirthday(true);
        setShowVoucherExpired(false);
        setData(
            {
                name: "",
                disCount: 0,
                condition: 0
            }
        )
    }
    const handleShowVoucherExpired = () => {
        setShowVoucher(false);
        setVoucherPremium(false);
        setVoucheBirthday(false);
        setShowVoucherExpired(true);
        setData(
            {
                name: "",
                disCount: 0,
                condition: 0
            }
        )
    }
    // Ch???c n??ng add
    const [data, setData] = useState({ name: "", disCount: 0, disCount2: 0, categoryId: 0, condition: 0, expireAt: "" })
    const [add] = useMutation(ADD_VOUCHER, {
        onCompleted: (data) => {
            addVoucher(data.createVoucher)
        }
    }
    )
    const [addPremium] = useMutation(ADD_VOUCHER_PREMIUM, {
        onCompleted: (data) => {
            addVoucherPremium(data.createVoucherPremium)
        }
    }
    )
    const [addBirthday] = useMutation(ADD_VOUCHER_BIRTHDAY, {
        onCompleted: (data) => {
            addVoucherBirthday(data.createVoucherBirthday)
        }
    }
    )
    const handleAddVoucher = async () => {
            setIsLoading(true);
            if (showVoucher) {

                await add({
                    variables: {
                        data: {
                            name: data.name,
                            disCount: parseInt(data.disCount),
                            disCount2: parseInt(data.disCount2),
                            condition: parseInt(data.condition),
                            expireAt: data.expireAt + "T16:59:59.999Z"
                        }
                    }
                })

            } else if (showVoucherPremium) {
                await addPremium({
                    variables: {
                        data: {
                            name: data.name,
                            disCount: parseInt(data.disCount),
                            disCount2: parseInt(data.disCount2),
                            categoryId: parseInt(data.categoryId),
                            condition: parseInt(data.condition),
                            expireAt: data.expireAt + "T16:59:59.999Z"
                        }
                    }
                })
            } else {
                await addBirthday({
                    variables: {
                        data: {
                            name: data.name,
                            disCount: parseInt(data.disCount),
                            condition: parseInt(data.condition)
                        }
                    }
                })
            }

            setData(
                {
                    name: "",
                    disCount: 0,
                    disCount2: 0,
                    categoryId: 0,
                    condition: 0,
                    expireAt: ""
                }
            )
            setIsLoading(false);
            toast.success("Th??m th??nh c??ng")
    }
    // Ch???c n??ng update
    const [update] = useMutation(UPDATE_VOUCHER, {
        onCompleted: (data) => {
            updateVoucher(data.updateVoucher.id, data.updateVoucher)
        }
    });
    const [updatePremium] = useMutation(UPDATE_VOUCHER_PREMIUM, {
        onCompleted: (data) => {
            updateVoucherPremium(data.updateVoucherPremium.id, data.updateVoucherPremium)
        }
    });
    const [updateBirthday] = useMutation(UPDATE_VOUCHER_BIRTHDAY, {
        onCompleted: (data) => {
            updateVoucherBirthday(data.updateVoucherBirthday.id, data.updateVoucherBirthday)
        }
    });
    const onClickButton = (isUpdate) => {
        if ((data.disCount == 0 && data.disCount2 == 0) || data.condition < 0) {
            toast.warning("Vui l??ng nh???p ????? th??ng tin")
        }else if(data.disCount > 0 && data.disCount2 > 0){
            toast.warning("Ch??? ???????c ch???n 1 trong 2 lo???i gi???m gi??")
        }
        else if(data.disCount==0 && showVoucherBirthday){
            toast.warning("Vui l??ng nh???p ????? th??ng tin")
        }
        else if(data.disCount <0 || data.disCount2 < 0){
            toast.warning("Gi?? tr??? gi???m kh??ng th??? ??m")
        }
        else {
            if (isUpdate) {
                handleUpdateVoucher();
            } else handleAddVoucher();
        }
    }
    const handleUpdateVoucher = async () => {
        setIsLoading(true);
        if (showVoucher) {
            await update({
                variables: {
                    data: {
                        name: data.name,
                        disCount: parseInt(data.disCount),
                        disCount2: parseInt(data.disCount2),
                        condition: parseInt(data.condition),
                        expireAt: data.expireAt + "T16:59:59.999Z"
                    },
                    id: data.id
                }
            })
        } else if (showVoucherPremium) {
            await updatePremium({
                variables: {
                    data: {
                        name: data.name,
                        disCount: parseInt(data.disCount),
                        disCount2: parseInt(data.disCount2),
                        categoryId: data.categoryId,
                        condition: parseInt(data.condition),
                        expireAt: data.expireAt + "T16:59:59.999Z"
                    },
                    id: data.id
                }
            })
        } else {
            await updateBirthday({
                variables: {
                    data: {
                        name: data.name,
                        disCount: parseInt(data.disCount),
                        condition: parseInt(data.condition)
                    },
                    id: data.id
                }
            })
        }
        setData(
            {
                name: "",
                disCount: 0,
                disCount2: 0,
                categoryId: 0,
                condition: 0,
                expireAt: ""
            }
        )
        setIsLoading(false);
        toast.success("Ch???nh s???a th??nh c??ng");
    }

    // Ch???c n??ng remove
    const [deleteVoucher] = useMutation(DELETE_VOUCHER);
    const [deleteVoucherPremium] = useMutation(DELETE_VOUCHER_PREMIUM);
    const [deleteVoucherBirthday] = useMutation(DELETE_VOUCHER_BIRTHDAY);
    const handleDeleteVoucher = async (voucher) => {
        setIsLoading(true)
        if (showVoucher) {
            await deleteVoucher({
                variables: {
                    deleteVoucherId: voucher.id
                }
            })
            removeVoucher(voucher.id);

        }
        else if (showVoucherPremium) {
            await deleteVoucherPremium({
                variables: {
                    deleteVoucherPremiumId: voucher.id
                }
            })
            removeVoucherPremium(voucher.id);

        } else {
            await deleteVoucherBirthday({
                variables: {
                    deleteVoucherBirthdayId: voucher.id
                }
            })
            removeVoucherBirthday(voucher.id);
        }
        setIsLoading(false);
        toast.success("X??a th??nh c??ng");
    }
    if (isLoading) return <PageLoading />;
    return (
        <div>
            <Header />
            <section className="ftco-section">
                <div className="float-right mr-5 mb-2">
                    <Popup trigger={<button type="button" className='btn-add btn btn-success'><div><i className="fas fa-plus" /> Th??m M???i</div></button>} modal nested>
                        {close => (
                            <div>
                                <div className="modal-header d-flex justify-content-center">
                                    <h4 className="modal-title text-uppercase">Th??m Voucher</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <div className="row justify-content-center">
                                            <div className="col-xl-8 ftco-animate">
                                                <form id="checkout-form" className="p-md-1">
                                                    {showVoucher &&
                                                    <div className="row align-items-end">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="fullname">T??n Voucher</label>
                                                            <input type="text" value={data.name}
                                                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                                                className="form-control"
                                                            />
                                                            <span className="form-message"></span>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="fullname">Gi???m Gi?? 1 (VN??/1sp)</label>
                                                            <input type="text" value={data.disCount}
                                                                onChange={(e) => setData({ ...data, disCount: e.target.value })}
                                                                className="form-control"
                                                            />
                                                            <span className="form-message"></span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="fullname">Gi???m Gi?? 2 (% t???ng ????n h??ng)</label>
                                                            <input type="text" value={data.disCount2}
                                                                onChange={(e) => setData({ ...data, disCount2: e.target.value })}
                                                                className="form-control"
                                                            />
                                                            <span className="form-message"></span>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="fullname">??i???u Ki???n (VN??)</label>
                                                            <input type="text" value={data.condition}
                                                                onChange={(e) => setData({ ...data, condition: e.target.value })}
                                                                className="form-control"
                                                            />
                                                            <span className="form-message"></span>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="fullname">H???n s??? d???ng</label>
                                                            <input
                                                                value={data.expireAt}
                                                                onChange = {(e) => setData({
                                                                        ...data,
                                                                        expireAt: e.target.value,
                                                                    })
                                                                }
                                                                id="birthday"
                                                                name="birthday"
                                                                type="date"
                                                                className="form-control"
                                                                min="1930-01-01"
                                                                required
                                                            />
                                                            <span className="form-message"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                }
                                                {showVoucherPremium &&
                                                    <div className="row align-items-end">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="fullname">T??n Voucher</label>
                                                                <input type="text" value={data.name}
                                                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                                                    className="form-control"
                                                                />
                                                                <span className="form-message"></span>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="fullname">Gi???m Gi?? 1 (VN??)</label>
                                                                <input type="text" value={data.disCount}
                                                                    onChange={(e) => setData({ ...data, disCount: e.target.value })}
                                                                    className="form-control"
                                                                />
                                                                <span className="form-message"></span>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="fullname">Gi???m Gi?? 2 (%)</label>
                                                                <input type="text" value={data.disCount2}
                                                                    onChange={(e) => setData({ ...data, disCount2: e.target.value })}
                                                                    className="form-control"
                                                                />
                                                                <span className="form-message"></span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="fullname">Lo???i SP (Gi???m theo %)</label>
                                                                <input type="text" value={data.categoryId}
                                                                    onChange={(e) => setData({ ...data, categoryId: e.target.value })}
                                                                    className="form-control"
                                                                />
                                                                <span className="form-message"></span>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="fullname">??i???u Ki???n (??i???m)</label>
                                                                <input type="text" value={data.condition}
                                                                    onChange={(e) => setData({ ...data, condition: e.target.value })}
                                                                    className="form-control"
                                                                />
                                                                <span className="form-message"></span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="fullname">H???n s??? d???ng</label>
                                                                <input
                                                                    value={data.expireAt}
                                                                    onChange = {(e) => setData({
                                                                            ...data,
                                                                            expireAt: e.target.value,
                                                                        })
                                                                    }
                                                                    id="birthday"
                                                                    name="birthday"
                                                                    type="date"
                                                                    className="form-control"
                                                                    min="1930-01-01"
                                                                    required
                                                                />
                                                                <span className="form-message"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    }
                                                    {showVoucherBirthday &&
                                                    <div className="row align-items-end">
                                                        
                                                        <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="fullname">T??n Voucher</label>
                                                            <input type="text" value={data.name}
                                                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                                                className="form-control"
                                                            />
                                                            <span className="form-message"></span>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="fullname">Gi???m Gi?? (%)</label>
                                                            <input type="text" value={data.disCount}
                                                                onChange={(e) => setData({ ...data, disCount: e.target.value })}
                                                                className="form-control"
                                                            />
                                                            <span className="form-message"></span>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="fullname">??i???u Ki???n (??i???m)</label>
                                                            <input type="text" value={data.condition}
                                                                onChange={(e) => setData({ ...data, condition: e.target.value })}
                                                                className="form-control"
                                                            />
                                                            <span className="form-message"></span>
                                                        </div>
                                                    </div>
                                                    </div>}
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
                                                disCount: 0,
                                                condition: 0,
                                                disCount2: 0,
                                                categoryId: 0,
                                            })
                                        }}>
                                            ?????t L???i
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
                <div className="float-left mb-2">
                    <button type="button" className={`mx-1 btn btn-outline-secondary ${showVoucher && "active"}`} onClick={handleShowVoucher}>Voucher</button>
                    <button type="button" className={`mx-1 btn btn-outline-secondary ${showVoucherPremium && "active"}`} onClick={handleShowVoucherPremium}>Voucher Premium</button>
                    <button type="button" className={`mx-1 btn btn-outline-secondary ${showVoucherBirthday && "active"}`} onClick={handleShowVoucherBirthday}>Voucher Birthday</button>
                    <button type="button" className={`mx-1 btn btn-outline-secondary ${showVoucherExpired && "active"}`} onClick={handleShowVoucherExpired}>Expired Voucher</button>
                </div>
                {showVoucher && <table className="table mt-2" style={{ display: '"inline-block' }}>
                <thead className="thead-primary">
                            <tr className="text-center">
                                <th scope="col" style={{ width: '5%' }}>STT</th>
                                <th scope="col" style={{ width: '5%' }}>ID</th>
                                <th scope="col" style={{ width: '10%' }}>Ng??y T???o</th>
                                <th scope="col" style={{ width: '10%' }}>Ng??y C???p Nh???t</th>
                                <th scope="col" style={{ width: '20%' }}>T??n</th>
                                <th scope="col" style={{ width: '10%' }}>Gi???m Gi?? 1 (VN??/1sp)</th>
                                <th scope="col" style={{ width: '10%' }}>Gi???m Gi?? 2 (%)</th>
                                <th scope="col" style={{ width: '10%' }}>??i???u Ki???n (VN??)</th>
                                <th scope="col" style={{ width: '10%' }}>Ng??y H???t H???n</th>
                                <th scope="col" style={{ width: '10%' }}>L???a Ch???n</th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    voucher.map((voucher, index) => {
                                        var createdAt = new Date(parseFloat(voucher.createdAt));
                                        var updatedAt = new Date(parseFloat(voucher.updatedAt));
                                        var expiredAt = new Date(parseFloat(voucher.expireAt));
                                        if(today <= voucher.expireAt)
                                        return (
                                            <tr>
                                                <td className='content'>{flag++}</td>
                                                <td className='content'>{voucher.id}</td>
                                                <td className='content'>{createdAt.toLocaleString()}</td>
                                                <td className='content'>{updatedAt.toLocaleString()}</td>
                                                <td className='content'>{voucher.name}</td>
                                                <td className='content'>{currencyFormat(voucher.disCount)} VN??</td>
                                                <td className='content'>{voucher.disCount2} %</td>
                                                <td className='content'>{currencyFormat(voucher.condition)} VN??</td>
                                                <td className='content'>{expiredAt.toLocaleDateString()}</td>
                                                <td className='content'>
                                                    <Popup trigger={<button type="button" className='btn-update btn btn-warning'><div><i className="fas fa-edit"></i></div></button>} modal nested>
                                                        {close => (
                                                            <div>
                                                                <div className="modal-header d-flex justify-content-center">
                                                                    <h4 className="modal-title text-uppercase">C???p Nh???t Voucher</h4>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <div className="container">
                                                                        <div className="row justify-content-center">
                                                                            <div className="col-xl-8 ftco-animate">
                                                                                <form id="checkout-form" className="p-md-1">
                                                                                    <div className="row align-items-end">
                                                                                        <div className="col-md-12">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="fullname">T??n Voucher</label>
                                                                                                <input type="text" value={data.name}
                                                                                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                                                                                    className="form-control"
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-6">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="fullname">Gi???m Gi?? 1 (VN??/1sp)</label>
                                                                                                <input type="text" value={data.disCount}
                                                                                                    onChange={(e) => setData({ ...data, disCount: e.target.value })}
                                                                                                    className="form-control"
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-6">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="fullname">Gi???m Gi?? 2 (% t???ng ????n h??ng)</label>
                                                                                                <input type="text" value={data.disCount2}
                                                                                                    onChange={(e) => setData({ ...data, disCount2: e.target.value })}
                                                                                                    className="form-control"
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-6">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="fullname">??i???u Ki???n (VN??)</label>
                                                                                                <input type="text" value={data.condition}
                                                                                                    onChange={(e) => setData({ ...data, condition: e.target.value })}
                                                                                                    className="form-control"
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-6">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="fullname">H???n s??? d???ng</label>
                                                                                                <input
                                                                                                    value={data.expireAt}
                                                                                                    onChange = {(e) => setData({
                                                                                                            ...data,
                                                                                                            expireAt: e.target.value,
                                                                                                        })
                                                                                                    }
                                                                                                    id="birthday"
                                                                                                    name="birthday"
                                                                                                    type="date"
                                                                                                    className="form-control"
                                                                                                    min="1930-01-01"
                                                                                                    required
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
                                                                                id: voucher.id,
                                                                                name: voucher.name,
                                                                                disCount: voucher.disCount,
                                                                                disCount2: voucher.disCount2,
                                                                                condition: voucher.condition,
                                                                                expireAt: voucher.expireAt
                                                                            })
                                                                        }}>
                                                                            L???y D??? Li???u Voucher
                                                                        </button>
                                                                        <button className="ml-3 px-3 py-1 btn-success"
                                                                            onClick={() => {
                                                                                onClickButton(true, data)
                                                                            }}
                                                                        >Update</button>
                                                                        <button className="ml-3 px-3 py-1 btn-danger"
                                                                            onClick={close}
                                                                        >Cancel</button>
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
                                                                    <h6 className="modal-title d-flex justify-content-center">X??c Nh???n X??a Voucher</h6>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button className="btn-light" style={{ outline: 'none' }} onClick={() => handleDeleteVoucher(voucher)}>OK</button>
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

                </table>}
                {showVoucherPremium && <table class="table mt-2" style={{ display: '"inline-block' }}>
                <thead className="thead-primary">
                            <tr className="text-center">
                                <th scope="col" style={{ width: '5%' }}>STT</th>
                                <th scope="col" style={{ width: '5%' }}>ID</th>
                                <th scope="col" style={{ width: '10%' }}>Ng??y T???o</th>
                                <th scope="col" style={{ width: '10%' }}>Ng??y C???p Nh???t</th>
                                <th scope="col" style={{ width: '16%' }}>T??n</th>
                                <th scope="col" style={{ width: '10%' }}>Gi???m Gi?? 1 (VN??)</th>
                                <th scope="col" style={{ width: '8%' }}>Gi???m Gi?? 2 (%)</th>
                                <th scope="col" style={{ width: '6%' }}>Lo???i SP</th>
                                <th scope="col" style={{ width: '10%' }}>??i???u Ki???n (??i???m)</th>
                                <th scope="col" style={{ width: '10%' }}>Ng??y H???t H???n</th>
                                <th scope="col" style={{ width: '10%' }}>L???a Ch???n</th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    voucherPremium.map((voucher, index) => {
                                        var createdAt = new Date(parseFloat(voucher.createdAt));
                                        var updatedAt = new Date(parseFloat(voucher.updatedAt));
                                        var expiredAt = new Date(parseFloat(voucher.expireAt));
                                        if(today <= voucher.expireAt)
                                        return (
                                            <tr>
                                                <td className='content'>{flagPre++}</td>
                                                <td className='content'>{voucher.id}</td>
                                                <td className='content'>{createdAt.toLocaleString()}</td>
                                                <td className='content'>{updatedAt.toLocaleString()}</td>
                                                <td className='content'>{voucher.name}</td>
                                                <td className='content'>{currencyFormat(voucher.disCount)} VN??</td>
                                                <td className='content'>{currencyFormat(voucher.disCount2)} %</td>
                                                {
                                                    voucher.categoryId !==1 ?voucher.categoryId !==2 ?voucher.categoryId !==3 ?voucher.categoryId !==4 ?voucher.categoryId !==5 ?voucher.categoryId !==6 ?voucher.categoryId !==7?
                                                    <td>
                                                        <td className='content'>T???t c??? s???n ph???m</td>
                                                    </td> 
                                                    :
                                                    <td>
                                                        <td className='content'>Accessory</td>
                                                    </td>
                                                    :
                                                    <td>
                                                        <td className='content'>Trousers</td>
                                                    </td>
                                                    :
                                                    <td>
                                                        <td className='content'>Skirt</td>
                                                    </td>
                                                    :
                                                    <td>
                                                        <td className='content'>Jumpsuit</td>
                                                    </td>
                                                    :
                                                    <td>
                                                        <td className='content'>Shirt</td>
                                                    </td>
                                                    :
                                                    <td>
                                                        <td className='content'>T-Shirt</td>
                                                    </td>
                                                    :
                                                    <td>
                                                        <td className='content'>Dress</td>
                                                    </td>
                                                }
                                                <td className='content'>{currencyFormat(voucher.condition)} ??i???m</td>
                                                <td className='content'>{expiredAt.toLocaleDateString()}</td>
                                                <td className='content'>
                                                    <Popup trigger={<button type="button" className='btn-update btn btn-warning'><div><i className="fas fa-edit"></i></div></button>} modal nested>
                                                        {close => (
                                                            <div>
                                                                <div className="modal-header d-flex justify-content-center">
                                                                    <h4 className="modal-title text-uppercase">C???p Nh???t Voucher</h4>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <div className="container">
                                                                        <div className="row justify-content-center">
                                                                            <div className="col-xl-8 ftco-animate">
                                                                                <form id="checkout-form" className="p-md-1">
                                                                                    <div className="row align-items-end">
                                                                                        <div className="col-md-12">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="fullname">T??n Voucher</label>
                                                                                                <input type="text" value={data.name}
                                                                                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                                                                                    className="form-control"
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-6">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="fullname">Gi???m Gi?? 1 (VN??)</label>
                                                                                                <input type="text" value={data.disCount}
                                                                                                    onChange={(e) => setData({ ...data, disCount: e.target.value })}
                                                                                                    className="form-control"
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-6">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="fullname">Gi???m Gi?? 2 (%)</label>
                                                                                                <input type="text" value={data.disCount2}
                                                                                                    onChange={(e) => setData({ ...data, disCount2: e.target.value })}
                                                                                                    className="form-control"
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-6">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="fullname">Lo???i SP (Gi???m theo %)</label>
                                                                                                <input type="text" value={data.categoryId}
                                                                                                    onChange={(e) => setData({ ...data, categoryId: e.target.value })}
                                                                                                    className="form-control"
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-6">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="fullname">??i???u Ki???n (??i???m)</label>
                                                                                                <input type="text" value={data.condition}
                                                                                                    onChange={(e) => setData({ ...data, condition: e.target.value })}
                                                                                                    className="form-control"
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-6">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="fullname">H???n s??? d???ng</label>
                                                                                                <input
                                                                                                    value={data.expireAt}
                                                                                                    onChange = {(e) => setData({
                                                                                                            ...data,
                                                                                                            expireAt: e.target.value,
                                                                                                        })
                                                                                                    }
                                                                                                    id="birthday"
                                                                                                    name="birthday"
                                                                                                    type="date"
                                                                                                    className="form-control"
                                                                                                    min="1930-01-01"
                                                                                                    required
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
                                                                                id: voucher.id,
                                                                                name: voucher.name,
                                                                                disCount: voucher.disCount,
                                                                                disCount2: voucher.disCount2,
                                                                                categoryId: voucher.categoryId,
                                                                                condition: voucher.condition,
                                                                                expireAt: voucher.expireAt,
                                                                            })
                                                                        }}>
                                                                            L???y D??? Li???u Voucher
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
                                                                    <h6 className="modal-title d-flex justify-content-center">X??c Nh???n X??a Voucher</h6>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button className="btn-light" style={{ outline: 'none' }} onClick={() => handleDeleteVoucher(voucher)}>OK</button>
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
                </table>}
                {showVoucherBirthday && <table class="table mt-2" style={{ display: '"inline-block' }}>
                <thead className="thead-primary">
                            <tr className="text-center">
                                <th scope="col" style={{ width: '5%' }}>STT</th>
                                <th scope="col" style={{ width: '5%' }}>ID</th>
                                <th scope="col" style={{ width: '10%' }}>Ng??y T???o</th>
                                <th scope="col" style={{ width: '10%' }}>Ng??y C???p Nh???t</th>
                                <th scope="col" style={{ width: '36%' }}>T??n</th>
                                <th scope="col" style={{ width: '10%' }}>Gi???m Gi?? (%)</th>
                                <th scope="col" style={{ width: '12%' }}>??i???u Ki???n (??i???m)</th>
                                <th scope="col" style={{ width: '12%' }}>L???a Ch???n</th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    voucherBirthday.map((voucher, index) => {
                                        var createdAt = new Date(parseFloat(voucher.createdAt));
                                        var updatedAt = new Date(parseFloat(voucher.updatedAt));
                                        return (
                                            <tr>
                                                <td className='content'>{flagBD++}</td>
                                                <td className='content'>{voucher.id}</td>
                                                <td className='content'>{createdAt.toLocaleString()}</td>
                                                <td className='content'>{updatedAt.toLocaleString()}</td>
                                                <td className='content'>{voucher.name}</td>
                                                <td className='content'>{currencyFormat(voucher.disCount)} %</td>
                                                <td className='content'>{currencyFormat(voucher.condition)} ??i???m</td>
                                                <td className='content'>
                                                    <Popup trigger={<button type="button" className='btn-update btn btn-warning'><div><i className="fas fa-edit"></i></div></button>} modal nested>
                                                        {close => (
                                                            <div>
                                                                <div className="modal-header d-flex justify-content-center">
                                                                    <h4 className="modal-title text-uppercase">C???p Nh???t Voucher</h4>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <div className="container">
                                                                        <div className="row justify-content-center">
                                                                            <div className="col-xl-8 ftco-animate">
                                                                                <form id="checkout-form" className="p-md-1">
                                                                                    <div className="row align-items-end">
                                                                                        <div className="col-md-12">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="fullname">T??n Voucher</label>
                                                                                                <input type="text" value={data.name}
                                                                                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                                                                                    className="form-control"
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-6">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="fullname">Gi???m Gi?? (%)</label>
                                                                                                <input type="text" value={data.disCount}
                                                                                                    onChange={(e) => setData({ ...data, disCount: e.target.value })}
                                                                                                    className="form-control"
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-6">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="fullname">??i???u Ki???n (??i???m)</label>
                                                                                                <input type="text" value={data.condition}
                                                                                                    onChange={(e) => setData({ ...data, condition: e.target.value })}
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
                                                                                id: voucher.id,
                                                                                name: voucher.name,
                                                                                disCount: voucher.disCount,
                                                                                condition: voucher.condition,
                                                                            })
                                                                        }}>
                                                                            L???y D??? Li???u Voucher
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
                                                                    <h6 className="modal-title d-flex justify-content-center">X??c Nh???n X??a Voucher</h6>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button className="btn-light" style={{ outline: 'none' }} onClick={() => handleDeleteVoucher(voucher)}>OK</button>
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
                    </table>}
                    {showVoucherExpired && <table className="table mt-2" style={{ display: '"inline-block' }}>
                <thead className="thead-primary">
                            <tr className="text-center">
                                <th scope="col" style={{ width: '5%' }}>STT</th>
                                <th scope="col" style={{ width: '5%' }}>ID</th>
                                <th scope="col" style={{ width: '10%' }}>Ng??y T???o</th>
                                <th scope="col" style={{ width: '10%' }}>Ng??y C???p Nh???t</th>
                                <th scope="col" style={{ width: '20%' }}>T??n</th>
                                <th scope="col" style={{ width: '10%' }}>Gi???m Gi?? 1 (VN??)</th>
                                <th scope="col" style={{ width: '10%' }}>Gi???m Gi?? 2 (%)</th>
                                <th scope="col" style={{ width: '9%' }}>??i???u Ki???n</th>
                                <th scope="col" style={{ width: '8%' }}>Ng??y H???t H???n</th>                                
                                <th scope="col" style={{ width: '8%' }}>Lo???i Voucher</th>
                                <th scope="col" style={{ width: '5%' }}>T??y ch???n</th>
                            </tr>
                        </thead>
                        <tbody>
                                { 
                                    voucher.map((voucher, index) => {
                                        var createdAt = new Date(parseFloat(voucher.createdAt));
                                        var updatedAt = new Date(parseFloat(voucher.updatedAt));
                                        var expiredAt = new Date(parseFloat(voucher.expireAt));
                                        
                                        if(today > voucher.expireAt)
                                        return (
                                            <tr>
                                                <td className='content'>{flagEx++}</td>
                                                <td className='content'>{voucher.id}</td>
                                                <td className='content'>{createdAt.toLocaleString()}</td>
                                                <td className='content'>{updatedAt.toLocaleString()}</td>
                                                <td className='content'>{voucher.name}</td>
                                                <td className='content'>{currencyFormat(voucher.disCount)} VN??</td>
                                                <td className='content'>{voucher.disCount2} %</td>
                                                <td className='content'>{currencyFormat(voucher.condition)} VN??</td>
                                                <td className='content'>{expiredAt.toLocaleDateString()}</td>
                                                <td className='content'>Voucher</td>
                                                <td className='content'>
                                                    <Popup trigger={<button className="btn-remove btn btn-danger btn-sm px-3 mt-2 fas fa-trash-alt" style={{ outline: 'none' }}></button>} modal nested>
                                                        {close => (
                                                            <div>
                                                                <div className="modal-header text-uppercase" style={{ background: '#ffc107' }}>
                                                                    <h6 className="modal-title d-flex justify-content-center">X??c Nh???n X??a Voucher</h6>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button className="btn-light" style={{ outline: 'none' }} onClick={() => {
                                                                                                                                                deleteVoucher({
                                                                                                                                                    variables: {
                                                                                                                                                        deleteVoucherId: voucher.id
                                                                                                                                                    }
                                                                                                                                                })
                                                                                                                                                removeVoucher(voucher.id);
                                                                                                                                            }
                                                                                                                                            }>OK</button>
                                                                    <button className="btn-light" style={{ outline: 'none' }} onClick={close}>H???y</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Popup></td>
                                            </tr>
                                        )
                                    })
                                }
                                {
                                    voucherPremium.map((voucher, index) => {
                                        var createdAt = new Date(parseFloat(voucher.createdAt));
                                        var updatedAt = new Date(parseFloat(voucher.updatedAt));
                                        var expiredAt = new Date(parseFloat(voucher.expireAt));
                                        
                                        if(today > voucher.expireAt)
                                        return (
                                            <tr>
                                                <td className='content'>{flagEx++}</td>
                                                <td className='content'>{voucher.id}</td>
                                                <td className='content'>{createdAt.toLocaleString()}</td>
                                                <td className='content'>{updatedAt.toLocaleString()}</td>
                                                <td className='content'>{voucher.name}</td>
                                                <td className='content'>{currencyFormat(voucher.disCount)} VN??</td>
                                                <td className='content'>{voucher.disCount2} %</td>
                                                <td className='content'>{currencyFormat(voucher.condition)} ??i???m</td>
                                                <td className='content'>{expiredAt.toLocaleDateString()}</td>
                                                <td className='content'>Voucher Premium</td>
                                                <td className='content'>
                                                    <Popup trigger={<button className="btn-remove btn btn-danger btn-sm px-3 mt-2 fas fa-trash-alt" style={{ outline: 'none' }}></button>} modal nested>
                                                        {close => (
                                                            <div>
                                                                <div className="modal-header text-uppercase" style={{ background: '#ffc107' }}>
                                                                    <h6 className="modal-title d-flex justify-content-center">X??c Nh???n X??a Voucher</h6>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button className="btn-light" style={{ outline: 'none' }} onClick={() => {
                                                                                                                                                deleteVoucherPremium({
                                                                                                                                                    variables: {
                                                                                                                                                        deleteVoucherPremiumId: voucher.id
                                                                                                                                                    }
                                                                                                                                                })
                                                                                                                                                removeVoucherPremium(voucher.id);
                                                                                                                                            }
                                                                                                                                            }>OK</button>
                                                                    <button className="btn-light" style={{ outline: 'none' }} onClick={close}>H???y</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Popup></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>

                </table>}
                <ToastContainer />
            </section>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        voucher: state.Voucher,
        voucherPremium: state.VoucherPremium,
        voucherBirthday: state.VoucherBirthday
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addVoucher: (voucher) => dispatch(addVoucher(voucher)),
        updateVoucher: (id, data) => dispatch(updateVoucher(id, data)),
        removeVoucher: (id) => dispatch(removeVoucher(id)),
        addVoucherPremium: (voucher) => dispatch(addVoucherPremium(voucher)),
        updateVoucherPremium: (id, data) => dispatch(updateVoucherPremium(id, data)),
        removeVoucherPremium: (id) => dispatch(removeVoucherPremium(id)),
        addVoucherBirthday: (voucher) => dispatch(addVoucherBirthday(voucher)),
        updateVoucherBirthday: (id, data) => dispatch(updateVoucherBirthday(id, data)),
        removeVoucherBirthday: (id) => dispatch(removeVoucherBirthday(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Voucher)