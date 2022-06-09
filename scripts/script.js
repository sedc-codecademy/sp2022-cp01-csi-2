// ivana_stojadinovska
// trending crypto

let trendingCryptoNames = document.getElementsByClassName('trendingCryptoName');
let trendingCryptoShortNames = document.getElementsByClassName('trendingCryptoShortName');
let trendingCryptoCurentPrices = document.getElementsByClassName('trendingCryptoCurentPrice');
let tendingCryptoPriceChanges = document.getElementsByClassName('tendingCryptoPriceChange');
let trendingCryptoChartContainer = document.getElementsByClassName('trendingCryptoChartContainer');
let tcButtonOne = document.getElementById('tcButtonOne');
let tcButtonTwo = document.getElementById('tcButtonTwo');
let tcButtonThree = document.getElementById('tcButtonThree');
let trendingCryptoApiLink = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=true&price_change_percentage=24h"
let trendingCryptoApiLink2 = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=5&page=1&sparkline=true&price_change_percentage=24h"
let trendingCryptoApiLink3 = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=5&page=1&sparkline=true&price_change_percentage=24h"

trendingCryptoApiCall(trendingCryptoApiLink)

class trendingCryptoClass {
    constructor(index, name, short, price, change, graph) {
        trendingCryptoNames[index].innerText = name;
        trendingCryptoShortNames[index].innerText = short;
        trendingCryptoCurentPrices[index].innerText = price;
        tendingCryptoPriceChanges[index].innerText = change + " %";
        tendingCryptoPriceChanges[index].style.color = tendingCryptoPriceChanges[index].innerText.charAt(0) == "-" ? "red" : "green";

        new Chart(trendingCryptoChartContainer[index],
            {
                type: 'line',
                data:
                {
                    labels: [...Array(graph.length - 0 + 1).keys()].map(x => x + 0),
                    datasets: [{
                        label: 'USD',
                        data: graph,
                        fill: false,
                        borderColor: 'rgba(255,185,1,255)',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                display: false
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                display: false
                            }
                        }]
                    },
                    legend: { display: false },
                    elements: {
                        point: {
                            radius: 0
                        }
                    }
                }
            });
    }
}

tcButtonOne.addEventListener("click", () => trendingCryptoApiCall(trendingCryptoApiLink));
tcButtonTwo.addEventListener("click", () => trendingCryptoApiCall(trendingCryptoApiLink2));
tcButtonThree.addEventListener("click", () => trendingCryptoApiCall(trendingCryptoApiLink3));

async function trendingCryptoApiCall(url) {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((out) => trendingCryptoDisplayData(out))
        .catch((err) => {
            console.log("The request has failed!");
            console.log(err);
        })
}

function trendingCryptoDisplayData(data) {
    console.log(data);
    for (let i = 0; i <= 4; i++) {
        let asd = new trendingCryptoClass
            (
                i,
                data[i].name,
                data[i].symbol.toUpperCase(),
                data[i].current_price,
                data[i].price_change_percentage_24h,
                data[i].sparkline_in_7d.price
            );
    }
}
