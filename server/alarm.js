const line = require('@line/bot-sdk');
const Mongocli = require('mongodb').MongoClient;
const request = require('request')

async function getUser(){
    const MongoURL = 'mongodb://cpre_ubicom:7M72J9M3RFx29s75@192.168.42.201:27017/?authSource=cpreauth&readPreference=primary&appname=MongoDB+Compass&directConnection=true&ssl=false'
    const MongoOption = {
        tlsAllowInvalidCertificates: true,
        useUnifiedTopology: true
    };
    const cli = new Mongocli(MongoURL,MongoOption);
    await cli.connect()
    let users = []
    await cli.db('ubicom').collection('userdatabase').find({}).forEach((doc)=>{
        users.push(doc)
    });
    return users
}

var cron = require('node-cron');
cron.schedule('0 0 7 * *', async function(){
    const client = new line.Client({
        channelAccessToken: 'WwdL+wbqpyoZ6WPXFrA10+koTCU7pkin+35Mg+UoghguM9AG4Kv6/PzVRz7oUTxGQPeD2qt5jyFpzcWiemeRUGlM2gFtlcBhPZSxtGH7yjx9Grc/CxeVq1Gh4r+VeLateDsWRUzLaz55vKCqpLY7MQdB04t89/1O/w1cDnyilFU='
    });
    let users = await getUser()
    let location = {
        ubon: {
        locate: 'Ubonratchatani, Thailand',
        cord: { lat: 15.23844, long: 104.84866 }
        }
    }
    for (const user of users){
        if (!user.location === undefined){
           location = user.location 
        }
        if (!user.lineId === undefined){
            continue
        }
        const response = await fetch("/api/getTemp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(location),
        });
        const data = await response.json();
        const tempMessage = {
            type: 'text',
            text: `location: ${data['location']} \npm2.5: ${data['pm25']}\ntemp: ${data['current']['temp']}`
        };
        try{
            await client.replyMessage(user.lineId, tempMessage)
        }catch(err){
            console.log(err);
        }
    }
});