require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes'); // <-- CORRETO
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes); // <-- CORRETO

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.get('/', (req, res) => res.send('API Alunos - /api-docs'));

app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado ao MongoDB Atlas');
    app.listen(process.env.PORT, () => console.log(`🚀 Servidor na porta ${process.env.PORT}`));
  })
  .catch(err => console.error('❌ Erro ao conectar:', err));