import React, { useState, useEffect } from "react";
import { Input } from "reactstrap";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
    const [product, setProduct] = useState([""]);
    const [amount, setAmount] = useState(["1"]);

    function addToArrays() {
        let aux_credits = credits;
        let aux_grades = grades;

        aux_credits.push("");
        aux_grades.push("");

        setCredits(aux_credits);
        setGrades(aux_grades);

        createInputs();
    }

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
                                <div className="h5 col-3">Precio Unitario</div>
                                <div className="h5 col-3">Cantidad</div>
                            </div>
                            <div className="row container-fluid d-flex justify-content-between">
                                <div className="col-6 p-1">
                                    <Input
                                        type="text"
                                        name="text"
                                        placeholder="Producto"
                                        className="border-dark bg-transparent"
                                        defaultValue=""
                                    />
                                </div>
                                <div className="col-3 p-1">
                                    <Input
                                        type="text"
                                        name="text"
                                        placeholder="Precio Unitario"
                                        className="border-dark bg-transparent"
                                        defaultValue=""
                                    />
                                </div>
                                <div className="col-3 p-1">
                                    <Input
                                        type="text"
                                        name="text"
                                        placeholder="Cantidad"
                                        className="border-dark bg-transparent"
                                        defaultValue=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row col-6"></div>
                    </div>
                    <p>
                        <img src={rigoImage} />
                    </p>
                    <a href="#" className="btn btn-success">
                        If you see this green but ton... bootstrap is working
					</a>
                    <p>
                        Made by{" "}
                        <a href="http://www.4geeksacademy.com">
                            4Geeks Academy
						</a>
						, with love!
					</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
