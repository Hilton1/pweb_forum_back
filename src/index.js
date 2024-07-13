import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes.js';

const app = express();
const port = process.env.PORT || 3000;

// Configurando o CORS para permitir todas as origens
app.use(cors());

app.use(express.json());

// Use routes
app.use(routes);

// Rota pública
app.get('/', (req, res) => {
  res.send('Bem-vindo ao PWEB Fórum!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
