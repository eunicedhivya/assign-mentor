import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import client from "./db.js";

dotenv.config();
// console.log(process.env.MONGO_URL);

const app = express();

app.use(cors());
app.use(express.json());

// Port for localhost
const PORT = process.env.PORT;
// const MONGO_URL = process.env.MONGO_URL;

// const DB_NAME = "assignmentor";

// async function createConnection() {
//   const client = new MongoClient(MONGO_URL);
//   await client.connect();
//   console.log("MongoDB connected...");
//   return client;
// }

// const client = await createConnection();

const DB_NAME = "assignmentor";

app.get("/", function (request, response) {
  response.send({
    msg: "Assign Mentor API",
  });
});

// Get all students
app.get("/students", async function (request, response) {
  const result = await client
    .db(DB_NAME) //DB Name
    .collection("students") //Collection Name
    .find({})
    .toArray();
  response.send(result);
});

// Get all unassigned students
app.get("/unassignedstudents", async function (request, response) {
  const result = await client
    .db(DB_NAME) //DB Name
    .collection("students") //Collection Name
    .find({ mentor_id: "" })
    .toArray();

  result
    ? response.send(result)
    : response.status(404).send({
        msg: "No Students Found",
      });
});

// Add a New Student
app.post("/students", async function (request, response) {
  const newStudent = request.body;
  const result = await client
    .db(DB_NAME) //DB Name
    .collection("students") //Collection Name
    .insertMany(newStudent);

  response.send(result);
});

// Get a specific student detail using ID
app.get("/students/:id", async function (request, response) {
  const { id } = request.params;

  console.log(id);
  const student = await client
    .db(DB_NAME) //DB Name
    .collection("students") //Collection Name
    .findOne({ _id: ObjectId(id) });

  student
    ? response.send(student)
    : response.status(404).send({
        msg: "No Student Found",
      });
});

// Edit a student by ID
app.put("/students/:id", async function (request, response) {
  const updateData = request.body;
  const result = await client
    .db(DB_NAME) //DB Name
    .collection("students")
    .updateOne({ _id: ObjectId(request.params.id) }, { $set: updateData });

  response.send(result);
});

// Delete a student by ID
app.delete("/students/:id", async function (request, response) {
  const { id } = request.params;

  const result = await client
    .db(DB_NAME) //DB Name
    .collection("students") //Collection Name
    .deleteOne({ _id: ObjectId(id) });

  result
    ? response.send(result)
    : response.status(404).send({
        msg: "No result Found",
      });
});

// Get all existing Mentors
app.get("/mentors", async function (request, response) {
  const result = await client
    .db(DB_NAME) //DB Name
    .collection("mentors") //Collection Name
    .find({})
    .toArray();

  result
    ? response.send(result)
    : response.status(404).send({
        msg: "No result Found",
      });
});

// Add a New Mentor
app.post("/mentors", async function (request, response) {
  const newStudent = request.body;
  const result = await client
    .db(DB_NAME) //DB Name
    .collection("mentors") //Collection Name
    .insertMany(newStudent);

  response.send(result);
});

// Edit a mentor by their ID
app.put("/mentors/:id", async function (request, response) {
  const updateData = request.body;
  const result = await client
    .db(DB_NAME) //DB Name
    .collection("mentors")
    .updateOne({ _id: ObjectId(request.params.id) }, { $set: updateData });

  response.send(result);
});

// Delete a mentor by their ID
app.delete("/mentors/:id", async function (request, response) {
  const { id } = request.params;

  console.log(id, typeof id);

  const result = await client
    .db(DB_NAME) //DB Name
    .collection("mentors") //Collection Name
    .deleteOne({ _id: ObjectId(id) });

  console.log(result);

  result
    ? response.send(result)
    : response.status(404).send({
        msg: "No result Found",
      });
});

// Get a specific mentor details based on their ID
app.get("/mentors/:id", async function (request, response) {
  const { id } = request.params;

  console.log(id);
  const mentor = await client
    .db(DB_NAME) //DB Name
    .collection("mentors") //Collection Name
    .findOne({ _id: ObjectId(id) });

  console.log(mentor);

  mentor
    ? response.send(mentor)
    : response.status(404).send({
        msg: "No mentor Found",
      });
});

// Get all students assigned to a specific mentor
app.get("/assignedstudents/:id", async function (request, response) {
  const { id } = request.params;

  console.log(id);
  const students = await client
    .db(DB_NAME) //DB Name
    .collection("students") //Collection Name
    .find({ mentor_id: id })
    .toArray();

  console.log(students);

  students
    ? response.send(students)
    : response.status(404).send({
        msg: "No Students Found",
      });
});

app.listen(PORT, () => console.log("Server is started in " + PORT));
