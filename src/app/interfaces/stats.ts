import { LngLatBounds } from "mapbox-gl";
import { Feature, Point } from "@turf/helpers";

/** Model representing the computed statistics from a single track */
export interface Stats {
    geoJson: any;
    center: Feature<Point, { [name: string]: any; }>;
    bounds: LngLatBounds;
    xml: Document;
    distance: number;
    name: string;
    start: Date;
    end: Date;
    netElevation: number;
    totalElevation: number;
    reducedPoints: any[];
};