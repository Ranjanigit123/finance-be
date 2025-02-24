// server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const likeRoutes = require('./routes/likeRoutes');

const app = express();
app.use(cors());
app.use(express.json());
const MONGO_URL = "mongodb+srv://ranjanirithu206:KS0pwc1jwcIxmZu0@cluster0.8mgcr.mongodb.net/community?retryWrites=true&w=majority";
mongoose.connect(MONGO_URL, {
    family: 4
})
    .then(() => console.log("Mongo DB Connected"))
    .catch(error => console.log(error));

app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/like', likeRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
