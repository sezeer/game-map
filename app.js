const map = new maplibregl.Map({
    container: "map",

    style: "https://tiles.openfreemap.org/styles/liberty",

    center: [32.85, 39.93],

    zoom: 11
    
});
map.on(
    "rotate",
    function () {

        updatePlayerDirection();

    }
);

map.on("load", function () {

    const layers = map.getStyle().layers;

    layers.forEach(function (layer) {

        const id = layer.id.toLowerCase();

        const sourceLayer =
            (layer["source-layer"] || "").toLowerCase();

        const filterText =
    JSON.stringify(layer.filter || "").toLowerCase();

const name =
    id + " " + sourceLayer + " " + filterText;


    // TÜM YAZI VE İKONLARI KAPAT
if (layer.type === "symbol") {

    map.setLayoutProperty(
        layer.id,
        "visibility",
        "none"
    );

    return;
}    
    // =========================
        // ARKA PLAN
        // =========================

        if (layer.type === "background") {

            map.setPaintProperty(
                layer.id,
                "background-color",
                "#9e9482"
            );

        }


        // =========================
        // ALANLAR
        // =========================

        if (layer.type === "fill") {

    // SU
    if (name.includes("water")) {

        map.setPaintProperty(
            layer.id,
            "fill-color",
            "#7f94b3"
        );

    }

    // PARK / ORMAN
    else if (
        name.includes("park") ||
        name.includes("forest") ||
        name.includes("wood") ||
        name.includes("grass")
    ) {

        map.setPaintProperty(
            layer.id,
            "fill-color",
            "#456b2f"
        );

    }

    // HASTANE / OKUL / KAMUSAL ALANLAR
else if (
    name.includes("hospital") ||
    name.includes("clinic") ||
    name.includes("school") ||
    name.includes("university") ||
    name.includes("college") ||
    name.includes("kindergarten")
) {

    map.setPaintProperty(
        layer.id,
        "fill-color",
        "#b6b1a5"
    );

    map.setPaintProperty(
        layer.id,
        "fill-opacity",
        1
    );

}
    // ŞEHİR / YERLEŞİM
    else if (
        name.includes("residential") ||
        name.includes("commercial") ||
        name.includes("industrial") ||
        name.includes("urban")
    ) {

        map.setPaintProperty(
            layer.id,
            "fill-color",
            "#b0aea6"
        );

        map.setPaintProperty(
            layer.id,
            "fill-opacity",
            0.9
        );

    }

    // TARLA / AÇIK YEŞİL
    else if (
        name.includes("farmland") ||
        name.includes("meadow") ||
        name.includes("orchard")
    ) {

        map.setPaintProperty(
            layer.id,
            "fill-color",
            "#788953"
        );

    }

    // PLAJ / KUM
    else if (
        name.includes("sand") ||
        name.includes("beach")
    ) {

        map.setPaintProperty(
            layer.id,
            "fill-color",
            "#e3cf75"
        );

    }

    // HAVAALANI
else if (
    name.includes("aeroway") ||
    name.includes("airport")
) {

    map.setPaintProperty(
        layer.id,
        "fill-color",
        "#9b9b96"
    );

    map.setPaintProperty(
        layer.id,
        "fill-opacity",
        0.85
    );

}
    // BİNALAR
    else if (name.includes("building")) {

        map.setPaintProperty(
            layer.id,
            "fill-color",
            "#d9d7cf"
        );

        map.setPaintProperty(
            layer.id,
             "fill-opacity",
    [
        "interpolate",
        ["linear"],
        ["zoom"],

        10, 0,
        12, 0.10,
        13, 0.25,
        14, 0.45,
        15, 0.70,
        17, 1
            ]
        );

    }

}
        
// NEHİR / DERE
if (
    name.includes("waterway") ||
    name.includes("river") ||
    name.includes("stream")
) {

    map.setPaintProperty(
        layer.id,
        "line-color",
        "#7f94b3"
    );

    map.setPaintProperty(
        layer.id,
        "line-width",
        1.5
    );

    return;
}

        // =========================
        // ÇİZGİLER / YOLLAR
        // =========================

        if (layer.type === "line") {
            const dashArray =
    map.getPaintProperty(
        layer.id,
        "line-dasharray"
    );

if (dashArray) {

    map.setLayoutProperty(
        layer.id,
        "visibility",
        "none"
    );

    return;
}
            const unwantedLine =
    name.includes("path") ||
    name.includes("footway") ||
    name.includes("cycleway") ||
    name.includes("track") ||
    name.includes("pedestrian") ||
    name.includes("bridleway");

if (unwantedLine) {

    map.setLayoutProperty(
        layer.id,
        "visibility",
        "none"
    );

    return;
}
// =========================
// DEMİRYOLLARI
// =========================

if (
    name.includes("rail") ||
    name.includes("railway")
) {

    map.setPaintProperty(
        layer.id,
        "line-color",
        "#6b241c"
    );

    map.setPaintProperty(
        layer.id,
        "line-width",
        2.5
    );

    return;
}

            if (
                name.includes("road") ||
                name.includes("highway") ||
                name.includes("transportation")
            ) {

                // Yol rengi

                map.setPaintProperty(
                    layer.id,
                    "line-color",
                    "#111111"
                );


                // OTOYOL
if (
    name.includes("motorway") ||
    name.includes("trunk")
) {

    map.setPaintProperty(
        layer.id,
        "line-width",
        [
            "interpolate",
            ["linear"],
            ["zoom"],

            9, 2.5,
            12, 4,
            15, 7,
            17, 10
        ]
    );

}


// ANA CADDE
else if (
    name.includes("primary") ||
    name.includes("major")
) {

    map.setPaintProperty(
        layer.id,
        "line-width",
        [
            "interpolate",
            ["linear"],
            ["zoom"],

            9, 1.5,
            12, 2.5,
            15, 5,
            17, 7
        ]
    );

}


// ORTA YOL
else if (
    name.includes("secondary") ||
    name.includes("tertiary")
) {

    map.setPaintProperty(
        layer.id,
        "line-width",
        [
            "interpolate",
            ["linear"],
            ["zoom"],

            10, 0.8,
            13, 1.7,
            15, 3,
            17, 5
        ]
    );

}


// KÜÇÜK SOKAK
else {

    map.setPaintProperty(
        layer.id,
        "line-width",
        [
            "interpolate",
            ["linear"],
            ["zoom"],

            9, 0.2,
            12, 0.6,
            15, 1.4,
            17, 2.5
        ]
    );

        }

    }

}


        // =========================
        // YAZILAR / İKONLAR
        // =========================

        if (layer.type === "symbol") {

    map.setLayoutProperty(
        layer.id,
        "visibility",
        "none"
    );

}

}); // layers.forEach kapanıyor

}); // map.on("load") kapanıyor

// =========================
// OYUNCU KONUMU
// =========================

let playerMarker = null;
let currentLocation = null;
let watchId = null;
let navigationSteps = [];
let currentStepIndex = 1;
let hasCenteredOnPlayer = false;
let lastRouteUpdateLocation = null;
let routeUpdateInProgress = false;
let navigationMode = false;
let lastHeadingLocation = null;
let currentRouteCoordinates = [];
let offRouteCount = 0;
let lastRerouteAt = 0;
let lastNavigationBearing = 0;
let routePreviewReady = false;
let deviceHeading = null;
let lastGpsHeading = null;

let smoothCameraLocation = null;
let smoothCameraBearing = null;

let centerOnNextGps = false;

let headingListenerStarted = false;
let currentRouteTotalDistance = 0;
let currentRouteTotalDuration = 0;

let lastSpeedLocation = null;
let lastSpeedTime = null;
let lastRoadLookupStep = -1;
let currentRoadName = "";
let roadLookupRequestId = 0;
let displayedLocation = null;
let stableGpsLocation = null;

let lastStableGpsTime = null;

let lastReliableSpeed = 0;


const locationButton =
    document.getElementById("locationButton");

function recenterToGps() {

    if (!navigator.geolocation) {

        alert(
            "Bu cihaz konum özelliğini desteklemiyor."
        );

        return;
    }


    navigator.geolocation.getCurrentPosition(

        function (position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            currentLocation = {

                latitude:
                    latitude,

                longitude:
                    longitude

            };


            showPlayer(
                longitude,
                latitude
            );


            updatePlayerDirection();


            // Navigasyon açıksa
            if (navigationMode) {

                map.easeTo({

                    center: [
                        longitude,
                        latitude
                    ],

                    zoom: 17.3,

                    pitch: 60,

                    bearing:
                        smoothCameraBearing !== null
                            ? smoothCameraBearing
                            : map.getBearing(),

                    offset: [
                        0,
                        window.innerHeight * 0.18
                    ],

                    duration: 700,

                    essential: true

                });

            }

            // Normal haritadaysak
            else {

                map.easeTo({

                    center: [
                        longitude,
                        latitude
                    ],

                    zoom: 16,

                    pitch: 0,

                    bearing: 0,

                    offset: [
                        0,
                        0
                    ],

                    duration: 700,

                    essential: true

                });

            }

        },


        function (error) {

            console.error(
                "Konuma gitme hatası:",
                error
            );

        },


        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000
        }

    );

}
locationButton.addEventListener(
    "click",
    function () {

        // Her tıklamada o anki
        // gerçek GPS konumuna git
        recenterToGps();


        // Telefonun baktığı yönü al
        if (
            typeof requestHeadingPermission ===
            "function"
        ) {

            requestHeadingPermission();

        }


        // =========================
        // GPS ZATEN AÇIKSA
        // SADECE KONUMUMA DÖN
        // =========================

        if (
    watchId !== null &&
    currentLocation !== null
) {

    goToMyLocation();

    return;

}


        // =========================
        // GPS DESTEĞİ
        // =========================

        if (!navigator.geolocation) {

            alert(
                "Bu cihaz konum özelliğini desteklemiyor."
            );

            return;

        }


        centerOnNextGps = true;


        locationButton.textContent =
            "GPS AÇIK";

        locationButton.classList.add(
            "gps-active"
        );


        // =========================
        // GPS BAŞLAT
        // =========================

        watchId =
    navigator.geolocation.watchPosition(

        function (position) {

            const stableLocation =
                getStableGpsLocation(
                    position
                );


const latitude =
    stableLocation.latitude;


const longitude =
    stableLocation.longitude;


currentLocation = {

    latitude:
        latitude,

    longitude:
        longitude

};
                    displayedLocation = {

    latitude:
        latitude,

    longitude:
        longitude

};


// Navigasyondaysak ve rota varsa
// görsel konumu yola oturt
if (
    navigationMode &&
    currentRouteCoordinates.length > 1
) {

    const snappedPoint =
        getNearestPointOnRoute(
            currentLocation,
            currentRouteCoordinates
        );


    // Yola 35 metreden yakınsak
    // işareti yol üzerinde göster
    if (
        snappedPoint !== null &&
        snappedPoint.distance <= 35
    ) {

        displayedLocation = {

            latitude:
                snappedPoint.latitude,

            longitude:
                snappedPoint.longitude

        };

    }

}


                    // =========================
                    // GPS HAREKET YÖNÜ
                    // =========================

                    if (
                        position.coords.heading !==
                            null &&
                        Number.isFinite(
                            position.coords.heading
                        )
                    ) {

                        lastGpsHeading =
                            position.coords.heading;

                    }


                    // =========================
                    // OYUNCUYU GÖSTER
                    // =========================

                    showPlayer(
    displayedLocation.longitude,
    displayedLocation.latitude
);


                    updatePlayerDirection();


                    // =========================
                    // İLK KONUM GELDİĞİNDE
                    // HARİTAYI ORAYA GETİR
                    // =========================

                    if (centerOnNextGps) {

    map.easeTo({

        center: [
            longitude,
            latitude
        ],

        zoom: 16,

        pitch: 0,

        bearing: 0,

        offset: [0, 0],

        duration: 800,

        essential: true

    });

    centerOnNextGps = false;

}


                    // =========================
                    // CANLI YÖN TALİMATI
                    // =========================

                    updateLiveInstruction(
                        latitude,
                        longitude
                    );


                    // =========================
                    // GEÇİLEN MOR ROTAYI SİL
                    // =========================

                    updateRouteProgress();
                    updateNavigationStats(
    position
);


                    // =========================
                    // HEDEFE ULAŞMA
                    // =========================

                    if (
                        navigationMode &&
                        destinationLocation !==
                            null
                    ) {

                        const distanceToDestination =
                            calculateDistance(
                                currentLocation,
                                destinationLocation
                            );


                        if (
                            distanceToDestination <=
                            25
                        ) {

                            finishNavigation();

                            return;

                        }

                    }


                    // =========================
                    // ROTADAN SAPMA
                    // =========================

                    if (
                        navigationMode &&
                        destinationLocation !==
                            null &&
                        currentRouteCoordinates
                            .length > 1
                    ) {

                        const gpsAccuracy =
                            position.coords
                                .accuracy;


                        if (
                            gpsAccuracy <= 50
                        ) {

                            const offRouteDistance =
                                distanceToRoute(
                                    currentLocation,
                                    currentRouteCoordinates
                                );


                            if (
                                offRouteDistance >
                                40
                            ) {

                                offRouteCount++;

                            }

                            else {

                                offRouteCount = 0;

                            }


                            if (
                                offRouteCount >= 2
                            ) {

                                const now =
                                    Date.now();


                                if (
                                    now -
                                        lastRerouteAt >
                                    10000
                                ) {

                                    lastRerouteAt =
                                        now;

                                    offRouteCount =
                                        0;


                                    createRoute(
                                        true
                                    );

                                }

                            }

                        }

                    }


                    // =========================
// NAVİGASYON KAMERASI
// =========================

if (navigationMode) {

    const cameraSpeed =

        position.coords.speed !== null &&
        Number.isFinite(
            position.coords.speed
        )

            ? position.coords.speed

            : 0;


    // KONUMU YUMUŞAT
    if (
        smoothCameraLocation === null
    ) {

                            smoothCameraLocation = {

    latitude:
        displayedLocation.latitude,

    longitude:
        displayedLocation.longitude

};

                        }

                        else {

                            const locationSmoothing =

    cameraSpeed > 5

        ? 0.55

        : 0.25;


                            smoothCameraLocation
                                .latitude +=
                                (
                                    displayedLocation.latitude -
smoothCameraLocation.latitude
                                ) *
                                locationSmoothing;


                            smoothCameraLocation
                                .longitude +=
                                (
                                    displayedLocation.longitude -
smoothCameraLocation.longitude
                                ) *
                                locationSmoothing;

                        }


                        // =====================
                        // HEDEF YÖN
                        // =====================

                        let targetBearing =

                            smoothCameraBearing !==
                            null

                                ? smoothCameraBearing

                                : map.getBearing();


                       


if (
    cameraSpeed > 1.5 &&
    position.coords.heading !== null &&
    Number.isFinite(
        position.coords.heading
    )
) {

    targetBearing =
        position.coords.heading;

}

                        else if (
                            currentRouteCoordinates
                                .length > 2
                        ) {

                            const lookAheadIndex =
                                Math.min(
                                    8,
                                    currentRouteCoordinates
                                        .length - 1
                                );


                            const aheadPoint = {

                                longitude:
                                    currentRouteCoordinates[
                                        lookAheadIndex
                                    ][0],

                                latitude:
                                    currentRouteCoordinates[
                                        lookAheadIndex
                                    ][1]

                            };


                            targetBearing =
                                calculateBearing(
                                    currentLocation,
                                    aheadPoint
                                );

                        }


                        // =====================
                        // YÖNÜ YUMUŞAT
                        // =====================

                        if (
                            smoothCameraBearing ===
                            null
                        ) {

                            smoothCameraBearing =
                                targetBearing;

                        }

                        else {

                            smoothCameraBearing =
                                smoothAngle(
                                    smoothCameraBearing,
                                    targetBearing,
                                    0.25
                                );

                        }


                        // =====================
                        // KAMERAYI TAKİP ETTİR
                        // =====================

                        map.easeTo({

                            center: [

                                smoothCameraLocation
                                    .longitude,

                                smoothCameraLocation
                                    .latitude

                            ],

                            zoom: 17.3,

                            pitch: 60,

                            bearing:
                                smoothCameraBearing,

                            offset: [
                                0,
                                window.innerHeight *
                                    0.18
                            ],

                            duration: 850,

                            easing:
                                function (t) {

                                    return (
                                        1 -
                                        Math.pow(
                                            1 - t,
                                            3
                                        )
                                    );

                                },

                            essential: true

                        });


                        updatePlayerDirection();

                    }

                },


                // =========================
                // GPS HATASI
                // =========================

                function (error) {

                    console.error(
                        "GPS hatası:",
                        error
                    );


                    watchId = null;

                    centerOnNextGps =
                        false;


                    locationButton.textContent =
                        "KONUMUM";

                    locationButton.classList.remove(
                        "gps-active"
                    );


                    alert(
                        "Konum alınamadı."
                    );

                },


                // =========================
                // GPS AYARLARI
                // =========================

                {
                    enableHighAccuracy:
                        true,

                    maximumAge:
                        1000,

                    timeout:
                        15000
                }

            );

    }
);
// =========================
// OYUNCU MARKERI
// =========================

function showPlayer(
    longitude,
    latitude
) {

    if (
        !Number.isFinite(longitude) ||
        !Number.isFinite(latitude)
    ) {
        return;
    }


    if (playerMarker === null) {

        const markerElement =
            document.createElement("div");


        markerElement.id =
            "playerMarker";


        markerElement.innerHTML = `

    <svg
        class="playerMarkerSvg"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
    >

        <!-- SİYAH DIŞ KONTUR -->
        <path
            d="
                M32 4

                C30 4 29 6 28 9

                L12 48

                C10 53 14 56 19 53

                L32 45

                L45 53

                C50 56 54 53 52 48

                L36 9

                C35 6 34 4 32 4

                Z
            "
            fill="#111111"
        />


        <!-- BEYAZ İÇ -->
        <path
            d="
                M32 10

                L18 46

                L32 38

                L46 46

                Z
            "
            fill="#ffffff"
        />

    </svg>

`;


        playerMarker =
            new maplibregl.Marker({

                element:
                    markerElement,

                anchor:
                    "center"

            });


        playerMarker
            .setLngLat([
                longitude,
                latitude
            ])
            .addTo(map);

    }

    else {

        playerMarker.setLngLat([
            longitude,
            latitude
        ]);

    }

}
// =========================
// İKİ KONUM ARASINDA MESAFE
// =========================

function calculateDistance(point1, point2) {

    const earthRadius = 6371000;

    const lat1 =
        point1.latitude * Math.PI / 180;

    const lat2 =
        point2.latitude * Math.PI / 180;


    const deltaLat =
        (point2.latitude - point1.latitude) *
        Math.PI / 180;

    const deltaLon =
        (point2.longitude - point1.longitude) *
        Math.PI / 180;


    const a =
        Math.sin(deltaLat / 2) *
        Math.sin(deltaLat / 2) +

        Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);


    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    return earthRadius * c;
    }
function calculateRemainingRouteDistance(
    coordinates
) {

    if (
        !coordinates ||
        coordinates.length < 2 ||
        currentLocation === null
    ) {

        return 0;

    }


    let totalDistance = 0;


    // Önce bulunduğumuz yerden
    // kalan rotanın ilk noktasına
    totalDistance +=
        calculateDistance(

            currentLocation,

            {
                longitude:
                    coordinates[0][0],

                latitude:
                    coordinates[0][1]
            }

        );


    // Sonra kalan rota parçaları
    for (
        let i = 0;
        i < coordinates.length - 1;
        i++
    ) {

        const point1 = {

            longitude:
                coordinates[i][0],

            latitude:
                coordinates[i][1]

        };


        const point2 = {

            longitude:
                coordinates[i + 1][0],

            latitude:
                coordinates[i + 1][1]

        };


        totalDistance +=
            calculateDistance(
                point1,
                point2
            );

    }


    return totalDistance;
}
function isBadRoadName(name) {

    if (!name) {
        return true;
    }


    const value =
        name
            .trim()
            .toLocaleLowerCase(
                "tr-TR"
            );


    if (value.length < 4) {
        return true;
    }


    const badNames = [

        "sk",
        "sk.",
        "sok",
        "sok.",

        "cd",
        "cd.",

        "blv",
        "blv.",

        "yol"

    ];


    return badNames.includes(
        value
    );

}

function formatRoadName(name) {

    if (!name) {
        return "";
    }


    let formatted =
        name.trim();


    formatted =
        formatted.replace(
            /\s+SK\.?$/i,
            " SOKAK"
        );


    formatted =
        formatted.replace(
            /\s+SOK\.?$/i,
            " SOKAK"
        );


    formatted =
        formatted.replace(
            /\s+CD\.?$/i,
            " CADDESİ"
        );


    formatted =
        formatted.replace(
            /\s+CAD\.?$/i,
            " CADDESİ"
        );


    formatted =
        formatted.replace(
            /\s+BLV\.?$/i,
            " BULVARI"
        );


    return formatted;
}
function getNearestPointOnRoute(
    point,
    coordinates
) {

    if (
        !coordinates ||
        coordinates.length < 2
    ) {

        return null;

    }


    const referenceLatitude =
        point.latitude *
        Math.PI / 180;


    const metersPerLongitude =
        111320 *
        Math.cos(
            referenceLatitude
        );


    const metersPerLatitude =
        110540;


    let bestPoint = null;

    let bestDistance =
        Infinity;


    const searchLimit =
    Math.min(
        coordinates.length - 1,
        40
    );


for (
    let i = 0;
    i < searchLimit;
    i++
) {

        const first =
            coordinates[i];

        const second =
            coordinates[i + 1];


        const ax =
            (
                first[0] -
                point.longitude
            ) *
            metersPerLongitude;


        const ay =
            (
                first[1] -
                point.latitude
            ) *
            metersPerLatitude;


        const bx =
            (
                second[0] -
                point.longitude
            ) *
            metersPerLongitude;


        const by =
            (
                second[1] -
                point.latitude
            ) *
            metersPerLatitude;


        const dx =
            bx - ax;

        const dy =
            by - ay;


        const lengthSquared =
            dx * dx +
            dy * dy;


        let t = 0;


        if (
            lengthSquared > 0
        ) {

            t =
                -(
                    ax * dx +
                    ay * dy
                ) /
                lengthSquared;


            t =
                Math.max(
                    0,
                    Math.min(
                        1,
                        t
                    )
                );

        }


        const nearestX =
            ax +
            t * dx;


        const nearestY =
            ay +
            t * dy;


        const distance =
            Math.sqrt(
                nearestX *
                nearestX +
                nearestY *
                nearestY
            );


        if (
            distance <
            bestDistance
        ) {

            bestDistance =
                distance;


            bestPoint = {

                longitude:
                    point.longitude +
                    nearestX /
                    metersPerLongitude,

                latitude:
                    point.latitude +
                    nearestY /
                    metersPerLatitude,

                distance:
                    distance

            };

        }

    }


    return bestPoint;
}
async function findRoadNameFromLocation(
    longitude,
    latitude
) {

    try {

        const url =

            "https://photon.komoot.io/reverse" +

            "?lon=" +
            longitude +

            "&lat=" +
            latitude;


        const response =
            await fetch(url);


        if (!response.ok) {

            return "";

        }


        const data =
            await response.json();


        if (
            !data.features ||
            data.features.length === 0
        ) {

            return "";

        }


        const properties =
            data.features[0].properties ||
            {};


        return (

            properties.street ||

            properties.name ||

            ""

        );

    }

    catch (error) {

        console.log(
            "Yol adı alınamadı:",
            error
        );


        return "";

    }

}
function updateNavigationRoad(
    step,
    stepIndex,
    roadElement
) {

    if (
        !roadElement ||
        !step
    ) {

        return;

    }


    // Aynı manevradaysak
    // mevcut adı değiştirme.
    if (
        lastRoadLookupStep ===
        stepIndex
    ) {

        if (
            !isBadRoadName(
                currentRoadName
            )
        ) {

            roadElement.textContent =
    formatRoadName(
        currentRoadName
    ).toLocaleUpperCase(
        "tr-TR"
    );


            roadElement.style.display =
                "block";

        }

        return;

    }


    // =========================
    // YENİ MANEVRA
    // =========================

    lastRoadLookupStep =
        stepIndex;


    const osrmRoadName =

        step.name ||

        step.ref ||

        step.destinations ||

        "";


    // OSRM düzgün isim verdiyse
    // direkt kullan.
    if (
        !isBadRoadName(
            osrmRoadName
        )
    ) {

        currentRoadName =
            osrmRoadName;


        roadElement.textContent =
    formatRoadName(
        currentRoadName
    ).toLocaleUpperCase(
        "tr-TR"
    );


        roadElement.style.display =
            "block";


        return;

    }


    // =========================
    // OSRM İSİM VERMEDİ
    // PHOTON'A SOR
    // =========================

    if (
        !step.maneuver ||
        !step.maneuver.location
    ) {

        return;

    }


    const longitude =
        step.maneuver.location[0];


    const latitude =
        step.maneuver.location[1];


    roadLookupRequestId++;


    const thisRequest =
        roadLookupRequestId;


    findRoadNameFromLocation(
        longitude,
        latitude
    ).then(

        function (foundRoad) {

            // Bu sırada başka
            // manevraya geçtiysek
            // eski sonucu kullanma.
            if (
                thisRequest !==
                roadLookupRequestId
            ) {

                return;

            }


            if (
                stepIndex !==
                currentStepIndex
            ) {

                return;

            }


            if (
                isBadRoadName(
                    foundRoad
                )
            ) {

                return;

            }


            currentRoadName =
                foundRoad;


            roadElement.textContent =
    formatRoadName(
        currentRoadName
    ).toLocaleUpperCase(
        "tr-TR"
    );


            roadElement.style.display =
                "block";

        }

    );

}
function updateNavigationStats(position) {

    const speedValue =
        document.getElementById(
            "speedValue"
        );

    const routeTime =
        document.getElementById(
            "routeTime"
        );

    const routeDistance =
        document.getElementById(
            "routeDistance"
        );

    const roadElement =
        document.getElementById(
            "navigationRoad"
        );


    // =========================
    // HIZ
    // =========================

    let speedKmh = 0;


    if (
        position.coords.speed !== null &&
        Number.isFinite(
            position.coords.speed
        ) &&
        position.coords.speed >= 0
    ) {

        speedKmh =
            position.coords.speed *
            3.6;

    }

    else {

        const now =
            Date.now();


        if (
            lastSpeedLocation !== null &&
            lastSpeedTime !== null
        ) {

            const seconds =
                (
                    now -
                    lastSpeedTime
                ) / 1000;


            if (
                seconds >= 0.5 &&
                seconds <= 10
            ) {

                const moved =
                    calculateDistance(
                        lastSpeedLocation,
                        currentLocation
                    );


                speedKmh =
                    (
                        moved /
                        seconds
                    ) *
                    3.6;

            }

        }


        lastSpeedTime =
            now;

        lastSpeedLocation = {

            latitude:
                currentLocation.latitude,

            longitude:
                currentLocation.longitude

        };

    }


    // Küçük GPS titreşimlerini
    // hız olarak gösterme
    if (speedKmh < 2) {

        speedKmh = 0;

    }


    // GPS sapması saçma değer üretmesin
    speedKmh =
        Math.min(
            speedKmh,
            250
        );


    if (speedValue) {

        speedValue.textContent =
            Math.round(
                speedKmh
            );

    }


    // =========================
    // KALAN MESAFE / SÜRE
    // =========================

    if (
        navigationMode &&
        currentRouteCoordinates.length > 1
    ) {

        const remainingDistance =
            calculateRemainingRouteDistance(
                currentRouteCoordinates
            );


        if (routeDistance) {

            if (
                remainingDistance >=
                1000
            ) {

                routeDistance.textContent =
                    (
                        remainingDistance /
                        1000
                    ).toFixed(1) +
                    " KM";

            }

            else {

                routeDistance.textContent =
                    Math.max(
                        0,
                        Math.round(
                            remainingDistance /
                            10
                        ) * 10
                    ) +
                    " M";

            }

        }


        if (
            routeTime &&
            currentRouteTotalDistance > 0 &&
            currentRouteTotalDuration > 0
        ) {

            const ratio =
                Math.min(
                    1,
                    remainingDistance /
                    currentRouteTotalDistance
                );


            const remainingSeconds =
                currentRouteTotalDuration *
                ratio;


            const remainingMinutes =
                Math.max(
                    1,
                    Math.ceil(
                        remainingSeconds /
                        60
                    )
                );


            routeTime.textContent =
                remainingMinutes +
                " DK";

        }

    }


    // =========================
    // BULUNDUĞUN YOL
    // =========================

    if (roadElement) {

        const currentRoadStep =
            navigationSteps[
                Math.max(
                    0,
                    currentStepIndex - 1
                )
            ];


        const nextRoadStep =
            navigationSteps[
                currentStepIndex
            ];


        const roadName =

            (
                currentRoadStep &&
                currentRoadStep.name
            )

                ? currentRoadStep.name

                : (
                    nextRoadStep &&
                    nextRoadStep.name
                )

                    ? nextRoadStep.name

                    : "";


        if (roadName.trim() !== "") {

            roadElement.textContent =
    formatRoadName(
        currentRoadName
    ).toLocaleUpperCase(
        "tr-TR"
    );

            roadElement.style.display =
                "block";

        }

        else {

            roadElement.textContent =
                "";

            roadElement.style.display =
                "none";

        }

    }

}
    function calculateBearing(point1, point2) {

    const lat1 =
        point1.latitude * Math.PI / 180;

    const lat2 =
        point2.latitude * Math.PI / 180;

    const deltaLon =
        (point2.longitude - point1.longitude) *
        Math.PI / 180;


    const y =
        Math.sin(deltaLon) *
        Math.cos(lat2);


    const x =
        Math.cos(lat1) *
        Math.sin(lat2) -

        Math.sin(lat1) *
        Math.cos(lat2) *
        Math.cos(deltaLon);


    let bearing =
        Math.atan2(y, x) *
        180 / Math.PI;


    bearing =
        (bearing + 360) % 360;


    return bearing;
}
function smoothAngle(
    currentAngle,
    targetAngle,
    amount
) {

    const difference =
        (
            (
                targetAngle -
                currentAngle +
                540
            ) % 360
        ) - 180;


    return (
        currentAngle +
        difference * amount +
        360
    ) % 360;
}
function updatePlayerDirection() {

    if (!playerMarker) {
        return;
    }


    let heading =
        deviceHeading;


    if (
        heading === null &&
        lastGpsHeading !== null
    ) {

        heading =
            lastGpsHeading;

    }


    if (heading === null) {
        return;
    }


    const mapBearing =
        map.getBearing();


    const relativeHeading =
        (
            heading -
            mapBearing +
            360
        ) % 360;


    const markerElement =
        playerMarker.getElement();


    const markerSvg =
        markerElement.querySelector(
            ".playerMarkerSvg"
        );


    if (!markerSvg) {
        return;
    }


    markerSvg.style.transform =
        "rotate(" +
        relativeHeading +
        "deg)";

}
function handleDeviceOrientation(event) {

    let heading = null;


    // iPhone / Safari
    if (
        typeof event.webkitCompassHeading ===
        "number"
    ) {

        heading =
            event.webkitCompassHeading;

    }


    // Diğer telefonlar
    else if (
        event.absolute &&
        typeof event.alpha ===
        "number"
    ) {

        heading =
            (
                360 -
                event.alpha
            ) % 360;

    }


    if (heading !== null) {

        deviceHeading =
            heading;

        updatePlayerDirection();

    }

}
function startHeadingListener() {

    if (headingListenerStarted) {
        return;
    }


    window.addEventListener(
        "deviceorientation",
        handleDeviceOrientation,
        true
    );


    window.addEventListener(
        "deviceorientationabsolute",
        handleDeviceOrientation,
        true
    );


    headingListenerStarted = true;
}
function getStableGpsLocation(
    position
) {

    const rawLocation = {

        latitude:
            position.coords.latitude,

        longitude:
            position.coords.longitude

    };


    const accuracy =
        Number.isFinite(
            position.coords.accuracy
        )
            ? position.coords.accuracy
            : 999;


    const now =
        Date.now();


    if (
        stableGpsLocation === null
    ) {

        stableGpsLocation = {
            ...rawLocation
        };

        lastStableGpsTime =
            now;


        return {
            ...stableGpsLocation
        };

    }


    const elapsed =

        Math.max(

            (
                now -
                lastStableGpsTime
            ) / 1000,

            0.5

        );


    const distance =
        calculateDistance(
            stableGpsLocation,
            rawLocation
        );


    let speed =
        null;


    if (
        position.coords.speed !==
            null &&
        Number.isFinite(
            position.coords.speed
        )
    ) {

        speed =
            position.coords.speed;

        lastReliableSpeed =
            speed;

    }


    else {

        speed =
            distance /
            elapsed;

    }


    // GPS doğruluğu çok kötüyse
    // mevcut konumu bozma
    if (
        accuracy > 65
    ) {

        lastStableGpsTime =
            now;

        return {
            ...stableGpsLocation
        };

    }


    // Araç/telefon duruyorken
    // GPS'in küçük sıçramalarını yok say
    if (
        lastReliableSpeed < 1.2 &&
        distance <
            Math.max(
                15,
                accuracy
            )
    ) {

        lastStableGpsTime =
            now;

        return {
            ...stableGpsLocation
        };

    }


    // Dururken bir anda çok uzağa
    // GPS sıçraması olursa kabul etme
    if (
        lastReliableSpeed < 1.2 &&
        distance > 60 &&
        elapsed < 5
    ) {

        lastStableGpsTime =
            now;

        return {
            ...stableGpsLocation
        };

    }


    // Hareket hızına göre
    // filtre gücü
    let smoothing;


    if (speed > 8) {

        smoothing = 0.75;

    }

    else if (speed > 3) {

        smoothing = 0.55;

    }

    else {

        smoothing = 0.25;

    }


    if (accuracy > 25) {

        smoothing *=
            0.65;

    }


    stableGpsLocation.latitude +=

        (
            rawLocation.latitude -
            stableGpsLocation.latitude
        ) *
        smoothing;


    stableGpsLocation.longitude +=

        (
            rawLocation.longitude -
            stableGpsLocation.longitude
        ) *
        smoothing;


    lastStableGpsTime =
        now;


    return {
        ...stableGpsLocation
    };

}
async function requestHeadingPermission() {

    try {

        if (
            typeof DeviceOrientationEvent !==
            "undefined" &&

            typeof DeviceOrientationEvent
                .requestPermission ===
            "function"
        ) {

            const permission =
                await DeviceOrientationEvent
                    .requestPermission();


            if (
                permission ===
                "granted"
            ) {

                startHeadingListener();

            }

        }

        else {

            startHeadingListener();

        }

    }

    catch (error) {

        console.log(
            "Pusula kullanılamadı:",
            error
        );

    }

}
async function findRoadNameFromLocation(
    longitude,
    latitude
) {

    try {

        const url =
            "https://photon.komoot.io/reverse" +
            "?lon=" +
            longitude +
            "&lat=" +
            latitude;


        const response =
            await fetch(url);

        const data =
            await response.json();


        if (
            !data.features ||
            data.features.length === 0
        ) {
            return "";
        }


        const properties =
            data.features[0].properties || {};


        return (
            properties.street ||
            properties.name ||
            properties.locality ||
            ""
        );

    }

    catch (error) {

        console.log(
            "Yol adı bulunamadı:",
            error
        );

        return "";

    }

}
function goToMyLocation() {

    if (currentLocation === null) {
        return;
    }


    // Navigasyon açıksa
    if (navigationMode) {

        let bearing =
            smoothCameraBearing !== null
                ? smoothCameraBearing
                : map.getBearing();


        if (deviceHeading !== null) {

            bearing =
                deviceHeading;

        }

        else if (lastGpsHeading !== null) {

            bearing =
                lastGpsHeading;

        }


        map.easeTo({

            center: [
                currentLocation.longitude,
                currentLocation.latitude
            ],

            zoom: 17.3,

            pitch: 60,

            bearing: bearing,

            offset: [
                0,
                window.innerHeight * 0.18
            ],

            duration: 700,

            essential: true

        });

    }


    // Normal haritadaysak
    else {

        map.easeTo({

            center: [
                currentLocation.longitude,
                currentLocation.latitude
            ],

            zoom: 16,

            pitch: 0,

            bearing: 0,

            offset: [0, 0],

            duration: 700,

            essential: true

        });

    }

}
function distanceToRoute(point, coordinates) {

    if (!coordinates || coordinates.length < 2) {
        return Infinity;
    }


    const referenceLatitude =
        point.latitude * Math.PI / 180;


    const metersPerLongitude =
        111320 * Math.cos(referenceLatitude);

    const metersPerLatitude =
        110540;


    let minimumDistance =
        Infinity;


    for (
        let i = 0;
        i < coordinates.length - 1;
        i++
    ) {

        const first =
            coordinates[i];

        const second =
            coordinates[i + 1];


        // GPS konumunu 0,0 kabul ediyoruz.
        // Yol parçasının iki ucunu metreye çeviriyoruz.

        const ax =
            (first[0] - point.longitude) *
            metersPerLongitude;

        const ay =
            (first[1] - point.latitude) *
            metersPerLatitude;


        const bx =
            (second[0] - point.longitude) *
            metersPerLongitude;

        const by =
            (second[1] - point.latitude) *
            metersPerLatitude;


        const dx =
            bx - ax;

        const dy =
            by - ay;


        const lengthSquared =
            dx * dx + dy * dy;


        let t = 0;


        if (lengthSquared > 0) {

            t =
                -(ax * dx + ay * dy) /
                lengthSquared;


            t =
                Math.max(
                    0,
                    Math.min(1, t)
                );

        }


        const nearestX =
            ax + t * dx;

        const nearestY =
            ay + t * dy;


        const distance =
            Math.sqrt(
                nearestX * nearestX +
                nearestY * nearestY
            );


        if (distance < minimumDistance) {

            minimumDistance =
                distance;

        }

    }


    return minimumDistance;
}
function findNearestRouteIndex(
    point,
    coordinates
) {

    let nearestIndex = 0;
    let nearestDistance = Infinity;


    const searchLimit =
    Math.min(
        coordinates.length,
        40
    );


for (
    let i = 0;
    i < searchLimit;
    i++
) {

        const routePoint = {

            longitude:
                coordinates[i][0],

            latitude:
                coordinates[i][1]

        };


        const distance =
            calculateDistance(
                point,
                routePoint
            );


        if (
            distance <
            nearestDistance
        ) {

            nearestDistance =
                distance;

            nearestIndex =
                i;

        }

    }


    return nearestIndex;
}



function updateRouteProgress() {

    if (
        !navigationMode ||
        currentRouteCoordinates.length < 2
    ) {
        return;
    }


    const nearestIndex =
        findNearestRouteIndex(
            currentLocation,
            currentRouteCoordinates
        );


    // Geçtiğimiz rota bölümünü at
    if (nearestIndex > 0) {

        currentRouteCoordinates =
            currentRouteCoordinates.slice(
                nearestIndex
            );

    }


    // Haritadaki mor çizgiyi güncelle
    const routeSource =
        map.getSource("route");


    if (
        routeSource &&
        currentRouteCoordinates.length > 1
    ) {

        routeSource.setData({

            type: "Feature",

            properties: {},

            geometry: {

                type: "LineString",

                coordinates:
                    currentRouteCoordinates

            }

        });

    }

}
function finishNavigation() {

    navigationMode = false;
    document.body.classList.remove(
    "navigation-active"
);
const speedHud =
    document.getElementById(
        "speedHud"
    );

if (speedHud) {

    speedHud.style.display =
        "none";

}

currentRoadName = "";

lastRoadLookupStep = -1;

roadLookupRequestId++;
const roadElement =
    document.getElementById(
        "navigationRoad"
    );

if (roadElement) {

    roadElement.textContent =
        "";

    roadElement.style.display =
        "none";

}


lastSpeedLocation = null;
lastSpeedTime = null;
    currentRouteCoordinates = [];
    navigationSteps = [];

    currentStepIndex = 0;
    offRouteCount = 0;

    lastHeadingLocation = null;
    lastRouteUpdateLocation = null;
    smoothCameraLocation = null;
smoothCameraBearing = null;


    // Rota çizgilerini kaldır
    if (map.getLayer("route-line")) {
        map.removeLayer("route-line");
    }

    if (map.getLayer("route-outline")) {
        map.removeLayer("route-outline");
    }

    if (map.getSource("route")) {
        map.removeSource("route");
    }


    // Hedef waypointini kaldır
    if (destinationMarker) {

        destinationMarker.remove();

        destinationMarker = null;

    }


    destinationLocation = null;


    // Süre / mesafe kutusunu gizle
    const routeInfo =
        document.getElementById("routeInfo");

    if (routeInfo) {
        routeInfo.style.display = "none";
    }


    // Hedefe ulaştın mesajı
    const instructionBox =
        document.getElementById(
            "navigationInstruction"
        );

    if (instructionBox) {

    const arrowElement =
        document.getElementById(
            "navigationArrow"
        );

    const distanceElement =
        document.getElementById(
            "navigationDistance"
        );

    const actionElement =
        document.getElementById(
            "navigationAction"
        );


    if (arrowElement) {
        arrowElement.textContent =
            "◆";
    }


    if (distanceElement) {
        distanceElement.textContent =
            "";
    }


    if (actionElement) {
        actionElement.textContent =
            "HEDEFE ULAŞTIN";
    }


    instructionBox.style.display =
        "flex";


    setTimeout(function () {

        instructionBox.style.display =
            "none";

    }, 3000);

}


    // Haritayı normal görünüme döndür
    if (currentLocation !== null) {

        map.easeTo({

            center: [
                currentLocation.longitude,
                currentLocation.latitude
            ],

            zoom: 15,

            pitch: 0,

            bearing: 0,

            offset: [0, 0],

            duration: 1000

        });

    }

}
function cancelNavigation() {

    navigationMode = false;

    routePreviewReady = false;
    const speedHud =
    document.getElementById(
        "speedHud"
    );

if (speedHud) {

    speedHud.style.display =
        "none";

}

currentRoadName = "";

lastRoadLookupStep = -1;

roadLookupRequestId++;
const roadElement =
    document.getElementById(
        "navigationRoad"
    );

if (roadElement) {

    roadElement.textContent =
        "";

    roadElement.style.display =
        "none";

}


lastSpeedLocation = null;
lastSpeedTime = null;

    document.body.classList.remove(
        "navigation-active"
    );

    currentRouteCoordinates = [];
    navigationSteps = [];

    currentStepIndex = 0;
    offRouteCount = 0;

    lastHeadingLocation = null;
    lastRouteUpdateLocation = null;
    smoothCameraLocation = null;
smoothCameraBearing = null;


    // Rota çizgisini kaldır
    if (map.getLayer("route-line")) {
        map.removeLayer("route-line");
    }

    if (map.getLayer("route-outline")) {
        map.removeLayer("route-outline");
    }

    if (map.getSource("route")) {
        map.removeSource("route");
    }


    // Süre / mesafe kutusunu gizle
    const routeInfo =
        document.getElementById(
            "routeInfo"
        );

    if (routeInfo) {
        routeInfo.style.display =
            "none";
    }


    // Yön kutusunu gizle
    const instructionBox =
        document.getElementById(
            "navigationInstruction"
        );

    if (instructionBox) {
        instructionBox.style.display =
            "none";
    }


    // Butonu tekrar ROTA yap
    routeButton.textContent =
        "ROTA";


    // Haritayı normal hale getir
    if (currentLocation !== null) {

        map.easeTo({

            center: [
                currentLocation.longitude,
                currentLocation.latitude
            ],

            zoom: 14.5,

            pitch: 0,
            bearing: 0,

            offset: [0, 0],

            duration: 800

        });

    }

}

// =========================
// DÖNÜŞ YAZISI
// =========================

function getDirectionText(maneuver) {

    const modifier = maneuver.modifier;
    const type = maneuver.type;


    if (type === "arrive") {
        return "Hedefe ulaştın";
    }


    if (
        type === "roundabout" ||
        type === "rotary"
    ) {
        return "Döner kavşağa gir";
    }


    if (modifier === "right") {
        return "Sağa dön";
    }

    if (modifier === "left") {
        return "Sola dön";
    }

    if (modifier === "slight right") {
        return "Hafif sağa dön";
    }

    if (modifier === "slight left") {
        return "Hafif sola dön";
    }

    if (modifier === "sharp right") {
        return "Keskin sağa dön";
    }

    if (modifier === "sharp left") {
        return "Keskin sola dön";
    }

    if (modifier === "straight") {
        return "Düz devam et";
    }


    return "Devam et";
}
function getDirectionArrow(maneuver) {

    const modifier = maneuver.modifier;
    const type = maneuver.type;

    if (
        type === "roundabout" ||
        type === "rotary"
    ) {
        return "⟳";
    }

    if (type === "arrive") {
        return "◆";
    }

    if (modifier === "right") {
        return "→";
    }

    if (modifier === "left") {
        return "←";
    }

    if (modifier === "slight right") {
        return "↗";
    }

    if (modifier === "slight left") {
        return "↖";
    }

    if (modifier === "sharp right") {
        return "↘";
    }

    if (modifier === "sharp left") {
        return "↙";
    }

    return "↑";
}

// =========================
// CANLI YÖNLENDİRME
// =========================

function updateLiveInstruction(latitude, longitude) {

    const instructionBox =
        document.getElementById(
            "navigationInstruction"
        );

    const arrowElement =
        document.getElementById(
            "navigationArrow"
        );

    const distanceElement =
        document.getElementById(
            "navigationDistance"
        );

    const actionElement =
        document.getElementById(
            "navigationAction"
        );
    
    const roadElement =
    document.getElementById(
        "navigationRoad"
    );


    if (
        !instructionBox ||
        !arrowElement ||
        !distanceElement ||
        !actionElement ||
        navigationSteps.length === 0
    ) {
        return;
    }


    if (
        currentStepIndex >=
        navigationSteps.length
    ) {

        arrowElement.textContent =
            "◆";

        distanceElement.textContent =
            "";

        actionElement.textContent =
            "HEDEFE ULAŞTIN";

        return;
    }


    const step =
        navigationSteps[
            currentStepIndex
        ];
    updateNavigationRoad(
    step,
    currentStepIndex,
    roadElement
);    

    if (
        !step.maneuver ||
        !step.maneuver.location
    ) {
        return;
    }


    const maneuverLocation = {

        longitude:
            step.maneuver.location[0],

        latitude:
            step.maneuver.location[1]

    };


    const playerLocation = {

        latitude: latitude,
        longitude: longitude

    };


    const distanceToManeuver =
        calculateDistance(
            playerLocation,
            maneuverLocation
        );


    const directionText =
        getDirectionText(
            step.maneuver
        );


    const directionArrow =
        getDirectionArrow(
            step.maneuver
        );


    // Hedef
    instructionBox.classList.remove(
    "turn-now"
);
    if (
        step.maneuver.type === "arrive" &&
        distanceToManeuver <= 25
    ) {

        arrowElement.textContent =
            "◆";

        distanceElement.textContent =
            "";

        actionElement.textContent =
            "HEDEFE ULAŞTIN";

        instructionBox.style.display =
            "flex";

        return;
    }


    // Manevrayı geçtik
    if (
        distanceToManeuver <= 15 &&
        currentStepIndex <
            navigationSteps.length - 1
    ) {

        currentStepIndex++;

        updateLiveInstruction(
            latitude,
            longitude
        );

        return;
    }


    arrowElement.textContent =
        directionArrow;


    // Dönüş yakında
    if (distanceToManeuver <= 35) {

    instructionBox.classList.add(
        "turn-now"
    );

    distanceElement.textContent =
        "ŞİMDİ";

    actionElement.textContent =
        directionText.toUpperCase();

}

    else {

        instructionBox.classList.remove(
    "turn-now"
);

        let displayedDistance;


        if (distanceToManeuver >= 1000) {

            displayedDistance =
                (
                    distanceToManeuver /
                    1000
                ).toFixed(1) +
                " KM";

        }

        else {

            const roundedDistance =
                Math.max(
                    10,
                    Math.round(
                        distanceToManeuver /
                        10
                    ) * 10
                );


            displayedDistance =
                roundedDistance +
                " M";

        }


        distanceElement.textContent =
            displayedDistance;


        actionElement.textContent =
            directionText.toUpperCase();

    }


    instructionBox.style.display =
        "flex";
}
// =========================
// YER ARAMA
// =========================

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

let destinationMarker = null;
let destinationLocation = null;


async function searchPlace() {

    const query =
        searchInput.value.trim();

    if (query === "") {
        return;
    }


    searchButton.textContent = "...";


    try {

        const url =
            "https://nominatim.openstreetmap.org/search" +
            "?format=jsonv2" +
            "&limit=1" +
            "&countrycodes=tr" +
            "&accept-language=tr" +
            "&q=" +
            encodeURIComponent(query);


        const response =
            await fetch(url);


        const results =
            await response.json();


        if (results.length === 0) {

            alert("Yer bulunamadı.");

            return;
        }


        const place =
            results[0];

        const latitude =
            Number(place.lat);

        const longitude =
            Number(place.lon);
            destinationLocation = {
    latitude: latitude,
    longitude: longitude
};


        // Haritayı bulunan yere götür
        map.flyTo({

            center: [
                longitude,
                latitude
            ],

            zoom: 16

        });


        // Eski hedef işaretini kaldır
        if (destinationMarker !== null) {

            destinationMarker.remove();

        }


        // Yeni hedef işareti
        const destinationElement =
    document.createElement("img");

destinationElement.src =
    "waypoint.gif";

destinationElement.id =
    "destinationMarker";


        destinationMarker =
            new maplibregl.Marker({

                element: destinationElement,
                anchor: "center"

            })
            .setLngLat([
                longitude,
                latitude
            ])
            .addTo(map);


    }

    catch (error) {

        console.error(error);

        alert("Arama sırasında hata oluştu.");

    }

    finally {

        searchButton.textContent = "ARA";

    }

}


// =========================================
// CANLI YER ARAMA
// =========================================

let searchTimer = null;
let searchController = null;


// Yazdıkça ara
searchInput.addEventListener(
    "input",
    function () {

        clearTimeout(searchTimer);

        const query =
            searchInput.value.trim();

        const searchResults =
            document.getElementById(
                "searchResults"
            );


        // 2 harften azsa listeyi kapat
        if (query.length < 2) {

            searchResults.innerHTML = "";

            searchResults.style.display =
                "none";

            return;
        }


        searchTimer =
            setTimeout(
                function () {

                    searchPlacesLive(query);

                },
                400
            );

    }
);


// ARA butonu da çalışsın
searchButton.addEventListener(
    "click",
    function () {

        const query =
            searchInput.value.trim();

        if (query.length >= 2) {

            searchPlacesLive(query);

        }

    }
);


// Enter da çalışsın
searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            const query =
                searchInput.value.trim();

            if (query.length >= 2) {

                searchPlacesLive(query);

            }

        }

    }
);

async function searchNominatimFallback(query) {

    try {

        const url =
            "https://nominatim.openstreetmap.org/search" +
            "?format=jsonv2" +
            "&limit=6" +
            "&accept-language=tr" +
            "&countrycodes=tr" +
            "&q=" +
            encodeURIComponent(query);


        const response =
            await fetch(url);


        if (!response.ok) {
            return [];
        }


        const results =
            await response.json();


        return results.map(
            function (place) {

                return {

                    geometry: {

                        coordinates: [

                            Number(place.lon),

                            Number(place.lat)

                        ]

                    },

                    properties: {

                        name:
                            place.name ||
                            place.display_name
                                .split(",")[0],

                        street:
                            "",

                        district:
                            "",

                        city:
                            "",

                        state:
                            "",

                        country:
                            "Türkiye",

                        display_name:
                            place.display_name

                    }

                };

            }
        );

    }

    catch (error) {

        console.log(
            "Yedek arama hatası:",
            error
        );

        return [];

    }

}
async function searchPlacesLive(query) {

    const searchResults =
        document.getElementById(
            "searchResults"
        );


    // Eski istek hâlâ devam ediyorsa iptal et
    if (searchController) {

        searchController.abort();

    }


    searchController =
        new AbortController();


    try {

        let url =
            "https://photon.komoot.io/api/" +
            "?limit=20" +
            "&q=" +
            encodeURIComponent(query);


        // GPS açıksa yakındaki sonuçları öne çıkar
        if (currentLocation !== null) {

            url +=
                "&lat=" +
                currentLocation.latitude +
                "&lon=" +
                currentLocation.longitude;

        }


        const response =
            await fetch(
                url,
                {
                    signal:
                        searchController.signal
                }
            );


        if (!response.ok) {

            throw new Error(
                "Arama servisi cevap vermedi"
            );

        }


        const data =
            await response.json();


        let results =
    data.features || [];


// Photon bulamadıysa
// Nominatim ile tekrar ara
if (results.length === 0) {

    results =
        await searchNominatimFallback(
            query
        );

}
// =========================
// SONUÇLARI KONUMA GÖRE SIRALA
// =========================

if (
    currentLocation !== null &&
    results.length > 1
) {

    results.sort(
        function (a, b) {

            const locationA = {

                longitude:
                    a.geometry.coordinates[0],

                latitude:
                    a.geometry.coordinates[1]

            };


            const locationB = {

                longitude:
                    b.geometry.coordinates[0],

                latitude:
                    b.geometry.coordinates[1]

            };


            const distanceA =
                calculateDistance(
                    currentLocation,
                    locationA
                );


            const distanceB =
                calculateDistance(
                    currentLocation,
                    locationB
                );


            return (
                distanceA -
                distanceB
            );

        }
    );
// En yakın 6 sonucu göster
// =========================
// AYNI MEKANLARI TEMİZLE
// =========================

const uniqueResults = [];


results.forEach(
    function (result) {

        const properties =
            result.properties || {};


        const resultName =
            (
                properties.name ||
                properties.street ||
                properties.city ||
                ""
            )
            .trim()
            .toLocaleLowerCase(
                "tr-TR"
            );


        const resultLocation = {

            longitude:
                result.geometry.coordinates[0],

            latitude:
                result.geometry.coordinates[1]

        };


        const isDuplicate =
            uniqueResults.some(
                function (existing) {

                    const existingProperties =
                        existing.properties || {};


                    const existingName =
                        (
                            existingProperties.name ||
                            existingProperties.street ||
                            existingProperties.city ||
                            ""
                        )
                        .trim()
                        .toLocaleLowerCase(
                            "tr-TR"
                        );


                    // İsim farklıysa
                    // aynı mekan değildir
                    if (
                        resultName !==
                        existingName
                    ) {

                        return false;

                    }


                    const existingLocation = {

                        longitude:
                            existing.geometry.coordinates[0],

                        latitude:
                            existing.geometry.coordinates[1]

                    };


                    const distance =
                        calculateDistance(
                            resultLocation,
                            existingLocation
                        );


                    // Aynı isim +
                    // 80 metreden yakınsa
                    // duplicate kabul et
                    return distance <= 80;

                }
            );


        if (!isDuplicate) {

            uniqueResults.push(
                result
            );

        }

    }
);


// Temizlenmiş sonuçlardan
// en yakın 6 tanesini göster
results =
    uniqueResults.slice(
        0,
        6
    );
}

        searchResults.innerHTML = "";


        if (results.length === 0) {

            const emptyItem =
                document.createElement(
                    "div"
                );

            emptyItem.className =
                "searchResultItem";

            emptyItem.textContent =
                "Sonuç bulunamadı";

            searchResults.appendChild(
                emptyItem
            );

            searchResults.style.display =
                "block";

            return;

        }


        results.forEach(
            function (result) {

                const properties =
                    result.properties || {};


                const name =
                    properties.name ||
                    properties.street ||
                    properties.city ||
                    "İsimsiz yer";


                const addressParts = [];


                if (
                    properties.street &&
                    properties.street !== name
                ) {

                    addressParts.push(
                        properties.street
                    );

                }


                if (properties.district) {

                    addressParts.push(
                        properties.district
                    );

                }


                if (
                    properties.city &&
                    properties.city !== name
                ) {

                    addressParts.push(
                        properties.city
                    );

                }


                if (properties.state) {

                    addressParts.push(
                        properties.state
                    );

                }


                if (properties.country) {

                    addressParts.push(
                        properties.country
                    );

                }


                const item =
                    document.createElement(
                        "div"
                    );

                item.className =
                    "searchResultItem";
let resultDistanceText = "";


if (
    currentLocation !== null
) {

    const resultLocation = {

        longitude:
            result.geometry.coordinates[0],

        latitude:
            result.geometry.coordinates[1]

    };


    const resultDistance =
        calculateDistance(
            currentLocation,
            resultLocation
        );


    if (
        resultDistance < 1000
    ) {

        resultDistanceText =
            Math.round(
                resultDistance
            ) +
            " m";

    }

    else {

        resultDistanceText =
            (
                resultDistance /
                1000
            ).toFixed(1) +
            " km";

    }

}

                const nameElement =
                    document.createElement(
                        "span"
                    );

                nameElement.className =
                    "searchResultName";

                nameElement.textContent =
                    name;


                const addressElement =
                    document.createElement(
                        "span"
                    );

                addressElement.className =
                    "searchResultAddress";

                addressElement.textContent =
                    addressParts.join(", ");

const distanceElement =
    document.createElement(
        "span"
    );

distanceElement.className =
    "searchResultDistance";

distanceElement.textContent =
    resultDistanceText;
                item.appendChild(
    nameElement
);

item.appendChild(
    addressElement
);

if (
    resultDistanceText !== ""
) {

    item.appendChild(
        distanceElement
    );

}


                item.addEventListener(
                    "click",
                    function () {

                        selectPhotonResult(
                            result
                        );

                    }
                );


                searchResults.appendChild(
                    item
                );

            }
        );


        searchResults.style.display =
            "block";

    }

    catch (error) {

        // Kullanıcı yeni harf yazdığı için
        // eski istek iptal edildiyse hata sayma
        if (
            error.name ===
            "AbortError"
        ) {
            return;
        }


        console.error(
            "Arama hatası:",
            error
        );


        searchResults.innerHTML = "";


        const errorItem =
            document.createElement(
                "div"
            );

        errorItem.className =
            "searchResultItem";

        errorItem.textContent =
            "Arama yapılamadı";


        searchResults.appendChild(
            errorItem
        );

        searchResults.style.display =
            "block";

    }

}
function selectPhotonResult(result) {

    const longitude =
        result.geometry.coordinates[0];

    const latitude =
        result.geometry.coordinates[1];


    const properties =
        result.properties || {};


    destinationLocation = {

        latitude:
            latitude,

        longitude:
            longitude

    };


    const searchResults =
        document.getElementById(
            "searchResults"
        );


    searchResults.style.display =
        "none";


    searchInput.value =
        properties.name ||
        properties.city ||
        properties.street ||
        searchInput.value;


    // Eski waypoint varsa kaldır
    if (destinationMarker) {

        destinationMarker.remove();

    }


    const destinationElement =
        document.createElement(
            "img"
        );


    destinationElement.src =
        "waypoint.gif";


    destinationElement.id =
        "destinationMarker";


    destinationMarker =
        new maplibregl.Marker({

            element:
                destinationElement,

            anchor:
                "center"

        })

        .setLngLat([
            longitude,
            latitude
        ])

        .addTo(map);


    map.easeTo({

        center: [
            longitude,
            latitude
        ],

        zoom: 15,

        duration: 800

    });

}

// =========================
// ROTA
// =========================

const ROUTER_BASE_URL =
    "https://router.project-osrm.org";
const routeButton =
    document.getElementById("routeButton");


async function createRoute(isAutomatic = false) {

    // Zaten rota hesaplanıyorsa ikinci kez başlatma
    if (routeUpdateInProgress) {
        return;
    }


    // Konum yoksa
    if (currentLocation === null) {

        if (!isAutomatic) {
            alert("Önce KONUMUM butonuna bas.");
        }

        return;
    }


    // Hedef yoksa
    if (destinationLocation === null) {

        if (!isAutomatic) {
            alert("Önce bir hedef ara.");
        }

        return;
    }


    routeUpdateInProgress = true;


    if (!isAutomatic) {
        routeButton.textContent = "...";
    }


    try {

        const start =
            currentLocation.longitude +
            "," +
            currentLocation.latitude;


        const end =
            destinationLocation.longitude +
            "," +
            destinationLocation.latitude;


        const url =
    ROUTER_BASE_URL +
    "/route/v1/driving/" +
    start +
    ";" +
    end +
    "?overview=full&geometries=geojson&steps=true";


        const response =
            await fetch(url);


        const data =
            await response.json();


        // Rota bulunamadıysa
        if (
            data.code !== "Ok" ||
            !data.routes ||
            data.routes.length === 0
        ) {

            if (!isAutomatic) {
                alert("Rota bulunamadı.");
            }

            return;
        }


        // =========================
        // ROTA VERİSİ
        // =========================

        const routeData =
            data.routes[0];


        const route =
            routeData.geometry;
           
         currentRouteCoordinates =
    route.coordinates;


        // =========================
        // MESAFE VE SÜRE
        // =========================

        const distance =
            routeData.distance;


        const duration =
            routeData.duration;

        currentRouteTotalDistance =
    distance;

currentRouteTotalDuration =
    duration;    


        const distanceKm =
            (distance / 1000).toFixed(1);


        const durationMinutes =
            Math.round(duration / 60);


        const routeDistanceElement =
            document.getElementById("routeDistance");


        const routeTimeElement =
            document.getElementById("routeTime");


        const routeInfoElement =
            document.getElementById("routeInfo");


        if (routeDistanceElement) {

            routeDistanceElement.textContent =
                distanceKm + " km";

        }


        if (routeTimeElement) {

            routeTimeElement.textContent =
                durationMinutes + " dk";

        }


        if (routeInfoElement) {

            routeInfoElement.style.display =
                "block";

        }


    // =========================
// SONRAKİ DÖNÜŞ
// =========================

const steps =
    routeData.legs &&
    routeData.legs[0] &&
    routeData.legs[0].steps
        ? routeData.legs[0].steps
        : [];


navigationSteps =
    steps;


// İlk eleman genellikle "depart"
// olduğu için 1'den başlıyoruz
currentStepIndex =
    steps.length >= 2 ? 1 : 0;




        // =========================
        // ROTA ÇİZGİSİ
        // =========================

        if (map.getSource("route")) {

            map.getSource("route")
                .setData({

                    type: "Feature",

                    properties: {},

                    geometry: route

                });

        }

        else {

            map.addSource(
                "route",
                {

                    type: "geojson",

                    data: {

                        type: "Feature",

                        properties: {},

                        geometry: route

                    }

                }
            );


            // Siyah dış çizgi
            map.addLayer({

                id: "route-outline",

                type: "line",

                source: "route",

                layout: {

                    "line-join": "round",
                    "line-cap": "round"

                },

                paint: {
    "line-color": "#111111",
    "line-width": 8,
    "line-opacity": 0.9
}

            });


            // Yeşil rota
            map.addLayer({

                id: "route-line",

                type: "line",

                source: "route",

                layout: {

                    "line-join": "round",
                    "line-cap": "round"

                },

                paint: {
    "line-color": "#b02a78",
    "line-width": 5,
    "line-opacity": 0.95
}

            });

        }


        // =========================
        // İLK ROTA OLUŞTURULDUĞUNDA
        // TAMAMINI EKRANA SIĞDIR
        // =========================

      if (!isAutomatic) {

    routePreviewReady = true;

    navigationMode = false;


    document.body.classList.remove(
        "navigation-active"
    );


    const coordinates =
        route.coordinates;


    const bounds =
        new maplibregl.LngLatBounds();


    coordinates.forEach(
        function (coordinate) {

            bounds.extend(
                coordinate
            );

        }
    );


    map.fitBounds(
        bounds,
        {
            padding: 60,
            pitch: 0,
            bearing: 0,
            duration: 1000
        }
    );


    routeButton.textContent =
        "BAŞLAT";
}

    }

    catch (error) {

        console.error(
            "Rota hatası:",
            error
        );


        if (!isAutomatic) {

            alert(
                "Rota oluşturulurken hata oluştu."
            );

        }

    }

    finally {
            routeUpdateInProgress = false;


        if (!isAutomatic) {

    if (navigationMode) {

        routeButton.textContent =
            "İPTAL";

    }

    else if (routePreviewReady) {

        routeButton.textContent =
            "BAŞLAT";

    }

    else {

        routeButton.textContent =
            "ROTA";

    }

}

    }

}
function startNavigation() {

    if (
        currentLocation === null ||
        routePreviewReady === false
    ) {
        return;
    }


    navigationMode = true;
    smoothCameraLocation = {

    latitude:
        currentLocation.latitude,

    longitude:
        currentLocation.longitude

};


smoothCameraBearing =
    lastGpsHeading !== null
        ? lastGpsHeading
        : map.getBearing();

    routePreviewReady = false;


    document.body.classList.add(
        "navigation-active"
    );


    routeButton.textContent =
        "İPTAL";
const speedHud =
    document.getElementById(
        "speedHud"
    );

if (speedHud) {

    speedHud.style.display =
        "flex";

}

    // Navigasyon kamerasını
    // bizim konumumuza getir
    map.easeTo({

        center: [
            currentLocation.longitude,
            currentLocation.latitude
        ],

        zoom: 17.3,

        pitch: 60,

        bearing:
            lastNavigationBearing,

        offset: [
            0,
            window.innerHeight * 0.18
        ],

        duration: 1200,

        essential: true

    });


    // İlk dönüş bilgisini göster
    if (navigationSteps.length > 0) {

        updateLiveInstruction(
            currentLocation.latitude,
            currentLocation.longitude
        );

    }

}
routeButton.addEventListener(
    "click",
    function () {


        // Şu anda navigasyondaysak:
        // İPTAL
        if (navigationMode) {

            cancelNavigation();

            return;

        }


        // Kuşbakışı rota hazırsa:
        // BAŞLAT
        if (routePreviewReady) {

            startNavigation();

            return;

        }


        // Henüz rota yoksa:
        // ROTA oluştur
        createRoute(false);

    }
);