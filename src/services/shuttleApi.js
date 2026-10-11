import { myBookings, upcomingShuttles } from "../data/shuttleData";

// Replace these URLs when the driver dashboard and scanner services are available.
export const shuttleApi = {
    routesUrl: "/api/driver-dashboard/routes",
    bookingsUrl: "/api/student/bookings",
    scannerUrl: "/api/scanner/scan",
    availableShuttlesUrl: "/api/driver-dashboard/available-shuttles",

    async getRoutes() {
        return upcomingShuttles;
    },

    async getMyBookings() {
        return myBookings;
    },

    async getAvailableShuttles(hostel) {
        return upcomingShuttles.filter((shuttle) => (
            shuttle.hostel === hostel && shuttle.status !== "Limited seats"
        ));
    },

    async openScanner(bookingId) {
        return { bookingId, scanner: "ready" };
    },
};
