import fileDownload from 'react-file-download';

const defaultOptions = {
    'types': ['gpx', 'tcx']
};

export default class FileService {

    constructor(options) {
        this.options = Object.assign({}, defaultOptions, options);
    }

    readTextFile(input, response) {
        const file = input.files[0];
        const name = file.name;
        const ext = this.extension(name);
        const reader = new FileReader();
        reader.onloadend = () => (response(reader.result, name, ext));
        reader.readAsText(file);
    }

    extension(fileName) {
        const re = /(?:\.([^.]+))?$/;
        const ext = re.exec(fileName)[1];
        if (ext !== undefined) { return ext; }
        return '';
    }

    supports(input) {
        // Check whether cancel button pressed
        if (input.files.length === 0) { return false; }

        // Check whether file extension is in whitelist
        const ext = this.extension(input.files[0].name);
        if (this.options.types.indexOf(ext) > -1) { return true; }
        return false;
    }

    setAllowedExtensions(extensions = ['txt']) {
        this.options = Object.assign({}, this.options, { types: extensions });
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