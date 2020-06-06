import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
import api from '../../services/api'

import Swal from 'sweetalert2'

import './style.css'




export default class Section extends Component {
    state = {
        url: {},
        title: {},
        article: {}
    }


    async componentDidMount() {
        const { id } = this.props.match.params
        const response = await api.put(`/repost/${id}`)
        this.setState({ url: response.config.url })
        this.setState({ title: response.data.title })
        this.setState({ article: response.data.article })

    }

    render() {
        const { url } = this.state
        const { title } = this.state
        const { article } = this.state

        const handleEdit = (e) => {
            e.preventDefault()
            Swal.fire({
                title: 'Deseja Atualizar seu post ?',
                text: "Não será possível recuperar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DF0707',
                cancelButtonColor: '#DF0707',
                confirmButtonText: 'Sim, atualizar', 
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    Swal.fire(
                        handleSubmit(e => e.preventDefault()),
                        'success'
                    )
                }
            })
        }

        async function handleSubmit() {
            try {
                const dataPost = { title, article }
                await api.put(`${url}`, dataPost)
                await Swal.fire({
                    icon: 'success',
                    text: 'Post atualizado com sucesso !',
                  })
                window.open('/', '_parent')
            }
            catch{
                alert('Erro na edição da postagem')
            }

        }

        return (
            <div className='section-main'>
                <Header />
                <Link to='/'>
                    <button className='btn-postshow'><MdArrowBack /></button>
                </Link>
                <form onSubmit={handleEdit}>
                    <label htmlFor='title'>Edite sua publicação</label>
                    <input
                        id='title'
                        type='text'
                        placeholder='Digite o titúlo da publicação'
                        value={title}
                        onChange={event => this.setState({ title: event.target.value })}
                    />
                    <textarea
                        id='article'
                        type='textarea'
                        placeholder='Digite o artigo da publicação'
                        value={article}
                        onChange={event => this.setState({ article: event.target.value })}
                        rows='20'
                        maxLength='300'
                        wrap='hard'
                    />

                    <button className='btn' type='submit'>Atualizar post</button>

                </form>
                <Footer />
            </div>
        );
    }

}