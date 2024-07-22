const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://LetsArcMedia:ck2BRsv5h0FvCwcm@letsarcmediadb.nhwlq0u.mongodb.net/?retryWrites=true&w=majority&appName=LetsArcMediaDB', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error.message);
});

const concernsRoutes = require('./Routes/concerns');

app.use('/api/concerns', concernsRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
