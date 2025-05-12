const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const todoRoutes = require('./routes/todo.routes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
  console.log(`Swagger UI tersedia di http://localhost:${port}/api-docs`);
}); 