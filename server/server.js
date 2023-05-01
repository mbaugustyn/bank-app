import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dbConfig from './plsdontlook.js';
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
const PORT = 8000;

/* Database : */
app.post('/newtransfer', async (req, res) => {
    const userId = 1
    const firstName = req.body.firstName
    const surName = req.body.surName
    const accnr = req.body.accnr
    const amt = req.body.amt
    const title = req.body.title
    console.log("Request accnr:" + req.body.accnr)

    res.send(JSON.stringify({ "status": 200, "error": null, "response": "OK" }))

    var sql = require("mssql")
    // var dbConfig = dbdbConfig
    sql.connect(dbConfig, function (err) {
        if (err) console.log(err)
        var request = new sql.Request()
        request.input('userId', sql.Int, userId)
            .input('firstName', sql.NVarChar(50), firstName)
            .input('surName', sql.NVarChar(50), surName)
            .input('accnr', sql.NVarChar(50), accnr)
            .input('amt', sql.NVarChar(50), amt)
            .input('title', sql.NVarChar(50), title)
            .query('INSERT INTO Bank.[Transfers] (SenderID, Name, Surname, AccountNr, Amount, Title) VALUES  (@userId, @firstName, @surName, @accnr, @amt, @title)',
                function (err, recordset) {
                    if (err) console.log(err)
                })
    })
})

app.get('/', function (req, res) {
    res.send("Looking good!")
})


app.get('/transferhistory', function (req, res) {
    const sql = require("mssql")
    sql.connect(dbConfig, function (err) {
        if (err) console.log(err)
        const request = new sql.Request()
        request.query('SELECT * from Bank.[Transfers]', function (err, recordset) {
            if (err) console.log(err)
            res.send(recordset)
        })
    })
})

app.get('/authuser', async (req, res) => {
    const email = req.query.email
    const password = req.query.password
    console.log("Auth request for " + email + " " + password)
    const sql = require("mssql")
    sql.connect(dbConfig, function (err) {
        if (err) console.log(err)
        const connection = new sql.Request()
        connection.input('mail', sql.NVarChar(255), email)
            .input('password', sql.NVarChar(255), password)
            .query('SELECT ID FROM [Bank].[Users] WHERE email = @mail AND password = @password',
                function (err, rows) {
                    if (err) {
                        console.error("An error occurred:", err.message)
                        res.status(500).json({ status: 500, message: "An error occurred: " + err.message, id: -1 })
                    }
                    else {
                        if (rows.rowsAffected[0]) {
                            res.status(200).json({ status: 200, message: "User found successfully.", id: rows.recordset[0].ID })
                        } else {
                            res.status(404).send({ status: 404, message: "User not found.", id: -1 })
                        }
                    }
                })
    })

})


app.get('/message', async (req, res) => {
    res.json({ message: "Hello from server! XD" })
})

app.listen(PORT, () => {
    // if (err) console.log(err)
    console.log("Server listening on PORT", PORT)
})