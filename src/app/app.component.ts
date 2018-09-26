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

	public options: any = {
		units: "miles"
	};

	// Simple tracker for stats
	public stats = {
		distance: 0,
		elevation: 0
	};

	public filesAdded($event: any): void {

		const results = [];
		

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

				results.push(geoJson);

				// Process if all complete
				if (results.length >= $event.target.files.length) {
					this.process(results);
				}
	

			};

			reader.readAsText(file);
		}

	}

	private process(results: any[]): void {
		// Get a sum of the distances
		this.stats.distance = results.map(el => length(el, this.options)).reduce((a,b) => a + b, 0);

	}

}
