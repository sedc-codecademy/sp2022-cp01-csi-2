const infoPageElements = {
    whatIsBlockchain: document.querySelector('.whatIsBlockchain'),
    howBlockchainWorks: document.querySelector('.howBlockchainWorks'),

}

const infoPageBlockchainContent = {
    whatIsBlockchain:
        `
         <h2 class="text-center"><span>.......</span><br>What is Blockchain ?</h2>
         <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
             <div class="carousel-indicators">
                 <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                     class="active" aria-current="true" aria-label="Slide 1"></button>
                 <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                     aria-label="Slide 2"></button>
                 <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                     aria-label="Slide 3"></button>
             </div>
             <div class="carousel-inner">
                 <div class="carousel-item active" data-bs-interval="12000">
                     <p>
                         <b>Blockchain</b> is a shared, immutable ledger that facilitates the process of
                         recording transactions and tracking assets in a business network. An asset can be
                         tangible (a house, car, cash, land) or intangible (intellectual property, patents,
                         copyrights, branding). Virtually anything of value can be tracked and traded on a
                         blockchain network, reducing risk and cutting costs for all involved.
                     </p>
                 </div>
                 <div class="carousel-item" data-bs-interval="12000">
                     <p>
                         <b>Why is blockchain important ? </b> Business runs on information. The faster it's
                         received and the more accurate it is, the better. Blockchain is ideal for
                         delivering that information because it provides immediate, shared and completely
                         transparent information stored on an
                         immutable ledger that can be accessed only by permissioned network members. A
                         blockchain network can track orders,
                         payments, accounts, production and much more. And because members share a single
                         view of the truth, you can see all
                         details of a transaction end to end, giving you greater confidence, as well as new
                         efficiencies and opportunities.
                     </p>
                 </div>
                 <div class="carousel-item" data-bs-interval="12000">
                     <p>
                         <b>What needs to change !? </b>
                         Operations often waste effort on duplicate record
                         keeping and third-party validations.
                         Record-keeping systems can be vulnerable to fraud and cyberattacks. Limited
                         transparency can slow data verification. And
                         with the arrival of IoT, transaction volumes have exploded. All of this slows
                         business, drains the bottom line — and
                         means we need a better way. <br><br>Enter blockchain.
                     </p>
                 </div>
             </div>
             <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                 data-bs-slide="prev">
                 <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                 <span class="visually-hidden">Previous</span>
             </button>
             <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                 data-bs-slide="next">
                 <span class="carousel-control-next-icon" aria-hidden="true"></span>
                 <span class="visually-hidden">Next</span>
             </button>
        </div>
    `,

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


const displayInfoPageContent = () => {
    infoPageElements.whatIsBlockchain.innerHTML = infoPageBlockchainContent.whatIsBlockchain

    infoPageElements.howBlockchainWorks.innerHTML = infoPageBlockchainContent.howBlockchainWorks
}