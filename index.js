// npm init
// npm i expŕess
const express = require("express")
const app = express()
const port = 3000
app.use(express.json())

//npm i mysql2
const db = require("./db")

// npm i cors 
const cors = require("cors")
app.use(cors())


app.post("/cadastrar", async (req,res) => {
    const cliente = req.body
    try {
        const resultado = await db.pool.query(
                `INSERT INTO cliente (
                    nome,  cpf, email, telefone,
                    rua, n_casa, bairro, cidade,
                    uf, cep, senha) values 
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [cliente.nome, cliente.cpf, cliente.email,
                    cliente.telefone, cliente.rua, 
                    cliente.n_casa, cliente.bairro, cliente.cidade,
                    cliente.uf, cliente.cep, cliente.senha])
                res.status(200).json({id: resultado[0].insertId})
    } catch (erro){
        res.status(500).json({erro: "Erro interno na API"})
        console.log(erro)
    }
})
app.post("/login", async (req, res)=>{
    const login = req.body;
    if(login.email == null){
        return res.status(400).json({erro: "informe o email"})
    }
    if(login.senha == null) {
        return res.status(400).json({erro: "informe a senha"})
    }
    return res.status(200).json({res: "login recebido"})
    // 21/10-consultar o email no banco de dados
})


app.get("/clientes", async (req,res) => {
    try {
        const resultado = await db.pool.query("SELECT * FROM cliente")
        res.status(200).json(resultado[0])
    } catch (erro){
        console.log(erro)
    }
})

app.listen(port, ()=>{
    console.log("API executando na porta" + port)
})
 