import React, { useState } from 'react'
import axios from 'axios'

function AddPost() {
    const[Formdata,Setformdata]=useState({
        userId:"",
        id:"",
        title:"",
        body:""
    })
    const apiurl="https://jsonplaceholder.typicode.com/posts"

    function inputHandler(e){
        Setformdata({...Formdata,[e.target.name]:e.target.value})
    }
    
    async function submithandler(e){
        e.preventDefault()

        await axios.post(apiurl,Formdata).then((res)=>{
         console.log(res)
         console.log('response send to APi')
        })
    }
  return (
    <div>

        <form onSubmit={submithandler} >
            <div>User Id:-</div>
           <div> <input type="text" name='userId' onChange={inputHandler}></input></div>
            <div> Id:-</div>
           <div> <input type="text" name='id' onChange={inputHandler}></input></div>
            <div>Title :-</div>
           <div> <input type="text" name='title' onChange={inputHandler}></input></div>
            <div>Body:-</div>
           <div> <input type="text" name='body'></input></div>
           <div></div>
           <div><input type="submit" value='add new psot' className='btn btn-primary'></input> </div>
        </form>
      
    </div>
  )
}

export default AddPost
