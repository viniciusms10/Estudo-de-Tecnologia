const express = require('express');
const Joi = require('joi');
const app = express();
const port = 3000;


app.use(express.json());

const usuarios = [];

app.get('/usuario', (req,res) => {
    return res.json({usuarios})
});


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const usuarioSchema = Joi.object({
    nome: Joi.string().min(3).max(30).required(),
    cpf: Joi.number().integer().required(),
    data_nascimento: Joi.date().iso().required()
  });

app.post('/usuario', (req, res) => {
  
    const { error, value } = usuarioSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ mensagem: error.details[0].message });
    }


    const {nome , cpf , data_nascimento} = value;
  
    const usuario = {
        nome,
        cpf,
        data_nascimento
    };

    usuarios.push(usuario);

    return res.status(201).json(usuario);
});


app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
