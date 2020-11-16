module.exports = {
    MAPBOX_KEY: process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_KEY,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    getAccessToken: () => localStorage.getItem('token'),
    toJSON: (response) => response.json()
}