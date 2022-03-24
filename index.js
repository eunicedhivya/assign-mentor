import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
console.log(process.env.PORT);

const app = express();

app.use(cors());
app.use(express.json());

// Port for localhost
const PORT = process.env.PORT;

app.get("/", function (request, response) {
  response.send("Assign Mentor API");
});

app.listen(PORT, () => console.log("Server is started in " + PORT));
