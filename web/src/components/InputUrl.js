import React from 'react'
import api from '../api/api';
// import cheerio from 'cheerio';


export default function InputUrl() {

    const onChangeHandler = async (children) => {
        const urlToSearch = children.target.value;
        
        api.post('produto', {url: urlToSearch}).then((response) => {
            console.log(response.data)
        })


      }

    return (
        <input type="url" onChange={onChangeHandler}/>
    )
}
