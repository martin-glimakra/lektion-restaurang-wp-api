const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const express = require('express')
const app = express()
const port = 4000
var cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const api = new WooCommerceRestApi({
  url: "http://personal.xn--webbutvecklare-glimkra-65b.se/",
  consumerKey: "ck_0eb484be249c82c22443e0be64ecf9af7fb10de9",
  consumerSecret: "cs_c07097e6ccf59a822c35d1db49c6307d95fb33ac",
  version: "wc/v3"
});

let data = {
    payment_method: "bacs",
    payment_method_title: "Direct Bank Transfer",
    set_paid: true,
    billing: {
      first_name: "John",
      last_name: "Doe",
      address_1: "969 Market",
      address_2: "",
      city: "San Francisco",
      state: "CA",
      postcode: "94103",
      country: "US",
      email: "john.doe@example.com",
      phone: "(555) 555-5555"
    },
    shipping: {
      first_name: "John",
      last_name: "Doe",
      address_1: "969 Market",
      address_2: "",
      city: "San Francisco",
      state: "CA",
      postcode: "94103",
      country: "US"
    },
    line_items: [
      {
        product_id: 93,
        quantity: 2
      },
      {
        product_id: 22,
        variation_id: 23,
        quantity: 1
      }
    ],
    shipping_lines: [
      {
        method_id: "flat_rate",
        method_title: "Flat Rate",
        total: "10.00"
      }
    ]
  };
  


    app.post('/neworder', (req, res) => {

        console.log(req.body.name);
        data.billing.first_name = req.body.name

        api.post("orders", data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
        console.log(req.body);
    })



app.get('/', (req, res) => {
//   res.send('Hello World!')
  api.get("products", {
    per_page: 20, // 20 products per page
  })
    .then((response) => {
      // Successful request
    //   console.log("Response Status:", response.status);
    //   console.log("Response Headers:", response.headers);
    //   console.log("Response Data:", response.data);
    //   console.log("Total of pages:", response.headers['x-wp-totalpages']);
    //   console.log("Total of items:", response.headers['x-wp-total']);
    res.json(response.data)
    })
    .catch((error) => {
      // Invalid request, for 4xx and 5xx statuses
    //   console.log("Response Status:", error.response.status);
    //   console.log("Response Headers:", error.response.headers);
    //   console.log("Response Data:", error.response.data);
    })
    .finally(() => {
      // Always executed.
    });
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

