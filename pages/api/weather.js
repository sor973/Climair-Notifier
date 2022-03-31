const { AirThai } = require("air-thai-api")
var weather = require('weather-js');


export default async function handler(req, res){
    const data = await AirThai({ lat: 13.670809600000002, long: 100.6501888 })
//     weather.find({search: 'Bankok', degreeType: 'C'}, function(err, result) {
//   if(err) console.log(err);
 
//   res.json(JSON.stringify(result, null, 2));
// });
    res.json(data)
}
