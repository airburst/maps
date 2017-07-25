export const flatten = array => [].concat.apply([], array);

export const chunk = (collection, chunkSize) => {
    if (!collection || isNaN(parseInt(chunkSize, 10))) { return []; }
    return [].concat.apply([],
        collection.map((c, i) => {
            return i % chunkSize ? [] : [collection.slice(i, i + chunkSize)];
        })
    );
};