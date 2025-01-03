const express = require("express");
const axios = require("axios");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: false, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const PORT = 3000;

app.post("/api", (req, res) => {
  console.log(req.body)

//   axios
//     .request(config)
//     .then((response) => {
//       console.log(response.data);
//       res.status(response.status).json(response.data);
//     })
//     .catch(() => {
//       res.status(500);
//     });

	res.status(200).send({status: 'ok'})
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
