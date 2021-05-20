const prompt = require('cli-prompt')
const request =  require('request')

var satoshiToBtc = (value)=>{
    return value * 0.00000001
}

prompt('Enter the bitcoin address : ', (address)=>{
    var url = "https://blockchain.info/address/"+address+"?format=json"
    request(url,(error,resp,body)=>{
        if(!error && resp.statusCode ==200){
            var result = JSON.parse(body)
            console.log('Recieved' ,satoshiToBtc(result.total_received))
            console.log('Sent' ,satoshiToBtc(result.total_sent))
            console.log('Balance' ,satoshiToBtc(result.final_balance))
        }
        else{
            console.log("unable to find the address")
        }
    })
})