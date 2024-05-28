// function to get distance from current location to terminal location
export function getDistance(lat1, lon1, lat2, lon2) {
    const r = 6371; // km
    const p = Math.PI / 180;
    //haversine formula
    const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
                  + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
                    (1 - Math.cos((lon2 - lon1) * p)) / 2;  
    //change to miles
    let miles = 2 * r * Math.asin(Math.sqrt(a)) * 0.621371
    return Number.parseFloat(miles.toFixed(4))
  }

// function to open location in google maps
  export function openMap(lat, lon) {
    window.open(`https://maps.google.com?q=${lat},${lon}`);
  }