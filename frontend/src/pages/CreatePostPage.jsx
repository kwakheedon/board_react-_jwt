
import CreateForm from '../components/posts/CreateForm'
import React, { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { useAuthStore } from '../stores/useAuthStore'; 

const CreatePostPage = () => {
 const navigate = useNavigate();
 
  const { isLoggedIn, authInitialized } = useAuthStore();

  useEffect(() => {
    if (authInitialized && !isLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      
      navigate('/');
    }
  }, [authInitialized, isLoggedIn,navigate]); 


  if (!authInitialized || !isLoggedIn) {
    return null;
  }

  return (
    <div className="page-container">
        <h1 className="page-title" >글쓰기</h1>
        <CreateForm/>
    </div>
  )
}

export default CreatePostPage