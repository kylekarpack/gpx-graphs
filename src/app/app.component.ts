import { Component, ViewEncapsulation } from "@angular/core";
import * as toGeoJson from "@mapbox/togeojson";
import bbox from "@turf/bbox";
import center from "@turf/center";
import length from "@turf/length";
import { LngLatBounds } from 'mapbox-gl';
import { TIME_SELECTOR, TRACK_NAME_SELECTOR, TRACK_POINTS_SELECTOR } from "./constants/selectors";
import { Stats } from "./interfaces/stats";


@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    constructor() { }

    /** Keep track of the results rows for display */
    public results: Stats[] = [];

    /** Keep track of the aggregate stats */
    public stats = {
        distance: 0,
        elevation: 0
    };

    /** Allow for some user-defined options */
    public options: any = {
        units: "miles"
    };

    /**
     * Run the application logic when files are added to the file uploader
     * @param  {Event} $event
     * @returns void
     */
    public filesAdded($event: any): void {

        // Clear out the grid when new files are added
        this.results = [];

        for (let file of $event.target.files) {

            const reader = new FileReader();

            reader.onload = (data: any) => {

                this.results.push(this.getStatsFromFile(data.target.result));

                // Process if all complete
                if (this.results.length >= $event.target.files.length) {
                    this.stats.distance = this.processAllStats();
                }

            };

            // Perform the read
            reader.readAsText(file);
        }
    }
    
    /**
     * Calculate statistics from a given file and return them
     * @param  {string} fileData
     * @returns Stats
     */
    private getStatsFromFile(fileData: string): Stats {
        const xml = new DOMParser().parseFromString(fileData, "text/xml"),
            geoJson = toGeoJson.gpx(xml);

        const points = Array.from(xml.querySelectorAll(TRACK_POINTS_SELECTOR));

        let min = Number(points[0].children[0].innerHTML),
            max = min,
            prevElevation,
            totalElevation = 0,
            reducedPoints = [],
            bounds = bbox(geoJson);

        // Loop through the points and calculate some states from them
        for (let i = 0; i < points.length; i++) {

            const point = points[i],
                elevation = Number(point.children[0].innerHTML);

            if (elevation < min) {
                min = elevation
            } else if (elevation > max) {
                max = elevation;
            }

            if (prevElevation && prevElevation < elevation) {
                totalElevation += (elevation - prevElevation);
            }

            prevElevation = elevation;

            // Reduce the number of points
            if (i % Math.round(points.length / 20) === 0) {
                reducedPoints.push({
                    date: new Date(point.querySelector(TIME_SELECTOR).innerHTML),
                    elevation: elevation
                })
            }
        }

        return {
            geoJson: geoJson,
            center: center(geoJson),
            bounds: new LngLatBounds([bounds[0], bounds[1]], [bounds[2], bounds[3]]),
            xml: xml,
            distance: length(geoJson, this.options),
            name: xml.querySelector(TRACK_NAME_SELECTOR).innerHTML,
            start: new Date(points[0].querySelector(TIME_SELECTOR).innerHTML),
            end: new Date(points[points.length - 1].querySelector(TIME_SELECTOR).innerHTML),
            netElevation: Math.round(max - min),
            totalElevation: Math.round(totalElevation),
            reducedPoints: reducedPoints
        };

    }

    /**
     * Get a sum of the distances
     * @returns number
     */
    private processAllStats(): number {
        return this.results.map(el => el.distance).reduce((a, b) => a + b, 0);
    }

}
