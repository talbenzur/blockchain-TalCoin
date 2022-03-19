const{BlockChain,Block}=require('./blockchain2.js')

let TalCoin=new BlockChain()

console.log('Mining block 1 ...')

TalCoin.addBlock(new Block(1,"01/01/2022",{amount:4}))

console.log('Mining block 1 ...')
TalCoin.addBlock(new Block(2, "01/01/2022", {
    amount: 8
}))
 
console.log('Blockchain valid ?' + TalCoin.isChainValid())
console.log(JSON.stringify(TalCoin,null,4))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        