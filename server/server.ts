// import * as express from 'express';
import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import dbConfig from './plsdontlook.js';
import sql from 'mssql';
// import bcrypt from 'bcrypt';
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import https from 'https'
import fs from 'fs'
import path from 'path';


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
        return true
    }
    catch (Err) {
        console.log(Err.message);
        return false;
    }
}

const userExists = async (email) => {
    try {
        var poolConnection = await sql.connect(dbConfig);
        var resultSet = await poolConnection.request().input('email', sql.NVarChar(255), email)
            .query('SELECT ID FROM [Bank].[Users] WHERE email = @email;');
        poolConnection.close();
        if (resultSet.rowsAffected[0] > 0) {
            return true;
        }
    }
    catch (err) {
        console.log(err.message);
    }
    return false;
}

const insertUser = async (firstname, lastname, email, hash) => {
    try {
        var poolConnection = await sql.connect(dbConfig);
        var resultSet = await poolConnection.request()
            .input('firstname', sql.NVarChar(255), firstname)
            .input('lastname', sql.NVarChar(255), lastname)
            .input('email', sql.NVarChar(255), email)
            .input('password', sql.NVarChar(255), hash)
            .query('INSERT INTO [Bank].[Users] (Name, Surname, email, password) VALUES (@firstname, @lastname, @email, @password);');
        poolConnection.close();

        if (resultSet.rowsAffected[0] > 0) {
            return 200;
        }
    }
    catch (Err) {
        console.log(Err.message);
    }
    return 404;
}

const showUsersTransfers = async (id) => {
    try {
        var poolConnection = await sql.connect(dbConfig);
        var resultSet = await poolConnection.request()
            .input('id', sql.NVarChar(255), id.toString())
            .query('SELECT * from [Bank].[Transfers] WHERE SenderID = @id;');
        poolConnection.close();
        if (resultSet.rowsAffected[0] > 0) {
            return resultSet.recordset;
        }
    }
    catch (Err) {
        console.log("showUsersTransfers Error" + Err.message);
    }
    return null;
}

const reset_password = async (email : any) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'testbankmba@gmail.com',
          pass: 'testbankmba123'
        }
      });
      
      const new_pass = "polska"; // generate random
      const pass = hash(new_pass);
      const user = await getUserFromEmail(email);
      const id = user.ID;
      try {
        var poolConnection = await sql.connect(dbConfig);
        var resultSet = await poolConnection.request()
            .input('new_pass', sql.NVarChar(255), new_pass)
            .input('id', sql.NVarChar(255), id.toString())
            .query('UPDATE [Bank].[Users] SET password = @new_pass WHERE ID = @id;');
        poolConnection.close();
        if (resultSet.rowsAffected[0] > 0) {
            return resultSet.recordset;
        }
    }
    catch (Err) {
        console.log("showUsersTransfers Error" + Err.message);
    }

      var mailOptions = {
        from: 'testbankmba@gmail.com',
        to: email,
        subject: 'Reset password',
        text: 'Your new password is ' + new_pass
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
}

app.get ('/resetpassword', async (req,res) => {
    const email = req.query.email;
    console.log("Reset pass for " + email);
    const reset = await reset_password(email);    
    res.sendStatus(200);
})

/* Post */
app.post('/newtransfer', async (req, res) => {
    const senderEmail = req.body.email;
    console.log("New transfer for " + senderEmail + " , to " + req.body.AccountNr)
    const senderUser = await getUserFromEmail(senderEmail);
    const senderID = senderUser.ID;

    if (senderID <= 0) {
        console.log("Nie ma takiego usera");
        res.sendStatus(404);
        return;
    }
    const Name = req.body.Name
    const Surname = req.body.Surname
    const AccountNr = req.body.AccountNr
    const Amount = req.body.Amount
    const Title = req.body.Title
    const success = await insertTransfer(senderID, Name, Surname, AccountNr, Amount, Title);
    if (success) 
    res.sendStatus(200);    
    else 
    res.sendStatus(404);
})

app.get('/', function (req, res) {
    res.send("Looking good!")
})


app.get('/transferhistory', async (req, res) => {
    const email = req.query.email;
    const user = await getUserFromEmail(email);
    console.log("email " + email);
    const id = user.ID;
    if (id < 0) {
        res.sendStatus(404);
        return;
    }
    const result = await showUsersTransfers(id);
    if (result == 404) {
        res.sendStatus(404);
    }
    res.json(result);
})

app.get('/userpass', async (req, res) => {
    const email = req.query.email
    sql.connect(dbConfig, function (err) {
        if (err) console.log(err)
        const connection = new sql.Request()
        connection.input('mail', sql.NVarChar(255), email)
            .query('SELECT password FROM [Bank].[Users] WHERE email = @mail;',
                function (err, rows) {
                    if (err) {
                        console.error("An error occurred:", err.message)
                        res.json({ status: 500, message: "An error occurred: " + err.message, id: -1 })
                    }
                    else {
                        if (rows.rowsAffected[0]) {
                            res.json({ status: 200, message: "User found successfully.", password: rows.recordset[0].password })
                        } else {
                            res.send({ status: 404, message: "User not found.", password: -1 })
                        }
                    }
                })
    })
})

async function verify(password, hash) {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(":")
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key == derivedKey.toString('hex'))
        });
    })
}


app.use('/authuser', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    console.log("Email = " + email);
    const user = await getUserFromEmail(email);
    if (user.ID == -1) {
        res.send({ status: 404, message: "User not found." })
        return;
    }
    const user_hash = user.password;
    console.log("Auth request for " + email)
    console.log("Pass = " + user_hash);
    if (await verify(password, user_hash)) {
        res.send({ status: 200, message: "Login succesfull" })
    }
    else {
        res.send({ status: 404, message: "Login unsuccesfull" })
    }
 
})

async function hash(password) {
    return new Promise((resolve, reject) => {
        // generate random 16 bytes long salt
        const salt = crypto.randomBytes(16).toString("hex")

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'))
        });
    })
}

app.use('/createuser', async (req, res) => {
    const firstname = req.body.firstName
    const lastname = req.body.surName
    const email = req.body.email
    const password = req.body.password1
    
    console.log("Create user request for " + firstname );
    const userAlreadyExists = await userExists(email);
    if (userAlreadyExists) {
        console.log("User already exists");
        res.sendStatus(401);
        // res.json({ status: 401, message: "User already exists", id: -1 });
        return;
    }

    const pass = await hash (password);
    console.log(pass);

    // const hash = bcrypt.hashSync(password, salt);
    console.log("Adding user...")

    const addUserStatus = await insertUser(firstname, lastname, email, pass);

    if (addUserStatus == 200) {
        // res.send({ status: 200, message: "User  added succesfully", id: 69 });
        res.sendStatus(200);
    }
    else {
        // res.send({ status: 404, message: "User  not added - error", id: -1 });
        res.sendStatus(404);
    }


})


app.get('/message', async (req, res) => {
    res.json({ message: "You are broke! XD" })
})

app.listen(PORT, () => {
    // if (err) console.log(err)
    const cert = fs.readFileSync("/Users/micha/OneDrive/Dokumenty/UWr/Informatyka/Semestr_6/WdBK/bank-app/certs/server.crt");
    console.log("Server listening on PORT", PORT)
})

// const clientAuthMiddleware = () => (req, res, next) => {
//     if (!req.client.authorized) {
//       return res.status(401).send('Invalid client certificate authentication.');
//     }
//     return next();
//   };
  
//   app.use(clientAuthMiddleware());

// https
//   .createServer(
//     {
//     //   cert: fs.readFileSync("/Users/micha/OneDrive/Dokumenty/UWr/Informatyka/Semestr_6/WdBK/bank-app/certs/server.crt"),
//         // key: fs.readFileSync("/Users/micha/OneDrive/Dokumenty/UWr/Informatyka/Semestr_6/WdBK/bank-app/certs/server.key"),
//         // ca: fs.readFileSync("/Users/micha/OneDrive/Dokumenty/UWr/Informatyka/Semestr_6/WdBK/bank-app/certs/serverca.crt"),
//     //     requestCert: true, 
//     // rejectUnauthorized: true
//     },
//     app
//   )
//   .listen(PORT,  () => {
//     console.log("Server listening on PORT", PORT);})

