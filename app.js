var express = require("express");
var multer = require("multer");
var dbconnect = require("./DBconnect");
var path = require("path");
var bodyParser = require("body-parser");
var csv = require("csvtojson");
var xlsx = require("xlsx");
var fs = require("fs");
const studentSchema = require("./Schemas/studentModel");
const facultySchema = require("./Schemas/facultyModel");
const academicSchema = require("./Schemas/academicModel");
const higher_study_Schema =require("./Schemas/higher_study_Model");
const hall_magazine_Schema = require("./Schemas/hall_magazines");
const eventAttendedSchema = require("./Schemas/eventAttendedModel");
const internshipSchema = require("./Schemas/internshipModel");
const publicationSchema =require("./Schemas/students_publications_model");
const placementSchema = require("./Schemas/placementModel");
const workshopSchema = require("./Schemas/workshopModel");
const eventOrganizedSchema = require("./Schemas/eventOrganizedModel"); 
var fastcsv = require("fast-csv");

const { response } = require("express");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var mainDBurl = "mongodb://localhost:27017/Maindb";

var uploads = multer({ storage: storage });
dbconnect.mongoConnect(mainDBurl);

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "public")));



app.get("/studentpage", (req, res) => {
  studentSchema.find({}, (err, data) => {
    if (err) {
    } else {
      if (data != "") {
        res.render("studentpage", { data: data });
        
      } else {
       
        res.render("studentpage", { data: "" });
      }
    }
  });
});

app.get("/studentacedmic", (req, res) => {
  studentSchema.find({}, (err, data) => {
    if (err) {
    } else {
      if (data != "") {
        res.render("studentacedmic", { data: data });
        
      } else {
       
        res.render("studentacedmic", { data: "" });
      }
    }
  });
});
app.get("/facultypage", (req, res) => {
  facultySchema.find({}, (err, data) => {
    if (err) {
    } else {
      if (data != "") {
        res.render("facultypage", { data: data });
        
      } else {
       
        res.render("facultypage", { data: "" });
      }
    }
  });
});


app.get("/", (req, res) => {
  res.render("home");
});

app.get("/stdexp", (req, res) => {
  res.render("export");
});

app.post("/studentInfo/exportcsv", async (req, res) => {
  try {
    await studentSchema
      .find(
        {},
        {
          _id: 0,
          name: 1,
          enrollment: 1,
          facultyNum: 1,
          mother: 1,
          addrCorresponding: 1,
          Email: 1,
          hall: 1,
          dob: 1,
          nationality: 1,
        }
      )
      .then((result) => {
        if (result.length > 0) {
          let response = JSON.parse(JSON.stringify(result));

          let path = "./download/file.csv";
          let ws = fs.createWriteStream(path, function (err) {
            if (err) throw err;
            res.send("Data Exported");
          });

          fastcsv.write(response).pipe(ws);

          res.download(path, "StudentInfofile.csv");
        } else {
          res.send("NO DATA");
        }
      });
  } catch (error) {
    res.send("Error ");
  }
});

app.post("/studentINFO/exportxl", async (req, res) => {
  try {
    await studentSchema
      .find(
        {},
        {
          _id: 0,
          name: 1,
          enrollment: 1,
          facultyNum: 1,
          mother: 1,
          addrCorresponding: 1,
          Email: 1,
          hall: 1,
          dob: 1,
          nationality: 1,
        }
      )
      .then((result) => {
        if (result.length > 0) {
          let response = JSON.parse(JSON.stringify(result));

          // create new workbook
          let workbook = xlsx.utils.book_new();
          // create new worksheet
          let worksheet = xlsx.utils.json_to_sheet(response);
          // append sheet to workbook
          xlsx.utils.book_append_sheet(workbook, worksheet, "studentInfo");

          let path = "./download/file.xlsx";
          xlsx.writeFile(workbook, path);
          res.download(path, "StudentInfofile.xlsx");
        } else {
          res.send("No Data");
        }
      });
  } catch (error) {
    res.send("Error ");
  }
});

var studentResponse;
app.post(
  "/studentINFO/importcsv",
  uploads.single("csvFile"),
  async (req, res, next) => {
    try {
      csv()
      .fromFile(req.file.path)
      .then((jsonObj) => {
        for (var x = 0; x < jsonObj; x++) {
          studentResponse = parseFloat(jsonObj[x].name);
          console.log("sr num =" + jsonObj[x].srNum);
          jsonObj[x].name = studentResponse;
          studentResponse = parseFloat(jsonObj[x].enrollment);
          jsonObj[x].enrollment = studentResponse;
          studentResponse = parseFloat(jsonObj[x].facultyNum);
          jsonObj[x].facultyNum = studentResponse;
          studentResponse = parseFloat(jsonObj[x].father);
          jsonObj[x].father = studentResponse;
          studentResponse = parseFloat(jsonObj[x].mother);
          jsonObj[x].mother = studentResponse;
          studentResponse = parseFloat(jsonObj[x].addrPermanent);
          jsonObj[x].addrPermanent = studentResponse;
          studentResponse = parseFloat(jsonObj[x].addrCorresponding);
          jsonObj[x].addrCorresponding = studentResponse;
          studentResponse = parseFloat(jsonObj[x].studNum);
          jsonObj[x].studNum = studentResponse;
          studentResponse = parseFloat(jsonObj[x].Email);
          jsonObj[x].Email = studentResponse;
          studentResponse = parseFloat(jsonObj[x].fatherNum);
          jsonObj[x].fatherNum = studentResponse;
          studentResponse = parseFloat(jsonObj[x].hall);
          jsonObj[x].hall = studentResponse;
          studentResponse = parseFloat(jsonObj[x].dob);
          jsonObj[x].dob = studentResponse;
          studentResponse = parseFloat(jsonObj[x].nationality);
          jsonObj[x].nationality = studentResponse;
        }

        studentSchema.insertMany(jsonObj, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/studentpage");
            console.log("successfull");
          }
        });
      });
      
    } catch (error) {
      res.redirect("/studentpage");
    }
    
  }
);

app.post(
  "/studentINFO/importxl",
  uploads.single("xlFile"),
  async (req, res, next) => {
    try {
      var xlFile = xlsx.readFile(req.file.path);

    var sheet = xlFile.Sheets[xlFile.SheetNames[0]];

    var jsArray = xlsx.utils.sheet_to_json(sheet);
    console.log(jsArray);
    await studentSchema.insertMany(jsArray).then((result) => {
      if (result.length > 0) {
        console.log("inserted " + result.length);
        res.redirect("/");
      } else {
        console.log("error 404");
      }
    });
    console.log(xlFile.SheetNames[0]);
      
    } catch (error) {
      res.redirect("/studentpage");
      
    }
    
  }
);

app.post(
  "/studentAcademic/importxl",
  uploads.single("xlFile"),
  async (req, res, next) => {
    var xlFile = xlsx.readFile(req.file.path);

    var sheet = xlFile.Sheets[xlFile.SheetNames[0]];
    var jsArray = xlsx.utils.sheet_to_json(sheet);

    await academicSchema.insertMany(jsArray).then((result) => {
      if (result.length > 0) {
        console.log("inserted " + result.length);
        res.redirect("/");
      } else {
        console.log("error 404");
      }
    });
  }
);

var temp;
app.post(
  "/studentAcademic/importcsv",
  uploads.single("csvFile"),
  async (req, res, next) => {
    csv()
      .fromFile(req.file.path)
      .then((jsonObj) => {
        for (var x = 0; x < jsonObj; x++) {
          temp = parseFloat(jsonObj[x].name);
          jsonObj[x].name = temp;
          temp = parseFloat(jsonObj[x].enrollment);
          jsonObj[x].enrollment = temp;
          temp = parseFloat(jsonObj[x].facultyNum);
          jsonObj[x].facultyNum = temp;
          temp = parseFloat(jsonObj[x].branch_Of_Engg);
          jsonObj[x].branch_Of_Engg = temp;
          temp = parseFloat(jsonObj[x].subject_code);
          jsonObj[x].subject_code = temp;
          temp = parseFloat(jsonObj[x].hall);
          jsonObj[x].hall = temp;
          temp = parseFloat(jsonObj[x].Spi);
          jsonObj[x].Spi = temp;
          temp = parseFloat(jsonObj[x].Cpi);
          jsonObj[x].Cpi = temp;
          temp = parseFloat(jsonObj[x].EC);
          jsonObj[x].EC = temp;
          temp = parseFloat(jsonObj[x].result);
          jsonObj[x].result = temp;
        }

        // console.log(typeof jsonObj);

        academicSchema.insertMany(jsonObj, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/");
            console.log("successfull");
          }
        });
      });
  }
);

var facultyResponse;
app.post(
  "/facultyINFO/importcsv",
  uploads.single("csvFile"),
  async (req, res, next) => {
    csv()
      .fromFile(req.file.path)
      .then((response) => {
        for (var x = 0; x < response; x++) {
          facultyResponse = parseFloat(response[x].srNum);
          response[x].srNum = facultyResponse;
          facultyResponse = parseFloat(response[x].name);
          response[x].name = facultyResponse;
          facultyResponse = parseFloat(response[x].empID);
          response[x].empID = facultyResponse;
          facultyResponse = parseFloat(response[x].PAN);
          response[x].PAN = facultyResponse;
          facultyResponse = parseFloat(response[x].adhaarNum);
          response[x].adhaarNum = facultyResponse;
          facultyResponse = parseFloat(response[x].highestDegree);
          response[x].highestDegree = facultyResponse;
          facultyResponse = parseFloat(response[x].degreeDate);
          response[x].degreeDate = facultyResponse;
          facultyResponse = parseFloat(response[x].specializatio);
          response[x].specializatio = facultyResponse;
          facultyResponse = parseFloat(response[x].currentDesignation);
          response[x].currentDesignation = facultyResponse;
          facultyResponse = parseFloat(response[x].dateOfDesignationAsProff);
          response[x].dateOfDesignationAsProff = facultyResponse;
          facultyResponse = parseFloat(response[x].dateOfJoining);
          response[x].dateOfJoining = facultyResponse;
        }
        facultySchema.insertMany(response, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/facultypage");
            console.log("Successful");
          }
        });
      });
  }
);

app.post(
  "/facultyINFO/importxl",
  uploads.single("xlFile"),
  async (req, res, next) => {
    var xlFile = xlsx.readFile(req.file.path);

    var sheet = xlFile.Sheets[xlFile.SheetNames[0]];
    var jsArray = xlsx.utils.sheet_to_json(sheet);

    await facultySchema.insertMany(jsArray).then((result) => {
      if (result.length > 0) {
        console.log("inserted " + result.length);
        res.redirect("/facultypage");
      } else {
        console.log("error 404");
      }
    });
  }
);

app.post(
  "/students_record/higher_study/import_xl",
  uploads.single("xlFile"),
  async (req, res, next) => {
    var xlFile = xlsx.readFile(req.file.path);

    var sheet = xlFile.Sheets[xlFile.SheetNames[0]];
    var jsArray = xlsx.utils.sheet_to_json(sheet);

    await higher_study_Schema.insertMany(jsArray).then((result) => {
      if (result.length > 0) {
        console.log("inserted " + result.length);
        res.redirect("/");
      } else {
        console.log("error 404");
      }
    });
  }
);
app.post(
  "/students_record/placement/import_xl",
  uploads.single("xlFile"),
  async (req, res, next) => {
    var xlFile = xlsx.readFile(req.file.path);

    var sheet = xlFile.Sheets[xlFile.SheetNames[0]];
    var jsArray = xlsx.utils.sheet_to_json(sheet);

    await placementSchema.insertMany(jsArray).then((result) => {
      if (result.length > 0) {
        console.log("inserted " + result.length);
        res.redirect("/");
      } else {
        console.log("error 404");
      }
    });
  }
);
app.post(
  "/students_record/publication/import_xl",
  uploads.single("xlFile"),
  async (req, res, next) => {
    var xlFile = xlsx.readFile(req.file.path);

    var sheet = xlFile.Sheets[xlFile.SheetNames[0]];
    var jsArray = xlsx.utils.sheet_to_json(sheet);

    await publicationSchema.insertMany(jsArray).then((result) => {
      if (result.length > 0) {
        console.log("inserted " + result.length);
        res.redirect("/");
      } else {
        console.log("error 404");
      }
    });
  }
);
app.post(
  "/students_record/internship/import_xl",
  uploads.single("xlFile"),
  async (req, res, next) => {
    var xlFile = xlsx.readFile(req.file.path);

    var sheet = xlFile.Sheets[xlFile.SheetNames[0]];
    var jsArray = xlsx.utils.sheet_to_json(sheet);

    await internshipSchema.insertMany(jsArray).then((result) => {
      if (result.length > 0) {
        console.log("inserted " + result.length);
        res.redirect("/");
      } else {
        console.log("error 404");
      }
    });
  }
);
app.post(
  "/students_record/workshops/import_xl",
  uploads.single("xlFile"),
  async (req, res, next) => {
    var xlFile = xlsx.readFile(req.file.path);

    var sheet = xlFile.Sheets[xlFile.SheetNames[0]];
    var jsArray = xlsx.utils.sheet_to_json(sheet);

    await workshopSchema.insertMany(jsArray).then((result) => {
      if (result.length > 0) {
        console.log("inserted " + result.length);
        res.redirect("/");
      } else {
        console.log("error 404");
      }
    });
  }
);

app.post(
  "/students_record/hall_magazine/import_xl",
  uploads.single("xlFile"),
  async (req, res, next) => {
    var xlFile = xlsx.readFile(req.file.path);

    var sheet = xlFile.Sheets[xlFile.SheetNames[0]];
    var jsArray = xlsx.utils.sheet_to_json(sheet);

    await hall_magazine_Schema.insertMany(jsArray).then((result) => {
      if (result.length > 0) {
        console.log("inserted " + result.length);
        res.redirect("/");
      } else {
        console.log("error 404");
      }
    });
  }
);
app.post(
  "/students_record/event_org/import_xl",
  uploads.single("xlFile"),
  async (req, res, next) => {
    var xlFile = xlsx.readFile(req.file.path);

    var sheet = xlFile.Sheets[xlFile.SheetNames[0]];
    var jsArray = xlsx.utils.sheet_to_json(sheet);

    await eventOrganizedSchema.insertMany(jsArray).then((result) => {
      if (result.length > 0) {
        console.log("inserted " + result.length);
        res.redirect("/");
      } else {
        console.log("error 404");
      }
    });
  }
);

app.post(
  "/students_record/event_atten/import_xl",
  uploads.single("xlFile"),
  async (req, res, next) => {
    var xlFile = xlsx.readFile(req.file.path);

    var sheet = xlFile.Sheets[xlFile.SheetNames[0]];
    var jsArray = xlsx.utils.sheet_to_json(sheet);

    await eventAttendedSchema.insertMany(jsArray).then((result) => {
      if (result.length > 0) {
        console.log("inserted " + result.length);
        res.redirect("/");
      } else {
        console.log("error 404");
      }
    });
  }
);

var port = process.env.PORT || 5500;
app.listen(port, () => console.log("Page connected on: " + port));
