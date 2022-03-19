const{BlockChain,Block,Transaction}=require('./blockchain3.js')

let TalCoin=new BlockChain()

 TalCoin.creatTransaction(new Transaction('address1','address2',100))  
 TalCoin.creatTransaction(new Transaction('address2', 'address1', 50))
TalCoin.creatTransaction(new Transaction('address2', 'Bob', 50))
console.log('\n Stating  mine ....')
TalCoin.miningPendingTransactions('Bob')

console.log('\n balance of Bob '+ TalCoin.getBalanceOfAddress('Bob'))