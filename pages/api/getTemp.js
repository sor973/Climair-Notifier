var weather = require('weather-js');
const resultObject = {}


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

export default function getTemp(req, res){
    weather.find({search: 'Bankok, Thailand', degreeType: 'C'}, dataProcessing)
    console.log(resultObject.data);
    res.status(200).json(resultObject.data)
}
