const express = require("express");
const cors = require("cors");
const axios = require("axios")
const cheerio = require("cheerio");

require("dotenv").config();

const headers = {
    ":authority": "www.kabum.com.br",
    ":method": "GET",
    ":path":
      "/produto/129451/processador-amd-ryzen-5-5600x-cache-35mb-3-7ghz-4-6ghz-max-turbo-am4-sem-video-100-100000065box",
    ":scheme": "https",
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9",
    cookie:
      "__utmc=10378415; _gcl_au=1.1.1060673782.1633757759; _fbp=fb.2.1633757758913.1698577309; session=f82a8e3328e21973ce8b01b215a778ec; last=1633757307; tmp_hash=fbe9d2779a898a85a73f81d33aa422fa1a311f01; _hjid=7e7cf4ba-1561-4c56-9e0a-014103790d78; visitor_source=direct; visitor_campaign=direct; visitor_medium=direct; OptanonAlertBoxClosed=2021-10-10T03:02:57.825Z; _rtbhouse_source_=AdWords; _pin_unauth=dWlkPU5XTTVPR1E0WldFdE1HVTJNaTAwWldSa0xXRmpZVFl0WVdObU9EQTVNalZqTldGbA; _gac_UA-2140951-1=1.1633903451.Cj0KCQjww4OMBhCUARIsAILndv5MswQeI-JnyzsqfZ_ZV7PlGOkZx5HRog8dW32Z3kjQZBAu09Ufn78aAg5xEALw_wcB; _gcl_aw=GCL.1635908295.Cj0KCQjww4OMBhCUARIsAILndv5MswQeI-JnyzsqfZ_ZV7PlGOkZx5HRog8dW32Z3kjQZBAu09Ufn78aAg5xEALw_wcB; _clck=ty3a9x|1|ew4|0; _gac_UA-2140951-10=1.1635908296.Cj0KCQjww4OMBhCUARIsAILndv5MswQeI-JnyzsqfZ_ZV7PlGOkZx5HRog8dW32Z3kjQZBAu09Ufn78aAg5xEALw_wcB; datadome=6ZvDpOPJsjGwdEO0nky4UGKiCQRz7bh6TERaWj39xUaXMDAwh_m_l7nCyCwpH_Ad.TGkgSqcNHRW9TkcJLOa9r9umJFIw7j3rgfUvk33R8; _uetvid=c848527028c211ecbf5ef3572544c9f6; _ga=GA1.3.1662725683.1633757759; _ga_Q68S4NB67S=GS1.1.1635908294.5.1.1635908418.51; __utmz=10378415.1636240735.21.14.utmcsr=AWIN|utmccn=especial_eletronicos_out21|utmcmd=AFILIADOS|utmctr=141629|utmcct=br_sd; __utma=10378415.1662725683.1633757759.1636240735.1636243035.22; goto=https%3A%2F%2Fwww.kabum.com.br%2F; __utmt=1; __utmb=10378415.3.10.1636243035; OptanonConsent=isIABGlobal=false&datestamp=Sat+Nov+06+2021+21%3A23%3A59+GMT-0300+(Brasilia+Standard+Time)&version=6.24.0&hosts=&consentId=ba0cba4d-a123-4b36-9e19-5c62f3046731&interactionCount=2&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1&AwaitingReconsent=false&geolocation=BR%3BBA",
    "if-none-match": '"413a5-/elElD/D1n8v+7jTxxUV2VDHyNs"',
    referer: "https://www.kabum.com.br/",
    "sec-ch-ua": '"Chromium";v="94", " Not A;Brand";v="99", "Opera";v="80"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 OPR/80.0.4170.63",
}



const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log("listening port " + port);
})


let teste = 1;






app.get("/", (req, res) => {
    res.send({ message: "We did it!" });
});

app.post('/produto', async (req, res) => {
    try{
        const url = req.body.url;
        console.log(url)

        axios.get(url, headers).then((response) => {
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
})



