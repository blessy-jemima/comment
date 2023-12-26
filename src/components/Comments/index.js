import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    count: 0,
    nameInput: '',
    commentInput: '',
    commentList: [],
    isLiked: false,
    date: '',
    backgroundClassNames: initialContainerBackgroundClassNames,
  }

  addCommentButton = event => {
    event.preventDefault()

    this.setState(prevState => ({count: prevState.count + 1}))

    const formattedDate = formatDistanceToNow(new Date())

    const {nameInput, commentInput} = this.state

    const randomBackgroundColor = `initial-container ${
      initialContainerBackgroundClassNames[Math.ceil(Math.random() * 6)]
    }`

    const newObject = {
      id: uuidv4(),
      nameInput,
      commentInput,
      isLiked: false,
      date: formattedDate,
      backgroundClassNames: randomBackgroundColor,
    }

    this.setState(prevState => ({
      commentList: [...prevState.commentList, newObject],
      nameInput: '',
      commentInput: '',
    }))
  }

  isLikeButtonChange = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(each => {
        if (id === each.id) {
          return {...each, isLiked: !each.isLiked}
        }
        return each
      }),
    }))
  }

  nameChange = event => {
    this.setState({nameInput: event.target.value})
  }

  commentChange = event => {
    this.setState({commentInput: event.target.value})
  }

  onDeleteButton = id => {
    const {commentList} = this.state
    const filteredList = commentList.filter(each => id !== each.id)
    this.setState(prevState => ({
      count: prevState.count - 1,
      commentList: filteredList,
    }))
  }

  render() {
    const {count, nameInput, commentInput, commentList} = this.state
    return (
      <div className="app-container">
        <div className="card-container">
          <form className="form-container" onSubmit={this.addCommentButton}>
            <h1 className="form-heading">Comments</h1>
            <p className="label">Say something about 4.0 Technologies</p>
            <input
              type="text"
              value={nameInput}
              placeholder="Your Name"
              className="name-input"
              onChange={this.nameChange}
            />
            <input
              value={commentInput}
              placeholder="Your Comment"
              className="comment-input"
              onChange={this.commentChange}
            />

            <br />
            <button type="submit" className="add-button">
              Add Comment
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="form-image"
          />
        </div>
        <hr className="line" />
        <div className="comment-container">
          <div className="count-container">
            <p className="count">{count}</p>
            <p className="comment-heading">Comments</p>
          </div>
          <ul className="comment-list-container">
            {commentList.map(each => (
              <CommentItem
                key={each.id}
                commentDetails={each}
                isLikeButtonChange={this.isLikeButtonChange}
                onDeleteButton={this.onDeleteButton}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
