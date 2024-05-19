const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 80;

// Serve os arquivos estáticos do diretório dist
app.use(express.static(path.join(__dirname, 'dist/seeking-lost/browser')));

// Roteamento para redirecionar todas as solicitações ao index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/seeking-lost/browser/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});