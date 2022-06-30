// Stefan Ivanovski TODO: Create local storage services 

const localStorageService = {

    getAllUsersFromLocalStorage : function(){
       let users = localStorage.getItem("users") == null ? [] : JSON.parse(localStorage.getItem("users"));
       return users
   },
    
    
    addUserToLocalStorage : function(user){
        let users = this.getAllUsersFromLocalStorage();
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
    },
    
    getUserFromLocalStorage :function(username,password){
        let users = this.getAllUsersFromLocalStorage();
        let user = users.filter(x=>x.username === username && x.password === password)
        return user[0]
    }
}
// da se napravi da raboti so localstorage :D

const idGenerator = {
    idCounter: 1,
    generate() {
        return this.idCounter++;
    }
}

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
        this.maxCoins = Infinity
        this.cash = 100_000
    }
}


let sedcCoin = new Coin(1, "SedcCoin", 2500, 10);

let bob = new User("bobbobsky", 1234, "bobmajmuncebobski@bob.com")
bob.wallet.coins.push(sedcCoin)

let pink = new User("pinkpanther", 0000, "pink@panther.com")
pink.wallet.coins.push(sedcCoin)

console.log([bob, pink])

window.localStorage.setItem("bob", JSON.stringify(bob));
window.localStorage.setItem("pink", JSON.stringify(pink));