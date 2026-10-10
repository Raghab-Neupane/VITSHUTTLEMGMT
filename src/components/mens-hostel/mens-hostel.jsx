
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./mens-hostel.css";

export default function MensHostelMap() {
    const mensHostelCenter = [12.974465, 79.164810];

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

                    <Marker position={mensHostelCenter}>
                        <Popup>Men's Hostel — VIT Vellore</Popup>
                    </Marker>
                </MapContainer>
            </div>
        </section>
    );
}
