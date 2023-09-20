const findLocation = () => {
    const status = document.querySelector(".status");

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const geo = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        
        fetch(geo)
        .then(res => res.json())
        .then(data => {
            status.textContent = data.countryName + " " + data.principalSubdivision + " " + data.city;
        })
    
    }
    
    const error = () => {
        status.textContent = "ERROR Unable to get a location"
    }

    navigator.geolocation.getCurrentPosition(success, error);
}