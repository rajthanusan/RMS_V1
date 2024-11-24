import React, { useState, useEffect } from 'react';
import '../assets/style/ManageFoods.css';

export default function ManagerReservation() {
  const [reservations, setReservations] = useState([]);  

   
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('/api/bookings');
        const result = await response.json();   
        
         
        if (result.success && Array.isArray(result.data)) {
          setReservations(result.data);   
        } else {
          console.error("No reservations found or invalid response format:", result);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);  

  return (
    <section className="manage-foods">
      <div className="container">
      <div className="form manage-foods-form bg-eerie-black-3">
        <div className="reservation-table">
          <h2 className="headline-1 text-center" style={{ color: 'var(--gold-crayola)' }}>Reservation List</h2>
          <table className="table">
            <thead style={{ backgroundColor: 'var(--white)', color: 'var(--smoky-black-2)' }}>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Persons</th>
                <th>Date</th>
                <th>Time</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody  style={{ backgroundColor: 'var(--white)', color: 'var(--smoky-black-2)' }}>
              {Array.isArray(reservations) && reservations.length > 0 ? (
                reservations.map((reservation) => (
                  <tr key={reservation._id}>
                    <td>{reservation.name}</td>
                    <td>{reservation.phone}</td>
                    <td>{reservation.person}</td>
                    <td>{reservation.reservationDate}</td>
                    <td>{reservation.time}</td>
                    <td>{reservation.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No reservations available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </section>
  );
}
