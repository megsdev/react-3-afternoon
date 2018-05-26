import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

const BASE_URL = 'https://practiceapi.devmountain.com/api'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios({
      method: 'GET',
      url: BASE_URL + '/posts'
    }).then(response => {
      this.setState({ posts: response.data })
    })
  }

  updatePost( id, text ) {
    axios({
      method: 'PUT',
      url: `${BASE_URL}/posts?id=${id}`,
      data: {
        text: text,
      }
    }).then( response => {
      this.setState({ posts: response.data })
    })
  }

  deletePost(id) {
    axios({
      method: 'DELETE',
      url: `${BASE_URL}/posts?id=${id}`
    }).then( response => { this.setState({ posts: response.data })
    }).catch((err) => {
      console.log('Delete post had an error', err)
    })
  }

  createPost( text ) {
    axios({
      method: 'POST',
      url: BASE_URL + '/posts',
      data: {
        text: text,
      },
    }).then( response => {
      this.setState({ posts: response.data })
    }).catch((err) => {
      console.log('An error in creating a post', err)
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={ this.createPost }/>

          {
            posts.map( post => (
              <Post 
                key={ post.id }
                text={ post.text }
                date={ post.date }
                id={ post.id } 
                updatePostFn={ this.updatePost }
                deletePostFn={ this.deletePost }
              />
            ))
          }
          
        </section>
      </div>
    );
  }
}

export default App;
