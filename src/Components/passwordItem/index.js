import './index.css'

const SavedPasswordItem = props => {
  const {savedPassword, deletePassword, isTicked} = props
  const {id, name, url, password} = savedPassword
  const initial = url ? url[0].toUpperCase() : ''

  const onDeleteButton = () => {
    deletePassword(id)
  }

  const imagePart = (
    <img
      alt="stars"
      className="password-img"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
    />
  )
  const passwordH = <p className="name">{password}</p>

  return (
    <li className="each-password-con">
      <h1 className="title-img">{initial}</h1>
      <div className="url-name-password">
        <p className="url">{url}</p>
        <p className="name">{name}</p>
        {isTicked ? passwordH : imagePart}
      </div>
      <button
        type="button"
        className="del-button"
        testid="delete"
        onClick={onDeleteButton}
      >
        <img
          className="del-img"
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
        />
      </button>
    </li>
  )
}

export default SavedPasswordItem
