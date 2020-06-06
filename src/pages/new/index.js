import React, { useState } from 'react'
import { Link, useHistory} from 'react-router-dom'
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
import api from '../../services/api'

import Swal  from 'sweetalert2'

import './style.css'

function Section() {
    const [title, setTitle] = useState('')
    const [article, setArticle] = useState('')
    const history = useHistory()



    async function handleClick(event) {
        event.preventDefault()
        if (title.length === 0) {
            await Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'O campo de titúlo precisa ser preenchido!',
              })
              document.querySelector( 'input#title' ).focus() 
              
        }   
        else if (article.length === 0) {
            await Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'O campo de artigo precisa ser preenchido!',
              })
              document.querySelector( 'textarea#article' ).focus() 
        }
        else {
            const dataPost = { title, article }
            await api.post('/create', dataPost)

            await Swal.fire({
                icon: 'success',
                title: 'Yeah !!',
                text: 'Seu artigo foi publicado com sucesso !',
              })
            history.push('/')
        }
    }
    return (    
        <div className='section-main'>
            <Header />
            <Link to='/'>
                <button className='btn'>Meus posts</button>
            </Link>
            <form onSubmit={handleClick}>
                <label htmlFor='title'>Crie sua publicação</label>
                <input
                    id='title'
                    type='text'
                    placeholder='Digite o titúlo da publicação'
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <textarea
                    id='article'
                    type='textarea'
                    placeholder='Digite o artigo da publicação'
                    value={article}
                    onChange={event => setArticle(event.target.value)}
                    rows='20'
                    maxLength='300'
                    wrap='hard'
                />
                <button className='btn' type='submit'>Postar</button>
            </form>
            <Footer />
        </div>
    );
}
export default Section;