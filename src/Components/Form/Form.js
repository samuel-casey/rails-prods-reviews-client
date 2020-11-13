import React, { useState } from 'react';
import './Form.css';

export default function Form({ products, type }) {
	const options = products
		? products.map((product) => {
				return <option>{product.name}</option>;
		  })
		: null;

	const formType = type ? type : 'Add a review';

	return (
		<>
			<h3>{formType}</h3>
			<form onSubmit='null'>
				<label>Product</label>
				<select>{options}</select>
				<label>Author name</label>
				<input type='text'></input>
				<label>Review</label>
				<textarea type='text' />
				<input type='submit' />
			</form>
		</>
	);
}
