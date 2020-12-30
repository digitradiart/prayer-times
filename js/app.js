function prayerTime(latitude, longitude){
    fetch('http://api.aladhan.com/v1/calendar?latitude='+latitude+'&longitude='+longitude+'&method=4')
    .then(theResponse => theResponse.json())
    .then(function(theResponse){
        let date            = new Date();
        let today           = date.getDate();
        // console.log(`today is ${today}`);
        let data            = theResponse.data[0].timings;
        let dateLocation    = theResponse.data[today-1].date.readable;
        console.log(`today is ${dateLocation}`);
        let dateTimezone    = theResponse.data[today-1].meta.timezone;        
        console.log(`today is ${dateTimezone}`);

        let app             = document.getElementById('app');
        let table           = document.createElement('table');
        let tableTbody      = document.createElement('tbody');
        let loc             = document.createElement('h2');
        let day             = document.createElement('h2');

        for (i in data) {
            let row         = tableTbody.insertRow();
            let name        = row.insertCell(0); //col 1 of the table
            let time        = row.insertCell(1); //col 2 of the table
            name.innerHTML  = i;
            time.innerHTML  = data[i];
            tableTbody.appendChild(row);
        }

        loc.innerHTML   = dateTimezone;
        app.appendChild(loc);
        day.innerHTML   = dateLocation;
        app.appendChild(day);
        table.appendChild(tableTbody);
        app.appendChild(table);
    }); 
}

function success(position) { //third function
    prayerTime(position.coords.latitude, position.coords.longitude);
}

function error() {
    prayerTime('-6.2087634', '106.845599'); //default lat, lon Jakarta
    // prayerTime('-2.533000', '140.717000'); //default lat, lon Jayapura
    // prayerTime('-8.652933', '1117.361648'); //default lat, lon NTB
    // prayerTime('-6.600000', '106.800000'); //default lat, lon Bogor
    // https://www.gps-latitude-longitude.com
}

function userLocation() { //second function
    if(!navigator.geolocation) {
        alert('Oops! Geolocation is not available on your browser.');
    } else {
        navigator.geolocation.getCurrentPosition(success, error); //name of function callback: success, error
    }
}

function index() { //first function
    let app         = document.getElementById('app');
    let h1          = document.createElement('h1');
    h1.innerHTML    = 'Prayer Times';
    app.appendChild(h1);
    userLocation();
}

index(); //gunakan function index