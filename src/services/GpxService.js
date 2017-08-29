import { replaceAll, flatten } from './utils';

const TEMPLATE = {
    header: '<?xml version="1.0" encoding="utf-8"?><gpx creator="maps.fairhursts.net" standalone="yes" version="1.1" xmlns="http://www.topografix.com/GPX/1/1"><rte><name>{name}</name>',
    point: '<rtept lon="{lon}" lat="{lat}"></rtept>',
    end: '</rte></gpx>'
}

export default class GpxService {

    constructor() {
        this.name = 'Unnamed Route';
        this.route = [];
        this.elevation = [];
    }

    read(gpxData) {
        if (!gpxData) { console.log('Error reading GPX file: no data'); }
        const route = gpxData[0];   // Use spread syntax
        // const name = gpxData[1];
        const ext = gpxData[2];

        try {
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(route, 'text/xml');

            // Parse the file dependent on type
            if (ext === 'gpx') { this.gpxToRoute(xmlDoc); }
            if (ext === 'tcx') { this.tcxToRoute(xmlDoc); }
        }
        catch (err) {
            console.log('Error reading GPX file:', err);
            return (err);
        }
    }

    gpxToRoute(xml) {
        // Route Name (trk/name)
        const trk = xml.getElementsByTagName('trk');
        this.name = (trk[0].getElementsByTagName('name') !== undefined)
            ? trk[0].getElementsByTagName('name')[0].textContent : '';

        // Waypoints (gpx/wpt[@lat, @lon, name]) -> Markers
        // let wayPoints = xml.getElementsByTagName('wpt');
        // for (let i = 0; i < wayPoints.length; i++) {
        //     let marker = {
        //         name: wayPoints[i].getElementsByTagName('name')[0].textContent,
        //         point: {
        //             lat: parseFloat(wayPoints[i].getAttribute('lat').valueOf()),
        //             lon: parseFloat(wayPoints[i].getAttribute('lon').valueOf())
        //         }
        //     };
        //     this.appStore.markers.push(marker);
        // }

        // Track Points (gpx/trk/trkseg/trkpt[@lat, @lon, ele])
        const trackPoints = xml.getElementsByTagName('trkpt');
        trackPoints.map(trackPoint => {
            this.route.push({
                lat: parseFloat(trackPoint.getAttribute('lat').valueOf(), 10),
                lon: parseFloat(trackPoint.getAttribute('lon').valueOf(), 10),
            });
            this.elevation.push(
                parseFloat(trackPoint.getElementsByTagName('ele')[0].textContent)
                , 10);
            return true;
        });
        // this.appStore.details.isEditable = true;
        // this.appStore.details.hasNewElevation = false;
        return {
            route: this.route,
            elevation: this.elevation
        }
    }

    // TODO: understand the full schema:
    // http://www8.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd
    // This function only handles course[0], not activities or multiple courses
    tcxToRoute(xml) {
        // Course Name (Course/Name)
        const course = xml.getElementsByTagName('Course')[0];
        this.name = ((course.getElementsByTagName('Name')[0]) !== undefined)
            ? course.getElementsByTagName('Name')[0].textContent : '';

        // Track Points (Track/Trackpoint[Position/LatitudeDegrees, Position/LongitudeDegrees, AltitudeMeters])
        const trackPoints = xml.getElementsByTagName('Trackpoint');
        trackPoints.map(trackPoint => {
            this.route.push({
                lat: parseFloat(trackPoint.getElementsByTagName('LatitudeDegrees')[0].textContent, 10),
                lon: parseFloat(trackPoint.getElementsByTagName('LongitudeDegrees')[0].textContent, 10)
            });
            this.elevation.push(parseFloat(trackPoint.getElementsByTagName('AltitudeMeters')[0].textContent, 10));
            return true;
        });

        return {
            route: this.route,
            elevation: this.elevation
        }
    }

    write({ name = 'Unnamed Route', track }) {
        let gpxContent = replaceAll(TEMPLATE.header, '{name}', name);
        const flatTrack = flatten(track);
        gpxContent += flatTrack.map(point => {
            return TEMPLATE.point
                .replace('{lat}', point.lat.toFixed(7))
                .replace('{lon}', point.lon.toFixed(7));
        }).join('');
        gpxContent += TEMPLATE.end;
        return gpxContent;
    }

}

// GPX Route Waypoint
// <wpt lat="51.321804039180279" lon="-1.764520034193993">
// <ele>183.29816600000001</ele>
// <time>2012-11-29T15:19:53Z</time>
// <name>Start Pewsey Hill</name>
// <cmt>Pewsey Hill</cmt>
// <desc>Pewsey Hill</desc>
// <sym>Flag, Blue</sym>
// <type>user</type>
// <extensions>
//   <gpxx:WaypointExtension>
//     <gpxx:DisplayMode>SymbolAndName</gpxx:DisplayMode>
//   </gpxx:WaypointExtension>
//   <wptx1:WaypointExtension>
//     <wptx1:DisplayMode>SymbolAndName</wptx1:DisplayMode>
//   </wptx1:WaypointExtension>
//   <ctx:CreationTimeExtension>
//     <ctx:CreationTime>2012-11-29T15:19:53Z</ctx:CreationTime>
//   </ctx:CreationTimeExtension>
// </extensions>
// </wpt>
