import React, { useState } from 'react';
import axios from 'axios';
import './Product.css';

export default function Product({
	product,
	selectReview,
	selectProduct,
	history,
	handleDelete,
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

		const reviewId = e.target.getAttribute('review-id');
		const productId = e.target.getAttribute('product-id');

		console.log(`clicked review #${reviewId} on product #${productId}`);

		const reviewContent = reviews.filter(
			(review) => review.id === parseInt(reviewId)
		);

		selectReview(reviewContent);
		selectProduct(productId);
		history.push('/edit');
	};

	const handleDeleteClick = async (e) => {
		e.preventDefault();

		const reviewId = e.target.getAttribute('review-id');
		const productId = e.target.getAttribute('product-id');

		console.log(`clicked review #${reviewId} on product #${productId}`);

		const reviewContent = reviews.filter(
			(review) => review.id === parseInt(reviewId)
		);

		// selectReview(reviewContent);
		// selectProduct(productId);
		handleDelete(reviewId);
		history.push('/');
	};

	const handleAddReviewClick = async (e) => {
		const productId = e.target.getAttribute('product-id');
		selectProduct(productId);
		history.push('/create');
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
							review-id={review.id}
							product-id={product.id}
							onClick={handleEditClick}>
							Edit
						</button>
						<button
							review-id={review.id}
							product-id={product.id}
							onClick={handleDeleteClick}>
							Delete
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
			<button onClick={handleAddReviewClick} product-id={product.id}>
				Add a review
			</button>
			{reviewList}
		</div>
	);
}
