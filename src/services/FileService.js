import fileDownload from 'react-file-download';

const DEFAULT_OPTIONS = {
    'types': ['gpx', 'tcx']
};

export default class FileService {

    constructor(options) {
        this.options = Object.assign({}, DEFAULT_OPTIONS, options);
    }

    readTextFile(input) {
        const file = input.files[0];
        const ext = this.extension(file.name);
        const reader = new FileReader();
        return new Promise(resolve => {
            reader.onloadend = () => {
                resolve({
                    route: reader.result,
                    ext
                });
            };
            reader.readAsText(file);
        });
    }

    extension(fileName) {
        const re = /(?:\.([^.]+))?$/;
        const ext = re.exec(fileName)[1];
        if (ext !== undefined) { return ext; }
        return '';
    }

    save(data, filename) {
        if (!filename || filename === ".gpx") { filename = 'route.gpx'; }
        try {
            fileDownload(data, filename);
        }
        catch (err) {
            console.log('Error downloading file:', filename);
        }
    }

}