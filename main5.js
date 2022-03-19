const{BlockChain,Block,Transaction}=require('./blockchain4.js')

const EC=require('elliptic').ec
const ec=new  EC('secp256k1')

const myKey=ec.keyFromPrivate('db2899792e6ffd087cbd8ae16d056ae047f7a60496fc27ef3d49a2e8acfa329d')
const myWalletAddress=myKey.getPublic('hex')


let TalCoin=new BlockChain()

const tx1=new Transaction(myWalletAddress,'address1', 100)
tx1.signTransaction(myKey)
TalCoin.addTransaction(tx1)

TalCoin.miningPendingTransactions(myWalletAddress)



console.log('\n balance of my wallet '+ TalCoin.getBalanceOfAddress(myWalletAddress))