const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes')
mongoose.connect('mongodb+srv://kztn:eAeemCwc8Esm1Yc7@covid19-rn-chhzb.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);