import { Routes, Route, useLocation } from 'react-router-dom';
import { ProfileCard } from './components/ProfileCard';
import { Admin } from './pages/Admin';
import { useAnalytics } from './hooks/useAnalytics';
import { useEffect } from 'react';
import ReactGA from "react-ga4";

// Initialize Google Analytics
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (GA_ID) {
    ReactGA.initialize(GA_ID);
}

function App() {
    const { trackVisit } = useAnalytics();
    const location = useLocation();

    useEffect(() => {
        // Track page view in GA
        ReactGA.send({ hitType: "pageview", page: location.pathname });
        // Track in Supabase
        trackVisit('page_view', location.pathname);
    }, [location]);

    return (
        <div className="app-container">
            <Routes>
                <Route path="/" element={<ProfileCard />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </div>
    )
}

export default App
