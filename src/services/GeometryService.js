const distanceBetween = (point1, point2) => {
    const p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((point2.lat - point1.lat) * p) / 2 +
        c(point1.lat * p) * c(point2.lat * p) *
        (1 - c((point2.lon - point1.lon) * p)) / 2;
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

export const trunc = (num, dp = 2) => {
    const factor = Math.pow(10, dp);
    return Math.floor(num * factor) / factor;
}

export const addDistanceToTrack = track => {
    if (track.length === 0) { return track; }
    return track.map((t, i) => {
        if (i === 0) { return Object.assign({}, t, { dist: 0 }); }
        return Object.assign({}, t, {
            dist: trunc(distanceBetween(track[i - 1], t), 3)
        });
    });
};

export const distance = track => {
    if (!track || track.length === 0) { return 0; }
    return track.map(t => t.dist)
        .reduce((a, b) => a + b, 0);
}

export const totalAscent = elevation => {
    if (!elevation || elevation.length === 0) { return 0; }
    let ascent = 0;
    let i = 0;
    for (i = 0; i < elevation.length; i++) {
        if (i > 0 && elevation[i][1] > elevation[i - 1][1]) {
            ascent += elevation[i][1] - elevation[i - 1][1];
        }
    }
    return ascent;
}

// export const unique = (values) => {                  // Use variant to smooth track
//     return values.reduce(function (prev, cur) {
//         if (prev.indexOf(cur) == -1) {
//             prev.push(cur);
//         }
//         return prev;
//     }, []);
// }

export const addDistanceToElevation = (elevation, track) => {
    if (elevation.length === 0) { return elevation; }
    let dist = 0;
    return elevation
        .map((e, i) => {
            if (i === 0) { return [0, e]; }
            dist += track[i].dist;
            return [trunc(dist, 2), e];
        });
}

const INITIAL_BOUNDS = {
    minLat: 1000000,
    maxLat: -1000000,
    minLon: 1000000,
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
export const getBounds = ({ waypoints, track }) => {
    let b = Object.assign({}, INITIAL_BOUNDS);
    const points = waypoints ? waypoints : track;
    points.forEach(point => {
        b.minLat = Math.min(b.minLat, point.lat);
        b.maxLat = Math.max(b.maxLat, point.lat);
        b.minLon = Math.min(b.minLon, point.lon);
        b.maxLon = Math.max(b.maxLon, point.lon);
    });
    const point1 = { lat: b.minLat, lon: b.minLon };
    const point2 = { lat: b.maxLat, lon: b.maxLon };
    const { lat, lon } = centre(point1, point2);
    const zoom = getZoomLevel(point1, point2);
    return { lat, lon, zoom };
}
