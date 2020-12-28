function prayerTime(latitude, longitude){
    fetch('http://api.aladhan.com/v1/calendar?latitude='+latitude+'&longitude='+longitude+'&method=2')
    .then(theResponse => theResponse.json())
    .then(function(theResponse){
        let date        = new Date();
        let today       = date.getDate();
        let data        = theResponse.data[0].timings;
        let dateLocation    = theResponse.data[today].date.readable;
        let dateTimezone    = theResponse.data[today].meta.timezone;
        // let h2          = document.createElement('h2');
        // h2.innerHTML    = document.write(dateLocation);
        // console.log(data);
        // console.log(today);
        // console.log(dateLocation);
        // console.log(dateTimezone);

        

        let app             = document.getElementById('app');
        let table           = document.createElement('table');
        let tableBody       = document.createElement('tbody');

        for (i in data) {
            let row         = tableBody.insertRow();
            let name        = row.insertCell(0); //col 1 of the table
            let time        = row.insertCell(1); //col 2 of the table
            name.innerHTML  = i;
            time.innerHTML  = data[i];
            tableBody.appendChild(row);
        }

        table.appendChild(tableBody);
        app.appendChild(table);
        // app.appendChild(h2);
    });
}

function success(position) { //third function
    prayerTime(position.coords.latitude, position.coords.longitude)
}

function error() {
    alert('Position could not be accessed.');
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
