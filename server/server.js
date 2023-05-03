import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dbConfig from './plsdontlook.js';
import sql from 'mssql';
import { send } from 'process';
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
const PORT = 8000;

const getUserFromEmail = async (email) => {
    try {
        var poolConnection = await sql.connect(dbConfig);
        var resultSet = await poolConnection
            .request().input('email', sql.NVarChar(255), email)
            .query('SELECT * FROM [Bank].[Users] WHERE email = @email;');
        poolConnection.close();
        const nrResults = resultSet.rowsAffected[0]
        if (nrResults > 0)
            return (resultSet.recordset[0]);
    }
    catch (Err) {
        console.log(Err.message);
    }
    return { ID: -1 }
}

const insertTransfer = async (senderID, firstName, surName, accnr, amt, title) => {
    try {
        var poolConnection = await sql.connect(dbConfig);
        var resultSet = await poolConnection.request()
            .input('userId', sql.Int, senderID)
            .input('firstName', sql.NVarChar(50), firstName)
            .input('surName', sql.NVarChar(50), surName)
            .input('accnr', sql.NVarChar(50), accnr)
            .input('amt', sql.NVarChar(50), amt)
            .input('title', sql.NVarChar(50), title)
            .query('INSERT INTO Bank.[Transfers] (SenderID, Name, Surname, AccountNr, Amount, Title) VALUES  (@userId, @firstName, @surName, @accnr, @amt, @title)');
        poolConnection.close();
    }
    catch (Err) {
        console.log(Err.message);
    }
}

/* Database : */
app.post('/newtransfer', async (req, res) => {
    const senderEmail = req.body.email;
    const senderUser = await getUserFromEmail(senderEmail);
    const senderID = senderUser.ID;

    if (senderID <= 0) {
        console.log("Nie ma takiego usera");
        res.status(404);
        return;
    }
    const firstName = req.body.firstName
    const surName = req.body.surName
    const accnr = req.body.accnr
    const amt = req.body.amt
    const title = req.body.title
    console.log("Transfer od " + senderEmail + " do " + accnr);
    await insertTransfer(senderID, firstName, surName, accnr, amt, title);
})

app.get('/', function (req, res) {
    res.send("Looking good!")
})


app.get('/transferhistory', function (req, res) {
    sql.connect(dbConfig, function (err) {
        if (err) console.log(err)
        const request = new sql.Request()
        request.query('SELECT * from Bank.[Transfers]', function (err, recordset) {
            if (err) console.log(err)
            res.send(recordset)
        })
    })
})

app.get('/userpass', async (req, res) => {
    const email = req.query.email
    console.log("Auth request for " + email)
    sql.connect(dbConfig, function (err) {
        if (err) console.log(err)
        const connection = new sql.Request()
        connection.input('mail', sql.NVarChar(255), email)
            .query('SELECT password FROM [Bank].[Users] WHERE email = @mail;',
                function (err, rows) {
                    if (err) {
                        console.error("An error occurred:", err.message)
                        res.status(500).json({ status: 500, message: "An error occurred: " + err.message, id: -1 })
                    }
                    else {
                        if (rows.rowsAffected[0]) {
                            res.status(200).json({ status: 200, message: "User found successfully.", password: rows.recordset[0].password })
                        } else {
                            res.status(404).send({ status: 404, message: "User not found.", password: -1 })
                        }
                    }
                })
    })
})

app.get('/authuser', async (req, res) => {
    const email = req.query.email
    const password = req.query.password
    console.log("Auth request for " + email)
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
                            res.json({ status: 200, message: "User found successfully.", id: rows.recordset[0].ID })
                        } else {
                            res.status(404).send({ status: 404, message: "User not found.", id: -1 })
                        }
                    }
                })
    })
})


app.get('/createuser', async (req, res) => {
    const firstname = req.query.firstname
    const lastname = req.query.lastname
    const email = req.query.email
    const password = req.query.password

    console.log("Create user for " + email)
    sql.connect(dbConfig, function (err) {
        if (err) console.log(err)
        const connection = new sql.Request()
        connection.input('email', sql.NVarChar(255), email)
            .input('password', sql.NVarChar(255), password)
            .query('SELECT ID FROM [Bank].[Users] WHERE email = @email;',
                function (err, rows) {
                    if (err) {
                        console.error("An error occurred:", err.message)
                        res.status(500).json({ status: 500, message: "An error occurred: " + err.message, id: -1 })
                    }
                    else {
                        if (rows.rowsAffected[0]) {
                            res.json({ status: 200, message: "User already exists", id: rows.recordset[0].ID })
                            return;
                        } else {
                            console.log("Doesnt exist yet");
                            // res.status(404).send({ status: 404, message: "User doesnt exist", id: -1 })
                        }
                    }
                })
    })

    console.log("Here");

    sql.connect(dbConfig, function (err) {
        if (err) console.log(err)
        const connection = new sql.Request()
            .input('firstname', sql.NVarChar(255), firstname)
            .input('lastname', sql.NVarChar(255), lastname)
            .input('email', sql.NVarChar(255), email)
            .input('password', sql.NVarChar(255), password)
            .query('INSERT INTO [Bank].[Users] (Name, Surname, email, password) VALUES (@firstname, @lastname, @email, @password);',
                function (err, rows) {
                    if (err) {
                        console.error("An error occurred:", err.message)
                        res.status(500).json({ status: 500, message: "Database error occurred", id: -1 })
                    }
                    else {
                        if (rows.rowsAffected[0]) {
                            res.status(200).json({ status: 200, message: "User added successfully.", id: 1 })
                        } else {
                            res.status(404).send({ status: 404, message: "User not added.", id: -1 })
                        }
                    }
                });
    })
})



app.get('/message', async (req, res) => {
    res.json({ message: "You are broke! XD" })
})

app.listen(PORT, () => {
    // if (err) console.log(err)
    console.log("Server listening on PORT", PORT)
})