import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function Post() {
    const [post , setpost]=useState([])
    const apiurl="https://jsonplaceholder.typicode.com/posts"

    useEffect(()=>{
        fetchPosts()
    },[])

    async function fetchPosts(){
        await axios.get(apiurl).then((res)=>{
            setpost(res.data)
        })
    }
  return (
    <div>
      posts details
      <table >
        <tr>
            <th>id</th>
            <th>body</th>
            <th>title</th>
        </tr>
        {
            post.map((e)=>{
                return(
                    <>
                    <tr>
                        <th>{e.id}</th>
                        <th>{e.body}</th>
                        <th>{e.title}</th>
                    </tr>
                    </>
                )
            })
        }
      </table>
    </div>
  )
}

export default Post
