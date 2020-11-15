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

	// const [selectedReview, setSelectedReview] = useState(emptyReview);
	// const [selectedProduct, setSelectedProduct] = useState(emptyProduct);

	const [selectedReview, setSelectedReview] = useState(emptyReview);
	const [selectedProduct, setSelectedProduct] = useState(emptyProduct);

	const fetchProducts = async () => {
		const res = await axios.get('http://localhost:3000/products');
		const productsArray = await res.data;
		await setProducts(productsArray);
	};

	const handleAddSubmit = async (data) => {
		const review = await axios.post(
			`http://localhost:3000/products/${selectedProduct.id}/reviews`,
			data
		);
	};

	const handleEditSubmit = async (data) => {
		const review = await axios.put(
			`http://localhost:3000/reviews/${selectedReview.id}`,
			data
		);
	};

	const handleDelete = async (reviewId) => {
		const destroyed = await axios.delete(
			`http://localhost:3000/reviews/${reviewId}`
		);
	};

	const selectReview = async (filteredReviews) => {
		const review = filteredReviews[0];
		setSelectedReview(review);
	};

	const selectProduct = async (productId) => {
		const clickedProduct = await axios.get(
			`http://localhost:3000/products/${productId}`
		);

		const clickedProductData = clickedProduct.data;
		setSelectedProduct(clickedProductData);
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div className='App'>
			<h1>Products</h1>
			<Route
				path='/create'
				render={(rp) => (
					<>
						<h3>Add a review</h3>
						<Form
							{...rp}
							products={products}
							selectedReview={emptyReview}
							selectedProduct={selectedProduct}
							addReview={handleAddSubmit}
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
							editReview={handleEditSubmit}
						/>
					</>
				)}
			/>
			<Route
				path='/'
				render={(rp) => (
					<AllProducts
						{...rp}
						products={products}
						selectReview={selectReview}
						selectProduct={selectProduct}
						handleDelete={handleDelete}
					/>
				)}
			/>
		</div>
	);
}

export default App;
