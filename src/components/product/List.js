import "./List.css"
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, findProductById, getProduct, searchProduct} from "../../services/productService";
import {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Add from "./Add";
import Edit from "./Edit";

import {Form} from "react-bootstrap";


const List = () => {
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [dataProductEdit, setDataProductEdit] = useState({});

    const [name, setName] = useState('')

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setShowEditModal(false);

    };

    const dispatch = useDispatch();


    const products = useSelector((state) => {
         return state.products.list.products
    });

    const handleUpdateProduct = (product) => {
        const clonedProducts = [...products];
        const index = clonedProducts.findIndex((item) => item.id === product.id);
        if (index >= 0) {
            clonedProducts[index] = product;
            dispatch(getProduct(clonedProducts));
        }
    };

    const handleEditProduct = (product) => {
        setDataProductEdit(product);
        setShowEditModal(true);
    };


    let handleInput = (e) =>{

        setName(e.target.value)
    };

    let handleSearch = async (event) =>{
        event.preventDefault();
        let abc = await dispatch(searchProduct(name))
        setName("")
    };

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);
    return(
        <>
            <h1> Danh sách sản phẩm</h1>
            <Form>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm sản phẩm ..."
                    value={name}
                    onChange={handleInput}/>
                <button type="submit" onClick={handleSearch}>Tìm kiếm</button>
            </Form>

            <button className="btn btn-warning"
                    onClick={() => setIsShowModalAddNew(true)}
            > + Thêm Mới </button>

            <table style={{marginTop:20}}>
                <tr>
                    <th>name</th>
                    <th>displacementVehicle</th>
                    <th>price</th>
                    <th>discription</th>
                </tr>
                {products && products.map(item => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.displacementVehicle}</td>
                        <td>{item.price}</td>
                        <td>{item.discription}</td>
                        <button
                            className="btn btn-danger"
                            onClick={() => dispatch(deleteProduct(item.id))}
                        >Xóa
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={() => handleEditProduct(item)}
                        >
                          Sửa
                        </button>

                    </tr>

                ))}



            </table>
            <Add show={isShowModalAddNew}
                 handleClose={handleClose}
            />

            <Edit
                show={showEditModal}
                dataProductEdit={dataProductEdit}
                handleClose={handleClose}
                handleUpdateProduct={handleUpdateProduct}
            />


        </>
    )
}

export default List