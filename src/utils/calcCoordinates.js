function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function getCoordinatesInRadius(centerLat, centerLon, radius) {
    const coordinates = [];
    const radiusInDegrees = radius / 111;
    
    for (let lat = centerLat - radiusInDegrees; lat <= centerLat + radiusInDegrees; lat += 0.01) {
        for (let lon = centerLon - radiusInDegrees; lon <= centerLon + radiusInDegrees; lon += 0.01) {
            if (haversineDistance(centerLat, centerLon, lat, lon) <= radius) {
                coordinates.push({ lat, lon }); 
            }
        }
    }
    
    return coordinates;
}

export default getCoordinatesInRadius;
