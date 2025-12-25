const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/product.routes');
const paymentRoutes = require('./routes/payment.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/products',productRoutes);
app.use('/payments', paymentRoutes);


module.exports = app;