const express = require('express')
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const authRoutes = require('./Router/authRoutes')
const adminRoutes = require('./Router/adminRoutes')
const resortRoutes = require('./Router/resortRoutes')
const cartRoutes = require('./Router/cartRoutes')
const ratingRoutes = require("./Router/ratingRoutes");

const connectDB = require('./Config/db')
dotenv.config()
connectDB()

const app = express()

const allowedOrigins = ['https://govagamon.netlify.app', 'http://localhost:3000'];

app.use(cors({
    origin: allowedOrigins, // Allow only your frontend origin
    credentials: true, // Allow cookies
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/resort', resortRoutes)
app.use('/api/cart', cartRoutes)
app.use("/api/ratings", ratingRoutes);

app.listen(process.env.PORT || 5000, ()=>console.log(`Server running on PORT ${process.env.PORT}`))
