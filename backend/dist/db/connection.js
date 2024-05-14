import { connect, disconnect } from "mongoose";
async function connectDB() {
    try {
        await connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Could not connect to MongoDB", error);
        throw new Error("Could not connect to MongoDB");
    }
}
async function disconnectDB() {
    try {
        await disconnect();
        console.log("Disconnected from MongoDB");
    }
    catch (error) {
        console.error("Could not Disconnect from MongoDB", error);
        throw new Error("Could not Disconnect from MongoDB");
    }
}
export { connectDB, disconnectDB };
//# sourceMappingURL=connection.js.map