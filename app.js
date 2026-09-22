const map = new maplibregl.Map({
    container: "map",

    style: "https://tiles.openfreemap.org/styles/liberty",

    center: [32.85, 39.93],

    zoom: 11
});


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
let hasCenteredOnPlayer = false;
let lastRouteUpdateLocation = null;
let routeUpdateInProgress = false;


const locationButton =
    document.getElementById("locationButton");


locationButton.addEventListener("click", function () {

    if (watchId !== null) {

        if (currentLocation !== null) {

            map.easeTo({
                center: [
                    currentLocation.longitude,
                    currentLocation.latitude
                ],
                zoom: 16,
                duration: 800
            });

        }

        return;
    }


    if (!navigator.geolocation) {

        alert("Bu cihaz konum özelliğini desteklemiyor.");

        return;
    }


    locationButton.textContent = "GPS AÇIK";


    watchId = navigator.geolocation.watchPosition(

        function (position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            currentLocation = {
                latitude: latitude,
                longitude: longitude
            };


            showPlayer(
                longitude,
                latitude
            );


            if (!hasCenteredOnPlayer) {

                map.easeTo({
                    center: [
                        longitude,
                        latitude
                    ],
                    zoom: 16,
                    duration: 1000
                });

                hasCenteredOnPlayer = true;
            }


            if (destinationLocation !== null) {

                if (lastRouteUpdateLocation === null) {

                    lastRouteUpdateLocation = {
                        latitude: latitude,
                        longitude: longitude
                    };

                } else {

                    const movedDistance =
                        calculateDistance(
                            lastRouteUpdateLocation,
                            currentLocation
                        );


                    if (movedDistance >= 50) {

                        lastRouteUpdateLocation = {
                            latitude: latitude,
                            longitude: longitude
                        };

                        createRoute(true);
                    }

                }

            }

        },


        function (error) {

            console.error("GPS hatası:", error);

            locationButton.textContent = "KONUMUM";

            alert("Konum alınamadı.");

        },


        {
            enableHighAccuracy: true,
            maximumAge: 1000,
            timeout: 15000
        }

    );

});
// =========================
// OYUNCU MARKERI
// =========================

function showPlayer(longitude, latitude) {

    if (playerMarker === null) {

        const markerElement =
            document.createElement("div");

        markerElement.id =
            "playerMarker";


        playerMarker =
    new maplibregl.Marker({
        element: markerElement,
        anchor: "bottom"
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
            document.createElement("div");

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


searchButton.addEventListener(
    "click",
    searchPlace
);


searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            searchPlace();

        }

    }
);
// =========================
// ROTA
// =========================

const routeButton =
    document.getElementById("routeButton");


async function createRoute(isAutomatic = false) {

    if (routeUpdateInProgress) {
    return;
}

routeUpdateInProgress = true;

    if (currentLocation === null) {

        alert("Önce KONUMUM butonuna bas.");

        return;
    }


    if (destinationLocation === null) {

        alert("Önce bir hedef ara.");

        return;
    }


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
            "https://router.project-osrm.org/route/v1/driving/" +
            start +
            ";" +
            end +
              "?overview=full&geometries=geojson&steps=true";


        const response =
            await fetch(url);

        const data =
            await response.json();


        if (
            data.code !== "Ok" ||
            data.routes.length === 0
        ) {

            alert("Rota bulunamadı.");

            return;
        }


        const route =
            data.routes[0].geometry;
            const steps =
    data.routes[0].legs[0].steps;


const nextStep =
    steps.find(function (step) {

        return step.maneuver.type !== "depart";

    }) || steps[0];


if (nextStep) {

    const meters =
        Math.round(nextStep.distance);

    const modifier =
        nextStep.maneuver.modifier;


    let directionText =
        "Devam et";


    if (modifier === "right") {
        directionText = "Sağa dön";
    }

    else if (modifier === "left") {
        directionText = "Sola dön";
    }

    else if (modifier === "slight right") {
        directionText = "Hafif sağa dön";
    }

    else if (modifier === "slight left") {
        directionText = "Hafif sola dön";
    }

    else if (modifier === "sharp right") {
        directionText = "Keskin sağa dön";
    }

    else if (modifier === "sharp left") {
        directionText = "Keskin sola dön";
    }

    else if (modifier === "straight") {
        directionText = "Düz devam et";
    }


    const instruction =
        meters + " m sonra " + directionText;


    document.getElementById(
        "navigationInstruction"
    ).textContent = instruction;


    document.getElementById(
        "navigationInstruction"
    ).style.display = "block";

}
            const distance =
    data.routes[0].distance;

const duration =
    data.routes[0].duration;


const distanceKm =
    (distance / 1000).toFixed(1);

const durationMinutes =
    Math.round(duration / 60);


document.getElementById("routeDistance").textContent =
    distanceKm + " km";

document.getElementById("routeTime").textContent =
    durationMinutes + " dk";

document.getElementById("routeInfo").style.display =
    "block";


        // Eski rota varsa güncelle
        if (map.getSource("route")) {

            map.getSource("route").setData({
                type: "Feature",
                geometry: route
            });

        }

        // İlk kez rota oluşturuluyorsa
        else {

            map.addSource("route", {

                type: "geojson",

                data: {
                    type: "Feature",
                    geometry: route
                }

            });


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
                    "line-width": 9
                }

            });


            // GTA tarzı rota çizgisi
            map.addLayer({

                id: "route-line",

                type: "line",

                source: "route",

                layout: {
                    "line-join": "round",
                    "line-cap": "round"
                },

                paint: {
                    "line-color": "#c7e64b",
                    "line-width": 5
                }

            });

        }


        // Rotanın tamamını ekrana sığdır
        const coordinates =
            route.coordinates;

        const bounds =
            new maplibregl.LngLatBounds();


        coordinates.forEach(function (coordinate) {

            bounds.extend(coordinate);

        });


        if (!isAutomatic) {

    map.fitBounds(
        bounds,
        {
            padding: 80
        }
    );

}


    }

    catch (error) {

        console.error(error);

        alert("Rota oluşturulurken hata oluştu.");

    }

    finally {

    routeUpdateInProgress = false;

    if (!isAutomatic) {
        routeButton.textContent = "ROTA";
    }

}

}


routeButton.addEventListener(
    "click",
    createRoute
);
// =========================
// PWA SERVICE WORKER
// =========================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", function () {

        navigator.serviceWorker.register("./sw.js")
            .then(function () {

                console.log("PWA hazır.");

            })
            .catch(function (error) {

                console.error(
                    "Service Worker hatası:",
                    error
                );

            });

    });

}