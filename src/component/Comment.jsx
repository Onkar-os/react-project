import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

function Comment() {
    const apiurl="https://jsonplaceholder.typicode.com/comments"
    const [comment, setcomment]=useState([])
    
    useEffect(()=>{
        fetchPosts()
    },[])

    async function fetchPosts(){
        await axios.get(apiurl).then((res)=>{
           setcomment(res.data)
        })
    }
  return (
    
    <>
      <h1>comment component</h1>
      <table>
        <tr>
            <th>postid</th>
            <th>name</th>
            <th>body</th>
            <th>email</th>
        </tr>
        {
            comment.map((e)=>{
                return(
                    <>
                    <tr>
                        <td>{e.postId}</td>                        
                        <td>{e.name}</td>
                        <td>{e.body}</td>
                        <td>{e.email}</td>

                    </tr>
                    </>
                )
            })
        }
      </table>
    </>
  )
}

export default Comment
