export const flatten = array => [].concat.apply([], array);

export const replaceAll = (text, find, replace) => (text.split(find).join(replace));

export const chunk = (collection, chunkSize) => {
    if (!collection || isNaN(parseInt(chunkSize, 10))) { return []; }
    return [].concat.apply([],
        collection.map((c, i) => {
            return i % chunkSize ? [] : [collection.slice(i, i + chunkSize)];
        })
    );
};

export const truncate = (num, places = 2) => {
    const factor = Math.pow(10, places);
    const castNum = parseFloat(num, 10);
    if (isNaN(castNum)) { return 0; }
    return Math.floor(castNum * factor) / factor;
}
