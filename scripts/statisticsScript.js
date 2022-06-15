const tableContainer = document.getElementById('statisticsTableContainer');

let helpers = {"statisticsTable" : {}};

//Function for getting the coins data 
async function getCoinsDataAsync(url) {
    try {
        let response = await fetch(url);
        let result = await response.json();
        //console.log(result)
        // return await response.json();
        return result;
    } catch (err) {
        console.error(err);
        // Handle errors here
    }
}

//-------------------------------------------------------------------------------------------------------
//#region  Stefan i Igor => TODO: Create statistics page best growing/falling tables

//returns the sorted data for the top gainers
async function returnResultForGainers(url) {

    let data = await getCoinsDataAsync(url)
    let sortedData = data.sort((x, y) => y.price_change_percentage_24h - x.price_change_percentage_24h);
    return sortedData
}
//returns the sorted data for the top losers

async function returnResultForLosers(url) {
    let data = await getCoinsDataAsync(url)
    let sortedData = data.sort((x, y) => x.price_change_percentage_24h - y.price_change_percentage_24h);
    return sortedData
}

//creates the table for top losers and top gainers
async function tableMaker(data) {
    let table = [];
    table.push(`
        <table class="table">
          <thead>
        <tr>
          <th scope="col" class="text-center">#</th>
          <th scope="col" class="text-center">Logo</th>
          <th scope="col" class="text-center">Name</th>
          <th scope="col" class="text-center">Price</th>
          <th scope="col" class="text-center">Price change in % <br> (last 24h)</th>
        </tr>
      </thead>
      <tbody>`)

    for (let i = 0; i < 5; i++) {

        table.push(`        
            <tr>
              <th class="align-middle text-center" scope="row">${i + 1}</th>
              <td class="img-fluid align-middle text-center"><img src="${data[i].image}" height="30px" alt="${data[i].id}"}"></td>
              <td class="align-middle text-center">${data[i].name}</td>
              <td class="align-middle text-center">&#36 ${data[i].current_price.toFixed(5)}$</td>
              <td class="align-middle text-center">% ${data[i].price_change_percentage_24h.toFixed(2)}</td>
            </tr>`)
    }
    table.push(`</tbody></table>`)

    return table.join('')
}

async function showGainersAndLosersTables() {
    let gainersDiv = document.getElementById("gainers");
    let losersDiv = document.getElementById("losers");
    let baseUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250"
    let sortedGainersTable = await returnResultForGainers(baseUrl)
    let sortedLooserTable = await returnResultForLosers(baseUrl)
    gainersDiv.innerHTML = `<h3 class="text-center">TOP GAINERS</h3 >` + await tableMaker(sortedGainersTable)
    losersDiv.innerHTML = `<h3 class="text-center">TOP LOSERS</h3>` + await tableMaker(sortedLooserTable)
}

//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Aneta  => TODO: Create statistics page - Main table with all cryptocurrencies including small charts for each

//Function for rendering the main statistics table
function renderStatisticsTable(data) {
    let strArr = [];
    strArr.push(`<table class="table table-hover table-responsive table-fit">
    <thead>
      <tr>
        <th scope="col" class="text-center">Rank</th>
        <th scope="col" class="text-center">Logo</th>
        <th scope="col" class="text-center">Name</th>
        <th scope="col" class="text-center">Market Cap</th>
        <th scope="col" class="text-center">Price</th>
        <th scope="col" class="text-center">Price change in % <br>(last 24h)</th>
        <th scope="col" class="text-center">Total supply</th>
        <th scope="col" class="text-center">Price change<br>(last 7 days)</th>
      </tr>
    </thead>
    <tbody>
    `);
    for (let coin of data) {
        strArr.push(`<tr class="${coin.id}" value="${coin.name}" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <td class="align-middle text-center">${coin.market_cap_rank}</td>
        <td class="img-fluid align-middle text-center"><img src="${coin.image}" height="50px" alt="${coin.id}"}"></td>
        <td class="align-middle text-center">${coin.name}</td>
        <td class="align-middle text-center">&#36 ${coin.market_cap.toLocaleString('en-US')}</td>
        <td class="align-middle text-center">&#36 ${coin.current_price.toLocaleString('en-US')}</td>
        <td class="align-middle text-center">${coin.price_change_percentage_24h > 0 
            ? "<strong class='increase'>↑</strong>" 
            : coin.price_change_percentage_24h < 0 
                ? "<strong class='decrease'>↓</strong>" 
                : " "}&nbsp &nbsp${coin.price_change_percentage_24h}% </td>
        <td class="align-middle text-center">${coin.total_supply != null ? coin.total_supply.toLocaleString('en-US') : "N/A"}</td>
        <td class="align-middle text-center"><div class="smallChartContainer chart-container"></div><canvas id="${coin.id}" style ="max-width:200px !important; max-height:9vh"></canvas></div></td>
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

//Function for loading and showing the table
async function showStatisticsTable(){
    data = await getCoinsDataAsync(helpers.statisticsTable.statisticsTableUrl+`&per_page=${helpers.statisticsTable.perPage}`+`&page=${helpers.statisticsTable.currentPage}`);
    let statisticsTableContainer = document.getElementById("statisticsTableContainer");
    statisticsTableContainer.innerHTML = renderStatisticsTable(data);
    data.forEach(async coin => {
        await showSmallChartAsync(coin.id)
    });
}

//Event for loading the statistics table 
document.getElementById("statsBtn").addEventListener('click', async (event) => {
    let data = [];
    helpers.statisticsTable.currentPage = 1;
    helpers.statisticsTable.perPage = 10;
    helpers.statisticsTable.statisticsTableUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`;

    let totalCoins = await getCoinsDataAsync(`https://api.coingecko.com/api/v3/coins/list`);
    helpers.statisticsTable.totalPages = Math.ceil(totalCoins.length /helpers.statisticsTable.perPage);
    try {
        //Function for loading top gainers and top losers goes here
        await showGainersAndLosersTables();
        
        //Function for loading the table
        handlePrevNextButtons();
        await showStatisticsTable();
    }
    catch (err) {
        console.log("Error");
        console.log(err);
    }
});

//Function for setting a timeout
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function showLoader(element, ms = null, prezerveSize = true){
    let elementWidth = element.getBoundingClientRect().width;
    let elementHeight = element.getBoundingClientRect().height;
    let loader = await (await fetch("assets/images/loader.html")).text();
    element.innerHTML = loader;
    if(!prezerveSize){
        element.style.height = `${elementHeight}px`;
    }
    if(ms != null){
        await timeout(ms);
    }
    if(!prezerveSize){
        element.style.height = null;
    }
}

//Function for handling the previous and next buttons
function handlePrevNextButtons(){
    let prevBtn = document.getElementById("prevPg");
    let nextBtn = document.getElementById("nextPg");
    let currentPg = document.getElementById("currentPg");
    if(helpers.statisticsTable.currentPage == 1){
        prevBtn.setAttribute("disabled", true);
    }
    nextBtn.addEventListener("click", async (event) => {
        helpers.statisticsTable.currentPage +=1;
        //Hide pagination controlls while loader is running
        document.getElementById("prevNextNav").style.visibility = "collapse";
        await showLoader(tableContainer, 2000, false);
        await showStatisticsTable();
        //Bring back pagination controls
        document.getElementById("prevNextNav").style.visibility = "visible";
        if(currentPg == helpers.statisticsTable.totalPages){
            nextBtn.setAttribute("disabled", false);
            nextBtn.parentNode.classList.add("disabled");
        }
        prevBtn.removeAttribute("disabled");
        prevBtn.parentNode.classList.remove("disabled");
        currentPg.innerText = helpers.statisticsTable.currentPage;
    })

    document.getElementById("prevPg").addEventListener("click", async (event) => {
        helpers.statisticsTable.currentPage -=1;
        //Hide pagination controlls while loader is running
        document.getElementById("prevNextNav").style.visibility = "collapse";
        await showLoader(tableContainer, 2000, true);
        await showStatisticsTable();
        //Bring back pagination controls
        document.getElementById("prevNextNav").style.visibility = "visible";
        if(helpers.statisticsTable.currentPage == 1){
            prevBtn.setAttribute("disabled", true);
            prevBtn.parentNode.classList.add("disabled");
        }
        currentPg.innerText = helpers.statisticsTable.currentPage;
    });
}


//Function for converting the unix number to date format
function convertUnixToDate(unix) {
    let date = new Date(unix);

    let formattedDate = date.toLocaleString("en-US", { day: "numeric", month: "numeric", hour: "numeric", minute: 'numeric', year: 'numeric' });
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
            pointRadius: 0
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
            maintainAspectRatio: false
        }
    };
    return config;
}

//#endregion

//#region  KRISTIJAN => TODO: Create statistics page growth chart

//Function for creating the config for the big chart in the modal

async function GetSingleCoinChartConfig(id, coinName) {

    let chartUrl = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=5&interval=hourly`
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
            backgroundColor: 'rgb(70,130,180)',
            borderColor: 'rgb(70,130,180)',
            data: priceResult,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            maintainAspectRatio: false,

            scales: {
                x: {
                    grid: {
                        display: false,
                        borderColor: 'rgb(255,255,255)'
                    }
                },
                y: {
                    grid: {
                        display: false,
                        borderColor: 'rgb(255,255,255)'
                    },
                    ticks: {
                        callback: function(value, index, ticks) {
                            return '$' + value;
                        }
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
        <div class="card darkModal" style="width: 18rem;">
            <div class="card-body darkModal">
                <h1 class="card-title darkModal"><img src="${data.image.small}"alt="${data.id}"}"> ${data.name}</h1>
                <h3 class="card-text darkModal">${data.symbol.toUpperCase()} Price Statistics</h3>
            </div>
            <ul class="list-group list-group-flush darkModal">
                <li class="list-group-item darkModal">Price: $${data.market_data.current_price.usd.toLocaleString('en-US')}</li>
                <li class="list-group-item darkModal">Market cap: $${data.market_data.market_cap.usd.toLocaleString('en-US')}</li>
                <li class="list-group-item darkModal">Market cap rank: ${data.market_cap_rank}</li>
                <li class="list-group-item darkModal">Circulating Supply: ${data.market_data.circulating_supply.toLocaleString('en-US')}</li>
                <li class="list-group-item darkModal">Total Supply: ${data.market_data.total_supply != null ? data.market_data.total_supply.toLocaleString('en-US') : data.market_data.circulating_supply.toLocaleString('en-US')}</li>
                <li class="list-group-item darkModal">Trading volume: $${data.market_data.total_volume.usd.toLocaleString('en-US')}</li>
                <li class="list-group-item darkModal">All-Time High: $${data.market_data.ath.usd.toLocaleString('en-US')}</li>
                <li class="list-group-item darkModal">All-Time Low: $${data.market_data.atl.usd}</li>
                <li class="list-group-item darkModal">24h Low / 24h High: $${data.market_data.low_24h.usd.toLocaleString('en-US')} / $${data.market_data.high_24h.usd.toLocaleString('en-US')}</li>
            </ul>
        </div>
    `
    return infoContainer
}

// event listener to show the modal with chart and bonus info

document.getElementById("statisticsTableContainer").addEventListener('click', async (e) => {
    let modal = document.getElementById('coin-info');
    let coinId = "";
    let coinName = "";

    await showLoader(modal, preserveSize = true);
    if (e.target.nodeName === "TD") {
        coinId = e.path[1].className
        coinName = e.path[1].attributes[1].value
    } else if(e.target.parentNode.nodeName === "TD"){    
        coinId = e.path[2].className
        coinName = e.path[2].attributes[1].value
    }

    let chart = await createSingleCoinChartAsync(coinId, coinName)
    let info = await createSingleCoinInfoAsync(coinId)

    modal.innerHTML = '';
    modal.appendChild(chart)
    modal.appendChild(info)
})

//#endregion