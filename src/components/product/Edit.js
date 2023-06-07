import {Button, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {editProduct, getProduct} from "../../services/productService";

const Edit = (props) => {
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const { show, handleClose, dataProductEdit, handleUpdateProduct } = props;
    const [name, setName] = useState("");
    const [displacementVehicle, setDisplacementVehicle] = useState("");
    const [price, setPrice] = useState("");
    const [discription, setDiscription] = useState("");

    const handleEditProduct = async () => {
        const editedProduct = {
            id: dataProductEdit.id,
            displacementVehicle:displacementVehicle,
            name: name,
            price: price,
            discription: discription,

        };
        let res = await dispatch(editProduct(editedProduct));
        if (res) {
            handleUpdateProduct({
                id: dataProductEdit.id,
                name: name,
                displacementVehicle:displacementVehicle,
                price: price,
                discription: discription,
            });
            handleClose();
            navigate("/");
            dispatch(getProduct())

        } else {
            alert("Có lỗi xảy ra khi chỉnh sửa sản phẩm!");
        }
    };

    useEffect(() => {
        if (show) {
            setName(dataProductEdit.name);
            setDisplacementVehicle(dataProductEdit.displacementVehicle)
            setPrice(dataProductEdit.price);
            setDiscription(dataProductEdit.discription);

        }
    }, [dataProductEdit]);


    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit new Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">DisplacementVehicle</label>
                        <input
                            type="text"
                            className="form-control"
                            value={displacementVehicle}
                            onChange={(event) => setDisplacementVehicle(event.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={discription}
                            onChange={(event) => setDiscription(event.target.value)}
                        />
                    </div>



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditProduct}>
                        Luu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Edit;