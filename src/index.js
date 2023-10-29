const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const admin = require("firebase-admin");
const credentials = require("./authService.json")

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  })

app.use(express.json());
app.use(cors());

app.get('/curriculum', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM curriculum');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

app.post('/curriculum', async (req, res) => {
  const { nome, telefone, endereco, email } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO curriculum (nome, telefone, endereco, email) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, telefone, endereco, email]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

app.post('/signup', async (req, res) => {
  console.log(req.body);
  const user = {
    email:req.body.email,
    password: req.body.password
  }
  const userResponse = await admin.auth().createUser({
    email: user.email,
    password: user.password,
    emailVerified: false,
    disabled: false
  });
  res.json(userResponse);
})

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
