import { csat } from "./routes/csat.js";
import { mock } from "./routes/mock.js";
import express from "express"

let app = express();

app.get("/csat", csat);
app.get("/mock/:years", mock);
// years format: 201420232024 같은 식임

app.listen("8080");