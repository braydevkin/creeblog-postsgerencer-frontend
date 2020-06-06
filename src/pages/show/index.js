import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
import {MdArrowBack} from 'react-icons/md'
import api from '../../services/api';

import './style.css'

export default class Show extends Component {
  state = {
    posts: {}
}
  async componentDidMount() {
    const { id } = this.props.match.params
    const response = await api.get(`/showpost/${id}`)
    this.setState({ posts: response.data })
  }
  render() {
    const  {posts} = this.state
    return (
      <div id='timeline-main'>
        <Header />

        <nav>
          <ul>
            <li>
              <Link to='/'>
                <button className='btn-postshow'><MdArrowBack/></button>
              </Link>
            </li>
          </ul>
        </nav>

        <ul id='ul-main-timeline'>
          <li id='li-posts'>
            <h1 className='title-main'>{posts.title}</h1>
            <article>{posts.article}</article>
            <p>{posts.createAt}</p>
          </li>
        </ul>

        <Footer />
      </div>
    );
  }
}


