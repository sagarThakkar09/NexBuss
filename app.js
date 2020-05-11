const formEle = document.querySelector("form");
let streetEle = document.querySelector(".streets");
const result = document.querySelector("#street-name");

formEle.addEventListener("submit", function(e) {
    street = e.target.querySelector("input");
    streetSearch(street.value)
    e.preventDefault();
});

function streetSearch(query) {
    fetch(`https://api.winnipegtransit.com/v3/streets.json?api-key=yywi4QKxinQ3PzCgMK6u&name=${query}`)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("Something went Wrong!");
            }
        }).then(data => {
            updateStreetList(data.streets);
        })
}

function updateStreetList(data) {
    streetEle.innerHTML = ""
    data.forEach(function(street) {
        streetEle.innerHTML += `<a href="#" data-street-key="${street.key}">${street.name}</a>`
    });
};

streetEle.addEventListener("click", function(e) {
    fetch(`https://api.winnipegtransit.com/v3/stops.json?street=${e.target.dataset.streetKey}&api-key=ZPFv2Zx6ny1KrlPKnfe`)
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
        console.log(stop.key);
    })
}