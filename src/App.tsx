import { Routes, Route, useLocation } from 'react-router-dom';
import { ProfileCard } from './components/ProfileCard';
import { Admin } from './pages/Admin';
import { useAnalytics } from './hooks/useAnalytics';
import { useEffect } from 'react';
import ReactGA from "react-ga4";

// Initialize Google Analytics
ReactGA.initialize("G-354MNC11N2");

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
