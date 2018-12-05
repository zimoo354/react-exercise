import React, { Component } from 'react';
import logo from './logo.svg';
import { Row, Column, Modal } from './StructuralComponents';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post_id: '',
      post_title: '',
      post_body: '',
      is_modal_open: false,
      recently_edited: false,
      edit_timestamp: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getPost = this.getPost.bind(this);
    this.modified = this.modified.bind(this);
  }

  handleChange(event) {
    if(event.target.id == 'post_id')
      this.setState({post_title: '', post_body: '', recently_edited: false, });
    this.setState( {[event.target.id]: event.target.value} );  
  }

  toggleModal() {
    this.setState({is_modal_open: !this.state.is_modal_open});
  }

  modified() {
    this.setState({
      recently_edited: true,
      edit_timestamp: new Date().toString(),
    });
    this.toggleModal();
  }

  getPost() {
    // URL: https://jsonplaceholder.typicode.com/posts/:id
    if(parseInt(this.state.post_id) != NaN && this.state.post_id > 0) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${this.state.post_id}`)
        .then(response => response.json())
        .then(post => {
          this.setState({post_title: post.title, post_body: post.body, })
        });
        this.toggleModal();
    } else {
      alert("Please enter a valid post ID");
    }
  }

  function

  render() {
    return (
      <div className="App">
        <Row>
          <Column cols={4}>
            <h4 className="text-right">Post ID:</h4>
          </Column>
          <Column cols={4}>
          <input type="text" id="post_id" value={this.state.post_id} onChange={this.handleChange}/>
          </Column>
          <Column cols={4}>
            <button onClick={ this.getPost }>Edit</button>
          </Column>
        </Row>
        <Row>
          <Column>
          {
            (this.state.recently_edited) &&
            <div>
              <h6>Title:</h6>
              <div>{ this.state.post_title }</div>
              <h6>Body:</h6>
              <div>{ this.state.post_body }</div>
              <h6>Time:</h6>
              <div>{ this.state.edit_timestamp }</div>
            </div>
          }
          </Column>
        </Row>
        <Modal open={this.state.is_modal_open} toggleModal={this.toggleModal}>
          <Row>
            <Column cols={4}>Title</Column>
            <Column cols={8}><input type="text" id="post_title" value={this.state.post_title} onChange={this.handleChange}/></Column>
            <Column cols={4}>Body</Column>
            <Column cols={8}><textarea type="text" id="post_body" value={this.state.post_body} onChange={this.handleChange}/></Column>
            <Column cols={6} className='text-right'><button onClick={ this.modified }>Save</button></Column>
            <Column cols={6} className='text-left'><button onClick={ this.toggleModal } className="secondary">Cancel</button></Column>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default App;
