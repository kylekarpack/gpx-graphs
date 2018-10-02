import { Component } from "@angular/core";
import * as GpxParse from "gpx-parse/dist/gpx-parse-browser.js";
import * as toGeoJson from "@mapbox/togeojson";
import length from "@turf/length";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
export class AppComponent {

	constructor() {	}

	public results: any[] = [];

	public options: any = {
		units: "miles"
	};

	// Simple tracker for stats
	public stats = {
		distance: 0,
		elevation: 0
	};

	public filesAdded($event: any): void {

		this.results = [];
		

		for (let file of $event.target.files) {

			const reader = new FileReader();

			reader.onload = (data: any) => {
				// ToDo: re-implement this to add back time as a factor
				// GpxParse.parseGpx(data.target.result, (error, result) => {
				// 	if (error) {
				// 		alert("Something went wrong!");
				// 		console.error(error);
				// 	}
				// 	});

				const xml = new DOMParser().parseFromString(data.target.result, "text/xml"),
					geoJson = toGeoJson.gpx(xml);

				const points = xml.querySelectorAll("trk trkseg trkpt");

				this.results.push({ 
					geoJson: geoJson, 
					xml: xml,
					distance: length(geoJson, this.options),
					name: xml.querySelector("trk name").innerHTML,
					start: new Date(points[0].querySelector("time").innerHTML),
					end: new Date(points[points.length - 1].querySelector("time").innerHTML),
				});

				// Process if all complete
				if (this.results.length >= $event.target.files.length) {
					this.process();
				}
	

			};

			reader.readAsText(file);
		}

	}

	private process(): void {
		// Get a sum of the distances
		this.stats.distance = this.results.map(el => el.distance).reduce((a,b) => a + b, 0);

	}

}
