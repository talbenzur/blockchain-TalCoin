const{BlockChain,Block}=require('./blockchain.js')

let TalCoin=new BlockChain()
TalCoin.addBlock(new Block(1,"01/01/2022",{amount:4}))
TalCoin.addBlock(new Block(1, "01/01/2022", {
    amount: 8
}))
console.log(JSON.stringify(TalCoin,null,4))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        