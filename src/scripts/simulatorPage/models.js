// Stefan Ivanovski TODO: Create local storage services 

const localStorageService = {

    getAllUsersFromLocalStorage : function(){
       let users = localStorage.getItem("users") == null ? [] : JSON.parse(localStorage.getItem("users"));
       return users
   },
    
    // should not duplicate a user - if the user exists, replace it with the input user
    addUserToLocalStorage : function(user){
        let users = this.getAllUsersFromLocalStorage();
        let ix = users.findIndex(e=>e.username == user.username);   // get index of user with same username, -1 if not found
        if (ix == -1) {
            users.push(user);   // user not found, push input user to list
        }
        else {
            users[ix] = user;   // user found, replace user at index with input user
        }
        localStorage.setItem("users", JSON.stringify(users));
    },
    
    getUserFromLocalStorage :function(username,password){
        let users = this.getAllUsersFromLocalStorage();
        let user = users.filter(x=>x.username === username && x.password === password)
        return user[0]
    }
};

// da se napravi da raboti so localstorage :D

const idGenerator = {
    idCounter: 1,
    generate() {
        return this.idCounter++;
    },
};

console.log(idGenerator.users);

class User {
    constructor(username, password, email) {
        this.id = idGenerator.generate(); //auto generated
        this.username = username
        this.password = password
        this.email = email
        this.wallet = new Wallet(this.id)
    }
}

class Coin {
    constructor(apiId, apiName, apiPrice, quantity) {
        this.id = apiId
        this.name = apiName
        this.priceBought = apiPrice
        this.quantity = quantity
        this.sellingPrice = 0;
        this.totalPrice = this.priceBought * this.quantity
    }
}

class Wallet {
    constructor(userId) {
        this.userId = userId
        this.coins = [] // niza od Coin objekti
        this.maxCoins = 10
        this.cash = 100_000
    }
};


let sedcCoin = new Coin(1, "SedcCoin", 2500, 10);
let bitcoin = new Coin("bitcoin", "Bitcoin", 19116, 1);
let ethereum = new Coin("ethereum", "Ethereum", 1041, 2);
let tether = new Coin("tether", "Tether", 1, 5);

let bob = new User("bobbobsky", 1234, "bobmajmuncebobski@bob.com");
bob.wallet.coins.push(sedcCoin);

let pink = new User("pinkpanther", 0000, "pink@panther.com");


function addCoinsToPinkUser(){
    pink.wallet.coins.push(bitcoin);
    pink.wallet.coins.push(ethereum);
    pink.wallet.coins.push(tether);
    console.log(pink);
    localStorageService.addUserToLocalStorage(pink);
}


let jill = new User("jillwayne", 4321, "jillwayne@jill.com");
jill.wallet.coins.push(sedcCoin);

//localStorage.setItem("users", JSON.stringify([bob,pink])); 
//localStorageService.addUserToLocalStorage(jill);
//localStorageService.addUserToLocalStorage(pink);

//console.log(localStorageService.getAllUsersFromLocalStorage());
//console.log(idGenerator.idCounter);





