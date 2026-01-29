import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import { verifyToken } from "./middleware/auth.middleware.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT


let db;
async function connectToDb() {
  const MONGO_URL = "mongodb://localhost:27017/";
  const connection = await MongoClient.connect(MONGO_URL);
  db = connection.db("Blog-App");
}
connectToDb();

app.post("/login", async (req, res) => {
  let output = {
    status: false,
    message: "Login failed",
  };
  const { email, password } = req.body;
  const response = await db.collection("accounts").findOne({ email });

  if(!response){
    return res.send({
      status: false,
      message: "invalid email or password"
    })
  }
  
  const isMatch = await bcrypt.compare(password, response.password);
  // console.log("passwords match?", isMatch)

  if(!isMatch){
    return res.send({
      status: false,
      message: "invalid email or password"
    })
  }

  //JWT generation
  const token = jwt.sign({userId: response._id, role: response.role}, process.env.SECRET_KEY, 
    { expiresIn: "1d" }
  )

  // if(response){
  //     output.status = true;
  //     output.message = "Login successful";
  // }
  

  res.send({
    status: true,
    message: "login successful",
    token,
    response: {
      _id: response._id,
      userName: response.fullName,
    },
  });
});

app.post("/createBlog" ,async (req, res) => {
  let output = {
    status: false,
    message: "failed",
  };
  const { title, blogContent, blogStatus, category, userId, image } = req.body;
  // console.log("userId:", userId);

  if (userId) {
    const adminData = await db.collection("accounts").findOne(
      { _id: new ObjectId(userId) },
      {
        projection: {
          fullName: 1,
          _id: 0,
        },
      }
    );
    // console.log(adminData)
    if (adminData) {
      const response = await db.collection("blogs").insertOne({
        title,
        blogContent,
        blogStatus,
        category,
        image,
        createdBy: {
          userId,
          adminName: adminData.fullName,
        },
        createdDate: new Date(),
        status: "ACTIVE",
      });
      if (response.insertedId) {
        output.status = true;
        output.message = "blogs added successfully";
        output.response = {
          _id: response.insertedId,
          title,
        }
      }
    }
    // console.log(response);
    res.send(output);
  }

  // const {title, blogContent, blogStatus, category, createdBy} = req.body;
  // const response = await db.collection("blogs").insertOne({title, blogContent, blogStatus, category, createdBy, createdDate: new Date()});
});

app.post("/createAdmin", async (req, res) => {
  const output = {
    status: false,
    message: "failed", 
  };
  const adminData = req.body;
  console.log("admin data: ", adminData);
  adminData.password = await bcrypt.hash(adminData.password, 10);
  console.log("Admin Data hashed pw: ", adminData)
  const response = await db.collection("accounts").insertOne( adminData );
  if (response.insertedId) {
    output.status = true;
    output.message = "Admin created successfully";
  }
  res.send(output);
});

app.get("/getBlog", async (req, res) => {
  let output = {
    status: false,
    blogs: [],
    message: "task failed",
  };
  const response = await db.collection("blogs").find({status: "ACTIVE"}).toArray();
  if (response) {
    output.status = true;
    output.message = "blogs fetched successfully";
    output.data = response;
  }
  res.send(output);
});

app.post("/deleteBlog", async (req, res) => {
  let output = {
    status: false,
    message: "failed",
  };
  const { blogId, deletedBy } = req.body;
  // console.log("req.body: ", req.body) 
  const adminData = await db.collection("accounts").findOne(
    { _id: new ObjectId(deletedBy) },
    {
      projection: {
        fullName: 1,
        _id: 0,
      },
    }
  );
  // console.log("admin data:",adminData);
  if (adminData) {
    const response = await db.collection("blogs").updateOne(
      { _id: new ObjectId(blogId) },
      {
        $set: {
          status: "DELETED",
          deletedBy: {
            userId: deletedBy,
            adminName: adminData.fullName,
          },
          deletedOn: Date.now(),
        },
      }
    );
    if (response) {
      output.status = true;
      output.message = "Post deleted successfully";
    }
  }

  res.send(output);
});

app.get("/getBlogById/:id", async (req, res) => {
  let output = {
    status: false,
    message: "Failed",
    blogs: [],
  };
  const id = req.params;
  const response = await db
    .collection("blogs")
    .findOne({ _id: new ObjectId(id) });
  if (response) {
    output.status = true;
    output.message = "Blog fetched successfully";
    output.data = response;
  }
  res.send(output);
});

app.post("/setComment", async (req, res) => {
  let output = {
    status: false,
    message: "failed",
  };
  const { userName, text, blogId, blogTitle } = req.body;
  // console.log(userName);

  const response = await db
    .collection("comments")
    .insertOne({ userName, text, blogId, blogTitle, createdDate: new Date() });
  if (response) {
    output.status = true;
    output.message = "Comment added successfully";
  }
  res.send(output);
});

app.get("/getComments", async(req, res) => {
  let output = {
    status: false,
    message: "failed", 
    data: [],
  }
  const response = await db.collection("comments").find({}).toArray();
  if(response){
    output.status = true;
    output.message = "Comments fetched successfuly";
    output.data = response;
  }
  res.send(output)
})

app.get("/getAdminData", async(req, res) => {
  const output = {
    status: false, 
    message: "failed",
    admin: [],
  }
  const response = await db.collection("accounts").find({role: "Admin"}).toArray();
  if(response){
    output.status = true;
    output.message = "Admin Data fetched successfully";
    output.admin = response;
  }
  res.send(output);
})

app.post("/deleteComment/:id", async (req, res) => {
  let output = {
    status: false,
    message: "failed", 
  }
  const id = req.params.id;
  // console.log(commentId)
  const response = await db.collection("comments").deleteOne({_id: new ObjectId(id)})
  if(response){
    output.status = true;
    output.message = "Comment deleted successfuly"
  }
  res.send(output)
});

app.get("/getStats", async(req, res) => {
  const [
    totalBlogs,
    totalAdmins,
    totalComments,
    publishedBlogs,
    draft,
  ] = await Promise.all([
    db.collection("blogs").countDocuments(),
    db.collection("accounts").countDocuments({role: "Admin"}),
    db.collection("comments").countDocuments(),
    db.collection("blogs").countDocuments({ blogStatus: "Published"}),
    db.collection("blogs").countDocuments({ blogStatus: "Draft"}),
  ])
  res.send({
    status: true,
    data: {
      totalBlogs,
      totalAdmins,
      totalComments,
      publishedBlogs,
      draft,
    },
  });
})

app.listen(PORT, (req, res) => {
  console.log("Server is listening...");
});
