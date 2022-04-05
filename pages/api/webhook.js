import {getTemp} from './getTemp'
import {getAq} from './getAq'
const request = require('request');

export default async (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    reply(reply_token, msg)
    res.status(200)
}

async function reply(reply_token, msg) {
    let TOKEN = "WwdL+wbqpyoZ6WPXFrA10+koTCU7pkin+35Mg+UoghguM9AG4Kv6/PzVRz7oUTxGQPeD2qt5jyFpzcWiemeRUGlM2gFtlcBhPZSxtGH7yjx9Grc/CxeVq1Gh4r+VeLateDsWRUzLaz55vKCqpLY7MQdB04t89/1O/w1cDnyilFU="
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
    }
    let textReply = 'มีอะไรให้ช่วยคะ';
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