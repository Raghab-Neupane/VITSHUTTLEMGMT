
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./prp.css";

export default function PrpLadiesHostelMap() {
    // Replace with the verified PRP Ladies' Hostel coordinates.
    const prpHostelCenter = [12.975, 79.160];

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
        </section>
    );
}
