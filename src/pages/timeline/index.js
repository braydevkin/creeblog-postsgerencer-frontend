import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
import api from '../../services/api'

import { AiOutlineDelete, AiFillEdit, AiOutlineRead } from 'react-icons/ai'
import Swal from 'sweetalert2'
import './style.css'

function Timeline() {
  //---------------------------------------------------------------
  const [posts, setPosts] = useState([])
  const history = useHistory()
  useEffect(() => {
    async function loadPosts() {
      const response = await api.get('/posts')
      setPosts(response.data)
    }
    loadPosts()
  }, [])
  //---------------------------------------------------------------
  const HandleDelete = (id) => {
    Swal.fire({
      title: 'Deseja deletar este post ?',
      text: "Não será possível recuperar novamente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DF0707',
      cancelButtonColor: '#DF0707',
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        Swal.fire(  
          HandleDeletModel(id),
          'success'
        )
      }
    })
  }
  //---------------------------------------------------------------
  async function HandleDeletModel(id) {
    try {
      await api.delete(`/delete/${id}`)
      setPosts(posts.filter(post => post._id !== id))
      await Swal.fire({
        icon: 'success',
        text: 'Post deletado com sucesso !',
      })
    }
    catch (error) {
      alert('Erro ao deletar o post, tente novamente')
    }
  }
  //---------------------------------------------------------------
  function handleRead(id) {
    history.push(`/view/${id}`)
  }
  function handleEdit(id) {
    history.push(`/repost/${id}`)
  }
  //---------------------------------------------------------------
  return (
    <div id='timeline-main'>
      <Header />
      <nav>
        <ul>
          <li>
            <Link to='/newpost'>
              <button className='btn'>Novo Post</button>
            </Link>
          </li>
        </ul>
      </nav>
      <ul id='ul-main-timeline'>
        {posts.map(post => (
          <li className='li-posts' key={post._id}>
            <h1 className='title-main'>{post.title}</h1>
            <article>{post.article}</article>
            <p>{post.createAt}</p>

            <button onClick={() => HandleDelete(post._id)} className='btnFunctions'>
              <AiOutlineDelete />
            </button>
            <button onClick={() => handleRead(post._id)} className='btnFunctions'>
              <AiOutlineRead />
            </button>
            <button onClick={() => handleEdit(post._id)} className='btnFunctions'>
              <AiFillEdit />
            </button>

          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}

export default Timeline;