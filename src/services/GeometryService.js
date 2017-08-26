const distanceBetween = (point1, point2) => {
    const p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((point2.lat - point1.lat) * p) / 2 +
        c(point1.lat * p) * c(point2.lat * p) *
        (1 - c((point2.lon - point1.lon) * p)) / 2;
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

export const trunc = num => Math.floor(num * 100) / 100;

export const addDistanceToTrack = track => {
    if (track.length === 0) { return track; }
    return track.map((t, i) => {
        if (i === 0) { return Object.assign({}, t, { dist: 0 }); }
        return Object.assign({}, t, {
            dist: distanceBetween(track[i - 1], t)
        });
    });
};

export const distance = track => {
    if (!track || track.length === 0) { return 0; }
    return track.map(t => t.dist)
        .reduce((a, b) => a + b, 0);
}

export const addDistanceToElevation = (elevation, track) => {
    if (elevation.length === 0) { return elevation; }
    let dist = 0;
    return elevation
        .map((e, i) => {
            if (i === 0) { return [0, e]; }
            dist += track[i].dist;
            return [dist, e];
        });
}

const initialBounds = {
    minLat: 1000000,
    minLon: 1000000,
    maxLat: -1000000,
    maxLon: -1000000
}

const centre = (point1, point2) => {
    return {
        lat: point1.lat + ((point2.lat - point1.lat) / 2),
        lon: point1.lon + ((point2.lon - point1.lon) / 2)
    }
}

const getZoomLevel = (point1, point2) => {
    const toolbarHeight = 56,
        wHeight = window.innerHeight - toolbarHeight,
        wWidth = window.innerWidth,
        osPixelMap = [1, 2, 5, 10, 20, 40, 100, 200, 500, 1000];
    let z = 1;

    // Establish box height and width
    const bHeight = distanceBetween(
        { lat: point1.lat, lon: point1.lon },
        { lat: point2.lat, lon: point1.lon }
    );
    const bWidth = distanceBetween(
        { lat: point1.lat, lon: point1.lon },
        { lat: point1.lat, lon: point2.lon }
    );
    // Find out the minimum pixel density - height or width
    const pixelDensity = Math.min((wHeight / bHeight), (wWidth / bWidth));
    while (pixelDensity > osPixelMap[z]) { z++; }
    return z;
}

// Only run on a pre-flattened track, after import or embed
export const boundingRectangle = ({ waypoints, track }) => {
    let b = Object.assign({}, initialBounds);
    const points = waypoints ? waypoints : track;
    points.forEach(point => {
        b.minLat = Math.min(b.minLat, point.lat);
        b.maxLat = Math.max(b.maxLat, point.lat);
        b.minLon = Math.min(b.minLon, point.lon);
        b.maxLon = Math.max(b.maxLon, point.lon);
    });
    const { lat, lon } = centre(b.minLat, b.minLon, b.maxLat, b.maxLon);
    const zoom = getZoomLevel(b.minLat, b.minLon, b.maxLat, b.maxLon);
    return { lat, lon, zoom };
}
