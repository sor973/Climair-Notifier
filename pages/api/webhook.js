import {getTemp} from './getTemp'
import {getAq} from './getAq'
const request = require('request');

export default async (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    reply(reply_token, msg)
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

async function updateLineId(reply_token, token){
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
            $set:{lineId: reply_token}
        }
    )
}

async function reply(reply_token, msg) {
    let TOKEN = "WwdL+wbqpyoZ6WPXFrA10+koTCU7pkin+35Mg+UoghguM9AG4Kv6/PzVRz7oUTxGQPeD2qt5jyFpzcWiemeRUGlM2gFtlcBhPZSxtGH7yjx9Grc/CxeVq1Gh4r+VeLateDsWRUzLaz55vKCqpLY7MQdB04t89/1O/w1cDnyilFU="
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
    }
    let users = await getUser();
    let textReply = 'มีอะไรให้ช่วยคะ';
    for (const user of users){
        if(msg === user.token){
            await updateLineId(reply_token, token)
            textReply = "update lineid ของคุณเรียบร้อยค่ะ"
            break;
        }
    }
    if (msg === "pm2.5"){
        const data = await getAq()
        textReply = data['pm25']
    }
    else if (msg === "temp"){
        const data = await getTemp();
        console.log(data);
        textReply = `${data['current']['temp']} C`
    }
    console.log(textReply);
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