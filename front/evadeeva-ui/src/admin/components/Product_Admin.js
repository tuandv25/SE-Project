import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useMutation, gql } from "@apollo/client";
import { updateProduct, removeProduct, addProduct } from "../../actions/product";
import Popup from 'reactjs-popup';
import { ToastContainer, toast } from 'react-toastify';
import Header from "../../components/HomeComponents/Header";
import LoadingPage from "../../pages/PageLoading";
import "../../assets/style/style.css"
import 'reactjs-popup/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import currencyFormat from "../../utils/displayPrice";

const DELETE_PRODUCT = gql`
    mutation DeleteProduct($deleteProductId: Int!) {
        deleteProduct(id: $deleteProductId) {
            id
            name
            description
            categoryId
            img_1
            img_2
            updatedAt
            createdAt
            price
            codePro
            size_M
            size_S
            size_L
            size_XL
            material
            color
            publish
            newPro
        }
    }
`
const UPDATE_PRODUCT = gql`
    mutation UpdateProduct($data: updateProductInput!, $proId: Int!) {
        updateProduct(data: $data, proId: $proId) {
            id
            name
            description
            categoryId
            img_1
            img_2
            updatedAt
            createdAt
            price
            codePro
            size_M
            size_S
            size_L
            size_XL
            material
            color
            publish
            newPro
        }
    }
`
const ADD_PRODUCT = gql`
    mutation Mutation($data: createProductInput!) {
        createProduct(data: $data) {
            id
            name
            description
            categoryId
            img_1
            img_2
            updatedAt
            createdAt
            price
            codePro
            size_M
            size_S
            size_L
            size_XL
            material
            color
            publish
            newPro
        }
    }
`
const ManagerProduct = ({ Product, addProduct, removeProduct, updateProduct }) => {
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState({
        name: '',
        description: '',
        categoryId: 1,
        img_1: '',
        img_2: '',
        price: 0,
        codePro: '',
        size_M: 0,
        size_S: 0,
        size_L: 0,
        size_XL: 0,
        material: '',
        color: ''
    })
    const [add, statusAdd] = useMutation(ADD_PRODUCT, {
        onCompleted: (data) => {
            addProduct(data.createProduct)
        }
    });

    const handleAddProduct = async () => {
        setIsLoading(true);
        await add({
            variables: {
                data: {
                    ...data,
                    categoryId: parseInt(data.categoryId),
                    size_M: parseInt(data.size_M),
                    size_S: parseInt(data.size_S),
                    size_L: parseInt(data.size_L),
                    size_XL: parseInt(data.size_XL),
                    price: parseInt(data.price),
                    publish: false,
                    newPro: true,
                }
            }
        })
        setData({
            name: "",
            description: "",
            categoryId: 1,
            img_1: "",
            img_2: "",
            price: 0,
            codePro: "",
            size_M: 0,
            size_S: 0,
            size_L: 0,
            size_XL: 0,
            material: "",
            color: ""
        })
        setIsLoading(false);
        toast.success("Đã thêm sản phẩm vào cửa hàng")
    }

    const [update, statusUpdate] = useMutation(UPDATE_PRODUCT, {
        onCompleted: (data) => {
            updateProduct(data.updateProduct.id, data.updateProduct)
        }
    });

    const handleUpdateProduct = async (Product) => {
        setIsLoading(true);
        await update({
            variables: {
                data: {
                    name: Product.name,
                    description: Product.description,
                    categoryId: parseInt(Product.categoryId, 10),
                    img_1: Product.img_1,
                    img_2: Product.img_2,
                    price: parseInt(Product.price, 10),
                    codePro: Product.codePro,
                    size_M: parseInt(Product.size_M, 10),
                    size_S: parseInt(Product.size_S, 10),
                    size_L: parseInt(Product.size_L, 10),
                    size_XL: parseInt(Product.size_XL, 10),
                    material: Product.material,
                    color: Product.color,
                    publish: false,
                    newPro: false
                },
                proId: parseInt(Product.id, 10)
            }
        })
        setData({
            name: "",
            description: "",
            categoryId: 1,
            img_1: "",
            img_2: "",
            price: 0,
            codePro: "",
            size_M: 0,
            size_S: 0,
            size_L: 0,
            size_XL: 0,
            material: "",
            color: ""
        })
        setIsLoading(false);
        toast.success("Sản phẩm đã được thay đổi")
    }

    const [deleteProduct] = useMutation(DELETE_PRODUCT);
    const handleRemoveProduct = async (Product) => {
        setIsLoading(true);
        await deleteProduct({
            variables: {
                deleteProductId: Product.id
            }
        })
        removeProduct(Product.id);
        setIsLoading(false);
        toast.success("Xóa thành công")
    }

    const onClickButton = (isUpdate, Product) => {
        if (!data.name || !data.codePro || !data.description || !data.categoryId || !data.img_1 || !data.img_2
            || !data.price || !data.size_M || !data.size_S || !data.size_L || !data.size_XL || !data.material || !data.color) {
            toast.warning("Vui lòng điền đầy đủ các trường")
        } else {
            if (isUpdate) {
                handleUpdateProduct(Product);
            } else handleAddProduct();
        }
    }

    const [inputSearch, setInputSearch] = useState('')
    const [showResult, setShowResult] = useState(false)
    const resultArray = Product.filter((item) => {
        return item.name.toLowerCase().indexOf(inputSearch.toLowerCase()) !== -1
    })
    useEffect(() => {
        if (inputSearch.length > 0) {
            setShowResult(true)
        }
        else (
            setShowResult(false)
        )
    }, [inputSearch.length])

    const handleInputSearch = (e) => {
        setInputSearch(e)
    }

    if (isLoading) return <LoadingPage />;

    return (
        <div>
            <Header />
            <section className="ftco-section">
                <div>
                    <div className="float-right mr-5">
                        <Popup trigger={<button type="button" className='btn-add btn btn-success'><div><i className="fas fa-plus" /> Thêm Mới</div></button>} modal nested>
                            {close => (
                                <div>
                                    <div className="modal-header d-flex justify-content-center">
                                        <h4 className="modal-title text-uppercase">Thêm Sản Phẩm</h4>
                                    </div>
                                    <div className="modal-body">
                                        <div className="container">
                                            <div className="row justify-content-center">
                                                <div className="col-xl-8 ftco-animate">
                                                    <form id="checkout-form" className="p-md-1">
                                                        <div className="row align-items-end">
                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="fullname">Tên Sản Phẩm</label>
                                                                    <input
                                                                        value={data.name}
                                                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                                                        type="text"
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                    <span className="form-message"></span>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="code">Miêu Tả</label>
                                                                    <input
                                                                        value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })}
                                                                        type="text"
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                    <span className="form-message"></span>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="code">Mã Sản Phẩm</label>
                                                                    <input
                                                                        value={data.codePro} onChange={(e) => setData({ ...data, codePro: e.target.value })}
                                                                        type="text"
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                    <span className="form-message"></span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="code">Loại SP</label>
                                                                    <input
                                                                        value={data.categoryId} onChange={(e) => setData({ ...data, categoryId: e.target.value })}
                                                                        type="text"
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                    <span className="form-message"></span>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="code">Ảnh 1</label>
                                                                    <input
                                                                        value={data.img_1} onChange={(e) => setData({ ...data, img_1: e.target.value })}
                                                                        type="text"
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                    <span className="form-message"></span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="code">Ảnh 2</label>
                                                                    <input
                                                                        value={data.img_2} onChange={(e) => setData({ ...data, img_2: e.target.value })}
                                                                        type="text"
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                    <span className="form-message"></span>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label htmlFor="code">Giá</label>
                                                                    <input
                                                                        value={data.price} onChange={(e) => setData({ ...data, price: e.target.value })}
                                                                        type="text"
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                    <span className="form-message"></span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label htmlFor="code">Chất Liệu</label>
                                                                    <input
                                                                        value={data.material} onChange={(e) => setData({ ...data, material: e.target.value })}
                                                                        type="text"
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                    <span className="form-message"></span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label htmlFor="code">Màu Sắc</label>
                                                                    <input
                                                                        value={data.color} onChange={(e) => setData({ ...data, color: e.target.value })}
                                                                        type="text"
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                    <span className="form-message"></span>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label htmlFor="code">Size S</label>
                                                                    <input
                                                                        type="text" value={data.size_S} onChange={(e) => setData({ ...data, size_S: e.target.value })}
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                    <span className="form-message"></span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label htmlFor="code">Size M</label>
                                                                    <input
                                                                        type="text" value={data.size_M} onChange={(e) => setData({ ...data, size_M: e.target.value })}
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                    <span className="form-message"></span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label htmlFor="code">Size L</label>
                                                                    <input
                                                                        type="text" value={data.size_L} onChange={(e) => setData({ ...data, size_L: e.target.value })}
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                    <span className="form-message"></span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label htmlFor="code">Size XL</label>
                                                                    <input
                                                                        type="text"
                                                                        value={data.size_XL} onChange={(e) => setData({ ...data, size_XL: e.target.value })}
                                                                        className="form-control"
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
                                                    id: "",
                                                    name: "",
                                                    description: "",
                                                    categoryId: "",
                                                    img_1: "",
                                                    img_2: "",
                                                    price: "",
                                                    codePro: "",
                                                    size_M: "",
                                                    size_S: "",
                                                    size_L: "",
                                                    size_XL: "",
                                                    material: "",
                                                    color: ""
                                                })
                                            }}>
                                                Reset
                                            </button>
                                            <button className="ml-3 px-3 py-1 btn-success"
                                                onClick={() => {
                                                    onClickButton(false, data)
                                                }}
                                            >Add</button>
                                            <button className="ml-3 px-3 py-1 btn-danger"
                                                onClick={close}
                                            >Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Popup>
                    </div>
                    <div className="float-right mr-5">
                        <div className="search-box-wrapper mb-2">
                            <form action="search" className="d-flex justify-content-start">
                                <input required type="text"
                                    className="search-input ml-2"
                                    autoFocus={true}
                                    placeholder="Tìm Kiếm"
                                    value={inputSearch}
                                    onChange={(e) => { handleInputSearch(e.target.value) }}
                                />
                                <button type="submit" value="" className="btn-search fas fa-search submit" />
                            </form>
                        </div>
                    </div>
                </div>
                <div className="table-product">
                    <table className="table">
                        <thead className="thead-primary">
                            <tr className="text-center">
                                <th>STT</th>
                                <th>ID</th>
                                <th>Ngày Tạo</th>
                                <th>Ngày Cập Nhật</th>
                                <th>Tên Sản Phẩm</th>
                                <th>Mã</th>
                                <th>Miêu Tả</th>
                                <th>Loại</th>
                                <th>Ảnh 1</th>
                                <th>Ảnh 2</th>
                                <th>Giá</th>
                                <th>Size M</th>
                                <th>Size S</th>
                                <th>Size L</th>
                                <th>Size XL</th>
                                <th>Chất Liệu</th>
                                <th>Màu Sắc</th>
                                <th>Lựa Chọn</th>
                            </tr>
                        </thead>
                        {showResult ? resultArray.length !== 0 ?
                            <tbody className="table-body">
                                {
                                    resultArray.map((item, index) => {
                                        var createdAt = new Date(parseFloat(item.createdAt));
                                        var updatedAt = new Date(parseFloat(item.updatedAt));
                                        return (
                                            <tr key={index}>
                                                <td className='content'>{index + 1}</td>
                                                <td className='content'>{item.id}</td>
                                                <td className='content'>{createdAt.toLocaleString()}</td>
                                                <td className='content'>{updatedAt.toLocaleString()}</td>
                                                <td className='content'>{item.name}</td>
                                                <td className='content'>{item.codePro}</td>
                                                <td className='content'>{item.description}</td>
                                                <td className='content'>{item.categoryId}</td>
                                                <td className='content' style={{ width: '8%' }}><img style={{ width: '100%' }} src={item.img_1} alt="" /></td>
                                                <td className='content' style={{ width: '8%' }}><img style={{ width: '100%' }} src={item.img_2} alt="" /></td>
                                                <td className='content'>{currencyFormat(item.price)}</td>
                                                <td className='content'>{item.size_M}</td>
                                                <td className='content'>{item.size_S}</td>
                                                <td className='content'>{item.size_L}</td>
                                                <td className='content'>{item.size_XL}</td>
                                                <td className='content'>{item.material}</td>
                                                <td className='content'>{item.color}</td>
                                                <td className='content' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                                                    {/* Update */}
                                                    <Popup trigger={<button type="button" className='btn-update btn btn-warning'><i className="fas fa-edit"></i></button>} modal nested>
                                                        {close => (
                                                            <div>
                                                                <div className="modal-header d-flex justify-content-center">
                                                                    <h4 className="modal-title text-uppercase">Cập Nhật Sản Phẩm</h4>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <div className="container">
                                                                        <div className="row justify-content-center">
                                                                            <div className="col-xl-8 ftco-animate">
                                                                                <form id="checkout-form" className="p-md-1">
                                                                                    <div className="row align-items-end">
                                                                                        <div className="col-md-12">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="fullname">Tên Sản Phẩm</label>
                                                                                                <input
                                                                                                    value={data.name}
                                                                                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                                                                                    type="text"
                                                                                                    className="form-control"
                                                                                                    required
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-12">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="code">Miêu Tả</label>
                                                                                                <input
                                                                                                    value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })}
                                                                                                    type="text"
                                                                                                    className="form-control"
                                                                                                    required
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-6">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="code">Mã Sản Phẩm</label>
                                                                                                <input
                                                                                                    value={data.codePro} onChange={(e) => setData({ ...data, codePro: e.target.value })}
                                                                                                    type="text"
                                                                                                    className="form-control"
                                                                                                    required
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-6">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="code">Loại SP</label>
                                                                                                <input
                                                                                                    value={data.categoryId} onChange={(e) => setData({ ...data, categoryId: e.target.value })}
                                                                                                    type="text"
                                                                                                    className="form-control"
                                                                                                    required
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-6">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="code">Ảnh 1</label>
                                                                                                <input
                                                                                                    value={data.img_1} onChange={(e) => setData({ ...data, img_1: e.target.value })}
                                                                                                    type="text"
                                                                                                    className="form-control"
                                                                                                    required
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-6">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="code">Ảnh 2</label>
                                                                                                <input
                                                                                                    value={data.img_2} onChange={(e) => setData({ ...data, img_2: e.target.value })}
                                                                                                    type="text"
                                                                                                    className="form-control"
                                                                                                    required
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-4">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="code">Giá</label>
                                                                                                <input
                                                                                                    value={data.price} onChange={(e) => setData({ ...data, price: e.target.value })}
                                                                                                    type="text"
                                                                                                    className="form-control"
                                                                                                    required
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-4">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="code">Chất Liệu</label>
                                                                                                <input
                                                                                                    value={data.material} onChange={(e) => setData({ ...data, material: e.target.value })}
                                                                                                    type="text"
                                                                                                    className="form-control"
                                                                                                    required
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-4">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="code">Màu Sắc</label>
                                                                                                <input
                                                                                                    value={data.color} onChange={(e) => setData({ ...data, color: e.target.value })}
                                                                                                    type="text"
                                                                                                    className="form-control"
                                                                                                    required
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-md-3">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="code">Size S</label>
                                                                                                <input
                                                                                                    type="text" value={data.size_S} onChange={(e) => setData({ ...data, size_S: e.target.value })}
                                                                                                    className="form-control"
                                                                                                    required
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-3">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="code">Size M</label>
                                                                                                <input
                                                                                                    type="text" value={data.size_M} onChange={(e) => setData({ ...data, size_M: e.target.value })}
                                                                                                    className="form-control"
                                                                                                    required
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-3">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="code">Size L</label>
                                                                                                <input
                                                                                                    type="text" value={data.size_L} onChange={(e) => setData({ ...data, size_L: e.target.value })}
                                                                                                    className="form-control"
                                                                                                    required
                                                                                                />
                                                                                                <span className="form-message"></span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-3">
                                                                                            <div className="form-group">
                                                                                                <label htmlFor="code">Size XL</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    value={data.size_XL} onChange={(e) => setData({ ...data, size_XL: e.target.value })}
                                                                                                    className="form-control"
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
                                                                                id: item.id,
                                                                                name: item.name,
                                                                                description: item.description,
                                                                                categoryId: item.categoryId,
                                                                                img_1: item.img_1,
                                                                                img_2: item.img_2,
                                                                                price: item.price,
                                                                                codePro: item.codePro,
                                                                                size_M: item.size_M,
                                                                                size_S: item.size_S,
                                                                                size_L: item.size_L,
                                                                                size_XL: item.size_XL,
                                                                                material: item.material,
                                                                                color: item.color
                                                                            })
                                                                        }}>
                                                                            Get Old Data
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
                                                    {/* Delete */}
                                                    <Popup trigger={<button className="btn-remove btn btn-danger btn-sm px-3 mt-2 fas fa-trash-alt" style={{ outline: 'none' }}></button>} modal nested>
                                                        {close => (
                                                            <div>
                                                                <div className="modal-header text-uppercase" style={{ background: '#ffc107' }}>
                                                                    <h6 className="modal-title d-flex justify-content-center">Xác Nhận Xóa Sản Phẩm</h6>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button className="btn-light" style={{ outline: 'none' }} onClick={() => {
                                                                        handleRemoveProduct(item)
                                                                    }}>OK</button>
                                                                    <button className="btn-light" style={{ outline: 'none' }} onClick={close}>Hủy</button>
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
                            : <span><h6 className="mx-2 my-2">Không tìm thấy sản phẩm</h6></span> :
                            <tbody>
                                {/* List Product */}
                                {Product.map((item, index) => {
                                    var createdAt = new Date(parseFloat(item.createdAt));
                                    var updatedAt = new Date(parseFloat(item.updatedAt));
                                    return (
                                        <tr>
                                            <td className='content'>{index + 1}</td>
                                            <td className='content'>{item.id}</td>
                                            <td className='content'>{createdAt.toLocaleString()}</td>
                                            <td className='content'>{updatedAt.toLocaleString()}</td>
                                            <td className='content'>{item.name}</td>
                                            <td className='content'>{item.codePro}</td>
                                            <td className='content'>{item.description}</td>
                                            <td className='content'>{item.categoryId}</td>
                                            <td className='content' style={{ width: '8%' }}><img src={item.img_1} style={{ width: '100%' }} alt="" /></td>
                                            <td className='content' style={{ width: '8%' }}><img src={item.img_2} style={{ width: '100%' }} alt="" /></td>
                                            <td className='content'>{currencyFormat(item.price)}</td>
                                            <td className='content'>{item.size_M}</td>
                                            <td className='content'>{item.size_S}</td>
                                            <td className='content'>{item.size_L}</td>
                                            <td className='content'>{item.size_XL}</td>
                                            <td className='content'>{item.material}</td>
                                            <td className='content'>{item.color}</td>
                                            <td className='content' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                                                {/* Update */}
                                                <Popup trigger={<button type="button" className='btn-update btn btn-warning'><i className="fas fa-edit"></i></button>} modal nested>
                                                    {close => (
                                                        <div>
                                                            <div className="modal-header d-flex justify-content-center">
                                                                <h4 className="modal-title text-uppercase">Cập Nhật Sản Phẩm</h4>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className="container">
                                                                    <div className="row justify-content-center">
                                                                        <div className="col-xl-8 ftco-animate">
                                                                            <form id="checkout-form" className="p-md-1">
                                                                                <div className="row align-items-end">
                                                                                    <div className="col-md-12">
                                                                                        <div className="form-group">
                                                                                            <label htmlFor="fullname">Tên Sản Phẩm</label>
                                                                                            <input
                                                                                                value={data.name}
                                                                                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                required
                                                                                            />
                                                                                            <span className="form-message"></span>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="col-md-12">
                                                                                        <div className="form-group">
                                                                                            <label htmlFor="code">Miêu Tả</label>
                                                                                            <input
                                                                                                value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })}
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                required
                                                                                            />
                                                                                            <span className="form-message"></span>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="col-md-6">
                                                                                        <div className="form-group">
                                                                                            <label htmlFor="code">Mã Sản Phẩm</label>
                                                                                            <input
                                                                                                value={data.codePro} onChange={(e) => setData({ ...data, codePro: e.target.value })}
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                required
                                                                                            />
                                                                                            <span className="form-message"></span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-6">
                                                                                        <div className="form-group">
                                                                                            <label htmlFor="code">Loại SP</label>
                                                                                            <input
                                                                                                value={data.categoryId} onChange={(e) => setData({ ...data, categoryId: e.target.value })}
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                required
                                                                                            />
                                                                                            <span className="form-message"></span>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="col-md-6">
                                                                                        <div className="form-group">
                                                                                            <label htmlFor="code">Ảnh 1</label>
                                                                                            <input
                                                                                                value={data.img_1} onChange={(e) => setData({ ...data, img_1: e.target.value })}
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                required
                                                                                            />
                                                                                            <span className="form-message"></span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-6">
                                                                                        <div className="form-group">
                                                                                            <label htmlFor="code">Ảnh 2</label>
                                                                                            <input
                                                                                                value={data.img_2} onChange={(e) => setData({ ...data, img_2: e.target.value })}
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                required
                                                                                            />
                                                                                            <span className="form-message"></span>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="col-md-4">
                                                                                        <div className="form-group">
                                                                                            <label htmlFor="code">Giá</label>
                                                                                            <input
                                                                                                value={data.price} onChange={(e) => setData({ ...data, price: e.target.value })}
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                required
                                                                                            />
                                                                                            <span className="form-message"></span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <div className="form-group">
                                                                                            <label htmlFor="code">Chất Liệu</label>
                                                                                            <input
                                                                                                value={data.material} onChange={(e) => setData({ ...data, material: e.target.value })}
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                required
                                                                                            />
                                                                                            <span className="form-message"></span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <div className="form-group">
                                                                                            <label htmlFor="code">Màu Sắc</label>
                                                                                            <input
                                                                                                value={data.color} onChange={(e) => setData({ ...data, color: e.target.value })}
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                required
                                                                                            />
                                                                                            <span className="form-message"></span>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="col-md-3">
                                                                                        <div className="form-group">
                                                                                            <label htmlFor="code">Size S</label>
                                                                                            <input
                                                                                                type="text" value={data.size_S} onChange={(e) => setData({ ...data, size_S: e.target.value })}
                                                                                                className="form-control"
                                                                                                required
                                                                                            />
                                                                                            <span className="form-message"></span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-3">
                                                                                        <div className="form-group">
                                                                                            <label htmlFor="code">Size M</label>
                                                                                            <input
                                                                                                type="text" value={data.size_M} onChange={(e) => setData({ ...data, size_M: e.target.value })}
                                                                                                className="form-control"
                                                                                                required
                                                                                            />
                                                                                            <span className="form-message"></span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-3">
                                                                                        <div className="form-group">
                                                                                            <label htmlFor="code">Size L</label>
                                                                                            <input
                                                                                                type="text" value={data.size_L} onChange={(e) => setData({ ...data, size_L: e.target.value })}
                                                                                                className="form-control"
                                                                                                required
                                                                                            />
                                                                                            <span className="form-message"></span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-3">
                                                                                        <div className="form-group">
                                                                                            <label htmlFor="code">Size XL</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                value={data.size_XL} onChange={(e) => setData({ ...data, size_XL: e.target.value })}
                                                                                                className="form-control"
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
                                                                            id: item.id,
                                                                            name: item.name,
                                                                            description: item.description,
                                                                            categoryId: item.categoryId,
                                                                            img_1: item.img_1,
                                                                            img_2: item.img_2,
                                                                            price: item.price,
                                                                            codePro: item.codePro,
                                                                            size_M: item.size_M,
                                                                            size_S: item.size_S,
                                                                            size_L: item.size_L,
                                                                            size_XL: item.size_XL,
                                                                            material: item.material,
                                                                            color: item.color
                                                                        })
                                                                    }}>
                                                                        Get Old Data
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
                                                {/* Delete */}
                                                <Popup trigger={<button className="btn-remove btn btn-danger btn-sm px-3 mt-2 fas fa-trash-alt" style={{ outline: 'none' }}></button>} modal nested>
                                                    {close => (
                                                        <div>
                                                            <div className="modal-header text-uppercase" style={{ background: '#ffc107' }}>
                                                                <h6 className="modal-title d-flex justify-content-center">Xác Nhận Xóa Sản Phẩm</h6>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button className="btn-light" style={{ outline: 'none' }} onClick={() => {
                                                                    handleRemoveProduct(item)
                                                                }}>OK</button>
                                                                <button className="btn-light" style={{ outline: 'none' }} onClick={close}>Hủy</button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Popup>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        }
                    </table>
                </div>
            </section>
            <ToastContainer />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        Product: state.Product,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProduct: (id, data) => dispatch(updateProduct(id, data)),
        addProduct: (data) => dispatch(addProduct(data)),
        removeProduct: (id) => dispatch(removeProduct(id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManagerProduct);