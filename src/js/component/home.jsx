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
	const [renderedInvoice, setRenderedInvoice] = useState("");

	const p_style = "w-100 m-0 p-0 d-flex justify-content-start";

	function createInvoice() {
		let list_invoice = product.map((element, index) => (
			<div key={index} className="container-fluid">
				<span className={p_style}>{element.toUpperCase()}</span>
				<br></br>
				<span className={p_style}>
					CANTIDAD: &nbsp;
					{amount[index]}
				</span>
				<br></br>
				<span className={p_style}>
					PRECIO UNITARIO: &nbsp; &#8353;{price[index]}
				</span>
				<br></br>
			</div>
		));

		let counter = 0;

		for (let i = 0; i < product.length; i++) {
			counter = counter + parseFloat(amount[i]) * parseFloat(price[i]);
		}

		let final = [counter.toFixed(2)];

		let final_price = (
			<div className="container-fluid">
				<p className={p_style}>TOTAL: &nbsp; &#8353;{final}</p>
			</div>
		);

		list_invoice.push(final_price);
		list_invoice.unshift(
			<div className="container-fluid">
				<p className={p_style}>FACTURA PROFORMA</p>
			</div>
		);

		setRenderedInvoice(list_invoice);
	}

	function editProduct(e, index) {
		let aux_product = product;

		aux_product[index] = e.target.value;

		setProduct(aux_product);

		createInputs();
	}
	function editAmount(e, index) {
		let aux_amount = amount;

		aux_amount[index] = e.target.value;

		setAmount(aux_amount);

		createInputs();
	}
	function editPrice(e, index) {
		let aux_price = price;

		aux_price[index] = e.target.value;

		setPrice(aux_price);

		createInputs();
	}

	function addToArrays() {
		let elements = [product, amount, price];

		elements[0].push("");
		elements[1].push("1");
		elements[2].push("0");

		setProduct(elements[0]);
		setAmount(elements[1]);
		setPrice(elements[2]);

		createInputs();
	}

	function deleteFromArrays() {
		let elements = [product, amount, price];

		if (product.length > 1) {
			elements[0].splice(-1, 1);
			elements[1].splice(-1, 1);
			elements[2].splice(-1, 1);
		}

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
						onChange={() => editProduct(event, index)}
					/>
				</div>
				<div className="col-3 p-1">
					<Input
						type="text"
						name="text"
						placeholder="Cantidad"
						className="border-dark bg-transparent"
						defaultValue={amount[index]}
						onChange={() => editAmount(event, index)}
					/>
				</div>
				<div className="col-3 p-1">
					<Input
						type="text"
						name="text"
						placeholder="Precio Unitario"
						className="border-dark bg-transparent"
						defaultValue={price[index]}
						onChange={() => editPrice(event, index)}
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
								<div className="row container-fluid d-flex justify-content-between m-0 p-0">
									<span>
										{" "}
										<button
											className="btn btn-secondary"
											onClick={() => createInvoice()}>
											Generar
										</button>
									</span>

									<span>
										{" "}
										<button
											className="btn btn-success"
											onClick={() => addToArrays()}>
											<i className="fas fa-plus"></i>
										</button>
										&nbsp;
										<button
											className="btn btn-danger"
											onClick={() => deleteFromArrays()}>
											<i className="fas fa-minus"></i>
										</button>
									</span>
								</div>
							</div>
						</div>
						<div className="row col-6 ">
							<div className="border border-dark m-1">
								{renderedInvoice}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
