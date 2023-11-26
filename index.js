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


app.get('/cart/:id',(req, res)=>{
    const buyId = req.params.id;
    const filePath = path.join(dataFolderPath, 'cart', `${buyId}.json`);
    res.sendFile(filePath);
});


app.get('/cats_products/:id',(req, res)=>{
    const catsproductsId = req.params.id;
    const filePath = path.join(dataFolderPath, 'cats_products', `${catsproductsId}.json`);
    res.sendFile(filePath);
});


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



app.get('/user_cart/:id',(req, res)=>{
    const userId = req.params.id;
    const filePath = path.join(dataFolderPath, 'user_cart', `${userId}.json`);
    res.sendFile(filePath);
});


app.listen(port, ()=>{
    console.log(`Servidor corriendo en http://localhost:${port}`)
});



app.get("/login",async(req,res)=>{
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
        "SELECT email,password, token FROM users"
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

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const connection = await pool.getConnection();

        const result = await connection.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);

        connection.release();

        if (result.length > 0) {
            const user = result[0];

            res.status(200).json({ message: 'Inicio de sesión exitoso', token: user.token });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});


app.post('/registro', async (req, res) => {
    const { email, password } = req.body;
    try {
        const connection = await pool.getConnection();

        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

        await connection.query("INSERT INTO users (email, password, token) VALUES (?, ?, ?)", [email, password, token]);
        connection.release();

        res.status(200).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

const authorizeMiddleware = (req, res, next) => {

    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado. Token no proporcionado.' });
    }

    try {
        const decoded = jwt.verify(token, keys);
        req.user = decoded;
        alert('todo piola fiera');
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Acceso no autorizado. Token no válido.' });
    }
};

app.use('/user_cart/:id', authorizeMiddleware);