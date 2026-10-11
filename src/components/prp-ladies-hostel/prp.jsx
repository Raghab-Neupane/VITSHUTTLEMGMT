
import { useEffect, useState } from "react";
import { BusFront, Clock3, UsersRound } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./prp.css";
import { shuttleApi } from "../../services/shuttleApi";

export default function PrpLadiesHostelMap() {
    // Replace with the verified PRP Ladies' Hostel coordinates.
    const prpHostelCenter = [12.975, 79.160];
    const [availableShuttles, setAvailableShuttles] = useState([]);

    useEffect(() => {
        shuttleApi.getAvailableShuttles("prp").then(setAvailableShuttles);
    }, []);

    return (
        <section className="prp-map-section">
            <div className="prp-map-heading">
                <div>
                    <h2>PRP Ladies' Hostel</h2>
                    <p>View shuttle stops and locations</p>
                </div>
                <span className="prp-map-status">Map available</span>
            </div>

            <div className="prp-map-container">
                <MapContainer
                    center={prpHostelCenter}
                    zoom={16}
                    scrollWheelZoom={true}
                    className="prp-leaflet-map"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={prpHostelCenter}>
                        <Popup>PRP Ladies' Hostel</Popup>
                    </Marker>
                </MapContainer>
            </div>

            <section className="prp-available-shuttles" aria-labelledby="prp-available-shuttles-title">
                <div className="prp-available-heading">
                    <div><span className="prp-availability-indicator" /><h3 id="prp-available-shuttles-title">Available now</h3></div>
                    <small>Live API placeholder</small>
                </div>
                {availableShuttles.map((shuttle) => (
                    <article className="prp-available-shuttle" key={shuttle.id}>
                        <div className="prp-available-icon"><BusFront size={19} /></div>
                        <div><strong>{shuttle.vehicle}</strong><p>{shuttle.route}</p></div>
                        <div className="prp-available-meta"><span><Clock3 size={14} /> {shuttle.departure}</span><span><UsersRound size={14} /> {shuttle.seatsLeft} seats</span></div>
                    </article>
                ))}
            </section>
        </section>
    );
}
