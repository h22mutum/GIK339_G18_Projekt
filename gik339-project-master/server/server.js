const sqlite = require('sqlite3').verbose();
/* Skapar ny koppling till databas-fil */
const db = new sqlite.Database('./gik339.db');

/* Importerar npm-paket express och lagrar i variabeln express */
const express = require('express');
/* Skapar server med hjälp av express */
const server = express();

/* Sätter konfiguration på servern*/
server
  /* Data ska kommuniceras i JSON-format */
  .use(express.json())
  /* Sättet som data ska kodas och avkodas på */
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    /*Headers för alla förfrågningar. Hanterar regler för cors så som vilka klienter som får anropa vår server och hur.) */
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    /* servern fortsätter att processa förfrågan */
    next();
  });

/* Servern startar på port 3000 */
server.listen(3000, () => {
  /* Meddelande för feedback att servern körs */
  console.log('Server running on http://localhost:3000');
});

/*Hantering av GET-requests till endpointen /users */
server.get('/users', (req, res) => {
  /* sql-query för att hämta alla users ur databasen. */
  const sql = 'SELECT * FROM users';
  /* Anrop till db-objektets funktion .all som används till att hämta upp rader ur en tabell */
  db.all(sql, (err, rows) => {
    /* Callbackfunktionen har (err) för att lagra eventuella fel*/
    if (err) {
      /* Om det finns något i det objektet skickar vi ett svar tillbaka att något gick fel (status 500)*/
      res.status(500).send(err);
    } else {
      /*vid korrekt körning, skickar vi de rader som hämtades upp.*/
      res.send(rows);
    }
  });
});

server.get('/users/:id', (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM users WHERE id=${id}`;

  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(rows[0]);
    }
  });
});

server.post('/users', (req, res) => {
  const user = req.body;
  const sql = `INSERT INTO users(firstName, lastName, position ,weight ,length , club, color, bestfoot) VALUES (?,?,?,?,?,?,?,?)`;

  db.run(sql, Object.values(user), (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send('Användaren sparades');
    }
  });
});

server.put('/users', (req, res) => {
  const bodyData = req.body;

  const id = bodyData.id;
  const user = {
    firstName: bodyData.firstName,
    lastName: bodyData.lastName,
    position: bodyData.position,
    weight: bodyData.weight,
    length: bodyData.length,
    club: bodyData.club,
    color: bodyData.color,
    bestfoot: bodyData.bestfoot
  };

  let updateString = '';
  const columnsArray = Object.keys(user);
  columnsArray.forEach((column, i) => {
    updateString += `${column}="${user[column]}"`;
    if (i !== columnsArray.length - 1) updateString += ',';
  });
  const sql = `UPDATE users SET ${updateString} WHERE id=${id}`;

  db.run(sql, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send('Användaren uppdaterades');
    }
  });
  
});

server.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM users WHERE id = ${id}`;

  db.run(sql, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send('Användaren borttagen');
    }
  });
});
