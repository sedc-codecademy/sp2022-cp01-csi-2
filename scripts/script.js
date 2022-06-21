
//#region ivana stojadinovska - trending crypto
const trendingCryptoApiLink = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=true&price_change_percentage=24h"
const trendingCryptoApiLink2 = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=5&page=1&sparkline=true&price_change_percentage=24h"
const trendingCryptoApiLink3 = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=5&page=1&sparkline=true&price_change_percentage=24h"

trendingCryptoApiCall(trendingCryptoApiLink)

class trendingCryptoClass {
    constructor(index, name, short, price, change, graph) {
        const trendingCryptoNames = document.getElementsByClassName('trendingCryptoName');
        const trendingCryptoShortNames = document.getElementsByClassName('trendingCryptoShortName');
        const trendingCryptoCurentPrices = document.getElementsByClassName('trendingCryptoCurentPrice');
        const tendingCryptoPriceChanges = document.getElementsByClassName('tendingCryptoPriceChange');
        const trendingCrypto = document.getElementsByClassName('trendingCrypto');
        trendingCryptoNames[index].innerText = name;
        trendingCryptoShortNames[index].innerText = short;
        trendingCryptoCurentPrices[index].innerText = price;
        tendingCryptoPriceChanges[index].innerText = change + " %";
        tendingCryptoPriceChanges[index].style.color = tendingCryptoPriceChanges[index].innerText.charAt(0) == "-" ? "red" : "green";
        let chartCanvas;

        console.log(trendingCrypto[index].childElementCount)
        if (trendingCrypto[index].childElementCount <= 4) {
            chartCanvas = document.createElement('canvas')
            trendingCrypto[index].appendChild(chartCanvas)
            chartCanvas.classList.add("trendingCryptoChartContainer")
        }

        new Chart(chartCanvas,
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
                    elements: {
                        point: {
                            radius: 0
                        }
                    }
                }
            });
    }
}

function trendingCryptoApiCall(url) {
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
    const tcButtonOne = document.getElementById('tcButtonOne');
    const tcButtonTwo = document.getElementById('tcButtonTwo');
    const tcButtonThree = document.getElementById('tcButtonThree');
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

//#endregion Ivana_Stojadinovska

//#region ILIJA => Create homepage extra info and Display elements functionality

//Header and Footer elements
const mainHeader = document.getElementById('mainHeader')
const mainFooter = document.getElementById('mainFooter')

// Home page main content elements
const homePageGeneralInfo = document.getElementById('homePageGeneralInfo')
const homePageTrendingCryptos = document.getElementById('homePageTrendingCryptos')
const homePageExtraInfo = document.getElementById('homePageExtraInfo')
const homePageMainContent = [homePageExtraInfo, homePageGeneralInfo, homePageTrendingCryptos]

// Other pages elements
const statisticsPage = document.getElementById('statisticsPage')
const simulatorPage = document.getElementById('simulatorPage')
const infoCenterPage = document.getElementById('infoCenterPage')
const loginRegisterPage = document.getElementById('loginRegisterPage')
const otherPagesDiv = document.getElementById('otherPagesDiv')


const displayElements = {
    hideElements: (...elements) => {
        for (const element of elements) {
            element.setAttribute('hidden', 'hidden')
        }
    },
    showElements: (...elements) => {
        for (const element of elements) {
            element.removeAttribute('hidden', 'hidden')
        }
    },

    showHomePage: function () {
        this.showElements(...homePageMainContent)
        this.hideElements(otherPagesDiv)
    },
    showStatisticsPage: function () {
        this.showElements(statisticsPage, otherPagesDiv)
        this.hideElements(...homePageMainContent, simulatorPage, infoCenterPage, loginRegisterPage)
    },
    showSimulatorPage: function () {
        this.showElements(simulatorPage, otherPagesDiv)
        this.hideElements(...homePageMainContent, statisticsPage, infoCenterPage, loginRegisterPage)
    },
    showInfoCenterPage: function () {
        this.showElements(infoCenterPage, otherPagesDiv)
        this.hideElements(...homePageMainContent, statisticsPage, simulatorPage, loginRegisterPage)
        displayInfoPage()
    },
    showLoginRegisterPage: function () {
        this.showElements(loginRegisterPage, otherPagesDiv)
        this.hideElements(...homePageMainContent, statisticsPage, simulatorPage, infoCenterPage)
    }
}


const cryptoInfo = {
    factsElement: document.querySelector('#extraInfoArticle .facts .carousel-inner'),
    statsElement: document.getElementById('extraInfoStats'),

    stats: ["$2.1 trillion", "18.000", "70 million", "$2.1 trillion"],
    statsDescription: ["Total market cap", "Cryptocurrencies", "Blockchain Wallets", "Total market cap"],

    facts: [
        "The maximum number of Bitcoins that can be mined is 21 million",
        "Blockchain as we know it today was invented by an individual or a group of people using the pseudonym Satoshi Nakamoto",
        "The first commercial bitcoin transaction was for pizza",
        "Some of the world's largest banks are investing about $50 billion to build a blockchain-based digital cash settlement system",
        "It takes an average of 10 minutes to verify a Bitcoin transaction",
        "91.5% of all investments in cryptocurrencies are made by men",
        "Most Bitcoin users are between 25 and 34 years old",
        "More than 20 countries have adopted, rejected, or researched the concept of a national cryptocurrency",
        "FBI owns 1.5% of the world's total bitcoins",
        "0.5% of the world's population is using blockchain technology",
        "Around 15% of IT professionals have invested in cryptocurrency, which makes them the largest group of investors",
        "A post on Bitcoin surfaces on social media every three seconds",
    ],

    showCryptoFacts: function () {
        let carousel = ``
        for (let i = 0; i < this.facts.length; i++) {
            carousel += `
            <div class="carousel-item ${i == 0 ? 'active' : ''}">
                <p>Fact &numero; ${i + 1}: <i>"${this.facts[i]}"</i></p>
            </div>`
        }
        return carousel
    },

    showCryptoStats: function () {
        let stats = "";
        for (let i = 0; i < this.stats.length; i++) {
            stats = stats.concat(`
                <div class="card" style="width: 17rem;">
                    <div class="card-body">
                        <h5 class="card-title">${this.stats[i]}<span style="color: rgb(114, 112, 112); ">+</span>
                        </h5>
                        <p class="card-text">
                            ${this.statsDescription[i] ?? ""}
                        </p>
                    </div>
                </div>`)
        }
        return stats
    }
}
//#endregion ILIJA => Create homepage extra info and Display elements functionality


// HOMEPAGE EVENTS

window.addEventListener('load', () => {
    cryptoInfo.statsElement.innerHTML = cryptoInfo.showCryptoStats();
    cryptoInfo.factsElement.innerHTML = cryptoInfo.showCryptoFacts();
})

//Navbar events
const homePageBtn = document.getElementsByClassName('homePageBtn')
homePageBtn[0].addEventListener('click', () => displayElements.showHomePage())
homePageBtn[1].addEventListener('click', () => displayElements.showHomePage())
document.getElementById('statsBtn').addEventListener('click', async () =>{
    displayElements.showStatisticsPage()
    await renderStatsPage()
} )
document.getElementById('simulatorBtn').addEventListener('click', () => displayElements.showSimulatorPage())
document.getElementById('infoCenterBtn').addEventListener('click', () => displayElements.showInfoCenterPage())
document.getElementById('loginBtn').addEventListener('click', () => displayElements.showLoginRegisterPage())

//Sections events
document.getElementById('getStartedBtn').addEventListener('click', () => displayElements.showLoginRegisterPage())
document.getElementById('learnMoreBtn').addEventListener('click', () => displayElements.showInfoCenterPage())
tcButtonOne.addEventListener("click", () => trendingCryptoApiCall(trendingCryptoApiLink));
tcButtonTwo.addEventListener("click", () => trendingCryptoApiCall(trendingCryptoApiLink2));
tcButtonThree.addEventListener("click", () => trendingCryptoApiCall(trendingCryptoApiLink3));
//#endregion ILIJA => Create homepage extra info

// Event listener and functions for scrolling of navigation bar - Aleksandar Dojchinovski
window.addEventListener("scroll", scrollFunction);
const timer = null;

function scrollFunction() {
    hideNavigationOnFooter();
    setNavigationTransparentOnScroll();
}

function hideNavigationOnFooter() {
    const scrollMaxY = window.scrollMaxY || (document.documentElement.scrollHeight - document.documentElement.clientHeight)
    if (document.documentElement.scrollTop >= scrollMaxY || document.body.scrollTop >= scrollMaxY) {
        document.getElementById("mainHeader").style.display = "none";
    } else {
        document.getElementById("mainHeader").style.display = "inline";
    }
}

function setNavigationTransparentOnScroll() {
    document.getElementsByClassName("navbar")[0].style.setProperty("background-color", "rgba(255,193,7,0.2)", "important");
    document.getElementsByClassName("navbar")[1].style.setProperty("background-color", "rgba(33, 37, 41,0.2)", "important");
    if (timer !== null) {
        clearTimeout(timer);
    }
    timer = setTimeout(function () {
        document.getElementsByClassName("navbar")[0].style.setProperty("background-color", "rgb(255,193,7)", "important");
        document.getElementsByClassName("navbar")[1].style.setProperty("background-color", "rgb(33, 37, 41)", "important");
    }, 700);
}

// Here goes js.scr for login/register form - Aleksandar Zhivkovikj
function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const registerForm = document.querySelector("#Register");

    document.querySelector("#linkRegister").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        registerForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        registerForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});
