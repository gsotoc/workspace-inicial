const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const mariadb=require('mariadb');
const SECRET_KEY="CLAVE ULTRA SECRETA"
const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "eMercado",
    connectionLimit: 5,
  });


const app = express();
const port = 3000;
const keys = require('./settings/keys');
const { access } = require('fs');


const dataFolderPath = path.join(__dirname);

app.set('key', keys.key);

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
   });

//Ruta para obtener los archivos JSON
app.get('/cats/:id',(req, res)=>{
    const catsID = req.params.id;
    const filePath = path.join(dataFolderPath, 'cats', `${catsID}.json`);
    res.sendFile(filePath);
});

//Funciona
app.get('/cart/:id',(req, res)=>{
    const buyId = req.params.id;
    const filePath = path.join(dataFolderPath, 'cart', `${buyId}.json`);
    res.sendFile(filePath);
});

//Funciona
app.use('/cats_products', (req,res,next)=>{
    try {
        const decoded=jwt.verify(req.headers["access-token"],SECRET_KEY);
        next()
    } catch (error) {
        res.status(401).json({ message: "Usuario no autorizado"});
    }
    })
app.get('/cats_products/:id',(req, res)=>{
    const catsproductsId = req.params.id;
    const filePath = path.join(dataFolderPath, 'cats_products', `${catsproductsId}.json`);
    res.sendFile(filePath);
});

//Funciona
app.get('/products/:id',(req, res)=>{
    const productsId = req.params.id;
    const filePath = path.join(dataFolderPath, 'products', `${productsId}.json`);
    res.sendFile(filePath);
});

//Funciona
app.get('/products_comments/:id',(req, res)=>{
    const product_commentsId = req.params.id;
    const filePath = path.join(dataFolderPath, 'products_comments', `${product_commentsId}.json`);
    res.sendFile(filePath);
});


app.get('/sell/:id',(req, res)=>{
    const sellId = req.params.id;
    const filePath = path.join(dataFolderPath, 'sell', `${sellId}.json`);
    res.sendFile(filePath);
});

//Funciona
app.get('/user_cart/:id',(req, res)=>{
    const userId = req.params.id;
    const filePath = path.join(dataFolderPath, 'user_cart', `${userId}.json`);
    res.sendFile(filePath);
});

app.listen(port, ()=>{
    console.log(`Servidor corriendo en http://localhost:${port}`)
});


//Funcionalidad login
app.get("/login",async(req,res)=>{
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
        "SELECT email,password FROM users"
        );
    
        res.json(rows)
        return 0
    } catch (error) {
        res.status(500).send({message:"Se rompio el servidor"})
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return false;
})



app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let valid = false;
    let conn;

    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            `SELECT email, password FROM users WHERE email = ? AND password = ?`,
            [email, password]
        );

        if (rows.length > 0) {
            valid = true;
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Se rompio el servidor" });
    } finally {
        if (conn) conn.release(); //release to pool
    }

    if (valid) {
        const token = jwt.sign({ email }, SECRET_KEY);
        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: "Usuario y/o contraseña incorrecta"});
    }
});