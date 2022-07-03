//-------------------------------------------------------------------------------------------------------
//#region  Aleksandar Dojchinovski => TODO: Create Secondary Navigation Bar And Top Info cards
//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Ilija Mitev => TODO: Create side Market bar

const sideMarketBarHelpers = {
  coinsElement: document.getElementById("sideMarketBarCoins"),
  pageNumber: 1,
  getApiUrl: (pageNumber) => `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=${pageNumber}`,
  loader: document.getElementById('sideMarketLoader'),
}

//Function for creating the coin info bars
const renderSideMarketData = async (data) => {
  let coinBar = [];
  for (const coin of data) {
    coinBar.push(`
        <div class="marketTable">
            <span><img src="${coin.image}" height="30px" alt="${coin.id}"}"></span>
            <span>${coin.name}</span>
            <span>${coin.current_price.toLocaleString('en-US')}</span>
            <span>${coin.price_change_percentage_24h >= 0 ? "<strong class='increase small-font-size'>↑</strong>&nbsp" : "<strong class='decrease small-font-size'>↓</strong>"} ${coin.price_change_percentage_24h.toFixed(2)}%</span>
            <span id="${coin.id}">Buy</span>
        </div>`)
  };
  return coinBar.join("");
}

// Function for adding the appropriate data to the element
const renderSideMarketBar = async (pageNumber = 1) => {
  let url = sideMarketBarHelpers.getApiUrl(pageNumber)
  let data = await getCoinsDataAsync(url)
  console.log("Page Number " + sideMarketBarHelpers.pageNumber);
  console.log(data);
  sideMarketBarHelpers.coinsElement.insertAdjacentHTML("beforeend", await renderSideMarketData(data))
}

// Function for creating the 'infinity' scroll
const sideMarketInfinityScroll = async (e) => {
  e.preventDefault()
  let { scrollTop, scrollHeight, clientHeight } = sideMarketBarHelpers.coinsElement
  let bottom = Math.round(scrollTop + clientHeight) == scrollHeight

  if (bottom && sideMarketBarHelpers.pageNumber <= 5) {  // limit the shown coins to 100
    displayElements.showElements(sideMarketBarHelpers.loader)
    setTimeout(async () => {
      await renderSideMarketBar(sideMarketBarHelpers.pageNumber)
      displayElements.hideElements(sideMarketBarHelpers.loader)
      ++sideMarketBarHelpers.pageNumber
    }, 2000);
  }
}

//Wrap Function for initializing the side market
const showSimulatorSideMarket = async () => {
  sideMarketBarHelpers.coinsElement.innerHTML = ``
  sideMarketBarHelpers.pageNumber = 1
  displayElements.showElements(sideMarketBarHelpers.loader)
  await renderSideMarketBar()
  displayElements.hideElements(sideMarketBarHelpers.loader)
  sideMarketBarHelpers.pageNumber++

  //In case there isn't a scroll bar (ex. larger viewport => projector) 
  if (sideMarketBarHelpers.coinsElement.scrollHeight <= sideMarketBarHelpers.coinsElement.clientHeight) {
    await renderSideMarketBar(sideMarketBarHelpers.pageNumber)
    sideMarketBarHelpers.pageNumber++
  }
  //Events for the Side Market
  sideMarketBarHelpers.coinsElement.addEventListener("scroll", sideMarketInfinityScroll)
  // buying event ...
}

//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Aneta Stankovska => TODO: Create Portfolio in Simulator

addCoinsToPinkUser();

let portfolioHelpers = {
  "portfolio": {} //Placeholder for portfolio variables
};

// const pinkUser = localStorageService
//   .getAllUsersFromLocalStorage()
//   .find((e) => e.username == "pinkpanther");
// addCoinsToPinkUser();

function getUserCoinIds(user) {
  let userCoins = user.wallet.coins.map((x) => x.id);
  return userCoins;
}

async function getWalletCoinsCurrentPriceAsync(user) {
  let userCoinIds = getUserCoinIds(user);
  let userCoinIdsStr = userCoinIds.join(",");
  let url = `https://api.coingecko.com/api/v3/simple/price?ids=${userCoinIdsStr}&vs_currencies=usd`;

  try {
    let response = await fetch(url);
    let result = await response.json();
    console.log(result);
    //return await response.json();
    return result;
  } catch (err) {
    console.error(err);
    // Handle errors here
  }
}

async function generatePortfolioTable(user) {
  let counter = 1;
  let strArr = [];
  let wallet = user.wallet;
  let walletCoinsCurrentPrice = await getWalletCoinsCurrentPriceAsync(user);
  console.log(wallet);
  console.log(walletCoinsCurrentPrice);
  strArr.push(`<div class="" id="portfolio-heading" style= "text-align:center"><h4>Portfolio</h4><p>${Object.keys(wallet).length-1} coins</p></div>
  <table id="dtBasicExample" class="table table-hover table-responsive table-fit">
    <thead>
      <tr>
        <th scope="col" class="table-sm align-middle text-center">#</th>
        <th scope="col" class="table-sm align-middle text-center">Name</th>
        <th scope="col" class="table-sm align-middle text-center">Amount</th>
        <th scope="col" class="table-sm align-middle text-center">Value</th>
        <th scope="col" class="table-sm align-middle text-center">Change in %</th>
        <th scope="col" class="table-sm align-middle text-center">Action</th>
      </tr>
    </thead>
    <tbody>
    `);

  for (let coin of wallet.coins) {
    let value = Math.round(((walletCoinsCurrentPrice[coin.id].usd * coin.quantity) + Number.EPSILON) * 10) / 10;
    let changeInPercent = Math.round(((walletCoinsCurrentPrice[coin.id].usd - coin.priceBought) / 100) * 10) /10;
    strArr.push(`<tr>
      <td class="align-middle text-center">${counter++}</td>
      <td class="align-middle text-center">${coin.name}</td>
      <td class="align-middle text-center">${coin.quantity.toLocaleString('en-US')}</td>
      <td class="align-middle text-center">${value.toLocaleString('en-US')}</td>
      <td class="align-middle text-center">${changeInPercent > 0
        ? "<strong class='increase'>↑</strong>" : changeInPercent < 0 ? "<strong class='decrease'>↓</strong>" : " "}&nbsp &nbsp${changeInPercent}% </td></td>
      <td class=" sellCoin align-middle text-center"><button class="btn btn-outline-warning">Sell</button></td>
      </tr>`);
  }

  let content = strArr.join("");
  return content;
};

//Function for rendering portfolio table
async function renderPortfolioTableAsync(user) {
  document.getElementById("portfolio").innerHTML = "";
  document
    .getElementById("portfolio")
    .insertAdjacentHTML("beforeend", await generatePortfolioTable(user))
  let sellBtns = document.getElementsByClassName("sellCoin");
  for (let btn of sellBtns) {
    let coinName = btn.parentNode.getElementsByTagName("td")[1].innerHTML;
    let coinId = user.wallet.coins.find(x => x.name == coinName).id;
    btn.addEventListener("click", () => {
      showTradeModal(coinId, coinName, false);
    });
  }
};

//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Ilija Mitev and Aneta Stankovska => TODO: Create Buy and Sell confirmation modal

async function getCoinCoinsCurrentPriceAsync(coinId) {
  let url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`;

  try {
    let response = await fetch(url);
    let result = await response.json();
    console.log(result);
    //return await response.json();
    return result;
  } catch (err) {
    console.error(err);
    // Handle errors here
  }
};

async function ShowModal(content, parent = document.getElementById("modal-container")) {
  let scaffold = `
  <div id="newModal" class="modal" >
      <div class="modal-dialog modal-xl modal-dialog-centered darkModal">
          <!-- Modal content -->
          <div class="modal-content">
          <div class="modal-header darkModal">
              <h5 class="modal-title" id="modalLabel"></h5>
              <button id="myClose-x" type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body darkModal">${content}</div>
          <div class="modal-footer darkModal">
              <button id="myClose-btn" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
          </div>
      </div>
  </div>`;

  parent.insertAdjacentHTML("beforeend", scaffold);
  let modal = document.getElementById("newModal");
  document.getElementById("newModal").style.display = "block";
  //When user clicks the "Close" button
  document.getElementById("myClose-btn").addEventListener("click", () => { modal.remove() });
  //When user clicks the "X" button
  document.getElementById("myClose-x").addEventListener("click", () => { modal.remove() });
  //When the user clicks anywhere outside the modal
  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      modal.remove();
    }
  });
};

async function showTradeModal(coinId, coinName, isBuy){
  let coinChart = await createSingleCoinChartAsync(coinId, coinName);
  let coinCurrentPrice = await getCoinCoinsCurrentPriceAsync(coinId);  
  console.log(coinCurrentPrice);
  console.log(coinId);
  let content = `<div class="container d-flex justify-content-around" id="buySellModalChartContainer">
                  <div class="container d-flex justify-content-around" id="buySellModalChart">
                  </div>
                  <div id="buySellInputsContainer">
                  <h3>${coinName}</h3>
                  <br>
                  <label for="">Number of coins</label>
                  <br>
                  <input type="number" style="color:black !important" id="coinsAmount" name="coinsAmount"></input>
                  <p id="exceedingAmountError" class="text-danger"></p>
                  <br>
                  <label for="coinsAmount">Total price</label>
                  <br>
                  <input type="number" id="totalPrice" style="color:black !important" readonly></input>
                  <br>
                  <div id="ExchangeRate">Rate<div>1 ${coinName } = ${coinCurrentPrice[coinId].usd} USD</div>
                  <br><br>
                    <button class="btn btn-secondary d-flex justify-content-around" id='${isBuy ? 'buyBtn' : 'sellBtn'}'>${isBuy ? 'Buy' : 'Sell'}</button>
                    <br><br><br>
                  </div>
                </div>`;
  await ShowModal(content);
  await tradeModalHandlers(coinId, coinName, coinCurrentPrice, isBuy);
  
  document.getElementById("buySellModalChart").appendChild(coinChart);

  if(isBuy){
    document.getElementById("buyBtn").addEventListener('click', (e) => {
    })
  }
  else{
    document.getElementById("sellBtn").addEventListener('click', (e) => {
    })
  }
};

async function tradeModalHandlers(coinId, coinName, coinCurrentPrice, isBuy) {
  let sellBtn = document.getElementById("sellBtn");
  document.getElementById("coinsAmount").addEventListener('input', (e) =>{
    let coinsInput = e.target;
    let totalPriceInput = document.getElementById("totalPrice")
    let val = e.target.value;
    if(val == ""){
      totalPriceInput.value = "";
      return;
    }
    let totalAmount = coinCurrentPrice[coinId].usd * parseInt(val);
    totalPriceInput.value = totalAmount;

    let maxQuantity = pink.wallet.coins.find(x => x.id == coinId).quantity;
    let exceedingAmountErrorText = document.getElementById("exceedingAmountError");
    if (val > maxQuantity) {
      exceedingAmountErrorText.innerText = "The amount of coins exceeds the amount in your wallet";
      sellBtn.disabled = true;
    }
    else {
      sellBtn.disabled = false;
      exceedingAmountErrorText.innerText = "";
    }
  });

  document.getElementById("coinsAmount").addEventListener("keypress", e => {
    if (!validateNumberInput(e)) {
      e.preventDefault();
    }
  });
}

//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Kristijan Karanfilovski and Igor Nikoloski => TODO: Create Wallet settings
const cardNumberInput = document.getElementById("floatingCardNumber");
const cvvNumberInput = document.getElementById('floatingCvvNumber');
const ammountInput = document.getElementById("floatingAmmount");
const nameInput = document.getElementById("floatingName");
const confirmAddFundsBtn = document.getElementById("add-funds-confirm-btn");
const loaderContainer = document.getElementById("payment-loader");
const cryptoLimitInput = document.getElementById("floatingCryptoLimit");

function validateNumberInput(event) {
  if (event.key === "e" || event.key === "+" || event.key === "-") {
    return false;
  }
  else {
    return true;
  }
}

// add funds
ammountInput.addEventListener("keypress", function (e) {
  if (!validateNumberInput(e)) {
    e.preventDefault();
  }
})

ammountInput.addEventListener("focusout", () => {
  let ammountErrorText = document.getElementById("ammount-error-text");

  if (ammountInput.value > 0 && ammountInput.value < 15 || ammountInput.value > 10000) {
    ammountErrorText.innerText = "Enter amount between 15$ and 10.000$"
    confirmAddFundsBtn.disabled = true;
  }
  else {
    confirmAddFundsBtn.disabled = false;
    ammountErrorText.innerText = "";
  }
})

nameInput.addEventListener("keypress", (e) => {
  let regex = new RegExp(`^[a-zA-Z]`);

  if (!regex.test(e.key)) {
    e.preventDefault();
  }
})

nameInput.addEventListener("focusout", () => {
  let errortext = document.getElementById("name-error-text")

  if (nameInput.value.length < 3) {
    errortext.innerText = "name must have more then 2 characters"
    confirmAddFundsBtn.disabled = true;
  }
  else {
    confirmAddFundsBtn.disabled = false;
    errortext.innerText = "";
  }
})

cardNumberInput.addEventListener("keydown", function (e) {
  if (!validateNumberInput(e) || cardNumberInput.value.length === 16) {
    e.preventDefault()
  }
})

cardNumberInput.addEventListener("focusout", () => {
  let errortext = document.getElementById("cardNumber-error-text");

  if (cardNumberInput.value.length > 0 && cardNumberInput.value.length < 16) {
    errortext.innerText = "enter valid card number. Ex: 1111 2222 3333 4444"
    confirmAddFundsBtn.disabled = true;
  }
  else {
    confirmAddFundsBtn.disabled = false;
    errortext.innerText = "";
  }
})

cvvNumberInput.addEventListener("keypress", function (e) {
  if (!validateNumberInput(e) || cvvNumberInput.value.length === 3) {
    e.preventDefault();
  }
})

cvvNumberInput.addEventListener("focusout", () => {
  let errortext = document.getElementById("cvv-error-text");

  if (cvvNumberInput.value.length > 0 && cvvNumberInput.value.length < 3) {
    errortext.innerText = "enter valid cvv number. Ex: 123"
    confirmAddFundsBtn.disabled = true;
  }
  else {
    confirmAddFundsBtn.disabled = false;
    errortext.innerText = "";
  }
})

confirmAddFundsBtn.addEventListener("click", async () => {
  if (cvvNumberInput.checkValidity() && cardNumberInput.checkValidity() && ammountInput.checkValidity()) {
    let cashAmmount = parseInt(ammountInput.value);
    await showLoaderAsync(loaderContainer, 2000)
    loggedUser.user.wallet.cash += cashAmmount;

    document.getElementById("payment-form").reset()
    loaderContainer.innerHTML = "succesfully added funds to your wallet!"
    localStorageService.addUserToLocalStorage(loggedUser.user);
    console.log(loggedUser.user);
  }
  else {
    document.getElementById("payment-form").reportValidity();
  }
})

document.getElementById("add-funds").addEventListener("click", () => {
  loaderContainer.innerHTML = "";
})

// ***** crypto limit ***** //

document.getElementById("limit-crypto").addEventListener("click", () => {
  document.getElementById("crypto-limit-msg").innerText = ""

  let currentNumber = document.getElementById("current-number-of-coins");
  let currentLimit = document.getElementById("current-number-of-limit");

  currentNumber.innerHTML = `Current number of coins in the wallet: ${loggedUser.user.wallet.coins.length}`
  currentLimit.innerHTML = `Current limit of cryptos you can have in the wallet: ${loggedUser.user.wallet.maxCoins}`
})

cryptoLimitInput.addEventListener("keypress", (e) => {
  if (!validateNumberInput(e)) {
    e.preventDefault();
  }
})

document.getElementById("limit-crypto-confirm-btn").addEventListener("click", () => {
  let form = document.getElementById("cryptolimit-form");
  let msg = document.getElementById("crypto-limit-msg")

  if (cryptoLimitInput.checkValidity()) {

    if (cryptoLimitInput.value >= loggedUser.user.wallet.coins.length) {
      loggedUser.user.wallet.maxCoins = parseInt(cryptoLimitInput.value);

      msg.setAttribute("class", "text-light")
      msg.innerText = "Succesfully changed the limit!"
      document.getElementById("current-number-of-limit").innerHTML = `Current limit of cryptos you can have in the wallet: ${loggedUser.user.wallet.maxCoins}`
      localStorageService.addUserToLocalStorage(loggedUser.user);
      form.reset();
    } else {
      msg.setAttribute("class", "text-danger")
      msg.innerText = "You have more coins in your wallet now. Try again"
    }
  } else {
    form.reportValidity();
  }
})
//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Kristijan Karanfilovski and Igor Nikoloski => TODO: Create Activity log
function createActivityLogTable() {
  let element = document.getElementById("activity-log-table-content");
  element.innerHTML = "";
  for(transaction of loggedUser.user.activityLog.transactionHistory)
  {
    element.innerHTML += `
    <tr>
    <td scope="col" class="text-center">${transaction.name}</td>
    <td scope="col" class="text-center">${transaction.price}$</td>
    <td scope="col" class="text-center">${transaction.buyOrSell ? "<span class='activitySideBuy'>Buy</span>" : "<span class='activitySideSell'>Sell</span>"}</td>
    <td scope="col" class="text-center">${transaction.quantity}</td>
    <td scope="col" class="text-center">${transaction.totalPrice}$</td>
    </tr>
    `
  }
}
//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Ivana Stojadinovska => TODO: Create User statistics
//#endregion

document.getElementById("portfolio-navbtn").addEventListener("click", async () => {displayElements.showPortfolio(); await renderPortfolioTableAsync(pink)})
document.getElementById("walletsettings-navbtn").addEventListener("click", () => displayElements.showWalletSettings())
document.getElementById("walletstatistics-navbtn").addEventListener("click", () => displayElements.showWalletStatistics())
document.getElementById("activitylog-navbtn").addEventListener("click", () => {
  displayElements.showActivityLog()
  createActivityLogTable()
})
