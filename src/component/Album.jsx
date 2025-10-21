import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Album() {
    const apiurl="https://jsonplaceholder.typicode.com/albums"
    const [album,setalbum]=useState([])

    useEffect(()=>{
         fetchdata()    
    },[])

    async function fetchdata(){
        await axios.get(apiurl).then((res)=>{
            setalbum(res.data)
        })
    }
  return (
    <>
      <table>
        <tr>
            <th>userid</th>
            <th>id</th>
            <th>title</th>
        </tr>
        {
           album.map((e)=>{
            return(
                <>
                 <tr>
                      <td>{e.userId}</td>
                      <td>{e.id}</td>
                      <td>{e.title}</td>
                 </tr>
                </>
            )
           })
        }
       
      </table>
      
    </>
  )
}

export default Album
