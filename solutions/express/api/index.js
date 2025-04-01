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
	let data = JSON.stringify({
	  processing_mode: "automatic",
	  external_reference: "ext_ref_1234",
	  description: "order description",
	  marketplace: "NONE",
	  marketplace_fee: "1.00",
	  total_amount: "100.00",
	  expiration_time: "P3Y6M4DT12H30M5S",
	  type: "online",
	  payer: { ...req.body.payer },
	  transactions: { ...req.body.transactions },
	  items: [
		{
		  title: "title",
		  description: "descriptions",
		  unit_price: "10.00",
		//   id: "ABC",
		  category_id: "category",
		  picture_url: "https://www.mercadopago.com/img",
		  quantity: 1,
		},
	  ],
	});
  
	let config = {
	  method: "post",
	  maxBodyLength: Infinity,
	  url: "https://api.mercadopago.com/v1/orders",
	  headers: {
		"Content-Type": "application/json",
		"X-Idempotency-Key": Math.random(),
		Authorization: `Bearer ${process.env.PK}`,
	  },
	  data: data,
	};
  
	axios
	  .request(config)
	  .then((response) => {
		console.log(response.data);
		res.status(response.status).send(response.data);
	  })
	  .catch(() => {
		res.status(500).send({error: true});
	  });
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
