import { Component } from "@angular/core";
import * as GpxParse from "gpx-parse/dist/gpx-parse-browser.js";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
export class AppComponent {
	title = "app";

	constructor() {
		console.warn(GpxParse);

	}

	public filesAdded($event: any): void {
		console.warn($event);

		const reader = new FileReader();
		reader.onload = (data) => {
			console.log(data)
			GpxParse.parseGpx(data.target.result, (error, result) => {
				console.warn(result)
			});
		};

		for (let file of $event.target.files) {
			reader.readAsText(file);
		}

	}

}
