export default class ScriptLoader {

    load(url) {
        const scriptPromise = new Promise(function(resolve, reject) {
            const script = document.createElement('script');
            script.src = url;
            script.async = true;
            script.addEventListener('load', () => resolve(url), false);
            script.addEventListener('error', () => reject(url), false);
            document.body.appendChild(script);
        });

        return scriptPromise;
    }

}