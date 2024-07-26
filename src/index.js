const express = require('express');
const axios = require('axios');
const app = express();

app.listen(8334, () => {
 console.log("OwnDynDNS - Server running on port 8334");
});


app.get("/update", (req, res, next) => {
    const config = {
        headers: { Authorization: `Bearer ${process.env.bearer_token}` }
    };
    const body = {
        "name": req.query.hostname,
        "ipv4": req.query.ip,
        "ttl": 10,
        "comment": "changed from ownDynDNS"
      }
    axios.put(`https://api.ns1.hosttech.eu/api/user/v1/zones/${req.query.zone}/records/${req.query.record}`, body, config)
      .then((response) => {
        res.set('Content-Type', 'text/plain');
        res.status(200).send(`good ${req.query.ip}\n`);

      })
      .catch((error) => {
        console.log(error);
        res.json({"message": error});
      });

   });