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
let navigationSteps = [];
let currentStepIndex = 1;
let hasCenteredOnPlayer = false;
let lastRouteUpdateLocation = null;
let routeUpdateInProgress = false;
let navigationMode = false;
let lastHeadingLocation = null;


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
updateLiveInstruction(
    latitude,
    longitude
);
if (navigationMode) {

    let bearing = map.getBearing();


    // Telefon GPS yön bilgisi veriyorsa onu kullan
    if (
        position.coords.heading !== null &&
        !isNaN(position.coords.heading)
    ) {

        bearing =
            position.coords.heading;

    }

    // GPS yön vermiyorsa hareketten hesapla
    else if (lastHeadingLocation !== null) {

        const moved =
            calculateDistance(
                lastHeadingLocation,
                currentLocation
            );


        if (moved >= 5) {

            bearing =
                calculateBearing(
                    lastHeadingLocation,
                    currentLocation
                );

        }

    }


    map.easeTo({

        center: [
            longitude,
            latitude
        ],

        zoom: 16.5,

        bearing: bearing,

        pitch: 35,

        offset: [
            0,
            140
        ],

        duration: 700

    });


    lastHeadingLocation = {
        latitude: latitude,
        longitude: longitude
    };

}
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


// =========================
// CANLI YÖNLENDİRME
// =========================

function updateLiveInstruction(latitude, longitude) {

    const instructionBox =
        document.getElementById(
            "navigationInstruction"
        );


    if (
        !instructionBox ||
        navigationSteps.length < 2
    ) {
        return;
    }


    if (
        currentStepIndex >= navigationSteps.length
    ) {

        instructionBox.textContent =
            "Hedefe ulaştın";

        return;
    }


    const step =
        navigationSteps[currentStepIndex];


    if (
        !step.maneuver ||
        !step.maneuver.location
    ) {
        return;
    }


    const turnLongitude =
        step.maneuver.location[0];

    const turnLatitude =
        step.maneuver.location[1];


    const distanceToTurn =
        calculateDistance(

            {
                latitude: latitude,
                longitude: longitude
            },

            {
                latitude: turnLatitude,
                longitude: turnLongitude
            }

        );


    const directionText =
        getDirectionText(
            step.maneuver
        );


    // Hedefe geldik
    if (
        step.maneuver.type === "arrive" &&
        distanceToTurn <= 25
    ) {

        instructionBox.textContent =
            "Hedefe ulaştın";

        instructionBox.style.display =
            "block";

        return;
    }


    // Dönüş noktasına geldik,
    // sonraki talimata geç
    if (
        distanceToTurn <= 15 &&
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


    // Dönüş çok yakın
    if (distanceToTurn <= 35) {

        instructionBox.textContent =
            "Şimdi " + directionText;

    }

    // Normal yönlendirme
    else {

        const roundedDistance =
            Math.round(
                distanceToTurn / 10
            ) * 10;


        instructionBox.textContent =
            roundedDistance +
            " m sonra " +
            directionText;

    }


    instructionBox.style.display =
        "block";
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
            "https://router.project-osrm.org/route/v1/driving/" +
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

navigationMode = true;

        const route =
            routeData.geometry;


        // =========================
        // MESAFE VE SÜRE
        // =========================

        const distance =
            routeData.distance;


        const duration =
            routeData.duration;


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


if (
    currentLocation !== null &&
    navigationSteps.length > 0
) {

    updateLiveInstruction(
        currentLocation.latitude,
        currentLocation.longitude
    );

}

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
                    "line-width": 9

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

                    "line-color": "#c7e64b",
                    "line-width": 5

                }

            });

        }


        // =========================
        // İLK ROTA OLUŞTURULDUĞUNDA
        // TAMAMINI EKRANA SIĞDIR
        // =========================

      if (!isAutomatic) {

    map.easeTo({

        center: [
            currentLocation.longitude,
            currentLocation.latitude
        ],

        zoom: 16.5,

        pitch: 0,

        bearing: 0,

        offset: [
            0,
            140
        ],

        duration: 1200

    });

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

        routeUpdateInProgress =
            false;


        if (!isAutomatic) {

            routeButton.textContent =
                "ROTA";

        }

    }

}
routeButton.addEventListener(
    "click",
    function () {
        createRoute(false);
    }
);
