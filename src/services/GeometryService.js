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