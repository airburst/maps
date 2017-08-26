export class StorageService {

    getRoute(id) {
        return this.fetch(this.baseUrl + id)
            .then(res => res.json())
            .catch(this.handleError);
    }

    saveRoute(route) {
        let body = JSON.stringify({ route });

        return this.http.put(this.baseUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    handleError(error) {
        const errMsg = error.message || 'Storage error';
        throw(errMsg);
    }

}
