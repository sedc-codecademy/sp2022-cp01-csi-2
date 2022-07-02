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
            <span  style="color:${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'};">${coin.price_change_percentage_24h.toFixed(2)}%</span>
            <span id="${coin.id}">Buy</span>
        </div>`)
  };
  return coinBar.join('');
}

// Function for adding the appropriate data to the element
const renderSideMarketBar = async (pageNumber = 1) => {
  let url = sideMarketBarHelpers.getApiUrl(pageNumber)
  let data = await getCoinsDataAsync(url)
  console.log(data);
  sideMarketBarHelpers.coinsElement.innerHTML += await renderSideMarketData(data)
}

// Function for creating the 'infinity' scroll
const sideMarketInfinityScroll = async (e) => {
  e.preventDefault()
  let { scrollTop, scrollHeight, clientHeight } = sideMarketBarHelpers.coinsElement
  let bottom = Math.round(scrollTop + clientHeight) == scrollHeight

  if (bottom && sideMarketBarHelpers.pageNumber <= 5) {  // limit the shown coins to 100
    console.log("YOU'VE REACHED THE BOTTOM")
    displayElements.showElements(sideMarketBarHelpers.loader)
    setTimeout(async () => {
      console.log("PAGE NUMBER " + sideMarketBarHelpers.pageNumber);
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
  await renderSideMarketBar()
  sideMarketBarHelpers.pageNumber++

  //In case there isn't a scroll bar (ex. larger viewport => projector) 
  if (sideMarketBarHelpers.coinsElement.scrollHeight <= sideMarketBarHelpers.coinsElement.clientHeight) {
    console.log("Scrollbar: I'm completly lost");
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
let portfolioHelpers = {
  "portfolio": {} //Placeholder for portfolio variables
};

const pinkUser = localStorageService.getAllUsersFromLocalStorage().find(e => e.username == "pinkpanther");
console.log(pinkUser);

function calculateSingleCoinValue(coins) {
};


function generatePortfolioTable(user) {
  let counter = 1;
  let strArr = [];
  let wallet = user.wallet;
  console.log(wallet);
  strArr.push(`<table id="dtBasicExample" class="table table-hover table-responsive table-fit">
    <thead>
      <tr>
        <th scope="col" class="table-sm">#</th>
        <th scope="col" class="table-sm">Logo</th>
        <th scope="col" class="table-sm">Name</th>
        <th scope="col" class="table-sm">Amount</th>
        <th scope="col" class="table-sm">Value</th>
        <th scope="col" class="table-sm">Change in %</th>
        <th scope="col" class="table-sm">Action</th>
      </tr>
    </thead>
    <tbody>
    `);

  for (let coin of wallet.coins) {
    strArr.push(`<tr>
      <td>${counter++}</td>
      <td>Logo</td>
      <td>${coin.name}</td>
      <td>${coin.quantity}</td>
      <td>${coin.currentPrice * coin.quantity}</td>
      <td>${(coin.currentPrice - coin.priceBought) * 100}</td>
      <td class="sellCoin"><button class="btn btn-outline-warning">Sell</button></td>
      </tr>`)
  };

  let content = strArr.join("");
  return content;
};

function renderPortfolioTable(user) {
  document.getElementById("portfolio").insertAdjacentHTML("beforeend", generatePortfolioTable(user));
  let sellBtns = document.getElementsByClassName("sellCoin");
  for (let btn of sellBtns) {
    let coinName = btn.parentNode.getElementsByTagName("td")[2].innerHTML;
    btn.addEventListener('click', () => {
      showSellModal(coinName);
    })
  }
};

function getUserCoinIds(user) {
  let userCoins = user.wallet.coins.map(x => x.id);
  return userCoins;
}

function getWalletCoinsCurrentPrice(user) {
  let userCoinIds = getUserCoinIds(user);
  let userCoinIdsStr = userCoinIds.join(",");
  console.log(userCoinIdsStr);
}

// getWalletCoinsCurrentPrice(pinkUser);

addCoinsToPinkUser();
// renderPortfolioTable(pinkUser);
console.log(getUserCoinIds(pinkUser));
//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Ilija Mitev and Aneta Stankovska => TODO: Create Buy and Sell confirmation modal

function ShowModal(title, content, parent = document.getElementById("modal-container")) {
  let scaffold = `
  <div id="newModal" class="modal" >
      <div class="modal-dialog modal-xl modal-dialog-centered darkModal">
          <!-- Modal content -->
          <div class="modal-content">
          <div class="modal-header darkModal">
              <h5 class="modal-title" id=",odalLabel">${title}</h5>
              <button id="myClose-x" type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body darkModal">
              <div class="container d-flex justify-content-around">
                  ${content}
              </div>
          </div>
          <div class="modal-footer darkModal">
              <button id="myClose-btn" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
          </div>
      </div>
  </div>`
  parent.insertAdjacentHTML("beforeend", scaffold);
  let modal = document.getElementById('newModal');
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
  })
};

function showBuyModal() {
  content = "<label>Amount:</label><input id='amount'></input><button class='btn btn-secondary' id='btn-accept'>Buy</button>"
  ShowModal("Buy coins", content)
  document.getElementById("amount").addEventListener("change", () => { });
  document.getElementById("btn-accept").addEventListener("click", () => {
    // magic code happens here 
    document.getElementById("newModal").remove();
  });
};

function showSellModal(title) {
  content = "<label>Amount:</label><input id='amount'></input><button class='btn btn-secondary' id='btn-accept'>Sell</button>";
  ShowModal(`Sell ${title}`, content);
  document.getElementById("amount").addEventListener("change", () => { });
  document.getElementById("btn-accept").addEventListener("click", () => {
    // magic code happens here 
    document.getElementById("newModal").remove();
  });
};


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
//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Ivana Stojadinovska => TODO: Create User statistics
//#endregion

document.getElementById("portfolio-navbtn").addEventListener("click", () => displayElements.showPortfolio())
document.getElementById("walletsettings-navbtn").addEventListener("click", () => displayElements.showWalletSettings())
document.getElementById("walletstatistics-navbtn").addEventListener("click", () => displayElements.showWalletStatistics())
document.getElementById("activitylog-navbtn").addEventListener("click", () => displayElements.showActivityLog())