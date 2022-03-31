const { AirThai } = require("air-thai-api")
var weather = require('weather-js');
const resultObject = {}

async function  getAq(){
    const rawData = await AirThai({ lat: 13.670809600000002, long: 100.6501888 })
    const data = {
        'pm25': rawData['AQILast']['PM25']['value'],
        'pm10': rawData['AQILast']['PM10']['value'],
        'aqi': rawData['AQILast']['AQI']['aqi']
    }
    return data
}

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

function getTemp(){
    weather.find({search: 'Bankok, Thailand', degreeType: 'C'}, dataProcessing)
    return resultObject.data
}

export default async function handler(req, res){
    // const data = await getAq()
    const data = getTemp();

    res.json(data)
}
