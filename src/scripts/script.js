//#region Ivana - TODO: trending cryptos table

tcTopContainer = document.getElementById('tcTop');

function tcCreateElements(name, short, price, change, graph) {

    let tcDataContainer = document.createElement("div");
    tcDataContainer.classList.add("col", "tcDataContainer");
    tcTopContainer.appendChild(tcDataContainer);

    let tcName = document.createElement('h2')
    tcName.classList.add("trendingCryptoName")
    tcName.innerText = name;
    tcDataContainer.appendChild(tcName);

    let tcShort = document.createElement('h6')
    tcShort.classList.add("trendingCryptoShortName")
    tcShort.innerText = short;
    tcDataContainer.appendChild(tcShort);

    let tcPrice = document.createElement('h4')
    tcPrice.classList.add("trendingCryptoCurentPrice")
    tcPrice.innerText = formatter.format(price);
    tcDataContainer.appendChild(tcPrice);

    let tcChange = document.createElement('h4')
    tcChange.classList.add("tendingCryptoPriceChange")
    tcChange.innerText = formatter.format(change);
    tcDataContainer.appendChild(tcChange);

    tcChange.style.color = tcChange.innerText.charAt(0) == "-" ? "red" : "green";

    let chartCon = document.createElement("div");
    chartCon.classList.add("row", "trendingCryptoChartContainer");
    tcDataContainer.appendChild(chartCon);

    let chartCanvas = document.createElement('canvas')
    chartCon.appendChild(chartCanvas);

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
                responsive: true,
                maintainAspectRatio: false,
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

function tcSetup() {
    const trendingCryptoApiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=true&price_change_percentage=24h"
    const trendingCryptoApiUrl2 = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=5&page=1&sparkline=true&price_change_percentage=24h"
    const trendingCryptoApiUrl3 = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=5&page=1&sparkline=true&price_change_percentage=24h"

    document.getElementById('tcButtonOne').addEventListener("click", () => trendingCryptoApiCall(trendingCryptoApiUrl));
    document.getElementById('tcButtonTwo').addEventListener("click", () => trendingCryptoApiCall(trendingCryptoApiUrl2));
    document.getElementById('tcButtonThree').addEventListener("click", () => trendingCryptoApiCall(trendingCryptoApiUrl3));
    document.getElementById('tcButtonFour').addEventListener('click', async () => {
        displayElements.showStatisticsPage()
        await renderStatsPage()
    })

    trendingCryptoApiCall(trendingCryptoApiUrl);
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
    while (tcTopContainer.firstChild) {
        tcTopContainer.removeChild(tcTopContainer.firstChild);
    }

    for (let i = 0; i <= 4; i++) {

        tcCreateElements
            (
                data[i].name,
                data[i].symbol.toUpperCase(),
                data[i].current_price,
                data[i].price_change_percentage_24h,
                data[i].sparkline_in_7d.price
            );
    }
}

//#endregion Ivana_Stojadinovska

//#region ILIJA => TODO: Create homepage extra info and Display elements functionality

//Header and Footer elements
const mainHeader = document.getElementById('mainHeader')
const mainFooter = document.getElementById('mainFooter')

// Home page main content elements
const homePageGeneralInfo = document.getElementById('homePageGeneralInfo')
const homePageTrendingCryptos = document.getElementById('homePageTrendingCryptos')
const homePageExtraInfo = document.getElementById('homePageExtraInfo')
const homePageMainContent = [homePageExtraInfo, homePageGeneralInfo, homePageTrendingCryptos]
const loginForm = document.getElementById("login-form")
const registerForm = document.querySelector("register-form");
const loginBtn = document.getElementById("loginBtn");
const loggedUserDropdown = document.getElementById("dropdown-logged-user");

// Other pages elements
const statisticsPage = document.getElementById('statisticsPage')
const simulatorPage = document.getElementById('simulatorPage')
const infoCenterPage = document.getElementById('infoCenterPage')
const loginRegisterPage = document.getElementById('loginRegisterPage')
const otherPagesDiv = document.getElementById('otherPagesDiv')
const privacyPolicy = document.getElementById("privacyPolicy")
const about = document.getElementById("about")
const ourServices = document.getElementById("ourServices")

// simulator page elements
const portfolioDiv = document.getElementById("portfolio");
const walletSettingsDiv = document.getElementById("wallet-settings");
const walletStatsDiv = document.getElementById("wallet-stats");
const activityLogDiv = document.getElementById("activity-log");

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
        this.hideElements(...homePageMainContent, simulatorPage, infoCenterPage, loginRegisterPage, privacyPolicy, about, ourServices)
    },
    showSimulatorPage: async function () {
        this.showElements(simulatorPage, otherPagesDiv)
        this.hideElements(...homePageMainContent, statisticsPage, infoCenterPage, loginRegisterPage, privacyPolicy, about, ourServices)

        // ................. TUKA BI TREBALO DA SE NAPRAVI FETCH DO APITO (WALLET CONTROLLER) .................
        let userFromDb = JSON.parse(localStorage.getItem("user"));

        if (!userFromDb) {
            displayElements.showLoginRegisterPage()
        }
        else {
            await showSimulatorSideMarket()
            await showCash(userFromDb.id)
            displayElements.showPortfolio();

            // if (loggedUser.user.wallet.coins.length == 0) {
            //     console.log(loggedUser.user.wallet.coins);
            // }
            // else {
            //     await renderPortfolioTableAsync(loggedUser.user)
            calculateLossOrGain();
            //     displayElements.showPortfolio();
            // }
        }


    },
    showInfoCenterPage: function () {
        this.showElements(infoCenterPage, otherPagesDiv)
        this.hideElements(...homePageMainContent, statisticsPage, simulatorPage, loginRegisterPage, privacyPolicy, about, ourServices)
        displayInfoPage()
    },
    showLoginRegisterPage: function () {
        this.showElements(loginRegisterPage, otherPagesDiv)
        this.hideElements(...homePageMainContent, statisticsPage, simulatorPage, infoCenterPage, privacyPolicy, about, ourServices)
    },
    showPortfolio: function () {
        this.showElements(portfolioDiv)
        this.hideElements(walletSettingsDiv, walletStatsDiv, activityLogDiv)
    },
    showWalletSettings: function () {
        this.showElements(walletSettingsDiv)
        this.hideElements(portfolioDiv, walletStatsDiv, activityLogDiv)
    },
    showWalletStatistics: function () {
        this.showElements(walletStatsDiv)
        this.hideElements(portfolioDiv, walletSettingsDiv, activityLogDiv)
    },
    showActivityLog: function () {
        this.showElements(activityLogDiv)
        this.hideElements(portfolioDiv, walletSettingsDiv, walletStatsDiv)
    },
    showLogInBtn: function () {
        this.showElements(loginBtn)
        this.hideElements(loggedUserDropdown)
    },
    showUserDropDownBtn: function () {
        this.showElements(loggedUserDropdown)
        this.hideElements(loginBtn)
    },
    showPrivacyPolicy: function () {
        this.showElements(privacyPolicy, otherPagesDiv)
        this.hideElements(...homePageMainContent, statisticsPage, simulatorPage, loginRegisterPage, about, ourServices, infoCenterPage)
    },
    showAbout: function () {
        this.showElements(about, otherPagesDiv)
        this.hideElements(...homePageMainContent, statisticsPage, simulatorPage, loginRegisterPage, privacyPolicy, ourServices, infoCenterPage)
    },
    showOurServices: function () {
        this.showElements(ourServices, otherPagesDiv)
        this.hideElements(...homePageMainContent, statisticsPage, simulatorPage, loginRegisterPage, privacyPolicy, about, infoCenterPage)
    }
}

const cryptoInfo = {
    factsElement: document.querySelector('#extraInfoArticle .facts .carousel-inner'),
    statsElement: document.getElementById('extraInfoStats'),

    stats: ["$2.1 trillion", "18.000", "70 million", "1.6 billion"],
    statsDescription: ["Total market cap", "Cryptocurrencies", "Blockchain Wallets", "Bitcoin transactions"],

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
    tcSetup();
})

//Navbar events
const homePageBtn = document.getElementsByClassName('homePageBtn')
homePageBtn[0].addEventListener('click', () => displayElements.showHomePage())
homePageBtn[1].addEventListener('click', () => displayElements.showHomePage())
document.getElementById('statsBtn').addEventListener('click', async () => {
    displayElements.showStatisticsPage()
    await renderStatsPage()
})
document.getElementById('simulatorBtn').addEventListener('click', async () => {
    displayElements.showSimulatorPage()
})
document.getElementById('infoCenterBtn').addEventListener('click', () => displayElements.showInfoCenterPage())
document.getElementById('loginBtn').addEventListener('click', () => displayElements.showLoginRegisterPage())

//Sections events
document.getElementById('getStartedBtn').addEventListener('click', () => displayElements.showSimulatorPage())
document.getElementById('learnMoreBtn').addEventListener('click', () => displayElements.showInfoCenterPage())

// Event listener and functions for scrolling of navigation bar - Aleksandar Dojchinovski
window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
    hideNavigationOnFooter();
    // setNavigationTransparentOnScroll();
}

function hideNavigationOnFooter() {
    const scrollMaxY = window.scrollMaxY ||
        (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    if (scrollMaxY != 0 &&
        (document.documentElement.scrollTop >= scrollMaxY || document.body.scrollTop >= scrollMaxY)) {
        document.getElementById("mainHeader").style.display = "none";
    } else {
        document.getElementById("mainHeader").style.display = "inline";
    }
}

function setNavigationTransparentOnScroll() {
    let timer = null;
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
});

document.getElementById("login-btn").addEventListener("click", async () => {

    let usernameInput = document.getElementById("login-username").value
    let passwordInput = document.getElementById("login-password").value
    let message = document.getElementById("login-error-msg")
    let loader = document.getElementById("login-loader")

    const userLoginModel = {
        username: usernameInput,
        password: passwordInput
    }

    const loginRequest = JSON.stringify(userLoginModel)
    // console.log(loginRequest);

    await showLoaderAsync(loader)

    fetch("https://localhost:7054/api/v1/User/login", {
        method: "POST",
        body: loginRequest,
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
    })
        .then(async response => {
            if (!response.ok) {
                const error = response.status;
                throw new Error(error);
            }

            let loggedUserFromDb = await response.json();

            document.getElementById("logged-user-name").innerText = `${loggedUserFromDb.username}`
            usernameInput.value = ""
            passwordInput.value = ""

            localStorage.setItem("user", JSON.stringify(loggedUserFromDb));

            displayElements.showUserDropDownBtn();
            displayElements.showSimulatorPage();
            displayElements.showPortfolio();
        })
        .catch(error => {
            message.innerText = `Login failed: Status ${error.message}`
        })
    loader.innerHTML = ""

    setTimeout(() => {
        message.innerText = ""
    }, 4000);
})

document.getElementById("register-btn").addEventListener("click", async () => {
    let firstName = document.getElementById("register-firstname").value;
    let lastName = document.getElementById("register-lastname").value;
    let userName = document.getElementById("register-username").value;
    let userPassword = document.getElementById("register-password").value
    let userEmail = document.getElementById("register-email").value;
    let confirmedPassword = document.getElementById("register-confirm-password").value;
    let message = document.getElementById("register-error-msg")
    let loader = document.getElementById("register-loader");
    message.style.color = "red"

    let registerUserModel = {
        firstname: firstName,
        lastName: lastName,
        username: userName,
        email: userEmail,
        password: userPassword,
        confirmPassword: confirmedPassword
    }
    const registerUserRequest = JSON.stringify(registerUserModel)
    console.log(registerUserRequest);

    await showLoaderAsync(loader)
    await fetch("https://localhost:7054/api/v1/User/register", {
        method: "POST",
        body: registerUserRequest,
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
    }).then(async response => {
        if (!response.ok) {
            //TODO Manage showing error in better way
            // const error = await response.json();    // gives the whole exception from backend ...
            const error = response.status;
            throw new Error(error);
        }
        else {
            message.style.color = "green"
            message.innerHTML = `Welcome user ${registerUserModel.firstname}`
        }
    }).catch(error => {
        console.log(error);
        message.innerHTML = `Registration failed: Status ${error.message}`
    })
    loader.innerHTML = "";

    // Remove error message after a while ...
    setTimeout(() => {
        message.innerHTML = ""
    }, 5000);

    document.getElementById("register-firstname").value = ""
    document.getElementById("register-lastname").value = ""
    document.getElementById("register-username").value = ""
    document.getElementById("register-password").value = ""
    document.getElementById("register-email").value = ""
    document.getElementById("register-confirm-password").value = ""
})

document.getElementById("logout-btn").addEventListener("click", () => {
    // localStorageService.addUserToLocalStorage(loggedUser.user)
    // loggedUser.user = null;

    localStorage.clear();
    setTimeout(() => {
        displayElements.showLogInBtn();
        displayElements.showHomePage();
    }, 500);
})

document.getElementById("privacyPolicyBtn").addEventListener('click', () => {
    displayElements.showPrivacyPolicy();
})

document.getElementById("aboutBtn").addEventListener('click', () => {
    displayElements.showAbout();
})

document.getElementById("ourServicesBtn").addEventListener('click', () => {
    displayElements.showOurServices()
})
// PRI GASENJE NA BROWSEROT DA SE SNIMI LOGIRANIOT USER
window.addEventListener("beforeunload", (e) => {
    // e.preventDefault()
    // if (loggedUser.user !== null) {
    //     localStorageService.addUserToLocalStorage(loggedUser.user)
    // }
    // loggedUser.user = null;

    localStorage.clear();
})