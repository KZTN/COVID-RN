import axios from 'axios';

const polygonapi = axios.create({
    baseURL: 'https://nominatim.openstreetmap.org/search.php?q=rio+grande+do+norte&polygon_geojson=1&format=json'
})

export default polygonapi;