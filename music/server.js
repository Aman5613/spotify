import app from "./src/app.js";
import connectDB from "./src/db/db.js";

connectDB();



app.listen(3200, () => {
    console.log("Music Server is running on port 3200");
})