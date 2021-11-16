import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import landlordRoutes from "./routes/landlords.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/landlords', landlordRoutes);

//Change username/password for mongoDB on production
const CONNECTION_URL = 'mongodb+srv://admin:admin@cluster0.8zj0q.mongodb.net/LandlordInformation?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is successfully running at : ${PORT}`)))
    .catch((err) => console.log(err.message));
