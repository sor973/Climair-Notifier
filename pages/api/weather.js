const { AirThai } = require("air-thai-api")


export default async function handler(req, res){
    const result = await AirThai({ lat: 13.670809600000002, long: 100.6501888 })
    res.json(result)
}
