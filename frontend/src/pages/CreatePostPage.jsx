import React from 'react'
import CreateForm from '../components/posts/CreateForm'


const CreatePostPage = () => {

  return (
    <div className="page-container">
        <h1 className="page-title" >글쓰기</h1>
        <CreateForm/>
       
    </div>
  )
}

export default CreatePostPage