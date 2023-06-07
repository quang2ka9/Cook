import {Button, Modal} from "react-bootstrap";
import {useState} from "react";
import {addProduct} from "../../services/productService";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const Add = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const {show, handleClose} = props;
    const [name, setName] = useState("");
    const [displacementVehicle, setDisplacementVehicle] = useState("");
    const [price, setPrice] = useState("");
    const [discription, setDiscription] = useState("");


    const handleSaveProduct = async () => {


        let abc = {
            name: name,
            displacementVehicle: displacementVehicle,
            price: price,
            discription: discription,
        }
        console.log(abc,666)

        let data = await dispatch(addProduct(abc));
        if (data) {
            setName("");
            setPrice("");
            setDisplacementVehicle("")
            setDiscription("");
            handleClose();
            navigate("/")

        } else {

        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <div className="body-add-new">
                            <lable className="form-label">Name</lable>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>

                        <div className="body-add-new">
                            <lable className="form-label">DisplacementVehicle</lable>
                            <input
                                type="text"
                                className="form-control"
                                value={displacementVehicle}
                                onChange={(event) => setDisplacementVehicle(event.target.value)}
                            />
                        </div>


                        <div className="body-add-new">
                            <lable className="form-label">Price</lable>
                            <input
                                type="text"
                                className="form-control"
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                            />
                        </div>

                        <div className="body-add-new">
                            <lable className="form-label">Description</lable>
                            <input
                                type="text"
                                className="form-control"
                                value={discription}
                                onChange={(event) => setDiscription(event.target.value)}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveProduct()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default Add;