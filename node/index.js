const express = require('express');
const util = require('util');
const mysql = require('mysql');

const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const connection = mysql.createConnection(config);
const sqlInsert = `INSERT INTO people(name) values ('Rafael')`;
const queryAsync = util.promisify(connection.query).bind(connection);

const consultarPeoples = async () => {
    try {
      const results = await queryAsync('SELECT * FROM people');
      return results;
    } catch (error) {
      throw error;
    }
};

app.get('/', async (req,res) => {

    connection.query(sqlInsert);

    let retorno = '<h1>Full Cycle Rocks teste!</h1>';

    try {
        const peoples = await consultarPeoples();
    
        retorno += '<ul>';
        for (const people of peoples) {
            retorno += `<li>${people.name}</li>`;
        };
        retorno += '</ul>';

        res.send(retorno);
    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        res.status(500).send('Erro interno do servidor');
    }

})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})

connection.connect();