import React from "react";
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css'


class Posts extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      id:"",
      username: "",
      title:"",
      content: "",
      posts: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  componentDidMount () {
        
    var url = "https://my-worker.ning-lee0704.workers.dev/posts" 
    //var url = 'http://127.0.0.1:8787/posts'
    const getPosts = async () => {
      const resp = await fetch(
        url
      );
      const postsResp = await resp.json();
      this.setState({
        posts: postsResp
      });
    };

    getPosts();
  };

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  setStateSync(state){
    return new Promise(resolve=>{
        this.setState(state,resolve)
    })
  }
  
//Send data to server
sendData(newData) {
  var data = newData
  console.log(JSON.stringify(data))
  var url = "https://my-worker.ning-lee0704.workers.dev/posts/new"
  //var url = "http://127.0.0.1:8787/posts/new"
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

  async handleSubmit(event) {
    event.preventDefault();
    var len = this.state.posts.length
    var id = len.toString()
    //alert('An essay was submitted: ' + this.state.content);
    var newPost = [{id: id, title: this.state.title, username: this.state.username, content: this.state.content}]
    var joined = this.state.posts.concat(newPost);
    //this.setState({
    //  posts: joined
    //})
    await this.setStateSync({posts: joined})
    console.log(this.state.posts)
    this.sendData(this.state.posts)
  }

  render () {
    return (
    <div>
      <h1>Posts</h1>
      <div className="pt-3">
      {this.state.posts.map((post) => (
        <div key={post.id}>
          <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <strong className="d-block text-gray-dark">{post.title}</strong>
                {post.username}
                <p>{post.content}</p>
          </div>
        </div>
      ))}
      </div>
      <form className="col-lg-6 offset-lg-3" onSubmit={this.handleSubmit}>
        <div className="form-control border-0">
        <label htmlFor="username">
          Name:
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        </label>
        </div>
        <div className="form-contro border-0l">
        <label htmlFor="title">
          Title:
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
        </label>
        </div>
        <div className="form-group w-80 justify-content-center">
          <label htmlFor="content">Content:</label>
          <textarea className="form-control" name="content" value={this.state.content} onChange={this.handleChange} rows="3"/>
        <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
    );
  }
};

export default Posts;
