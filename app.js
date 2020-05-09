const formEle = document.querySelector("form");
let streetEle = document.querySelector(".streets");
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
            const streetList = [];
            streetList.push(data.streets);
            console.log(streetList);
            updateStreetList(streetList[0]);

        })
}

function updateStreetList(data) {
    streetEle.innerHTML = ""
    data.forEach(function(street) {
        streetEle.insertAdjacentHTML(`afterbegin`,
            ` <a href="#" data-street-key="${street.key}">${street.name}</a>`
        );
    })

};