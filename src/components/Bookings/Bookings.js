import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBooking] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(() =>{
        fetch('http://localhost:5000/bookings?email='+loggedInUser.email,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('idToken')}`
            },
        })
        .then(res => res.json())
        .then(data => setBooking(data))
    },[])
    return (
        <div>
            <h3>{bookings.length} bookings</h3>
            {
                bookings.map(booking => <li>{booking.name} from: {(new Date (booking.checkIn).toDateString('dd/MM/yyyy'))} to: {(new Date (booking.checkOut).toDateString('dd/MM/yyyy'))}</li>)
            }
        </div>
    );
};

export default Bookings;