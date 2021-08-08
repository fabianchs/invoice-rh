import React, { useState, useEffect } from "react";
import { Input, Table } from "reactstrap";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [product, setProduct] = useState([""]);
	const [amount, setAmount] = useState(["1"]);
	const [price, setPrice] = useState([""]);
	const [name, setName] = useState("");
	const [vehicle, setVehicle] = useState("");

	const [renderedEditor, setRenderedEditor] = useState("");
	const [renderedInvoice, setRenderedInvoice] = useState("");

	const p_style = "w-100 m-0 p-0 d-flex justify-content-start";

	function createInvoice() {
		function numberWithCommas(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}

		let list_invoice = product.map((element, index) => (
			<div key={index} className="container-fluid">
				<span className={p_style}>{element.toUpperCase()}</span>

				<span className={p_style}>
					CANTIDAD: &nbsp;
					{amount[index]}
				</span>
				<span className={p_style}>
					PRECIO: &nbsp; &#8353;
					{numberWithCommas(
						(
							parseFloat(price[index]) * parseFloat(amount[index])
						).toFixed(2)
					)}
				</span>
				<span className={p_style}>&nbsp;</span>
			</div>
		));
		//<br className={p_style}></br>

		let counter = 0;

		for (let i = 0; i < product.length; i++) {
			counter = counter + parseFloat(amount[i]) * parseFloat(price[i]);
		}

		let final = [counter.toFixed(2)];

		let final_price = (
			<div className="container-fluid">
				<p className={p_style}>
					TOTAL: &nbsp; &#8353;{numberWithCommas(final)}
				</p>
			</div>
		);

		list_invoice.push(final_price);

		list_invoice.unshift(
			<div className="container-fluid">
				<span className={p_style}>
					PARA: &nbsp; {name.toUpperCase()}
				</span>
				<span className={p_style}>
					VEHÍCULO: &nbsp; {vehicle.toUpperCase()}
				</span>
				<span className={p_style}>&nbsp;</span>
			</div>
		);

		list_invoice.unshift(
			<div className="container-fluid">
				<p className={p_style}>&nbsp;</p>
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
						<div className="row col-xl-6 col-lg-6 col-md-4 col-sm-12 ">
							<div className="border border-dark m-1">
								{renderedInvoice}
							</div>
						</div>
					</div>
					<div className="w-50">
						<div className="row">
							<div className="col-6">
								<div className="d-flex justify-content-start">
									IMPORTACIONES HERRERA
								</div>
								<div className="d-flex justify-content-start">
									FACTURA PROFORMA
								</div>
								<div className="d-flex justify-content-start">
									PARA: PEDRO MUÑOZ
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
									FECHA: SÁBADO 7 DE AGOSTO DE 2021
								</div>
							</div>
						</div>

						<Table
							responsive
							bordered
							size="sm"
							className="text-center">
							<thead>
								<tr>
									<th>CANTIDAD</th>
									<th>ARTÍCULO</th>
									<th>PRECIO</th>
									<th>TOTAL</th>
								</tr>
							</thead>
							<tr>
								<td>2</td>
								<td>
									INYECTORES PARA AUTO DIFERENTE INYECTORES
									PARA AUTO DIFERENTE
								</td>
								<td>20 000</td>
								<td>40 000</td>
							</tr>
						</Table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
