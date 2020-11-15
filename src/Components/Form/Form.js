import React, { useState } from 'react';
import './Form.css';

export default function Form({
	// products,
	addReview,
	editReview,
	history,
	selectedProduct,
	selectedReview,
}) {
	// set form to be empty data
	// add selectedProduct to form data
	// change form when user types
	// submit form when user presses submit

	const [formData, setFormData] = useState({
		title: selectedReview.title,
		author: selectedReview.author,
		content: selectedReview.content,
	});

	console.log('selectedReview', selectedReview, formData);

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		setFormData({ ...formData, [key]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// this should send title, author, content to App
		// App should already know the product-id and combine that for the request
		console.log(formData);
		addReview(formData);
		// editReview(formData);
		// history.push('/');
	};

	const productSelected =
		selectedProduct.name !== '' ? (
			<form onSubmit={handleSubmit}>
				<label htmlFor='title-field'>Review for {selectedProduct.name}</label>
				<input
					type='text'
					name='title'
					value={formData.title}
					onChange={handleChange}></input>
				<label htmlFor='author-field'>Author name</label>
				<input
					type='text'
					name='author'
					value={formData.author}
					onChange={handleChange}></input>
				<label htmlFor='review-field'>Review</label>
				<textarea
					type='text'
					name='content'
					value={formData.content}
					onChange={handleChange}
				/>
				<input type='submit' />
			</form>
		) : (
			'Select a product to write a review'
		);

	return <>{productSelected}</>;
}
