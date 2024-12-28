import React, { useState } from 'react';
import { fetchTrends, getLatestTrend } from './services/api';

function App() {
    const [trends, setTrends] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFetchTrends = async () => {
        setLoading(true);
        await fetchTrends();
        const response = await getLatestTrend();

        console.log(response.data.trends);
        setTrends(response.data);
        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Twitter Trends</h1>
            <button
                onClick={handleFetchTrends}
                disabled={loading}
                style={styles.button(loading)}
            >
                {loading ? 'Fetching...' : 'Fetch Twitter Trends'}
            </button>
            {trends && (
                <div style={styles.card}>
                    <h2 style={styles.subHeader}>Top Trends</h2>
                    <ol style={styles.trendList}>
                        {trends.trends.map((trend, index) => (
                            <li key={index} style={styles.trendItem}>{trend}</li>
                        ))}
                    </ol>
                    <p><strong>Fetched at:</strong> {new Date(trends.date_time).toLocaleString()}</p>
                    <p><strong>IP Address:</strong> {trends.ip_address}</p>
                    <div style={styles.trendDetails}>
                        <h2 style={styles.subHeader}>All Trends</h2>
                        <pre style={styles.pre}>
                            {JSON.stringify(trends, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: 'auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    header: {
        textAlign: 'center',
        color: '#333',
    },
    button: (loading) => ({
        display: 'block',
        margin: '20px auto',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: loading ? 'not-allowed' : 'pointer',
        backgroundColor: loading ? '#ccc' : '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
    }),
    card: {
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    subHeader: {
        color: '#555',
        borderBottom: '2px solid #007BFF',
        paddingBottom: '5px',
        marginBottom: '15px',
    },
    trendList: {
        listStyleType: 'decimal',
        paddingLeft: '20px',
    },
    trendItem: {
        margin: '5px 0',
        fontSize: '16px',
        color: '#444',
    },
    trendDetails: {
        marginTop: '20px',
        backgroundColor: '#f4f4f4',
        padding: '10px',
        borderRadius: '5px',
    },
    pre: {
        backgroundColor: '#e9ecef',
        padding: '15px',
        borderRadius: '5px',
        fontSize: '14px',
        overflowX: 'auto',
    },
};

export default App;
