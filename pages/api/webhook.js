export default function webhook(req, res){
    if (req.method == 'POST'){
        if(req.body.events[0].type === "message"){
        }
    }
}