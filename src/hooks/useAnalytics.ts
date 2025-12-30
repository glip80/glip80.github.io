import { supabase } from '../lib/supabase';

export const useAnalytics = () => {
    const trackVisit = async (action: string = 'page_view', details: string = '') => {
        try {
            // Fetch IP and Location data
            const res = await fetch('https://ipapi.co/json/');
            const data = await res.json();
            const ip = data.ip;

            const { error } = await supabase
                .from('visits')
                .insert([
                    { ip, action, details: details, city: data.city, country: data.country_name }
                ]);

            if (error) {
                console.error('Error logging visit:', error);
            }
        } catch (error) {
            console.error('Analytics error:', error);
            // Fallback if IP API fails
            await supabase
                .from('visits')
                .insert([
                    { ip: 'unknown', action, details: details || 'Location fetch failed' }
                ]);
        }
    };

    return { trackVisit };
};
