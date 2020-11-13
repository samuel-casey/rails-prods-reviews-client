import React, { useState } from 'react';
import axios from 'axios';
import './Product.css';

export default function Product({ product }) {
	const [reviews, setReviews] = useState([]);

	const handleClick = async (e) => {
		const reviewData = await axios.get(
			`http://localhost:3000/products/${e.target.id}`
		);

		const reviewsArray = reviewData.data.reviews;
		console.log(reviewsArray);
		setReviews(reviewsArray);
	};

	const reviewList = reviews
		? reviews.map((review) => {
				return (
					<div id={`${product.name}-review-${review.id}`} className='review'>
						<p>
							<b>Review:</b> {review.title}
						</p>
						<p>
							<b>Author:</b> {review.author}
						</p>
						<p>
							<em>{review.content}</em>
						</p>
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
