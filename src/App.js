import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './Components/Form/Form';
import Product from './Components/Product/Product';
import './App.css';

function App() {
	const [products, setProducts] = useState([]);
	const [formType, setFormType] = useState('Add a review');

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
		console.log(productsArray);
	};

	const handleSubmit = async (data) => {
		console.log(data);
	};

	const selectReview = (review) => {
		setSelectedReview(review);
	};

	const selectProduct = (product) => {
		setSelectedProduct(product);
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const allProducts =
		products.length > 0
			? products.map((product, index) => (
					<Product
						key={index}
						product={product}
						selectReview={selectReview}
						selectProduct={selectProduct}
						setFormType={setFormType}
					/>
			  ))
			: null;
	return (
		<div className='App'>
			<h1>Products</h1>
			<Form
				products={products}
				type={formType}
				selectedReview={selectedReview}
				selectedProduct={selectedProduct}
				submitForm={handleSubmit}
			/>
			{allProducts}
		</div>
	);
}

export default App;
