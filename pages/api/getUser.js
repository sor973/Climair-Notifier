export default async function getTemp(req, res) {
    console.log(req.body)
    
    res.status(200).json('ok')
    
}