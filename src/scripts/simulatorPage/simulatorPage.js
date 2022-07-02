//-------------------------------------------------------------------------------------------------------
//#region  Aleksandar Dojchinovski => TODO: Create Secondary Navigation Bar And Top Info cards
//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Ilija Mitev => TODO: Create side Market bar
//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Aneta Stankovska => TODO: Create Portfolio in Simulator
let portfolioHelpers = { 
    "portfolio" : {} //Placeholder for portfolio variables
};

const pinkUser = localStorageService.getAllUsersFromLocalStorage().find(e=>e.username == "pinkpanther");
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

    for (let coin of wallet.coins){
      strArr.push(`<tr>
      <td>${counter++}</td>
      <td>Logo</td>
      <td>${coin.name}</td>
      <td>${coin.quantity}</td>
      <td>${coin.currentPrice * coin.quantity}</td>
      <td>${(coin.currentPrice - coin.priceBought)*100}</td>
      <td class="sellCoin"><button class="btn btn-outline-warning">Sell</button></td>
      </tr>`)
    };

    let content = strArr.join("");
    return content;
};

function renderPortfolioTable(){
  document.getElementById("portfolio").insertAdjacentHTML("beforeend", generatePortfolioTable(pinkUser));
  let sellBtns = document.getElementsByClassName("sellCoin");
  for(let btn of sellBtns){
    let coinName = btn.parentNode.getElementsByTagName("td")[2].innerHTML;
    btn.addEventListener('click', ()=> {
      showSellModal(coinName);
    })
  }
};

function getUserCoinIds(user){
  let userCoins = user.wallet.coins.map(x => x.id);
  return userCoins;
}

function getWalletCoinsCurrentPrice(user){
  let userCoinIds = getUserCoinIds(user);
  let userCoinIdsStr = userCoinIds.join(",");
  console.log(userCoinIdsStr);
}

getWalletCoinsCurrentPrice(pinkUser);

addCoinsToPinkUser();
renderPortfolioTable();
console.log(getUserCoinIds(pinkUser));
//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Ilija Mitev and Aneta Stankovska => TODO: Create Buy and Sell confirmation modal

function ShowModal(title, content, parent=document.getElementById("modal-container")) {
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
  document.getElementById("myClose-btn").addEventListener("click", () => {modal.remove()});
  //When user clicks the "X" button
  document.getElementById("myClose-x").addEventListener("click", () => {modal.remove()});
  //When the user clicks anywhere outside the modal
  window.addEventListener('click', function(event) {
    if (event.target == modal) {
         modal.remove();
     }  
  })
};

function showBuyModal() {
  content = "<label>Amount:</label><input id='amount'></input><button class='btn btn-secondary' id='btn-accept'>Buy</button>"
  ShowModal("Buy coins", content)
  document.getElementById("amount").addEventListener("change", ()=>{});
  document.getElementById("btn-accept").addEventListener("click", ()=>{
    // magic code happens here 
    document.getElementById("newModal").remove(); 
  });
};

function showSellModal(title) {
  content = "<label>Amount:</label><input id='amount'></input><button class='btn btn-secondary' id='btn-accept'>Sell</button>";
  ShowModal(`Sell ${title}`, content);
  document.getElementById("amount").addEventListener("change", ()=>{});
  document.getElementById("btn-accept").addEventListener("click", ()=>{
    // magic code happens here 
    document.getElementById("newModal").remove(); 
  });
};


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