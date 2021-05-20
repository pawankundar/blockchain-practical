const SHA256 = require('crypto-js/sha256')



class CryptoBlock {
    constructor (index,timestamp,data,precedingHash = ""){
        this.index = index
        this.timestamp = timestamp
        this .data  = data
        this.precedingBlock = precedingHash
        this.hash = this.computeHash()
        this.nonce = 0

    }

    computeHash (){
        return SHA256(
            this.index +
            this.precedingHash+
            this.timestamp+
            JSON.stringify(this.data)+
            this.nonce
        ).toString()
    }
    proofOfWork(difficulty){
        while(
            this.hash.substring(0,difficulty) !== Array(difficulty + 1).join('0')
        ){
            this.nonce++
            this.hash = this.computeHash()
        }
    }
}







class CryptoBlockchain {
    constructor(){
        this.blockchain = [this.startGenesisBlock()];   
        this.difficulty = 4;
    }
    startGenesisBlock(){
        return new CryptoBlock(0,"01/01/2020","initial block in the chain","0")
    }

    obtainLatestBlock(){
        return this.blockchain[this.blockchain.length -1]
    }

    addNewBlock(newBlock){
        newBlock.precedingHash = this.obtainLatestBlock().hash
        newBlock.proofOfWork(this.difficulty)
        this.blockchain.push(newBlock)
    }

    checkChainValidity(){
        for(let i = 1;i< this.blockchain.length;i++){
            const currentBlock = this.blockchain[i]
            const precedingBlock = this.blockchain[i-1]

            if(currentBlock.hash !== currentBlock.computeHash()){
                return false
            }

            if(currentBlock.precedingHash !== precedingBlock.hash) return false
        }
        return true
    }
}

let BhaveshCoin = new CryptoBlockchain()

console.log('BhaveshCoin  Mining is in progress..........')


BhaveshCoin.addNewBlock(
    new CryptoBlock(1,"01/04/2020",{
        sender : "Bhavesh Suthar",
        recipient : 'josiah rodrigues',
        quantity : 5000
    })
)

BhaveshCoin.addNewBlock(
    new CryptoBlock(2,"11/05/2021",{
        sender:'Pawan Kundar',
        recipient : 'Josiah Rodrigues',
        quantity:500
    })
)


console.log(JSON.stringify(BhaveshCoin,null,4))