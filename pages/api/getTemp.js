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

export async function getTempHook(location){
    weather.find({search: location.locate, degreeType: 'C'}, dataProcessing)
    while (!(resultObject.data)){await new Promise(r => setTimeout(r, 1000));}
    await getAq(location.cord)
    result.data =   Object.assign(resultObject.data, resultObject2.data);
    return result.data
}

export default async function getTemp(req, res){
    await weather.find({search: req.body.locate, degreeType: 'C'}, dataProcessing)
    await getAq(req.body.cord)
    result.data =   Object.assign(resultObject.data, resultObject2.data);
   
    res.status(200).json(result.data)
}