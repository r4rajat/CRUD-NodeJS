const  express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config()

const userRoutes = require('./routes/users')

const app = express()

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED....!")
}).catch(() => {
    console.log("ERROR CONNECTING DATABASE....!")
});

// Routes
app.use("/api", userRoutes);


const  port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App is Running on Port ${port}`)
})