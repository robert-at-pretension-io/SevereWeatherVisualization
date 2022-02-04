
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

enum UsaState {
    Alabama = "Alabama",
    Alaska = "Alaska",
    AmericanSamoa = "American Samoa",
    Arizona = "Arizona",
    Arkansas = "Arkansas",
    California = "California",
    Colorado = "Colorado",
    Connecticut = "Connecticut",
    Delaware = "Delaware",
    DistrictofColumbia = "District of Columbia",
    FederatedStatesofMicronesia = "Federated States of Micronesia",
    Florida = "Florida",
    Georgia = "Georgia",
    Guam = "Guam",
    Hawaii = "Hawaii",
    Idaho = "Idaho",
    Illinois = "Illinois",
    Indiana = "Indiana",
    Iowa = "Iowa",
    Kansas = "Kansas",
    Kentucky = "Kentucky",
    Louisiana = "Louisiana",
    Maine = "Maine",
    MarshallIslands = "Marshall Islands",
    Maryland = "Maryland",
    Massachusetts = "Massachusetts",
    Michigan = "Michigan",
    Minnesota = "Minnesota",
    Mississippi = "Mississippi",
    Missouri = "Missouri",
    Montana = "Montana",
    Nebraska = "Nebraska",
    Nevada = "Nevada",
    NewHampshire = "New Hampshire",
    NewJersey = "New Jersey",
    NewMexico = "New Mexico",
    NewYork = "New York",
    NorthCarolina = "North Carolina",
    NorthDakota = "North Dakota",
    NorthernMarianaIslands = "Northern Mariana Islands",
    Ohio = "Ohio",
    Oklahoma = "Oklahoma",
    Oregon = "Oregon",
    Palau = "Palau",
    Pennsylvania = "Pennsylvania",
    PuertoRico = "Puerto Rico",
    RhodeIsland = "Rhode Island",
    SouthCarolina = "South Carolina",
    SouthDakota = "South Dakota",
    Tennessee = "Tennessee",
    Texas = "Texas",
    Utah = "Utah",
    Vermont = "Vermont",
    VirginIslands = "Virgin Islands",
    Virginia = "Virginia",
    Washington = "Washington",
    WestVirginia = "West Virginia",
    Wisconsin = "Wisconsin",
    Wyoming = "Wyoming"
}

enum WeatherTypes {
    HighWind = "High Wind",
    WinterWeather = "Winter Weather",
    CoastalFlood = "Coastal Flood",
    Drought = "Drought",
    TropicalStorm = "Tropical Storm",
    Hurricane = "Hurricane",
    Tornado = "Tornado",
    ThunderstormWind = "Thunderstorm Wind",
    FlashFlood = "Flash Flood",
    Hail = "Hail",
    HeavyRain = "Heavy Rain"
}


enum outFieldOptions {
    OBJECTID = "OBJECTID",
    STATE = "STATE",
    EVENT_TYPE = "EVENT_TYPE",
    DAMAGE_PROPERTY = "DAMAGE_PROPERTY",
    EPISODE_NARRATIVE = "EPISODE_NARRATIVE",
    LatLon_Known = "LatLon_Known",
    Year = "Year",
    INJURIES_DIRECT = "INJURIES_DIRECT",
    INJURIES_INDIRECT = "INJURIES_INDIRECT",
    DEATHS_INDIRECT = "DEATHS_INDIRECT",
    DEATHS_DIRECT = "DEATHS_DIRECT",
    TOR_F_SCALE = "TOR_F_SCALE",
    CZ_NAME = "CZ_NAME"
}

//when multiple formatting outFieldOptions are selected, it's just a continguous string separated by commas




export { GeometryTypes, UsaState, WeatherTypes, outFieldOptions };