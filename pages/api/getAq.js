const { AirThai } = require("air-thai-api")
export default async function getAq(req, res){
    const rawData = await AirThai({ lat: 13.670809600000002, long: 100.6501888 })
    const data = {
        'pm25': rawData['AQILast']['PM25']['value'],
        'pm10': rawData['AQILast']['PM10']['value'],
        'aqi': rawData['AQILast']['AQI']['aqi']
    }
    res.status(200).json(data)
}