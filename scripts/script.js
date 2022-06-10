
//#region ILIJA => Create homepage extra info

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
    },
    showLoginRegisterPage: function () {
        this.showElements(loginRegisterPage, otherPagesDiv)
        this.hideElements(...homePageMainContent, statisticsPage, simulatorPage, infoCenterPage)
    }
}


const cryptoInfo = {
    factsElement: document.getElementById('facts'),
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

    showCryptoFacts: function (element) {
        setInterval(() => {
            let i = Math.floor(Math.random() * this.facts.length)
            element.innerHTML = `Fact &numero; ${i + 1} : <i>"${this.facts[i]}</i>"`
        }, 12_000);
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
Object.freeze(cryptoInfo)


// EVENTS

window.addEventListener('load', () => {
    cryptoInfo.statsElement.innerHTML = cryptoInfo.showCryptoStats();
    cryptoInfo.showCryptoFacts(cryptoInfo.factsElement);
})

document.getElementById('learnMoreBtn').addEventListener('click', () => {
    displayElements.showInfoCenterPage()
})
const homePageBtn = document.getElementsByClassName('homePageBtn')

homePageBtn[0].addEventListener('click', () => {
    displayElements.showHomePage()

})

homePageBtn[1].addEventListener('click', () => {
    displayElements.showHomePage()
})

document.getElementById('statsBtn').addEventListener('click', () => {
    displayElements.showStatisticsPage()
})

document.getElementById('simulatorBtn').addEventListener('click', () => {
    displayElements.showSimulatorPage()
})

document.getElementById('infoCenterBtn').addEventListener('click', () => {
    displayElements.showInfoCenterPage()
})

document.getElementById('loginBtn').addEventListener('click', () => {
    displayElements.showLoginRegisterPage()
})


//#endregion ILIJA => Create homepage extra info
