// Aula 4
const express = require("express")
const server = express()

// Pegar o banco de dados. Aula 5 - 00:50 hr
const db = require("./database/db")

// Configura a pasta "public" como pública para que o servidor encontre as outras pastas
server.use(express.static("public"))

// Habilitar o uso do "req.body" na nossa aplicação. Aula 5 - 01:27 hr
server.use(express.urlencoded({ extended: true}))

// Utilizando o template engine nunjucks. Tempo no video: 01:00 hr
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    nocache: true
})

// Ligar o servido
server.listen(3000)

/* Configura os caminhos da aplicação da página inicial
req: Requisição
res: Resposta
*/

server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/error", (req, res) => {
    return res.render("partials/error.html")
})

server.get("/create-point", (req, res) => {

    console.log(req.query)

    return res.render("create-point.html")
})

// Aula 5 - 01:20 hr
server.post("/savepoint", (req, res) => {
    
    // Inserir dados na tabela
    const query = `INSERT INTO places (image, name, address, address2, state, city, items) VALUES (?,?,?,?,?,?,?)`
    const values = [req.body.image, req.body.name, req.body.address, req.body.address2, req.body.state, req.body.city, req.body.items]

    function afterInsertData(err) {
        if (err){            
            return res.render("create-point.html", { saved : false, error: true })

            return console.log(err)
        }

        console.log("Cadastrado com sucesso!")
        console.log(this)

        return res.render("create-point.html", { saved: true, error: false })
    }
    
    db.run(query, values, afterInsertData)    
})

server.get("/search", (req, res) => {

    // Aula 5 - 01:48 hr
    const search = req.query.search

    if (search == "") {
        // Pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }


    // Pegar os dados do banco de dados - Aula 5 - 52:50 hr
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err){
            return console.log(err)
        }

        //console.log("Aqui estão seus registros!")
        //console.log(rows)
        
        const total = rows.length
        // Mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total })
    })
})