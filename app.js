const formEle = document.querySelector("form");
const tabel = document.querySelector("tbody");
const titleBar = document.querySelector("#street-name");
const streetEle = document.querySelector(".streets");

formEle.addEventListener("submit", function(e) {
    street = e.target.querySelector("input");
    streetSearch(street.value)
    e.preventDefault();
});

function streetSearch(query) {
    fetch(`https://api.winnipegtransit.com/v3/streets.json?name=${query}&usage=long&api-key=yywi4QKxinQ3PzCgMK6u`)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("Something went Wrong!");
            }
        }).then(data => {
            if (Object.keys(data.streets).length === 0) {
                streetEle.innerHTML = "No Streets found";
            } else {
                updateStreetList(data.streets);
            }
        })
}

function updateStreetList(data) {
    streetEle.innerHTML = ""
    data.forEach(function(street) {
        streetEle.innerHTML += `<a href="#" data-street-key="${street.key}">${street.name}</a>`
    });
};

streetEle.addEventListener("click", function(e) {
    fetch(`https://api.winnipegtransit.com/v3/stops.json?street=${e.target.dataset.streetKey}&api-key=yywi4QKxinQ3PzCgMK6u`)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            }
        }).then(data => {
            getStops(data.stops);
        })
})

function getStops(stopList) {
    stopList.forEach(function(stop) {
        fetch(`https://api.winnipegtransit.com/v3/stops/${stop.key}/schedule.json?max-results-per-route=2&api-key=yywi4QKxinQ3PzCgMK6u`)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
            }).then(data => {
                updataSchedule(data[`${["stop-schedule"]}`]);

            })
    })
}

function updataSchedule(scheduleList) {
    tabel.insertAdjacentHTML('afterbegin', `<tr>
  <td>${scheduleList.stop.street.name}</td> 
  <td>${scheduleList.stop["cross-street"].name}</td>
  <td>${scheduleList.stop.direction}</td>
  <td>${scheduleList["route-schedules"][0].route.number}</td>
  <td>${new Date(scheduleList["route-schedules"][0]["scheduled-stops"][0].times.departure.estimated).toLocaleTimeString()}</td>
  </tr>`)
    titleBar.textContent = `Displaying results for ${scheduleList.stop.street.name}`

}