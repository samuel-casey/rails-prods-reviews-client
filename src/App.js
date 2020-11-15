import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './Components/Form/Form';
import AllProducts from './Components/AllProducts/AllProducts';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';

function App() {
	const [products, setProducts] = useState([]);

	const emptyReview = {
		title: '',
		author: '',
		content: '',
	};

	const emptyProduct = {
		name: '',
		price: 0,
		img: '',
	};

	const [selectedReview, setSelectedReview] = useState(emptyReview);
	const [selectedProduct, setSelectedProduct] = useState(emptyProduct);

	const fetchProducts = async () => {
		const res = await axios.get('http://localhost:3000/products');
		const productsArray = await res.data;
		await setProducts(productsArray);
	};

	const handleSubmit = async (data) => {
		console.log('form submit', data, selectedProduct.id);

		const review = await axios.post(
			`http://localhost:3000/products/${selectedProduct.id}/reviews`,
			data
		);
	};

	const selectReview = (review) => {
		setSelectedReview(review);
	};

	const selectProduct = async (productId) => {
		const clickedProduct = await axios.get(
			`http://localhost:3000/products/${productId}`
		);

		const clickedProductData = clickedProduct.data;

		console.log(clickedProductData.id);
		setSelectedProduct(clickedProductData);
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div className='App'>
			<h1>Products</h1>
			<Route
				path='/'
				render={(rp) => (
					<AllProducts
						{...rp}
						products={products}
						selectReview={selectReview}
						selectProduct={selectProduct}
					/>
				)}
			/>
			<Route
				path='/create'
				render={(rp) => (
					<>
						<h3>Add a review</h3>
						<Form
							{...rp}
							products={products}
							selectedReview={selectedReview}
							selectedProduct={selectedProduct}
							submitForm={handleSubmit}
						/>
					</>
				)}
			/>
			<Route
				path='/edit'
				render={(rp) => (
					<>
						<h3>Edit a review</h3>
						<Form
							{...rp}
							products={products}
							selectedReview={selectedReview}
							selectedProduct={selectedProduct}
							submitForm={handleSubmit}
						/>
					</>
				)}
			/>
		</div>
	);
}

export default App;
