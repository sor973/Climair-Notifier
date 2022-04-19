const line = require('@line/bot-sdk');
const Mongocli = require('mongodb').MongoClient;
const request = require('request')
var weather = require('weather-js');
const { AirThai } = require("air-thai-api")

const resultObject = {}
const resultObject2 = {}
const result = {}

function dataProcessing(err, result){
    if(err) return {}
    const rawData = result[0]
    const data = {
        'location' : rawData['location']['name'],
        'current':{
            'temp' : rawData['current']['temperature'],
            'date' : rawData['current']['date'],
            'winddisplay' : rawData['current']['winddisplay'],
            'humidity' : rawData['current']['humidity'],
            'feelslike' : rawData['current']['feelslike'],
            'skytext' : rawData['current']['skytext'],
            'day' : rawData['current']['day']
        },
        'forecast': rawData['forecast']
    }
    resultObject.data = data
}

async function getAq(cord){
    const rawData = await AirThai(cord)
    const airdata = {
        'pm25': rawData['AQILast']['PM25']['value'],
        'pm10': rawData['AQILast']['PM10']['value'],
        'aqi': rawData['AQILast']['AQI']['aqi']
    }
    resultObject2.data = airdata
}

async function getTempHook(location){
    weather.find({search: location.locate, degreeType: 'C'}, dataProcessing)
    while (!(resultObject.data)){await new Promise(r => setTimeout(r, 1000));}
    await getAq(location.cord)
    result.data =   Object.assign(resultObject.data, resultObject2.data);
    return result.data
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
console.log('alarm start');

var cron = require('node-cron');
cron.schedule('0 7 * * *', async function(){
    const client = new line.Client({
        channelAccessToken: 'WwdL+wbqpyoZ6WPXFrA10+koTCU7pkin+35Mg+UoghguM9AG4Kv6/PzVRz7oUTxGQPeD2qt5jyFpzcWiemeRUGlM2gFtlcBhPZSxtGH7yjx9Grc/CxeVq1Gh4r+VeLateDsWRUzLaz55vKCqpLY7MQdB04t89/1O/w1cDnyilFU='
    });
    let users = await getUser()
    let location = {
        locate: 'Ubonratchatani, Thailand',
        cord: { lat: 15.23844, long: 104.84866 }
    }
    console.log('before for');
    for (const user of users){
        console.log(user.lineId);
        if (user.location !== undefined){
           location = user.location 
        }
        if (user.lineId === undefined){
            continue
        }
        let data = await getTempHook(location) 
        console.log(user.lineId);
        console.log(`location: ${data['location']} \npm2.5: ${data['pm25']}\ntemp: ${data['current']['temp']}`);
        const tempMessage = {
            type: 'text',
            text: `location: ${data['location']} \npm2.5: ${data['pm25']}\ntemp: ${data['current']['temp']}`
        };
        try{
            await client.pushMessage(user.lineId, tempMessage)
        }catch(err){
            console.log(err);
        }
    }
});