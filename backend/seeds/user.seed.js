import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
const seedUsers = [
    {
        email: "maira123@gmail.com",
        fullName: "Maira Sharma",
        password: "123456",
        role: "superAdmin",
        createdDate: new Date()
    }
]

let db;
async function connectToDb(){
    const MONGO_URL = "mongodb://localhost:27017/";
    const connection = await MongoClient.connect(MONGO_URL);
    db = connection.db("Blog-App");
}


const seedDb = async () => {
    await connectToDb();
    await db.collection("accounts").deleteMany({})

    seedUsers[0].password = await bcrypt.hash(seedUsers[0].password, 10)
    await db.collection("accounts").insertOne(seedUsers[0]);
    console.log("Admin seeded successfully")
}

seedDb();