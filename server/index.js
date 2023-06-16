const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./data/data");
app.use(cors());
app.use(express.json());
app.listen(3000, () => {
    console.log("Server ativo na porta 3000");
})
connection.connect(function (err){
    console.log("Connection DataBase sucess!")
})



app.post('/api/registerUser', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        connection.query(`INSERT INTO Users (name, email, password) VALUES ('${name}', '${email}', '${password}')`, function(error, rows) {
            res.status(200).json({
                message: "Cadastrado com sucesso!",
            })
        })
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao cadastrar usuário");
    }
});

app.get('/api/getUsers', async(req, res) => {
    try {
        connection.query(`SELECT * FROM Users`, function(error, rows) {
            res.status(200).json({
                rows
            })
        });
        
    } catch (error) {
        res.status(500).send('Erro na consulta')
    }
})

app.put('/api/updateUser', async(req, res) =>{
    try {
        const id = req.query.id
        const { name, email } = req.body;
        connection.query(`UPDATE Users SET name = '${name}', email = '${email}' WHERE id = ${id}`, function(error, rows) {
            res.status(200).json({
                message: "Cadastro atualizado com sucesso!"
            })
        })
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao atualizar cadastro usuário");
    }
})

app.delete('/api/deleteUser', async(req, res) =>{
    try {
        const id = req.query.id
        connection.query(`DELETE FROM Users WHERE id = ${id}`, function(error, rows) {
            res.status(200).json({
                message: "Usuário deletado com sucesso!"
            })
        })
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao deletar usuário");
    }
})