var express = require ('express');
var app = express();

var mysql = require ('mysql');
//require fs white file
var bodyParser = require ('body-parser');
const multer = require('multer')
var fs = require('fs');
const path = require('path');
// const dir = path.join(__dirname, 'serveur');

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

const Storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, './images')
    },
    filename(req, file, callback) {
      callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    },
  })

// const Storage = multer.memoryStorage();

const upload = multer({ storage: Storage });

var con = mysql.createConnection({
    host:'localhost',
    port:'8889',
    user:'root',
    password:'root',
    database:'facture'
})

var server = app.listen(4549, function(){
    var host= server.address().address
    var port= server.address().port
})
// app.use(express.static(dir))

con.connect(function(error){
    if(error) console.log(error);
    else console.log("connected")
})

app.get('/',function(req,res){
    con.query('select * from facture',function(error,rows,fields){
        if(error) console.log(error)

        else {
            // console.log(rows);
            res.send(rows)
        }
    })
})
app.get('/image',function(req,res){
   //fs.readFileSync
   //envoyer l'image l'url /image
//    reussir a afficher l'image
// envoyer l'image du coté serveur au client http://172.20.10.2:4549/image/images/photo_1620817764219_C99FC950-63E7-45CF-AFFE-FEB5C4ED30B0.jpg
//route parametrer http:/image/{url}

})
app.get("/media",(req,res,next)=>{
    const pathh = path.dirname(require.main.filename)
    console.log(pathh,req.query.id)
    try{
        res.sendFile(pathh+"/"+req.query.id);
    }catch{
        res.sendFile(pathh+"/photo_1620812850550_C33754A9-AE29-4E42-AB8A-F905661F7C75.jpg")
    }
    
})
app.post('/create',upload.array('photo', 3), function(req, res) {
    // console.log(req.body);
    console.log(req)
    let nom = req.body.nom;
    let montant = req.body.montant;
    let date = req.body.date;
    let commentaire = req.body.commentaire;
    // let photoLibrary = {file:req.files[0].buffer,file_size:req.files[0].buffer.length,file_type:'img'};
    const photoLibrary = req.files[0].path;
    // let photoLibrary = req.body.photoLibrary;

    console.log(req)
    // con.query("insert into facture (Nom, Montant,Date,Commentaire) " + 
    //  "values (?,?,?,?)"),
    //  [nom,montant,date,commentaire],
    // con.query("insert into `facture` (`Nom`, `Montant`,`Date`,`Commentaire`,`Image`) " + 
    //  "values ('"+ nom + "','" + montant + "','" + date + "','" + commentaire + "'," + photoLibrary + ")"),
    con.query("insert into facture set Nom = ?, Montant = ?, Date = ?, Commentaire = ?, Image= ?",
    [nom,montant,date,commentaire,photoLibrary],
     function(error,rows,fields){
     if(error) console.log(error)
        // else {
        //     console.log(rows);
        //     res.send(rows)
        // }
    }
    );
});

    app.post('/createImage', function(req, res) {
    
        let uploadData = req.body.uploadData;
        console.log(req.body);
        console.log(req)
        con.query("insert into `image` (`image`) values ('"+ uploadData + "')") ,function(error,rows,fields){
            if(error) console.log(error)
        
            else {
                console.log(rows);
                res.send(rows)
            }
        }
        });
