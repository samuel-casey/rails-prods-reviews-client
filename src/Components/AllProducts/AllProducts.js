import React from 'react';
import Product from '../Product/Product';

export default function AllProducts({
	products,
	selectReview,
	selectProduct,
	history,
}) {
	const allProducts =
		products.length > 0
			? products.map((product, index) => (
					<Product
						history={history}
						key={index}
						product={product}
						selectReview={selectReview}
						selectProduct={selectProduct}
					/>
			  ))
			: null;

	return <div>{allProducts}</div>;
}
