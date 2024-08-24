import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
import KPI from "./models/KPI.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";
import { kpis, products, transactions } from "./data/data.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Compression Middleware */
app.use(compression());

/* CORS Configuration */
app.use(cors({
    origin: ["https://financeguard-frontend.onrender.com/"], // Replace with your frontend domain
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
}));

/* Routes */
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10, // Adjust the max pool size as necessary
    })
    .then(async() => {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

        /* ADD DATA ONE TIME ONLY OR AS NEEDED */
        //await mongoose.connection.db.dropDatabase();
        //KPI.insertMany(kpis);
        //Product.insertMany(products);
        //Transaction.insertMany(transactions);
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    });
/* Error Handling Middleware */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});