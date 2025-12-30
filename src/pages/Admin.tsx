import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [visits, setVisits] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple client-side protection
        if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            // Will fetch via useEffect when page/pageSize changes
        } else {
            alert('Incorrect password');
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchVisits();
        }
    }, [isAuthenticated, page, pageSize]);

    const fetchVisits = async () => {
        setLoading(true);
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        const { data, error, count } = await supabase
            .from('visits')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(from, to);

        if (error) {
            alert('Error fetching data: ' + error.message);
        } else {
            setVisits(data || []);
            setTotal(count || 0);
        }
        setLoading(false);
    };

    const totalPages = Math.ceil(total / pageSize);

    if (!isAuthenticated) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4rem', color: '#fff' }}>
                <h1>Admin Access</h1>
                <form onSubmit={handleLogin} style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        style={{ padding: '0.5rem', borderRadius: '4px', border: 'none' }}
                    />
                    <button type="submit" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Login</button>
                </form>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Visitor Statistics</h1>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setPage(1); // Reset to first page
                        }}
                        style={{ padding: '0.5rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
                    >
                        <option value={10}>10 rows</option>
                        <option value={25}>25 rows</option>
                        <option value={50}>50 rows</option>
                        <option value={100}>100 rows</option>
                    </select>
                    <button onClick={fetchVisits} disabled={loading} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1rem', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <th style={{ padding: '0.5rem' }}>Time</th>
                            <th style={{ padding: '0.5rem' }}>IP</th>
                            <th style={{ padding: '0.5rem' }}>Location</th>
                            <th style={{ padding: '0.5rem' }}>Action</th>
                            <th style={{ padding: '0.5rem' }}>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visits.map((visit) => (
                            <tr key={visit.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '0.5rem' }}>{new Date(visit.created_at).toLocaleString()}</td>
                                <td style={{ padding: '0.5rem' }}>{visit.ip}</td>
                                <td style={{ padding: '0.5rem' }}>{visit.city ? `${visit.city}, ${visit.country}` : '-'}</td>
                                <td style={{ padding: '0.5rem' }}>{visit.action}</td>
                                <td style={{ padding: '0.5rem' }}>{visit.details}</td>
                            </tr>
                        ))}
                        {visits.length === 0 && !loading && (
                            <tr>
                                <td colSpan={5} style={{ padding: '1rem', textAlign: 'center', color: '#888' }}>
                                    No visits found. Make sure the table exists.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ color: '#888', fontSize: '0.9rem' }}>
                        Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, total)} of {total} entries
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1 || loading}
                            style={{
                                padding: '0.5rem',
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: '4px',
                                color: page === 1 ? '#555' : '#fff',
                                cursor: page === 1 ? 'default' : 'pointer',
                                display: 'flex', alignItems: 'center'
                            }}
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <span style={{ display: 'flex', alignItems: 'center', padding: '0 0.5rem' }}>
                            Page {page} of {totalPages || 1}
                        </span>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages || loading || total === 0}
                            style={{
                                padding: '0.5rem',
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: '4px',
                                color: page === totalPages ? '#555' : '#fff',
                                cursor: page === totalPages ? 'default' : 'pointer',
                                display: 'flex', alignItems: 'center'
                            }}
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
