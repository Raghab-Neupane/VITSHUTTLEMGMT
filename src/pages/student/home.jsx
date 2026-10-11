import { useEffect, useState } from "react";
import { ArrowRight, BusFront, CalendarDays, Clock3, ScanLine, UsersRound, X } from "lucide-react";
import { activeStudent } from "../../data/shuttleData";
import { shuttleApi } from "../../services/shuttleApi";

export default function Home({ onViewBookings }) {
    const [shuttles, setShuttles] = useState([]);
    const [scannerBooking, setScannerBooking] = useState(null);
    const [today] = useState(() => new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
    }));

    useEffect(() => {
        shuttleApi.getRoutes().then(setShuttles);
    }, []);

    const currentShuttle = shuttles[0];

    return (
        <div className="home-page">
            <section className="home-greeting">
                <p>Good morning,</p>
                <h2>{activeStudent.name.split(" ")[0]}</h2>
                <span>{today}</span>
            </section>

            {currentShuttle && (
                <section className="boarding-panel" aria-labelledby="boarding-heading">
                    <div className="boarding-topline">
                        <span className="live-indicator"><i /> Boarding now</span>
                        <span>{currentShuttle.vehicle}</span>
                    </div>
                    <div className="boarding-route">
                        <BusFront size={28} aria-hidden="true" />
                        <div>
                            <p id="boarding-heading">Your next shuttle</p>
                            <h3>{currentShuttle.route}</h3>
                        </div>
                    </div>
                    <div className="boarding-details">
                        <div><Clock3 size={17} /><span>Departs</span><strong>{currentShuttle.departure}</strong></div>
                        <div><UsersRound size={17} /><span>Seat</span><strong>12</strong></div>
                    </div>
                    <button className="board-button" onClick={() => setScannerBooking({ id: "BK-24108", route: currentShuttle.route })}>
                        <ScanLine size={19} /> Get in
                    </button>
                </section>
            )}

            <section className="section-heading">
                <div><h2>Upcoming shuttles</h2><p>Choose a service that fits your day</p></div>
                <button className="text-action" onClick={onViewBookings}>My bookings <ArrowRight size={16} /></button>
            </section>

            <div className="shuttle-list">
                {shuttles.slice(1).map((shuttle) => (
                    <article className="shuttle-row" key={shuttle.id}>
                        <div className={`route-mark ${shuttle.accent}`}><BusFront size={19} /></div>
                        <div className="shuttle-summary">
                            <div className="shuttle-summary-title"><h3>{shuttle.label}</h3><span className={`status-pill ${shuttle.accent}`}>{shuttle.status}</span></div>
                            <p>{shuttle.route}</p>
                            <span><Clock3 size={14} /> {shuttle.departure} · {shuttle.boardingPoint}</span>
                        </div>
                        <strong className="time-label">{shuttle.departure}</strong>
                    </article>
                ))}
            </div>

            <section className="api-note">
                <CalendarDays size={18} />
                <div><strong>Live route data ready</strong><p>Driver-dashboard API will replace these sample services.</p></div>
            </section>

            {scannerBooking && <ScannerOverlay booking={scannerBooking} onClose={() => setScannerBooking(null)} />}
        </div>
    );
}

function ScannerOverlay({ booking, onClose }) {
    useEffect(() => { shuttleApi.openScanner(booking.id); }, [booking.id]);
    return <div className="scanner-backdrop" role="dialog" aria-modal="true" aria-labelledby="scanner-title">
        <section className="scanner-sheet">
            <button className="icon-close" onClick={onClose} aria-label="Close scanner"><X size={20} /></button>
            <span className="scanner-kicker">Boarding verification</span>
            <h2 id="scanner-title">Scan to get in</h2>
            <p>Point your camera at the shuttle QR code.</p>
            <div className="scanner-frame" aria-label="Scanner camera placeholder">
                <ScanLine size={42} /><span className="scan-line" />
            </div>
            <div className="scanner-trip"><BusFront size={19} /><span>{booking.route}</span></div>
            <small>Scanner API placeholder: {shuttleApi.scannerUrl}</small>
        </section>
    </div>;
}
