function prayerTime(latitude, longitude){
    fetch('http://api.aladhan.com/v1/calendar?latitude='+latitude+'&longitude='+longitude+'&method=4')
    .then(theResponse => theResponse.json())
    .then(function(theResponse){
        let date        = new Date();
        let today       = date.getDate();
        let data        = theResponse.data[0].timings;
        // let dateLocation    = theResponse.data[today].date.readable;
        // let dateTimezone    = theResponse.data[today].meta.timezone;        

        let app             = document.getElementById('app');
        let table           = document.createElement('table');
        let tableTbody       = document.createElement('tbody');

        for (i in data) {
            let row         = tableTbody.insertRow();
            let name        = row.insertCell(0); //col 1 of the table
            let time        = row.insertCell(1); //col 2 of the table
            name.innerHTML  = i;
            time.innerHTML  = data[i];
            tableTbody.appendChild(row);
        }

        table.appendChild(tableTbody);
        app.appendChild(table);
        // app.appendChild(h2);
    });
}

function success(position) { //third function
    prayerTime(position.coords.latitude, position.coords.longitude);
}

function error() {
    prayerTime('-6.21462', '106.84513'); //default lat, lon Jakarta
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