
import { useState } from "react";
import {
    House,
    Map,
    Ticket,
    UserRound,
} from "lucide-react";

import "./student.css";

import Home from "./student/home";
import MyBookings from "./student/mybookings";
import Routes from "./student/routes";


export default function Student() {
    const [activePage, setActivePage] = useState("home");

    const pages = {
        home: <Home onViewBookings={() => setActivePage("bookings")} />,
        routes: <Routes />,
        bookings: <MyBookings />,
    };

    const navigation = [
        { id: "routes", label: "Routes", Icon: Map },
        { id: "home", label: "Home", Icon: House },
        { id: "bookings", label: "My Bookings", Icon: Ticket },
    ];

    return (
        <div className="student-shell">
            <header className="student-header">
                <div className="brand-icon" aria-label="VIT Shuttle">
                    <Map size={21} />
                </div>
                <button className="profile-icon" aria-label="Student profile">
                    <UserRound size={20} />
                </button>
            </header>

            <main className="student-content" key={activePage}>
                {pages[activePage]}
            </main>

            <nav className="floating-navigation" aria-label="Main navigation">
                {navigation.map(({ id, label, Icon }) => (
                    <button
                        key={id}
                        className={`navigation-item ${activePage === id ? "navigation-active" : ""
                            }`}
                        onClick={() => {
                            setActivePage(id);
                        }}
                        aria-current={activePage === id ? "page" : undefined}
                    >
                        <Icon size={21} strokeWidth={activePage === id ? 2.3 : 1.8} />
                        <span>{label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}
