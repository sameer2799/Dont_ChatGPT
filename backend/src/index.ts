import app from "./app.js";
import { connectDB } from "./db/connection.js";


// connections and listeners
const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    
    app.listen(port, () => console.log(`Connected to Database and Server is running at http://localhost:${port} 🚀`));
  })
  .catch((error) => console.error(error));


