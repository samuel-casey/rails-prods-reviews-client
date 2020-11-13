import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './Components/Form/Form';
import Product from './Components/Product/Product';
import './App.css';

function App() {
	const [products, setProducts] = useState([]);

	useEffect(async () => {
		const fetchProducts = async () => {
			const res = await axios.get(
				'https://rails-prods-reviews-api.herokuapp.com/products'
			);
			const productsArray = await res.data;
			await setProducts(productsArray);
			await console.log(products);
		};

		fetchProducts();
	}, []);

	const allProducts =
		products.length > 0
			? products.map((product) => <Product product={product} />)
			: null;
	return (
		<div className='App'>
			<h1>Products</h1>
			<Form />
			{allProducts}
		</div>
	);
}

export default App;
