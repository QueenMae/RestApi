const express = require("express")
const mysql = require('mysql')
const app = express()
const expressPort = 3000
app.use(express.json())

const dataBase = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'root',
    database: "restmae"
})
dataBase.connect((err) => {
if(err) {
    console.log("ERREUR DE CONNEXION A LA DATABASE");

 } else {
    console.log("BRAVO VOUS ETES CONNECTE A LA DATABASE");
}});

app.listen(expressPort, () => {
    console.log("MON SERVEUR TOURNE SUR LE PORT :", expressPort);
});


app.get('/items', (req, res) => {
const sql = 'SELECT * FROM items';

dataBase.query(sql,(err, result) => {
    if (err) {

    return res.status(500).json({error : 'ERREUR DU SERVEUR'})
    } else {
        return res.status(200).json(result);
    }

});

}) ;

app.post('/createItems', (req, res) => {
    const {name, prix ,id_category ,description } = req.body;
    const sql = "INSERT INTO items (name, prix,id_category,description) VALUES (?,?,?,? )";
    
    
    dataBase.query(sql, [name, prix,id_category, description], (err, result) => {
    if (err) {
    return res.status(500).json({error : 'ERREUR DU SERVEUR'})
    }
    else {        
    return res.status(201).json(result);
}
}
    )
})

app.put('/updateItem/:id', (req, res) => {
    const { id } = req.params; 
    const { name, prix, id_category, description } = req.body;

    const sql = "UPDATE items SET name = ?, prix = ?, id_category = ?, description = ? WHERE id = ?";

    
    dataBase.query(sql, [name, prix, id_category, description, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'ERREUR DU SERVEUR' });
        }

        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Item non trouvé' });
        }

        return res.status(200).json({ message: 'Item mis à jour avec succès' });
    });
});

app.delete('/deleteItem/:id', (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM items WHERE id = ?";

    dataBase.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'ERREUR DU SERVEUR' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Item non trouvé' });
        }

        return res.status(200).json({ message: 'Item supprimé avec succès' });
    });
});
