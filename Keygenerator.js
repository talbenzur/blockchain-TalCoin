const EC=require('elliptic').ec

const ec=new  EC('secp256k1')

const key=ec.genKeyPair()
const  publicKey=key.getPublic('hex')
const  privatekey = key.getPrivate('hex')

console.log('\n Your public key(also your wallet address,free shareable)\n ',publicKey)

console.log('\n\n')
console.log('Your private key (keep this secret! To sign transaction)\n',privatekey)
