
enum GeometryTypes {
    Point = "Point",
    LineString = "LineString",
    Polygon = "Polygon",
    // There are other types, but we don't need them for this project
}

interface GeoJson {
    type: string;
    features: Feature[];
}

interface Feature {
    type: string;
    geometry: Geometry;
    properties: any;
}

interface Geometry {
    type: GeometryTypes;
    // These coordinates are either a single longitude/latitude pair, or an array of longitude/latitude pairs.
    coordinates: number[][][] | number[][] | number[];
}

export type { GeometryTypes, GeoJson, Feature, Geometry };