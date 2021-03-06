// Aula 5

// Importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose()

// Criar o objeto que irá fazer as operações  no banco de dados
const db  = new sqlite3.Database("./src/database/database.db")

// Pegar o banco de dados. Aula 5 - 00:50 hr
module.exports = db

/*
// Utilizar o objeto de banco de dados para nossas operações
db.serialize(() => {

    // Criar a tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)    

    // Inserir dados na tabela - Aula 5 - 00:36 hrs
    const query = `INSERT INTO places (image, name, address, address2, state, city, items) VALUES (?,?,?,?,?,?,?)`
    const values = [
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80", 
        "Papersider", 
        "Guilherme Gemballa", 
        "Nr. 260", 
        "Santa Catarina", 
        "Rio do Sul"
    ]

    function afterInsertData(err) {
        if (err){
            return console.log(err)
        }

        console.log("Cadastrado com sucesso!")
        console.log(this)
    }

    db.run(query, values, afterInsertData)

    // Consultar os dados na tabela
    db.all(`SELECT * FROM places `, function (err, rows) {
        if (err){
            return console.log(err)
        }

        console.log("Aqui estão seus registros!")
        console.log(rows)
    })

    // Deletar um registro na tabela
    db.run(`DELETE FROM places WHERE id = ?`, [8], function(err) {
        if (err){
            return console.log(err)
        }

        console.log("Registro deletado com sucesso!")
    })  
})
*/