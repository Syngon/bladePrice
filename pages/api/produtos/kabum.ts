// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import cheerio from 'cheerio';

type IRes = {
    title: string,
    price: string,
    fullPrice: string,
    img: string | undefined
}

type IError = {
    message: string,
    error: unknown
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<IRes | IError>
) {

    if (req.method === 'POST') {
        try {
            const url = req.body.url;
            console.log(url)

            axios.get(url).then((response) => {
                if (response.status === 200) {
                    const html = response.data;
                    const $ = cheerio.load(html);
                    const title = $('#__next > main > article > section > div:nth-child(2) > h1').text();
                    const price = $('#blocoValores > div:nth-child(2) > div > h4').text();
                    const fullPrice = $('#blocoValores > div:nth-child(3) > b').text();
                    const img = $('#carouselDetails > div:nth-child(2) > div:nth-child(1) > figure > img').attr('src');

                    

                    res.status(200).send({ title: title, price: price, fullPrice: fullPrice, img:  img?.toString()});
                }
            }, (error) => console.log(error))
        } catch (err) {
            res.status(500).json({ message: "Erro na procura do item", error: err });
        }

    } else {
        res.status(200).json({ title: "title", price: "price", fullPrice: "fullPrice", img:  "img?.toString()"})
    }


}
