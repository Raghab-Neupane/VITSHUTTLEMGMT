
import { useEffect, useState } from "react";
import { BusFront, Clock3, UsersRound } from "lucide-react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./mens-hostel.css";
import routeData from "./mens-hostel.json";
import { shuttleApi } from "../../services/shuttleApi";

export default function MensHostelMap() {
    const mensHostelCenter = [12.974465, 79.164810];
    const [availableShuttles, setAvailableShuttles] = useState([]);

    useEffect(() => {
        shuttleApi.getAvailableShuttles("mens").then(setAvailableShuttles);
    }, []);

    return (
        <section className="hostel-map-section">
            <div className="hostel-map-heading">
                <div>
                    <h2>Men's Hostel</h2>
                    <p>View shuttle stops and locations</p>
                </div>
                <span className="map-status">Map available</span>
            </div>

            <div className="hostel-map-container">
                <MapContainer
                    center={mensHostelCenter}
                    zoom={16}
                    scrollWheelZoom={true}
                    className="hostel-leaflet-map"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Polyline
                        positions={routeData.routes.outbound}
                        pathOptions={{ color: "#000000", weight: 6, opacity: 1, lineCap: "round", lineJoin: "round" }}
                    />
                    <Polyline
                        positions={routeData.routes.return}
                        pathOptions={{ color: "#000000", weight: 6, opacity: 1, lineCap: "round", lineJoin: "round" }}
                    />

                    {routeData.stops.map((stop) => (
                        <Marker key={stop.name} position={stop.position}>
                            <Popup>{stop.name}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            <section className="available-shuttles" aria-labelledby="available-shuttles-title">
                <div className="available-shuttles-heading">
                    <div><span className="availability-indicator" /><h3 id="available-shuttles-title">Available now</h3></div>
                    <small>Live API placeholder</small>
                </div>
                {availableShuttles.map((shuttle) => (
                    <article className="available-shuttle" key={shuttle.id}>
                        <div className="available-shuttle-icon"><BusFront size={19} /></div>
                        <div><strong>{shuttle.vehicle}</strong><p>{shuttle.route}</p></div>
                        <div className="available-shuttle-meta"><span><Clock3 size={14} /> {shuttle.departure}</span><span><UsersRound size={14} /> {shuttle.seatsLeft} seats</span></div>
                    </article>
                ))}
            </section>
        </section>
    );
}
