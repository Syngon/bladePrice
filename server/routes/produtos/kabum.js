const express = require("express");
const axios = require("axios")
const cheerio = require("cheerio");

const kabumRouter = express.Router();



kabumRouter.post('/', async (req, res) => {
    try{
        const url = req.body.url;
        console.log(url)

        axios.get(url).then((response) => {
            if(response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html); 
                const title = $('#__next > main > article > section > div:nth-child(2) > h1').text();
                const price = $('#blocoValores > div:nth-child(2) > div > h4').text();
                const fullPrice = $('#blocoValores > div:nth-child(3) > b').text();

                res.send({ title: title, price: price, fullPrice: fullPrice});
            }
        }, (errr) => console.log(errr) )

        res.send({ url: req , res: res});
    }catch (err){
        console.log(err)
    }
});


module.exports = kabumRouter;