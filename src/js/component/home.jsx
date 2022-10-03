import React, { useState, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import { Input, Table } from "reactstrap";

//create your first component
const Home = () => {
	const [product, setProduct] = useState([""]);
	const [amount, setAmount] = useState(["1"]);
	const [price, setPrice] = useState([""]);
	const [name, setName] = useState("");
	const [vehicle, setVehicle] = useState("");
	const [iva, setIva] = useState([false, "Sin iva"]);
	const [currency, setCurrency] = useState(["₡", "COLONES"]);

	const [renderedEditor, setRenderedEditor] = useState("");
	const [renderedInvoice, setRenderedInvoice] = useState("");

	const [create_image, setCreateImage] = useState("");

	const onButtonClick = () => {
		let domElement = document.getElementById("image-node");
		htmlToImage
			.toPng(domElement)
			.then(function(dataUrl) {
				setCreateImage(<img src={dataUrl}></img>);
				download(dataUrl, name.toUpperCase() + " PROFORMA.jpeg");
			})
			.catch(function(error) {
				console.error("oops, something went wrong!", error);
			});
	};

	function restoreAll() {
		setProduct([""]);
		setAmount(["1"]);
		setPrice([""]);
		setName([""]);
		setVehicle([""]);

		createInputs();
	}

	function createInvoice() {
		function numberWithCommas(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}

		let list_invoice = product.map((element, index) => (
			<tr key={index}>
				<td>{numberWithCommas(amount[index])}</td>
				<td>{element.toUpperCase()}</td>
				<td>
					{currency[0]}
					{numberWithCommas(price[index])}
				</td>
				<td>
					{currency[0]}
					{numberWithCommas(
						(
							parseFloat(price[index]) * parseFloat(amount[index])
						).toFixed(2)
					)}
				</td>
			</tr>
		));

		let general_data = (
			<div className="row">
				<div className="col-6">
					<div className="d-flex justify-content-start">
						HERRERA AUTOPARTS
					</div>
					<div className="d-flex justify-content-start">
						FACTURA PROFORMA
					</div>
					<div className="d-flex justify-content-start">
						PARA: {name.toLocaleUpperCase()}
					</div>
					<div className="d-flex justify-content-start">
						VEHÍCULO: {vehicle.toUpperCase()}
					</div>
				</div>
				<div className="col-6">
					<div className="d-flex justify-content-start">
						VENDEDOR: RANDALL CHACÓN
					</div>
					<div className="d-flex justify-content-start">
						CONTACTO: 8367-3383
					</div>
					<div className="d-flex justify-content-start">
						FECHA: {new Date().toLocaleDateString()}
					</div>
					<div className="d-flex justify-content-start">
						MONEDA: {currency[1]}
					</div>
				</div>
			</div>
		);

		let invoice_format = (
			<Table
				responsive
				bordered
				size="sm"
				className="text-center mb-0 pb-0">
				<thead>
					<tr>
						<th>CANT</th>
						<th>ARTÍCULO</th>
						<th>PRECIO</th>
						<th>TOTAL</th>
					</tr>
				</thead>
				{list_invoice}
			</Table>
		);

		let counter = 0;

		for (let i = 0; i < product.length; i++) {
			counter = counter + parseFloat(amount[i]) * parseFloat(price[i]);
		}

		let final = [counter.toFixed(2)];

		let iva_info = [];

		if (iva[0] === true) {
			iva_info.push(
				<tr>
					<td className="fw-bold">
						<span>
							<strong>SUBTOTAL</strong>
						</span>
					</td>
					<td>
						{currency[0]}
						{numberWithCommas(final)}
					</td>
				</tr>
			);
			iva_info.push(
				<tr>
					<td className="fw-bold">
						<span>
							<strong>IVA 13%</strong>
						</span>
					</td>
					<td>
						{currency[0]}
						{numberWithCommas((final * 0.13).toFixed(2))}
					</td>
				</tr>
			);
			final = numberWithCommas((final * 1.13).toFixed(2));
		}

		let final_prices_format = (
			<div className="row m-0 p-0 d-flex justify-content-end">
				<div className="col-6 m-0 p-0">
					<Table
						responsive
						bordered
						size="sm"
						color="dark"
						className="text-start ">
						{iva_info}
						<tr>
							<td className="fw-bold">
								<span>
									<strong>TOTAL</strong>
								</span>
							</td>
							<td>
								{currency[0]}
								{numberWithCommas(final)}
							</td>
						</tr>
					</Table>
				</div>
			</div>
		);

		let message = <small>REALIZAMOS ENVÍOS A TODO EL PAÍS</small>;

		let result = [
			general_data,
			invoice_format,
			final_prices_format,
			message
		];

		setRenderedInvoice(<div className="bg-light p-2">{result}</div>);
	}

	function editIvaStatus() {
		if (iva[0] === false) {
			setIva([true, "Con IVA"]);
		} else {
			setIva([false, "Sin IVA"]);
		}
	}

	function editCurrencyStatus() {
		if (currency[1] == "COLONES") {
			setCurrency(["$", "DÓLARES"]);
		} else {
			setCurrency(["₡", "COLONES"]);
		}
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
		elements[2].push("");

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
				<div className="col-7 p-1">
					<Input
						type="text"
						name="text"
						placeholder="Producto"
						className="border-dark bg-transparent"
						defaultValue={element}
						onChange={() => editProduct(event, index)}
					/>
				</div>
				<div className="col-2 p-1">
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
				<div className="col-11" id="container_bg">
					<div className="row d-flex justify-content-between">
						<h1>PROFORMAS</h1>
						&nbsp;
						<button
							className="btn btn-info"
							onClick={() => onButtonClick()}>
							<span className="h2">CREAR IMAGEN</span>
						</button>
					</div>

					<hr></hr>
					<div className="row p-1">
						<div className="row col-xl-6 col-lg-6 col-md-8 col-sm-12">
							<div className="row container-fluid d-flex justify-content-between">
								<div className="h5 col-6">Proforma para</div>
								<div className="h5 col-6">Vehículo</div>
							</div>
							<div className="row container-fluid d-flex justify-content-between m-1">
								<div className="col-6">
									<Input
										type="text"
										name="text"
										placeholder="Nombre del cliente"
										className="border-dark bg-transparent"
										defaultValue={name}
										onChange={() => {
											setName(event.target.value);
										}}
									/>
								</div>
								<div className="col-6">
									<Input
										type="text"
										name="text"
										placeholder="Vehículo"
										className="border-dark bg-transparent"
										defaultValue={vehicle}
										onChange={() => {
											setVehicle(event.target.value);
										}}
									/>
								</div>
							</div>
							<div className="row container-fluid d-flex justify-content-between">
								<div className="h5 col-7">Producto</div>
								<div className="h5 col-2">Cantidad</div>
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
										&nbsp;
										<button
											className="btn btn-primary"
											onClick={() => editIvaStatus()}>
											{iva[1]}
										</button>
										&nbsp;
										<button
											className="btn btn-success"
											onClick={() =>
												editCurrencyStatus()
											}>
											{currency[1]}
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
						<div className="row col-xl-6 col-lg-6 col-md-4 col-sm-12 ">
							<div className="m-1 p-1 w-100">
								<div
									className="m-0 p-0 bg-light container"
									id="image-node">
									{renderedInvoice}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row d-flex justify-content-center">
				{create_image}
			</div>
		</div>
	);
};

export default Home;
