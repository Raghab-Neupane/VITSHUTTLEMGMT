
import { useState } from "react";
import './routes.css'
import MensHostelMap from "../../components/mens-hostel/mens-hostel";
import PrpLadiesHostelMap from "../../components/prp-ladies-hostel/prp";

export default function Routes() {
    const [selectedMap, setSelectedMap] = useState("mens");

    return (
        <main className="routes-page">
            <div className="routes-map-selector" aria-label="Select hostel route">
                <button
                    className={`hostel-btn ${selectedMap === "mens" ? "active" : ""}`}
                    onClick={() => setSelectedMap("mens")}
                >
                    Men's Hostel
                </button>

                <button
                    className={`hostel-btn ${selectedMap === "prp" ? "active" : ""}`}
                    onClick={() => setSelectedMap("prp")}
                >
                    PRP Ladies' Hostel
                </button>
            </div>

            {selectedMap === "mens" && <MensHostelMap />}
            {selectedMap === "prp" && <PrpLadiesHostelMap />}
        </main>
    );
}
