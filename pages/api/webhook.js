const request = require('request');
const {getTempHook} = require('./getTemp')
const Mongocli = require('mongodb').MongoClient;

export default async (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let lineId = req.body.events[0].source.userId
    console.log(lineId);
    let msg = req.body.events[0].message.text
    reply(reply_token, msg, lineId)
    res.status(200)
}

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

async function updateLineId(user, token){
    const MongoURL = 'mongodb://cpre_ubicom:7M72J9M3RFx29s75@192.168.42.201:27017/?authSource=cpreauth&readPreference=primary&appname=MongoDB+Compass&directConnection=true&ssl=false'
    const MongoOption = {
        tlsAllowInvalidCertificates: true,
        useUnifiedTopology: true
    };
    const cli = new Mongocli(MongoURL,MongoOption);
    await cli.connect()
    let users = []
    await cli.db('ubicom').collection('userdatabase').updateOne(
        {
            token:token
        },
        {
            $set:{lineId: user}
        }
    )
}

async function reply(reply_token, msg, lineId) {
    let TOKEN = "WwdL+wbqpyoZ6WPXFrA10+koTCU7pkin+35Mg+UoghguM9AG4Kv6/PzVRz7oUTxGQPeD2qt5jyFpzcWiemeRUGlM2gFtlcBhPZSxtGH7yjx9Grc/CxeVq1Gh4r+VeLateDsWRUzLaz55vKCqpLY7MQdB04t89/1O/w1cDnyilFU="
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
    }
    const users = await getUser();
    let textReply = 'มีอะไรให้ช่วยคะ';
    let location = {
        locate: 'Ubonratchatani, Thailand',
        cord: { lat: 15.23844, long: 104.84866 }
    }
    for (const user of users){
        if(msg == user.token){
            try{
                await updateLineId(lineId, msg)
                textReply = "update lineid ของคุณเรียบร้อยค่ะ"
            }catch(err){
                console.log(err);
            }
            break;
        }
        if(reply_token===user.lineId && user.location !== undefined){
           location = user.location
        }
    }
    let data = await getTempHook(location) 
    if (msg === "pm2.5"){
        textReply = data['pm25']
    }
    else if (msg === "temp"){
        textReply = `${data['current']['temp']} C`
    }
    console.log(reply_token);
    let reply = {
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text:textReply,
            "quickReply" : {
                "items":[
                    {
                        type: "action",
                        action:{
                            type: "message",
                            label: "pm2.5",
                            text: "pm2.5"
                        }
                    },
                    {
                        type: "action",
                        action:{
                            type: "message",
                            label: "temp",
                            'text':'temp'
                        }
                    }
                ]
            }
        }]
    }
    let body = JSON.stringify(reply)
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
        console.log('status = ' + body);
    });
}