import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Point, WayPoint, Marker, Segment, AppStore, Route, RouteObserver} from '../models/route';
import {replaceAll, flatten} from '../utils/utils';
import {initialState} from '../reducers/details';

@Injectable()
export class GpxService {

    public appStore: AppStore;  // Refactor to Route
    public route: Route;
    private routeObserver: RouteObserver;

    constructor(public store: Store<AppStore>) { }

    init() {
        this.appStore = <AppStore>{
            details: Object.assign({}, initialState),
            track: [],
            elevation: [],
            markers: []
        }
        this.routeObserver = new RouteObserver(this.store);
    }

    read(gpxData: any): void {
        let route: any = gpxData[0],
            name: string = gpxData[1],
            ext: string = gpxData[2];

        this.init();
        try {
            let parser: DOMParser = new DOMParser();
            let xmlDoc: Document = parser.parseFromString(route, 'text/xml');

            // Parse the file dependent on type
            if (ext === 'gpx') { this.gpxToRoute(xmlDoc); }
            if (ext === 'tcx') { this.tcxToRoute(xmlDoc); }
        }
        catch (err) {
            console.log(err);
            return (err);
        }
    }

    private gpxToRoute(xml: Document): void {
        // Route Name (trk/name)
        let trk = xml.getElementsByTagName('trk')

        this.appStore.details.name = (trk[0].getElementsByTagName('name') !== undefined) ? 
            trk[0].getElementsByTagName('name')[0].textContent : '';

        // Waypoints (gpx/wpt[@lat, @lon, name]) -> Markers
        let wayPoints: NodeListOf<Element> = xml.getElementsByTagName('wpt');
        for (let i = 0; i < wayPoints.length; i++) {
            let marker: Marker = {
                name: wayPoints[i].getElementsByTagName('name')[0].textContent,
                point: {
                    lat: parseFloat(wayPoints[i].getAttribute('lat').valueOf()),
                    lon: parseFloat(wayPoints[i].getAttribute('lon').valueOf())
                }
            };
            this.appStore.markers.push(marker);
        }

        // Track Points (gpx/trk/trkseg/trkpt[@lat, @lon, ele])
        let trackPoints = xml.getElementsByTagName('trkpt'),
            track: Point[] = [],
            elevation: number[] = [];
        for (let i = 0; i < trackPoints.length; i++) {
            let point: Point = {
                lat: parseFloat(trackPoints[i].getAttribute('lat').valueOf()),
                lon: parseFloat(trackPoints[i].getAttribute('lon').valueOf()),
            };
            track.push(point);
            elevation.push(parseFloat(trackPoints[i].getElementsByTagName('ele')[0].textContent));
        }
        this.appStore.track.push(<Segment>{ id: 'imported', track: track, waypoint: null, hasElevationData: true });
        this.appStore.elevation.push(elevation);
        this.appStore.details.isEditable = true;
        this.appStore.details.hasNewElevation = false;
       
        this.route = new Route(this.appStore);
        this.routeObserver.setRoute(this.route);
    }

    // TODO: understand the full schema:
    // http://www8.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd
    // This function only handles course[0], not activities or multiple courses
    private tcxToRoute(xml: Document): void {
        // Course Name (Course/Name)
        let course = xml.getElementsByTagName('Course')[0];
        this.appStore.details.name = ((course.getElementsByTagName('Name')[0]) !== undefined) ? course.getElementsByTagName('Name')[0].textContent : '';

        // Track Points (Track/Trackpoint[Position/LatitudeDegrees, Position/LongitudeDegrees, AltitudeMeters])
        let trackPoints = xml.getElementsByTagName('Trackpoint'),
            track: Point[] = [],
            elevation: number[] = [];
        for (let i = 0; i < trackPoints.length; i++) {
            let point: Point = {
                lat: parseFloat(trackPoints[i].getElementsByTagName('LatitudeDegrees')[0].textContent),
                lon: parseFloat(trackPoints[i].getElementsByTagName('LongitudeDegrees')[0].textContent)
            };
            track.push(point);
            elevation.push(parseFloat(trackPoints[i].getElementsByTagName('AltitudeMeters')[0].textContent));
        }
        this.appStore.track.push(<Segment>{ id: 'imported', track: track, waypoint: null, hasElevationData: true });
        this.appStore.elevation.push(elevation);

        // Markers - add start and finish points
        // TODO: find out whether courses support waypoints
        this.appStore.markers.push({ name: 'Start', point: track[0] });
        this.appStore.markers.push({ name: 'Finish', point: track[track.length - 1] });
        this.appStore.details.isEditable = true;
        this.appStore.details.hasNewElevation = false;

        this.route = new Route(this.appStore);
        this.routeObserver.setRoute(this.route);
    }

    private template: any = {
        header: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + 
            '<gpx xmlns="http://www.topografix.com/GPX/1/1" version="1.1" creator="maps.fairhursts.net">',
        title: '<metadata><name>{name}</name></metadata><rte><name>{name}</name>',
        point: '<rtept lon="{lon}" lat="{lat}">' +
               '<ele>{ele}</ele>' +
               '</rtept>',
        end: '</rte></gpx>'
    }

    write(name?: string): string {
        if (name === undefined) { name = 'Route'; }
        let gpxContent: string = this.template.header + replaceAll('{name}', name, this.template.title),
            e: any[] = flatten(this.store.getState().elevation),
            eIndex: number = 0;
        
        this.store.getState().track.forEach((segment) => {
            segment.track.forEach((t) => {
                gpxContent += this.template.point
                    .replace('{lat}', t.lat.toFixed(7))
                    .replace('{lon}', t.lon.toFixed(7))
                    .replace('{ele}', e[eIndex++].toFixed(1));
            });
        });
        
        gpxContent += this.template.end;
        return gpxContent;
    }

}
