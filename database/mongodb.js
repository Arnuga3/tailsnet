const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(`MongoDB connection Error: ${err.message}`));