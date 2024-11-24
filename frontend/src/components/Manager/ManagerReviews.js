import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import '../assets/style/ManageFoods.css';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reviews from the backend API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Approve review
  const approveReview = async (id) => {
    try {
      const response = await fetch(`/api/reviews/${id}/approve`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        throw new Error('Failed to approve review');
      }
      setReviews(reviews.map((review) => 
        review.id === id ? { ...review, status: 'approved' } : review
      ));
    } catch (error) {
      setError(error.message);
    }
  };

   
  const rejectReview = async (id) => {
    try {
      const response = await fetch(`/api/reviews/${id}/reject`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        throw new Error('Failed to reject review');
      }
      setReviews(reviews.map((review) => 
        review.id === id ? { ...review, status: 'rejected' } : review
      ));
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete review
  const deleteReview = async (id) => {
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete review');
      }
      setReviews(reviews.filter((review) => review.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="admin-reviews">
      <div className="container">
        <h2 className="headline-1 text-center" style={{ color: 'var(--gold-crayola)' }}>Manage User Reviews</h2>
        
        <table className="table">
          <thead style={{ backgroundColor: 'var(--smoky-black-1)', color: 'var(--white)' }}>
            <tr>
              <th>Name</th>
              <th>Review</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: 'var(--smoky-black-2)', color: 'var(--white)' }}>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td>{review.name}</td>
                <td>"{review.review}"</td>
                <td>
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </td>
                <td><strong>{review.status}</strong></td>
                <td>
                  {review.status === 'pending' && (
                    <>
                      <button className="btn btn-approve" onClick={() => approveReview(review.id)}>Approve</button>
                      <button className="btn btn-reject" onClick={() => rejectReview(review.id)}>Reject</button>
                    </>
                  )}
                  {review.status === 'approved' && (
                    <button className="btn btn-reject" onClick={() => rejectReview(review.id)}>Reject</button>
                  )}
                  {review.status === 'rejected' && (
                    <button className="btn btn-approve" onClick={() => approveReview(review.id)}>Approve</button>
                  )}
                </td>
                <td>
                  <FaTrash 
                    onClick={() => deleteReview(review.id)} 
                    style={{ cursor: 'pointer', color: 'var(--danger)' }} 
                    aria-label="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
