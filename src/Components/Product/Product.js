import React, { useState } from 'react';
import axios from 'axios';
import './Product.css';

export default function Product({
	product,
	selectReview,
	setFormType,
	selectProduct,
}) {
	const [reviews, setReviews] = useState([]);

	const handleClick = async (e) => {
		const reviewData = await axios.get(
			`http://localhost:3000/products/${e.target.id}`
		);

		const reviewsArray = reviewData.data.reviews;
		setReviews(reviewsArray);
	};

	const handleEditClick = async (e) => {
		e.preventDefault();
		selectReview(e.target.name);
		console.log(e.target);
		console.log(e.target.prod);
		selectProduct(e.target.prod);
		console.log(e.target.name);
		setFormType('Edit a review');
	};

	const reviewList = reviews
		? reviews.map((review, index) => {
				return (
					<div key={index} className='review'>
						<p>
							<b>Review:</b> {review.title}
						</p>
						<p>
							<b>Author:</b> {review.author}
						</p>
						<p>
							<em>{review.content}</em>
						</p>
						<button
							name={review.id}
							prod={product.name}
							onClick={handleEditClick}>
							Edit
						</button>
					</div>
				);
		  })
		: null;

	return (
		<div id={product.id} className='product' onClick={(e) => handleClick(e)}>
			<p id={product.id}>{product.name}</p>
			<img id={product.id} src={product.img} alt={product.name} />
			<p id={product.id}>{product.price}</p>
			{reviewList}
		</div>
	);
}
