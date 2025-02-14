function updateTachometer(speed) {
    const needle = document.getElementById("needle");
    const speedDisplay = document.getElementById("speedDisplay");

    let angle = (speed / 280) * 270 - 135;
    needle.style.transform = `translateX(-50%) rotate(${angle}deg)`;

    speedDisplay.textContent = `${Math.round(speed)} km/h`;
}


function createNumbers() {
    const numbersContainer = document.querySelector('.numbers');
    const numSteps = 14;

    for (let i = 0; i <= numSteps; i++) {
        const angle = ((i - 7) / numSteps) * 270;
        const number = document.createElement('span');
        number.textContent = i * 20;
        const translateY = -130;

        const rotate = `rotate(${angle}deg) translateY(${translateY}px) rotate(${-angle}deg)`;
        number.style.transform = rotate;
        numbersContainer.appendChild(number);
    }
}


function getSpeed() {
    if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition(
            (position) => {
                if (position.coords.speed !== null) {
                    let speedKmh = position.coords.speed * 3.6;
                    updateTachometer(speedKmh);
                }
            },
            (error) => {
                alert("Fehler beim Abrufen der Geschwindigkeit!");
                console.error("Fehler beim Abrufen der Geschwindigkeit:", error);
            },
            { enableHighAccuracy: true }
        );
    } else {
        alert("Geolocation wird nicht unterstützt.");
        console.error("Geolocation wird nicht unterstützt.");
    }
}

createNumbers();
getSpeed();
