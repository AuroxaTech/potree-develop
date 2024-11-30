const BASE_URL = 'https://potree-backend.onrender.com/api';

async function apiCall(endpoint, method, data = null) {
    const url = `${BASE_URL}${endpoint}`;
    console.log('method', method)
    const authToken = localStorage.getItem('authToken');
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
        console.log('Payload being sent:', options.body);
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const get = (endpoint) => apiCall(endpoint, 'GET');
export const post = (endpoint, data) => apiCall(endpoint, 'POST', data); 