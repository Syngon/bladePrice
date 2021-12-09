const express = require("express");
const axios = require("axios")
const cheerio = require("cheerio");

const terabyteRouter = express.Router();

// TODO this route has to know if has discount or not


terabyteRouter.post('/', async (req, res) => {
    try{
        const url = req.body.url;
        console.log(url)

        axios.get(url).then((response) => {
            if(response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html); 
                const title = $('#body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > h1').text();
                const price = $('#__next > main > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)  > div:nth-child(3) >  div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > s').text();
                const fullPrice = $('#__next > main > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)  > div:nth-child(3) >  div:nth-child(1) > div:nth-child(1)  > div:nth-child(3) > div:nth-child(2) > div:nth-child(1)                          ').text();

                res.send({ title: title, price: "price", fullPrice: "fullPrice"});
            }
        }, (errr) => console.log(errr) )

        res.send({ url: req , res: res});
    }catch (err){
        console.log(err)
    }
});


module.exports = terabyteRouter;