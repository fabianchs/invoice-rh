import React, { useState, useEffect } from "react";
import { Input } from "reactstrap";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
    const [product, setProduct] = useState([""]);
    const [amount, setAmount] = useState(["1"]);
    const [price, setPrice] = useState(["0"]);

    const [renderedEditor, setRenderedEditor] = useState("");

    function editProduct(e, index) {
        let aux_product=product;

        aux_product[index]=e.target.value;

        setProduct(aux_product);

        createInputs();
    }
    function editAmount(e, index) {
        //
    }
    function editPrice(e, index) {
        //
    }

    function addToArrays() {
        let elements = [product, amount, price];

        elements[0].push("");
        elements[1].push("0");
        elements[2].push("1");

        setProduct(elements[0]);
        setAmount(elements[1]);
        setPrice(elements[2]);

        createInputs();
    }

    function deleteFromArrays() {
        let elements = [product, amount, price];

        elements[0].splice(-1, 1);
        elements[1].splice(-1, 1);
        elements[2].splice(-1, 1);

        setProduct(elements[0]);
        setAmount(elements[1]);
        setPrice(elements[2]);

        createInputs();
    }

    function createInputs() {
        const list_inputs = product.map((element, index) => (
            <div
                key={index}
                className="row container-fluid d-flex justify-content-between">
                <div className="col-6 p-1">
                    <Input
                        type="text"
                        name="text"
                        placeholder="Producto"
                        className="border-dark bg-transparent"
                        defaultValue={element}
                    />
                </div>
                <div className="col-3 p-1">
                    <Input
                        type="text"
                        name="text"
                        placeholder="Cantidad"
                        className="border-dark bg-transparent"
                        defaultValue={amount[index]}
                    />
                </div>
                <div className="col-3 p-1">
                    <Input
                        type="text"
                        name="text"
                        placeholder="Precio Unitario"
                        className="border-dark bg-transparent"
                        defaultValue={price[index]}
                    />
                </div>
            </div>
        ));

        setRenderedEditor(list_inputs);
    }
    useEffect(() => {
        createInputs();
    }, []);

    return (
        <div className="text-center mt-5">
            <div className="row container-fluid d-flex justify-content-center">
                <div className="col-10" id="container_bg">
                    <h1>PROFORMAS</h1>
                    <hr></hr>
                    <div className="row p-1">
                        <div className="row col-6">
                            <div className="row container-fluid d-flex justify-content-between">
                                <div className="h5 col-6">Producto</div>
                                <div className="h5 col-3">Cantidad</div>
                                <div className="h5 col-3">Precio Unitario</div>
                            </div>
                            {renderedEditor}
                            <div className="row container-fluid d-flex justify-content-between">
                                <div className="row container-fluid d-flex justify-content-end m-0 p-0">
                                    <button
                                        className="btn btn-success"
                                        onClick={() => addToArrays()}>
                                        +
									</button>
									&nbsp;
									<button
                                        className="btn btn-success"
                                        onClick={() => deleteFromArrays()}>
                                        -
									</button>
                                </div>
                            </div>
                        </div>
                        <div className="row col-6"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
