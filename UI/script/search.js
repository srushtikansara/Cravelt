const searchInput = document.getElementById('searchInput');
const mapFrame = document.getElementById('mapFrame');

// 📍 Get user's current location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            mapFrame.src = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
        },
        () => {
            // ❌ If user denies location
            mapFrame.src = `https://www.google.com/maps?q=restaurants+near+me&output=embed`;
        }
    );
} else {
    mapFrame.src = `https://www.google.com/maps?q=restaurants+near+me&output=embed`;
}

// 🔍 Search on Enter key
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
        }
    }
});
