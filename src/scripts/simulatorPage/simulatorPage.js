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

function calculateSingleCoinValue(coins) {
};

portfolioHelpers.portfolio["Kiro"] = 1;

function generatePortfolioTable() {
    let counter = 1;
    let strArr = [];
    let user = JSON.parse(localStorage.getItem("bob"))
    console.log(user);
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
      <td class="sellCoin"><button class="btn btn-secondary btn-warning">Sell</button></td>
      </tr>`)
    }

    let content = strArr.join("");
    return content;
};

function renderPortfolioTable(){
  document.getElementById("portfolio").insertAdjacentHTML("beforeend", generatePortfolioTable());
  let sellBtns = document.getElementsByClassName("sellCoin");
  for(let btn of sellBtns){
    let coinName = btn.parentNode.getElementsByTagName("td")[2].innerHTML;
    btn.addEventListener('click', ()=> {
      showSellModal(coinName);
    })
  }
}

// renderPortfolioTable();
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
              <h5 class="modal-title" id="buyModalLabel">${title}</h5>
              <button id="myClose-x" type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body darkModal">
              <div id="coin-buy" class="container d-flex justify-content-around">
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
}

function showBuyModal() {
  content = "<label>Amount:</label><input id='amount'></input><button class='btn btn-secondary' id='btn-accept'>Buy</button>"
  ShowModal("Buy coins", content)
  document.getElementById("amount").addEventListener("change", ()=>{});
  document.getElementById("btn-accept").addEventListener("click", ()=>{
    // magic code happens here 
    document.getElementById("newModal").remove(); 
  });
}

function showSellModal(title) {
  content = "<label>Amount:</label><input id='amount'></input><button class='btn btn-secondary' id='btn-accept'>Buy</button>";
  ShowModal(`Sell ${title}`, content);
  document.getElementById("amount").addEventListener("change", ()=>{});
  document.getElementById("btn-accept").addEventListener("click", ()=>{
    // magic code happens here 
    document.getElementById("newModal").remove(); 
  });
}


//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Kristijan Karanfilovski and Igor Nikoloski => TODO: Create Wallet settings
const cardNumberInput = document.getElementById("floatingCardNumber");
const cvvNumberInput = document.getElementById('floatingCvvNumber');
const ammountInput = document.getElementById("floatingAmmount");

const addFundsBtn = document.getElementById("add-funds-confirm-btn")

ammountInput.addEventListener("keyup", () =>{
  const ammountErrorText = document.getElementById("error-text");
  if(ammountInput.value > 0 && ammountInput.value < 15 || ammountInput.value > 10000 ){
    ammountErrorText.innerText = "entered ammount must be between 15$ and 10.000$"
    addFundsBtn.disabled = true;
  }
  else{
    addFundsBtn.disabled = false;
    ammountErrorText.innerText = "";
  }
})

ammountInput.addEventListener("keypress", function(e) {
  if(e.key == "e" || e.key == "+" || e.key == "-") {
      e.preventDefault()
  }
})

cardNumberInput.addEventListener("keypress", function(e) {
  if(cardNumberInput.value.length == 16 || e.key == "e" || e.key == "+" || e.key == "-") {
      e.preventDefault()
  }
})

cvvNumberInput.addEventListener("keypress", function(e) {
  if(cvvNumberInput.value.length == 3 || e.key == "e" || e.key == "+" || e.key == "-") {
      e.preventDefault()
  }
})

addFundsBtn.addEventListener("click", async (e) => {
  let cashAmmount = parseInt(ammountInput.value); 
  // da se dodade logikata za userot
})

//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Kristijan Karanfilovski and Igor Nikoloski => TODO: Create Activity log
//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Ivana Stojadinovska => TODO: Create User statistics
//#endregion