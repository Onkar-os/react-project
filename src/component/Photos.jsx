import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Photos() {
    const apiurl="https://jsonplaceholder.typicode.com/photos"

    const[photos,setphotos]=useState([])
    useEffect(()=>{
           fetchphotos()
    },[])

    async function fetchphotos(){
        await axios.get(apiurl).then((res)=>{
            setphotos(res.data)
        })
    }
  return (
    <>
      <table>
        <tr>
            <th>albumId</th>
            <th>title</th>
            <th>url</th>
            <th>thumbnailUrl</th>
        </tr>
        {
            photos.map((e)=>{
                return(
                    <>
                    <tr>
                        <td>{e.albumId}</td>                       
                        <td>{e.title}</td>
                        <td>{e.url}</td>
                        <td>{e.thumbnailUrl}</td>
                     

                    </tr>
                    </>
                )
            })
        }
      </table>
    </>
  )
}

export default Photos
