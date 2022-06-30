//-------------------------------------------------------------------------------------------------------
//#region  Aleksandar Dojchinovski => TODO: Create Secondary Navigation Bar And Top Info cards
//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Ilija Mitev => TODO: Create side Market bar
//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Aneta Stankovska => TODO: Create Portfolio in Simulator
let portfolioHelpers = {
    "portfolioTable" : {}
};
function renderPortfolioTable() {
    let counter = 1;
    let strArr = [];
    let userWallet = localStorage.getItem(User, JSON.parse(Wallet));
    let userWalletCoins = userWallet.coins;
    strArr.push(`<table id="dtBasicExample" class="table table-hover table-responsive table-fit">
    <thead>
      <tr>
        <th scope="col" class="table-sm">#</th>
        <th scope="col" class="table-sm">Name</th>
        <th scope="col" class="table-sm">Amount</th>
        <th scope="col" class="table-sm">Value</th>
        <th scope="col" class="table-sm">Change in %</th>
        <th scope="col" class="table-sm"></th>
      </tr>
    </thead>
    <tbody>
    `);

    for (let coin of userWallet){
      strArr.push(`<tr>${counter++}</tr>
      <tr>${coin.name}</tr>
      <tr>${coin.quantity}</tr>
      <tr>${coin.currentPrice * coin.quantity}</tr>
      <tr>${(coin.currentPrice - coin.priceBought)*100}</tr>
      <tr id="sellCoin"><button>Sell</button></tr>`)
    }
};


//#endregion

//-------------------------------------------------------------------------------------------------------
//#region  Ilija Mitev and Aneta Stankovska => TODO: Create Buy and Sell confirmation modal
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