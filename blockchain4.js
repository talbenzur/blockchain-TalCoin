const EC=require('elliptic').ec

const ec=new  EC('secp256k1')
const SHA256 = require("crypto-js/sha256")


class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress
    this.toAddress = toAddress
    this.amount = amount
    this.timestamp=Date.now()
  }
  calculateHash(){
    return SHA256(this.fromAddress+this.toAddress+this.amount+this.timestamp).toString()
  }

  signTransaction(signingKey){
    if(signingKey.getPublic('hex')!== this.fromAddress){
      throw new Error('You cannot sign transaction from other wallet')
    }
    const hashTx =this.calculateHash()
    const sig=signingKey.sign(hashTx,'base64')
    this.signature=sig.toDER('hex')
  }

  isValid(){
    if(this.fromAddress===null) return true
    if(!this.signature||this.signature.length===0){
      throw new Error ("No signature in this transaction")
    }
    const publicKey =ec.keyFromPublic(this.fromAddress,'hex')
    return publicKey.verify(this.calculateHash(), this.signature)
  }
  
}

class Block {
  constructor(timestamp, transactions, previousHash = '') {
    //this.index=index;
    this.timestamp = timestamp
    this.previousHash = previousHash
    //this.data=data
    this.transactions = transactions
    this.hash = this.calculateHash()
    this.nonce = 0
  }
  calculateHash() {
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString()
  }
  mineBlock(difficulty) {
    let i = 0
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++
      i = this.nonce
      this.hash = this.calculateHash()
    }
    console.log('starting mine ....')
    console.log(' nonce XXXXXXXXX =>' + i)
    console.log('Block mined:' + this.hash)
  }
  hasValidTransactions(){
    for(const tx of this.transactions){
      if(!tx.isValid()){
        return false}
    }
    return true
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
    this.difficulty = 2
    this.pendingTransactions = []
    this.miningReward = 100
  }
  createGenesisBlock() {
    return new Block("01/01/2009", "Genesis block", 0)
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  // addBlock(newBlock){
  //   newBlock.previousHash=this.getLatestBlock().hash
  //   newBlock.mineBlock(this.difficulty)
  //   this.chain.push(newBlock)
  // }
  
  miningPendingTransactions(miningRewardAddress) {
    const rewardTX = new Transaction(null, miningRewardAddress, this.miningReward)
    this.pendingTransactions.push(rewardTX)

    let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash)

    block.mineBlock(this.difficulty)

    console.log('Block transaction successfully mines!')

    this.chain.push(block)
    this.pendingTransactions = []

  }

  addTransaction(transaction) {
    if(!transaction.fromAddress|| !transaction.toAddress){
      throw new Error('Transaction must include from and to address')
    }
    if(!transaction.isValid()){
      throw new Error('Cannot add invalid transaction to chain')
    }
    this.pendingTransactions.push(transaction)
  }

  getBalanceOfAddress(address) {
    let balance = 0
    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount
        }
        if (trans.toAddress === address){
          balance += trans.amount
        }
      }
    }
    return balance
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]
      if(!currentBlock.hasValidTransactions()){
        return false
      }
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }
    }
    return true
  }
}

module.exports.BlockChain = BlockChain
module.exports.Block = Block
module.exports.Transaction = Transaction