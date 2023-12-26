import './index.css'

const CommentItem = props => {
  const {commentDetails, isLikeButtonChange, onDeleteButton} = props
  const {
    id,
    nameInput,
    commentInput,
    isLiked,
    date,
    backgroundClassNames,
  } = commentDetails
  const likeImg = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeChangeButton = () => {
    isLikeButtonChange(id)
  }

  const deleteChangeButton = () => {
    onDeleteButton(id)
  }

  return (
    <li className="list-container">
      <div className="user-logo-container">
        <p className={backgroundClassNames}>{nameInput[0]}</p>
        <div className="user-comment-container">
          <div className="user-container">
            <p className="user">{nameInput}</p>
            <p className="user-date">{date}</p>
          </div>
          <p className="comment-para">{commentInput}</p>
        </div>
      </div>
      <div className="icon-container">
        <button type="button" className="button" onClick={likeChangeButton}>
          <img src={likeImg} alt="like" className="like-image" />
        </button>
        <button
          type="button"
          className="button"
          onClick={deleteChangeButton}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-image"
          />
        </button>
      </div>
      <hr className="hr" />
    </li>
  )
}

export default CommentItem
