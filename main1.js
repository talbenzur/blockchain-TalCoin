const{BlockChain,Block}=require('./blockchain1.js')

let TalCoin=new BlockChain()
TalCoin.addBlock(new Block(1,"01/01/2022",{amount:4}))
TalCoin.addBlock(new Block(2, "01/01/2022", {
    amount: 8
}))
console.log('Blockchain valid ?' + TalCoin.isChainValid())

console.log('Change ...')
TalCoin.chain[1].data={amount:100}

console.log('Blockchain valid ?' + TalCoin.isChainValid())

TalCoin.chain[1].hash= TalCoin.chain[1].calculateHash()

console.log('Blockchain valid ?' + TalCoin.isChainValid())
TalCoin.chain[1].data = {
    amount: 4
}

TalCoin.chain[1].hash = TalCoin.chain[1].calculateHash()
console.log('Blockchain valid ?' + TalCoin.isChainValid())
console.log(JSON.stringify(TalCoin,null,4))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        