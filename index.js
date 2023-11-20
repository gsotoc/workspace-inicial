const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const port = 3000;

const dataFolderPath = path.join(__dirname);

//Ruta para obtener los archivos JSON
app.get('/cats',(req, res)=>{
    const catsID = cat;
    const filePath = path.join(dataFolderPath, 'cats', `${catsID}.json`);
    res.json.sendFile(filePath);
});

app.get('/cart',(req, res)=>{
    const buyId = buy;
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

app.get('/products_comments/:id',(req, res)=>{
    const product_commentsId = req.params.id;
    const filePath = path.join(dataFolderPath, 'products_comments', `${product_commentsId}.json`);
    res.sendFile(filePath);
});


app.get('/sell/:id',(req, res)=>{
    const sellId = publish;
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