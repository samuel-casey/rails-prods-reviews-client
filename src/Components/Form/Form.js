import React, { useState } from 'react';
import './Form.css';

export default function Form({
	products,
	type,
	selectedProduct,
	selectedReview,
	submitForm,
}) {
	console.log('selectedProduct', selectedProduct);

	const [formData, setFormData] = useState({
		...selectedReview,
		selectedProduct: selectedProduct,
	});

	const options = products
		? products.map((product, index) => {
				return <option key={index}>{product.name}</option>;
		  })
		: null;

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		console.log(key, value);
		setFormData({ ...formData, [key]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		submitForm(formData);
	};

	const formType = type ? type : 'Add a review';

	return (
		<>
			<h3>{formType}</h3>
			<form onSubmit={handleSubmit}>
				<div></div>
				<label for='product-field'>Product</label>
				<select
					name='selectedProduct'
					value={formData.selectedProduct}
					onChange={handleChange}>
					{options}
				</select>
				<label for='title-field'>Review Title</label>
				<input
					type='text'
					name='title'
					value={formData.title}
					onChange={handleChange}></input>
				<label for='author-field'>Author name</label>
				<input
					type='text'
					name='author'
					value={formData.author}
					onChange={handleChange}></input>
				<label for='review-field'>Review</label>
				<textarea
					type='text'
					name='content'
					value={formData.content}
					onChange={handleChange}
				/>
				<input type='submit' />
			</form>
		</>
	);
}
