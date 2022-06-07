let currentPage = 1;
let statisticsTableUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=${currentPage}`;
const tableContainer = document.getElementById('statisticsTableContainer');
let coinsData = [];

//Function for getting the coins data 
async function getCoinsDataAsync(url) {
    try{
        let response = await fetch(url);
        //console.log(response);
        return await response.json();
    }catch(err){
        console.error(err);
        // Handle errors here
    }
}

//Function for rendering the main statistics table
function renderStatisticsTable(data){
    let strArr = [];
    strArr.push(`<table class="table table-hover table-responsive table-fit">
    <thead>
      <tr>
        <th scope="col">Rank</th>
        <th scope="col">Logo</th>
        <th scope="col">Name</th>
        <th scope="col">Market Cap</th>
        <th scope="col">Price</th>
        <th scope="col">Price change in % <br>(last 24h)</th>
        <th scope="col">Total supply</th>
        <th scope="col">Price change<br>(last 7 days)</th>
      </tr>
    </thead>
    <tbody>
    `); 
    for(let coin of data){
        strArr.push( `<tr class="${coin.id}" value="${coin.name}" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <td>${coin.market_cap_rank}</td>
        <td class="img-fluid align-middle"><img src="${coin.image}" height="50px" alt="${coin.id}"}"></td>
        <td class="align-middle">${coin.name}</td>
        <td class="align-middle">${coin.market_cap.toLocaleString('en-US')}</td>
        <td class="align-middle">${coin.current_price.toLocaleString('en-US')}</td>
        <td class="align-middle">${coin.price_change_percentage_24h > 0 ? "<strong class='increase'>↑</strong>" : "<strong class='decrease'>↓</strong>"}&nbsp &nbsp${coin.price_change_percentage_24h}% </td>
        <td class="align-middle">${coin.total_supply !=null ? coin.total_supply.toLocaleString('en-US') : "N/A"}</td>
        <td class="align-middle"><div class="smallChartContainer chart-container"></div><canvas id="${coin.id}" style ="max-width:200px !important; max-height:9vh"></canvas></div></td>
        </tr>
        `)
    }
    strArr.push(`</tbody></table>`)
    return strArr.join('');
}

//Function for showing the small charts in the main statistics table
async function showSmallChartAsync(coinId) {  

    let currentUrl = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1&interval=hourly`;
    let chartCanvas = document.getElementById(coinId);
    let ctx = chartCanvas.getContext("2d"); 
    let config = await getTableChartConfig(currentUrl);
    new Chart(
        ctx,
        config
    );
}

//Event for loading the statistics table (This event should be changed to load on 'click' when the statistics page will be clicked on the nav bar)
window.addEventListener('load', async (event) => {
    let data = [];
    try{
        //Function for loading top gainers and top losers goes here
        data = await getCoinsDataAsync(statisticsTableUrl);
        let statisticsTableContainer = document.getElementById("statisticsTableContainer");
        statisticsTableContainer.innerHTML = renderStatisticsTable(data);
        data.forEach(async coin => {
            await showSmallChartAsync(coin.id)
        });
    }
    catch(err){
        console.log("Error");
    }
  });


//Function for converting the unix number to date format
function convertUnixToDate(unix) {
    let date = new Date(unix);

    let formattedDate = date.toLocaleString("en-US", { day: "numeric", month: "long", hour: "numeric", minute: 'numeric', year: 'numeric' });
    return formattedDate
}

//Function for drawing the small chart in the statistics table
async function getTableChartConfig(url) {

    let chartData = await getCoinsDataAsync(url)
    let priceResult = [];
    let timeResult = [];
    let convertedDate;


    for (const data of chartData.prices) {
        convertedDate = convertUnixToDate(data[0])
        timeResult.push(convertedDate);
        priceResult.push(data[1])
    }

    const data = {
        labels: timeResult,
        datasets: [{
            backgroundColor: 'rgb(255,215,0)',
            borderColor: 'rgb(218,165,32)',
            data: priceResult,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: false
                },
            },
            scales: {
                y: {
                    ticks: {
                        display: false,
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        display: false
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            },
            events: [],
            maintainAspectRatio    : false
        }
    };
    return config;
}

//#region  KRISTIJAN => Task: Create statistics page growth chart

//Function for creating the config for the big chart in the modal

async function GetSingleCoinChartConfig(id, coinName) {

    let chartUrl = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1&interval=minutely`
    let chartData = await getCoinsDataAsync(chartUrl)
    let priceResult = [];
    let timeResult = [];
    let convertedDate = 0;

    for (const data of chartData.prices) {
        convertedDate = convertUnixToDate(data[0])
        timeResult.push(convertedDate);
        priceResult.push(data[1])
    }

    const data = {
        labels: timeResult,
        datasets: [{
            label: `${coinName} Price Chart`,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: priceResult,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            maintainAspectRatio	: false,

            scales: {
                x:{
                    grid: {
                        display: false,
                    }
                },
                y:{
                    grid: {
                        display: false,
                    }
                }
            }
        }
    };

    return config;
}

//Function for creating the big chart in the modal

async function createSingleCoinChartAsync(coinId, coinName) {

    let chartContainer = document.createElement('div')
    chartContainer.setAttribute('class', 'single-coin-chart-container')
    
    let chartCanvas = document.createElement('canvas')
    chartContainer.appendChild(chartCanvas)

    let config = await GetSingleCoinChartConfig(coinId, coinName)

    new Chart(
        chartCanvas,
        config
    );

    return chartContainer
}

//function for creating the bonus info for each crypto when you click on the statistics table

async function createSingleCoinInfoAsync(coinId) {

    let url = `https://api.coingecko.com/api/v3/coins/${coinId}`
    let data = await getCoinsDataAsync(url);

    let infoContainer = document.createElement('div')
    infoContainer.setAttribute('class', 'info-container mx-4')

    infoContainer.innerHTML = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h1 class="card-title"><img src="${data.image.small}"alt="${data.id}"}"> ${data.name}</h1>
                <h3 class="card-text">${data.symbol.toUpperCase()} Price Statistics</h3>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Price: $${data.market_data.current_price.usd.toLocaleString('en-US')}</li>
                <li class="list-group-item">Market cap: $${data.market_data.market_cap.usd.toLocaleString('en-US')}</li>
                <li class="list-group-item">Market cap rank: ${data.market_cap_rank}</li>
                <li class="list-group-item">Circulating Supply: ${data.market_data.circulating_supply.toLocaleString('en-US')}</li>
                <li class="list-group-item">Total Supply: ${data.market_data.total_supply != null ? data.market_data.total_supply.toLocaleString('en-US') : data.market_data.circulating_supply.toLocaleString('en-US')}</li>
                <li class="list-group-item">Trading volume: $${data.market_data.total_volume.usd.toLocaleString('en-US')}</li>
                <li class="list-group-item">All-Time High: $${data.market_data.ath.usd.toLocaleString('en-US')}</li>
                <li class="list-group-item">All-Time Low: $${data.market_data.atl.usd}</li>
                <li class="list-group-item">24h Low / 24h High: $${data.market_data.low_24h.usd.toLocaleString('en-US')} / $${data.market_data.high_24h.usd.toLocaleString('en-US')}</li>
            </ul>
        </div>
    `
    return infoContainer
}

// event listener to show the modal with chart and bonus info

tableContainer.addEventListener('click', async (e) => {
    if (e.target.nodeName === "TD") {
        let coinId = e.path[1].className
        let coinName = e.path[1].attributes[1].value

        let chart = await createSingleCoinChartAsync(coinId, coinName)
        let info = await createSingleCoinInfoAsync(coinId)
        
        let modal = document.getElementById('coin-info')
        modal.innerHTML = '';
        modal.appendChild(chart)
        modal.appendChild(info)
    }
})

//#endregion