const app = require('./utils/app.js')
const connectDB = require('./config/db.js')
PORT = process.env.PORT || 3200




connectDB()
    .then(() => {
        app.listen(PORT, () => {

            console.log(`Server is running on port ${PORT}`);
        })
    }).catch((error) => {
        console.log("connectDB error", error);

    })
