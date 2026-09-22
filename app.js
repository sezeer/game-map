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
let currentRouteCoordinates = [];
let offRouteCount = 0;
let lastRerouteAt = 0;


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
    locationButton.classList.add(
    "gps-active"
);


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
// =========================
// HEDEFE ULAŞMA KONTROLÜ
// =========================

if (
    navigationMode &&
    destinationLocation !== null
) {

    const distanceToDestination =
        calculateDistance(
            currentLocation,
            destinationLocation
        );


    console.log(
        "Hedefe uzaklık:",
        Math.round(distanceToDestination),
        "metre"
    );


    if (distanceToDestination <= 25) {

        finishNavigation();

        return;

    }

}
// =========================
// ROTADAN SAPMA KONTROLÜ
// =========================

if (
    navigationMode &&
    destinationLocation !== null &&
    currentRouteCoordinates.length > 1
) {

    const gpsAccuracy =
        position.coords.accuracy;


    // GPS çok kötü durumdaysa
    // yanlışlıkla yeni rota oluşturma
    if (gpsAccuracy <= 50) {

        const offRouteDistance =
            distanceToRoute(
                currentLocation,
                currentRouteCoordinates
            );


        console.log(
            "Rotaya uzaklık:",
            Math.round(offRouteDistance),
            "metre"
        );


        // Rotadan 40 metreden fazla uzaktaysak
        if (offRouteDistance > 40) {

            offRouteCount++;

        }

        else {

            offRouteCount = 0;

        }


        // Tek GPS sıçramasında rota değiştirmiyoruz.
        // İki ölçüm üst üste rotadan uzakta olmalı.
        if (offRouteCount >= 2) {

            const now =
                Date.now();


            // Arka arkaya sürekli sunucuya istek atmasın
            if (
                now - lastRerouteAt >
                10000
            ) {

                console.log(
                    "Rotadan çıkıldı. Yeni rota hesaplanıyor..."
                );


                lastRerouteAt =
                    now;

                offRouteCount =
                    0;


                createRoute(true);

            }

        }

    }

}
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
function finishNavigation() {

    navigationMode = false;
    document.body.classList.remove(
    "navigation-active"
);

    currentRouteCoordinates = [];
    navigationSteps = [];

    currentStepIndex = 0;
    offRouteCount = 0;

    lastHeadingLocation = null;
    lastRouteUpdateLocation = null;


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

    document.body.classList.remove(
        "navigation-active"
    );

    currentRouteCoordinates = [];
    navigationSteps = [];

    currentStepIndex = 0;
    offRouteCount = 0;

    lastHeadingLocation = null;
    lastRouteUpdateLocation = null;


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
            "?limit=6" +
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


        const results =
            data.features || [];


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


                item.appendChild(
                    nameElement
                );

                item.appendChild(
                    addressElement
                );


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
document.body.classList.add(
    "navigation-active"
);
routeButton.textContent =
    "İPTAL";

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

    if (navigationMode) {

        routeButton.textContent =
            "İPTAL";

    }

    else {

        routeButton.textContent =
            "ROTA";

    }

}

    }

}
routeButton.addEventListener(
    "click",
    function () {

        if (navigationMode) {

            cancelNavigation();

        }

        else {

            createRoute(false);

        }

    }
);
