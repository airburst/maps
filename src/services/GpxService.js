import { flatten, replaceAll, truncate } from './utils';

const TEMPLATE = {
  header:
    '<?xml version="1.0" encoding="utf-8"?><gpx creator="maps.fairhursts.net" standalone="yes" version="1.1" xmlns="http://www.topografix.com/GPX/1/1"><rte><name>{name}</name>',
  point: '<rtept lon="{lon}" lat="{lat}"></rtept>',
  end: '</rte></gpx>'
};

export default class GpxService {
  constructor() {
    this.name = 'Unnamed Route';
    this.track = [];
    this.elevation = [];
  }

  read({ route, ext }) {
    // console.log('GpxService:read', route)
    if (!route) {
      console.log('Error reading GPX file: no data');
    }
    try {
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(route, 'text/xml');
      if (ext === 'gpx') {
        return this.gpxToRoute(xmlDoc);
      }
      if (ext === 'tcx') {
        return this.tcxToRoute(xmlDoc);
      }
    } catch (err) {
      console.log('Error reading GPX file:', err);
      return err;
    }
  }

  gpxToRoute(xml) {
    // Route Name (trk/name)
    const trk = xml.getElementsByTagName('trk');
    this.name =
      trk[0].getElementsByTagName('name').length > 0
        ? trk[0].getElementsByTagName('name')[0].textContent
        : 'Imported Route';

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
    for (let t of trackPoints) {
      this.track.push({
        lat: truncate(t.getAttribute('lat').valueOf(), 6),
        lon: truncate(t.getAttribute('lon').valueOf(), 6)
      });
      this.elevation.push(
        t.getElementsByTagName('ele').length > 0
          ? truncate(t.getElementsByTagName('ele')[0].textContent, 1)
          : 0
      );
    }

    return {
      name: this.name,
      track: this.track,
      elevation: this.elevation
    };
  }

  // TODO: understand the full schema:
  // http://www8.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd
  // This function only handles course[0], not activities or multiple courses
  tcxToRoute(xml) {
    // Course Name (Course/Name)
    const course = xml.getElementsByTagName('Course')[0];
    this.name =
      course.getElementsByTagName('Name').length > 0
        ? course.getElementsByTagName('Name')[0].textContent
        : 'Imported Route';

    // Track Points (Track/Trackpoint[Position/LatitudeDegrees, Position/LongitudeDegrees, AltitudeMeters])
    const trackPoints = xml.getElementsByTagName('Trackpoint');
    for (let t of trackPoints) {
      this.track.push({
        lat: truncate(
          t.getElementsByTagName('LatitudeDegrees')[0].textContent,
          6
        ),
        lon: truncate(
          t.getElementsByTagName('LongitudeDegrees')[0].textContent,
          6
        )
      });
      this.elevation.push(
        truncate(t.getElementsByTagName('AltitudeMeters')[0].textContent, 1)
      );
    }

    return {
      name: this.name,
      track: this.track,
      elevation: this.elevation
    };
  }

  write({ name = 'Unnamed Route', track }) {
    let gpxContent = replaceAll(TEMPLATE.header, '{name}', name);
    const flatTrack = flatten(track);
    gpxContent += flatTrack
      .map(point => {
        return TEMPLATE.point
          .replace('{lat}', point.lat.toFixed(7))
          .replace('{lon}', point.lon.toFixed(7));
      })
      .join('');
    gpxContent += TEMPLATE.end;
    return gpxContent;
  }
}
