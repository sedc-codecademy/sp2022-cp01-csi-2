//#region ILIJA => Create Information Page

// This object contains functions for creating components with html elements
let createContent = {
    carouselCounter: 0,  //help variable for the function createCarouselSlideshow

    // Function for dynamically creating bootstrap's carousels (SLIDESHOWS)
    createCarouselSlideshow: function (title = "", topicsArray = []) {
        if (arguments.length == 0 || !Array.isArray(topicsArray)) return ""
        let counter = ++this.carouselCounter
        let carousel = ""
        carousel += `<h2 class="text-center"><span>.......</span><br>${title || 'No heading provided'}</h2> <div id="carouselExampleIndicators" class="carousel slide carouselExampleIndicators${counter}" data-bs-ride="carousel"><div class="carousel-indicators">`
        for (let i = 0; i < topicsArray.length; i++) {
            carousel += `
                <button type="button" data-bs-target=".carouselExampleIndicators${counter}" data-bs-slide-to="${i}" class="${i == 0 ? 'active' : ''}" aria-current="true" aria-label="Slide ${i + 1}}"></button>`
        }
        carousel += `</div><div class="carousel-inner">`
        for (let i = 0; i < topicsArray.length; i++) {
            carousel += `
            <div class="carousel-item ${i == 0 ? 'active' : ''}" data-bs-interval="12000">
            <p>
            ${topicsArray[i]}
            </p>
            </div>`
        }
        carousel += `  </div>
        <button class="carousel-control-prev" type="button" data-bs-target=".carouselExampleIndicators${counter}"
                            data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target=".carouselExampleIndicators${counter}"
                            data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>`
        return carousel
    },

    // Function for dynamically creating Unordered List with links as list items,
    createUnorderedLinkList: function (idName, linksArray, linksTextArray) {
        if (arguments.length == 0 || !Array.isArray(linksArray) || !Array.isArray(linksTextArray)) return ""

        let list = ``
        list += `<ul id="${idName || 'unorderedListId'}" >`
        for (let i = 0; i < linksTextArray.length; i++) {
            list += `
                <li>
                    <a href="${linksArray[i] || "#"}" target="_blank">
                        ${linksTextArray[i] || "No link text available"}
                    </a>
                </li>`
        }
        list += `</ul>`
        return list
    },

    // Function for dynamically creating bootstrap's Horizontal Cards with Images
    createHorizontalCards: function (imagePathsArray, sideTextArray) {
        if (arguments.length == 0 || !Array.isArray(imagePathsArray) || !Array.isArray(sideTextArray)) return ""

        let card = ``
        for (let i = 0; i < imagePathsArray.length; i++) {
            card += `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${imagePathsArray[i]}" class="img-fluid rounded-start"
                        alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <p class="card-text">
                                ${sideTextArray[i] || 'Text unavailable'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>`
        }
        return card
    }
}


// This object contains properties with the page blockchain content
const infoPageBlockchainContent = {
    whatIsBlockchain: createContent.createCarouselSlideshow("What is blockchain ?",
        [
            `<b>Blockchain</b> is a shared, immutable ledger that facilitates the process of recording transactions and tracking assets in a business network. An asset can be tangible (a house, car, cash, land) or intangible (intellectual property, patents, copyrights, branding). Virtually anything of value can be tracked and traded on a blockchain network, reducing risk and cutting costs for all involved.`,

            `<b>Why is blockchain important ? </b> Business runs on information. The faster it's received and the more accurate it is, the better. Blockchain is ideal for delivering that information because it provides immediate, shared and completely transparent information stored on an immutable ledger that can be accessed only by permissioned network members. A blockchain network can track orders, payments, accounts, production and much more. And because members share a single view of the truth, you can see all details of a transaction end to end, giving you greater confidence, as well as new efficiencies and opportunities.`,

            `<b>What needs to change !? </b> Operations often waste effort on duplicate record keeping and third-party validations. Record-keeping systems can be vulnerable to fraud and cyberattacks. Limited transparency can slow data verification. And with the arrival of IoT, transaction volumes have exploded. All of this slows business, drains the bottom line — and means we need a better way. <br>Enter blockchain.`,
        ]
    ),

    howBlockchainWorks:
        `
      <h3 class="text-center">
          <span>.......</span><br>How Blockchain works ?
      </h3>

      <div id="blockchainCards">
          <div class="card mb-3">
              <div class="row g-0">
                  <div class="col-md-8" style="width: 50%;">
                      <div class="card-body">
                          <h5 class="card-title">
                              1
                          </h5>
                          <h6 class="card-subtitle">
                              Transaction
                          </h6>
                          <p class="card-text">
                              Two parties, A and B, decide to exchange a unit of value (digital currency
                              or a digital representation of some other asset, such as land title, birth
                              certificate or educational degree) and initiate the transaction.
                          </p>
                      </div>
                  </div>
                  <div class="col-md-4" style="width: 50%;">
                      <img src="assets/images/infoPage/blockchainSteps/blockchainStepOne.png"
                          class="img-fluid rounded-start" alt="blockchainStepOne">
                  </div>
              </div>
          </div>
          <div class="card mb-3">
              <div class="row g-0">
                  <div class="col-md-4" style="width: 50%;">
                      <img src="assets/images/infoPage/blockchainSteps/blockchainStepTwo.png"
                          class="img-fluid rounded-start" alt="blockchainStepTwo">
                  </div>
                  <div class="col-md-8" style="width: 50%;">
                      <div class="card-body">
                          <h5 class="card-title">
                              2
                          </h5>
                          <h6 class="card-subtitle">
                              Block
                          </h6>
                          <p class="card-text">
                              The transaction is packaged with other pending transactions therby creating
                              a "block". The block is sent to the blockchain system's network of
                              participating computers.
                          </p>
                      </div>
                  </div>
              </div>
          </div>
          <div class="card mb-3">
              <div class="row g-0">
                  <div class="col-md-8" style="width: 50%;">
                      <div class="card-body">
                          <h5 class="card-title">
                              3
                          </h5>
                          <h6 class="card-subtitle mb-2">
                              Verification
                          </h6>
                          <p class="card-text">
                              The participating computers (called "miners" in the Bitcoin blockchain)
                              evaluate the transactions and through mathematical calculations determine
                              whether they are valid, based on agreed-upon rules. When "consensus" has
                              been achived, typically among 51% of participating computers, the
                              transactions are considered verified.
                          </p>
                      </div>
                  </div>
                  <div class="col-md-4" style="width: 50%;">
                      <img src="assets/images/infoPage/blockchainSteps/blockchainStepThree.png"
                          class="img-fluid rounded-start" alt="blockchainStepThree">
                  </div>
              </div>
          </div>
          <div class="card mb-3">
              <div class="row g-0">
                  <div class="col-md-4" style="width: 50%;">
                      <img src="assets/images/infoPage/blockchainSteps/blockchainStepFour.png"
                          class="img-fluid rounded-start" alt="blockchainStepFour">
                  </div>
                  <div class="col-md-8" style="width: 50%;">
                      <div class="card-body">
                          <h5 class="card-title">
                              4
                          </h5>
                          <h6 class="card-subtitle mb-2">
                              Hash
                          </h6>
                          <p class="card-text">
                              Each verified block of transactions is time-stamped with a cryptographic
                              hash. Each block also contains a reference to the previous block's hash,
                              thus creating a "chain" of records that cannot be falsified except by
                              convincing participating computers that the tampered data in one block and
                              in all prior blocks is true. Such a feat is considered nearly impossible.
                          </p>
                      </div>
                  </div>
              </div>
          </div>
          <div class="card mb-3">
              <div class="row g-0">
                  <div class="col-md-8" style="width: 50%;">
                      <div class="card-body">
                          <h5 class="card-title">
                              5
                          </h5>
                          <h6 class="card-subtitle mb-2 ">
                              Execution
                          </h6>
                          <p class="card-text">
                              The unit of value moves from the account of party A to the account of party
                              B.
                          </p>
                      </div>
                  </div>
                  <div class="col-md-4" style="width: 50%;">
                      <img src="assets/images/infoPage/blockchainSteps/blockchainStepFive.png"
                          class="img-fluid rounded-start" alt="blockchainStepFive">
                  </div>
              </div>
          </div>
      </div>
      `,
}

// This object contains properties with the page crypto content
const infoPageCryptoContent = {
    whatIsCryptocurrency: createContent.createCarouselSlideshow('What is Cryptocurrency ?',
        [
            `<b>Cryptocurrency</b> is a digital, encrypted, and decentralized medium of exchange that's based on <a href="#blockchainSection">blockchain technology</a>.<br><br>Unlike the U.S. Dollar or the Euro or any other <a href="https://en.wikipedia.org/wiki/Fiat_money" target="_blank">Fiat currency</a>, there is no central authority that manages and maintains the value of a cryptocurrency.<br>You can use crypto to buy regular goods and services, although most people invest in cryptocurrencies as they would in other assets, like stocks or precious metals. `,

            `<b>Bitcoin</b> was the first cryptocurrency, first outlined in principle by Satoshi Nakamoto in a 2008 paper titled <a href= "https://bitcoin.org/bitcoin.pdf" target = "_blank"> “Bitcoin: A Peer-to-Peer Electronic Cash System.”</a>. Nakamoto described the project as “an electronic payment system based on cryptographic proof instead of trust”.<br>That cryptographic proof comes in the form of transactions that are verified and recorded on a blockchain.`,

            `<b>Altcoins</b> - tokens, cryptocurrencies, and other types of digital assets that are <i style = "color:inherit;">not Bitcoin</i> are collectively known as alternative cryptocurrencies or <i style = "color:inherit;">'altcoins'</i>.<br><br><b>Tokens</b> - the key distinction between coins and tokens is that crypto coins are the native asset of a Blockchain like Bitcoin or Ethereum, whereas crypto tokens are created by platforms and applications that are built on top of an existing Blockchain. For example crypto tokens built on top of Ethereum include MATIC, LINK, andUSDT etc.`,

            `<b>Public key</b> is a string of characters used to purchase cryptocurrency. If a content creator, for example, wants to receive cryptocurrency instead of fiat for his or her content, they can list their public key.<br><br><b>Private key</b> is the super-important string of numbers and letters you should not share with anyone. If someone is able to access your private key, you can lose your funds in a matter of seconds. This key is necessary to verify transactions when selling or withdrawing your crypto. `,

            `<b>Crypto Wallets</b> keep your private keys that give you access to your cryptocurrencies, allowing you to send and receive cryptocurrencies.<br> Unlike a normal wallet, which can hold actual cash, crypto wallets technically don't store your crypto. Your holdings live on the blockchain, but can only be accessed using a private key.<br><br>Crypto wallets range from simple-to-use apps to more complex security solutions. The main types of wallets you can choose from include: <i><a href="https://www.coinbase.com/learn/crypto-basics/what-is-a-crypto-wallet#:~:text=Paper%20wallets%3A%20Keys%20are%20written%20on%20a%20physical%20medium%20like%20paper%20and%20stored%20in%20a%20safe%20place.%20This%20of%20course%20makes%20using%20your%20crypto%20harder%2C%20because%20as%20digital%20money%20it%20can%20only%20be%20used%20on%20the%20internet.%C2%A0%C2%A0%C2%A0" target="_blank">Paper wallets</a></i>, <i><a href="https://www.coinbase.com/learn/crypto-basics/what-is-a-crypto-wallet#:~:text=Hardware%20wallets%3A%20Keys%20are%20stored%20in%20a%20thumb%2Ddrive%20device%20that%20is%20kept%20in%20a%20safe%20place%20and%20only%20connected%20to%20a%20computer%20when%20you%20want%20to%20use%20your%20crypto.%20The%20idea%20is%20to%20try%20to%20balance%20security%20and%20convenience." target="_blank">Hardware wallets</a></i> and <i><a href="https://www.coinbase.com/learn/crypto-basics/what-is-a-crypto-wallet#:~:text=Online%20wallets%3A%20Keys%20are%20stored%20in%20an%20app%20or%20other%20software%20%E2%80%93%20look%20for%20one%20that%20is%20protected%20by%20two%2Dstep%20encryption.%20This%20makes%20sending%2C%20receiving%2C%20and%20using%20your%20crypto%20as%20easy%20as%20using%20any%20online%20bank%20account%2C%20payment%20system%2C%20or%20brokerage.%C2%A0%C2%A0%C2%A0" target="_blank">Online wallets</a></i>.`,
        ]
    ),

    proofCards: createContent.createHorizontalCards(
        [
            `assets/images/infoPage/proofOfWarkAndStake/powOne.png`,
            `assets/images/infoPage/proofOfWarkAndStake/posOne.png`,
            `assets/images/infoPage/proofOfWarkAndStake/powTwo.png`,
            `assets/images/infoPage/proofOfWarkAndStake/posTwo.png`,
            `assets/images/infoPage/proofOfWarkAndStake/powThree.png`,
            `assets/images/infoPage/proofOfWarkAndStake/posThree.png`,
        ],
        [
            `Mining capacity depends on computational power`,
            `Validating capacity depends on the stake in the network`,
            `Miners recive block rewards to solve cryptographic puzzle`,
            `Validators do not recive a block reward, instead, they collect transaction fees as reward`,
            `Hackers would need to have a computer more powerful than 51 % of the network to add a malicious block, leading to 51 % attack`,
            `Hacker would need to own 51 % of all the cryptocurrency on the network, which is practically impossible and therefore, making 51 % attacks impossible`,
        ]
    ),

    usefulLinks: createContent.createUnorderedLinkList('infoPageUsefulLinks',
        [
            `https://www.coinbase.com/`,
            `https://www.binance.com/en`,
            `https://www.forbes.com/advisor/investing/cryptocurrency/what-is-cryptocurrency/`,
            `https://www.ibm.com/topics/what-is-blockchain`,
        ],
        [
            `Coinbase`,
            `Binance`,
            `What Is Cryptocurrency? - Forbes Article`,
            `What Is Blockchain? - IBM Article`,
        ]
    ),
}


// Function for displaying the overall Information Page
const displayInfoPage = () => {
    const infoPage = document.getElementById('infoCenterPage')
    // Here you can change the info page font size 
    infoPage.style.fontSize = '14px'
    infoPage.innerHTML = ` 
        <img src="assets/images/infoPage/blockChainBackground.png" id="blockchainBackgroundImg"
            alt="blockchainBackgroundImg">
        <section id="blockchainSection">
            <article class="blockchainSection whatIsBlockchain">
               ${infoPageBlockchainContent.whatIsBlockchain}
            </article><br>
            <article class="blockchainSection howBlockchainWorks">
                ${infoPageBlockchainContent.howBlockchainWorks}
            </article>
        </section>
        <section id="cryptoSection">
            <article class="cryptoSection whatIsCryptocurrency">
                ${infoPageCryptoContent.whatIsCryptocurrency}
            </article>
            <article class="cryptoSection proofOfWorkAndStake">
                <h2 class="text-center">
                    <span>.......</span><br>
                    Proof of Work vs. Proof of Stake
                </h2><br>
                <div class="alignContentCenter">
                    <p class="text-center" style="width: 70%; font-size: 1.5em;">
                        Proof of work and proof of stake are the two most widely used consensus mechanisms to verify
                        transactions before adding them to a blockchain. <br> Verifiers are then rewarded with
                        cryptocurrency for their efforts
                    </p>
                </div>
                <div class="alignContentCenter">
                    <div id="proofCards" class="text-center">
                       ${infoPageCryptoContent.proofCards}
                    </div>
                </div>
            </article>
            <aside>
                <h2 class="text-center">
                    <span>.......</span><br>
                    Useful links
                </h2>
                <div id="usefulLinks" class="alignContentCenter">
                    ${infoPageCryptoContent.usefulLinks}
                </div>
            </aside>
        </section>`
}
//#endregion ILIJA => Create Information Page
