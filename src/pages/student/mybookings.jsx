import { useEffect, useState } from "react";
import { BusFront, CheckCircle2, Clock3, MapPin, Ticket, XCircle } from "lucide-react";
import { shuttleApi } from "../../services/shuttleApi";

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [bookingToCancel, setBookingToCancel] = useState(null);
    useEffect(() => { shuttleApi.getMyBookings().then(setBookings); }, []);
    const activeBookings = bookings.filter((booking) => booking.status === "Confirmed");
    const pastBookings = bookings.filter((booking) => booking.status !== "Confirmed");

    const cancelBooking = () => {
        setBookings((currentBookings) => currentBookings.map((booking) => (
            booking.id === bookingToCancel.id ? { ...booking, status: "Cancelled" } : booking
        )));
        setBookingToCancel(null);
    };

    return <div className="bookings-page">
        <section className="page-intro"><span><Ticket size={18} /> Your travel</span><h2>My bookings</h2><p>Keep track of every shuttle seat reserved for you.</p></section>
        <BookingGroup title="Upcoming" bookings={activeBookings} onCancel={setBookingToCancel} />
        <BookingGroup title="Past journeys" bookings={pastBookings} />
        {bookingToCancel && <div className="cancel-backdrop" role="dialog" aria-modal="true" aria-labelledby="cancel-title">
            <section className="cancel-dialog">
                <XCircle size={26} />
                <h3 id="cancel-title">Cancel this booking?</h3>
                <p>Your seat on {bookingToCancel.route} at {bookingToCancel.departure} will be released.</p>
                <div><button className="cancel-dismiss" onClick={() => setBookingToCancel(null)}>Keep booking</button><button className="cancel-confirm" onClick={cancelBooking}>Cancel booking</button></div>
            </section>
        </div>}
    </div>;
}

function BookingGroup({ title, bookings, onCancel }) {
    return <section className="booking-group"><h3>{title}</h3>
        {bookings.map((booking) => <article className="booking-card" key={booking.id}>
            <div className="booking-card-top"><div className="booking-bus"><BusFront size={20} /></div><div><p>{booking.date} · {booking.departure}</p><h4>{booking.route}</h4></div><span className={`booking-status ${booking.status === "Completed" ? "completed" : ""}`}>{booking.status === "Completed" ? <CheckCircle2 size={14} /> : <Clock3 size={14} />}{booking.status}</span></div>
            <div className="booking-card-meta"><span><MapPin size={15} />{booking.boardingPoint}</span><span>{booking.vehicle} · Seat {booking.seat}</span></div>
            <div className="booking-id">Booking ID <strong>{booking.id}</strong></div>
            {booking.status === "Confirmed" && <button className="cancel-booking-button" onClick={() => onCancel(booking)}>Cancel booking</button>}
        </article>)}
    </section>;
}
