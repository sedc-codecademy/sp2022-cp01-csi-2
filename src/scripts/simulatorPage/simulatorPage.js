//-------------------------------------------------------------------------------------------------------
//#region  Aleksandar Dojchinovski => TODO: Create Secondary Navigation Bar And Top Info cards
//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Ilija Mitev => TODO: Create side Market bar
//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Aneta Stankovska => TODO: Create Portfolio in Simulator
let portfolioHelpers = {
  portfolio: {}, //Placeholder for portfolio variables
};

const pinkUser = localStorageService
  .getAllUsersFromLocalStorage()
  .find((e) => e.username == "pinkpanther");
console.log(pinkUser);
addCoinsToPinkUser();

function getUserCoinIds(user) {
  let userCoins = user.wallet.coins.map((x) => x.id);
  return userCoins;
}

async function getWalletCoinsCurrentPrice(user) {
  let userCoinIds = getUserCoinIds(user);
  let userCoinIdsStr = userCoinIds.join(",");
  let url = `https://api.coingecko.com/api/v3/simple/price?ids=${userCoinIdsStr}&vs_currencies=usd`;
  console.log(userCoinIdsStr);

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
  console.log(wallet);
  let walletCoinsCurrentPrice = await getWalletCoinsCurrentPrice(user);
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
    let changeInPercent = Math.round(((coin.priceBought - walletCoinsCurrentPrice[coin.id].usd) / 100) * 10) /10;
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

//For testing
function renderPortfolioTable(user) {
  generatePortfolioTable(user).then(e => {
  document.getElementById("portfolio").insertAdjacentHTML("beforeend", e);
  let sellBtns = document.getElementsByClassName("sellCoin");
  for (let btn of sellBtns) {
    let coinName = btn.parentNode.getElementsByTagName("td")[1].innerHTML;
    btn.addEventListener("click", () => {
      showSellModal(coinName);
    });
  }})
};

//The real one 
// async function renderPortfolioTable(user) {
//   document
//     .getElementById("portfolio")
//     .insertAdjacentHTML("beforeend", await generatePortfolioTable(user))
//   let sellBtns = document.getElementsByClassName("sellCoin");
//   for (let btn of sellBtns) {
//     let coinName = btn.parentNode.getElementsByTagName("td")[2].innerHTML;
//     btn.addEventListener("click", () => {
//       showSellModal(coinName);
//     });
//   }
// };

getWalletCoinsCurrentPrice(pinkUser);

renderPortfolioTable(pinkUser);
console.log(getUserCoinIds(pinkUser));
//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Ilija Mitev and Aneta Stankovska => TODO: Create Buy and Sell confirmation modal

function ShowModal(
  title,
  content,
  parent = document.getElementById("modal-container")
) {
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
  </div>`;
  parent.insertAdjacentHTML("beforeend", scaffold);
  let modal = document.getElementById("newModal");
  document.getElementById("newModal").style.display = "block";
  //When user clicks the "Close" button
  document.getElementById("myClose-btn").addEventListener("click", () => {
    modal.remove();
  });
  //When user clicks the "X" button
  document.getElementById("myClose-x").addEventListener("click", () => {
    modal.remove();
  });
  //When the user clicks anywhere outside the modal
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.remove();
    }
  });
}

function showBuyModal() {
  content =
    "<label>Amount:</label><input id='amount'></input><button class='btn btn-secondary' id='btn-accept'>Buy</button>";
  ShowModal("Buy coins", content);
  document.getElementById("amount").addEventListener("change", () => {});
  document.getElementById("btn-accept").addEventListener("click", () => {
    // magic code happens here
    document.getElementById("newModal").remove();
  });
}

function showSellModal(title) {
  content =
    "<label>Amount:</label><input id='amount'></input><button class='btn btn-secondary' id='btn-accept'>Sell</button>";
  ShowModal(`Sell ${title}`, content);
  document.getElementById("amount").addEventListener("change", () => {});
  document.getElementById("btn-accept").addEventListener("click", () => {
    // magic code happens here
    document.getElementById("newModal").remove();
  });
}

//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Kristijan Karanfilovski and Igor Nikoloski => TODO: Create Wallet settings
//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Kristijan Karanfilovski and Igor Nikoloski => TODO: Create Activity log
//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Ivana Stojadinovska => TODO: Create User statistics
//#endregion
