const XLSX = require("xlsx");
const http = require("http");
const formidable = require("formidable");
var mongoose = require('mongoose');
var path = require('path');
var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var studentSchema = require('./studentModel');
studentPage.set('view engine', 'ejs');

var uploads = multer({ storage: storage });
mongoose
    .connect('mongodb://localhost:27017/Studentdb', { useNewUrlParser: true })
    .then(() => console.log('Connected'))
    .catch((err) => console.log(err))

var studentPage = express();

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});

studentPage.use(bodyParser.urlencoded({extended:false}));
studentPage.use(express.static(path.resolve(__dirname,'public')));
studentPage.get('/', (req, res) => {
    studentSchema.find((err, data) => {
        if (err) {
        } else {
            if (data != '') {
                res.render('index', { data: data })
            } else {
                res.render('index', { data: '' })
            }
        }
    })
})

const server = http.createServer((req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    /* grab the first file */
    const f = Object.entries(files)[0][1];
    const path = f.filepath;
    const workbook = XLSX.readFile(path);
    
    var studentResponse
studentPage.post('/', uploads.single('csvFile'), (req, res) => {
    csv()
        .fromFile(req.file.path)
        .then((response) => {
            for (var x = 0; x < response; x++) {
                studentResponse = parseInt(response[x].srNum)
                response[x].srNum = studentResponse
                studentResponse = parseFloat(response[x].name)
                response[x].name = studentResponse
                studentResponse = parseFloat(response[x].enrollment)
                response[x].enrollment = studentResponse
                studentResponse = parseFloat(response[x].facultyNum)
                response[x].facultyNum = studentResponse
                studentResponse = parseFloat(response[x].father)
                response[x].father = studentResponse
                studentResponse = parseFloat(response[x].mother)
                response[x].mother = studentResponse
                studentResponse = parseFloat(response[x].addrPermanent)
                response[x].addrPermanent = studentResponse
                studentResponse = parseFloat(response[x].addrCorresponding)
                response[x].addrCorresponding = studentResponse
                studentResponse = parseFloat(response[x].studNum)
                response[x].studNum = studentResponse
                studentResponse = parseFloat(response[x].Email)
                response[x].Email = studentResponse
                studentResponse = parseFloat(response[x].fatherNum)
                response[x].fatherNum = studentResponse
                studentResponse = parseFloat(response[x].hall)
                response[x].hall = studentResponse
                studentResponse = parseFloat(response[x].dob)
                response[x].dob = studentResponse
                studentResponse = parseFloat(response[x].nationality)
                response[x].nationality = studentResponse
                studentResponse = perseINT(response.srNun)
            }
            studentSchema.insertMany(response, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    res.redirect('/')
                }
            })
        })
})
  });
}).listen(process.env.PORT || 7262);











var port = process.env.PORT || 5555
studentPage.listen(port, () => console.log('Student Page connected on: ' + port))