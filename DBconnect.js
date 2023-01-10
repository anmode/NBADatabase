
const mongoose = require("mongoose");
function mongoConnect(url) {
    mongoose.connect(url, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("MongoDB is Connected to "+url);
        }
    });
}
exports.mongoConnect = mongoConnect;