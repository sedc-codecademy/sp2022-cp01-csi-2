// Stefan Ivanovski TODO: Create local storage services 

const localStorageService = {

    getAllUsersFromLocalStorage: function () {
        let users = localStorage.getItem("users") == null ? [] : JSON.parse(localStorage.getItem("users"));
        return users
    },

    // should not duplicate a user - if the user exists, replace it with the input user
    addUserToLocalStorage: function (user) {
        let users = this.getAllUsersFromLocalStorage();
        let ix = users.findIndex(e => e.username == user.username);   // get index of user with same username, -1 if not found
        if (ix == -1) {
            users.push(user);   // user not found, push input user to list
        }
        else {
            users[ix] = user;   // user found, replace user at index with input user
        }
        localStorage.setItem("users", JSON.stringify(users));
    },

    getUserFromLocalStorage: function (username, password) {
        let users = this.getAllUsersFromLocalStorage();
        console.log(users)
        let user = users.filter(x => x.username === username && x.password === password)
        return user[0]
    }
};

const validationService = {
    //Username validation
    validateUsername: function (username) {

        let allUsers = localStorageService.getAllUsersFromLocalStorage();
        if (username.length < 3) {
            return false;
        }

        let existingUser = allUsers.findIndex(user => user.username === username);

        if (existingUser !== -1) {
            return false;
        }

        return true;
    },
    //password validation
    validatePassword: function (password) {

        if (password.length < 5) {
            return false;
        }
        return true;
    },
    //email validation

    validateEmail: function (email) {
        let allUsers = localStorageService.getAllUsersFromLocalStorage();

        if (!email.includes('@')) {
            return false;
        }
        if (!email.includes('.')) {
            return false;
        }

        let existingEmail = allUsers.findIndex(user => user.email === email);

        if (existingEmail !== -1) {
            return false;
        }
        return true;
    },
    // login validation

    validateLogin: function (username, password) {
        let loggedUser = localStorageService.getAllUsersFromLocalStorage(username, password);

        if (loggedUser === undefined) {
            return false;
        }
        return loggedUser;
    }
}

// da se napravi da raboti so localstorage :D

const idGenerator = {
    idCounter: 1,
    generate() {
        return this.idCounter++;
    },
};

class User {
    constructor(username, password, email) {
        this.id = idGenerator.generate(); //auto generated
        this.username = username
        this.password = password
        this.email = email
        this.wallet = new Wallet(this.id)
        this.activityLog = new ActivityLog(this.id)
    }
}

class Coin {
    constructor(apiId, apiName, quantity) {
        this.id = apiId
        this.name = apiName
        this.priceBought = []
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

class ActivityLog {
    constructor(userId) {
        this.userId = userId
        this.transactionHistory = []
    }
}

class Transaction {
    constructor(name, price, buyOrSell, quantity) {
        this.name = name
        this.price = price
        this.buyOrSell = buyOrSell
        this.quantity = quantity
        this.totalPrice = price * quantity
    }
}

let sedcCoin = new Coin(1, "SedcCoin", 2500, 10);
let bitcoin = new Coin("bitcoin", "Bitcoin", 1);
bitcoin.priceBought.push(19116)
let ethereum = new Coin("ethereum", "Ethereum", 2);
ethereum.priceBought.push(1041, 1041)
let tether = new Coin("tether", "Tether", 5);
tether.priceBought.push(1, 1, 1, 1, 1)


let testUser = new User("testUser", "0000", "test@email.com");
testUser.wallet.coins.push(bitcoin);
testUser.wallet.coins.push(ethereum);
testUser.wallet.coins.push(tether);

testUser.activityLog.transactionHistory.push
(
    new Transaction("Bitcoin", 19116, true, 1),
    new Transaction("Ethereum", 1041, true, 2),
    new Transaction("Tether", 1, true, 5)
)

const loggedUser = {
    user: testUser // default for now for testing purposes
}

let bob = new User("bobbobsky", "1234", "bobmajmuncebobski@bob.com");
bob.wallet.coins.push(sedcCoin);

let pink = new User("pinkpanther", "0000", "pink@panther.com");

function addCoinsToPinkUser() {
    pink.wallet.cash += 200
    pink.wallet.coins.push(bitcoin);
    pink.wallet.coins.push(ethereum);
    pink.wallet.coins.push(tether);
    console.log(pink);
    localStorageService.addUserToLocalStorage(pink);
}

// let jill = new User("jillwayne", "4321", "jillwayne@jill.com");
// jill.wallet.coins.push(sedcCoin);

localStorageService.addUserToLocalStorage(bob)

// localStorageService.addUserToLocalStorage(pink);
// localStorageService.addUserToLocalStorage(jill);

// let igor = new User("igor", "12345", "igor@igor.igor")
// let igorsTransaction = new Transaction("bitcoin1234", 12345, false , 3)
// igor.activityLog.transactionHistory.push(igorsTransaction)

// let igorsTransaction2 = new Transaction("kikekoin", 54321, true , 10)
// igor.activityLog.transactionHistory.push(igorsTransaction2)
// localStorageService.addUserToLocalStorage(igor)
