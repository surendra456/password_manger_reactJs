import './index.css'
import {Component} from 'react'
import {v4} from 'uuid'
import SavedPasswordItem from '../passwordItem'

class AppContainer extends Component {
  state = {
    nameInput: '',
    passwordInput: '',
    url: '',
    isTicked: false,
    savedPassword: [],
  }

  deletePassword = id => {
    const {savedPassword} = this.state

    this.setState({savedPassword: savedPassword.filter(each => each.id !== id)})
  }

  onChangeName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeUrl = event => {
    this.setState({url: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  submitDetails = event => {
    event.preventDefault()
    const {nameInput, passwordInput, url} = this.state

    const newPassword = {
      id: v4(),
      url,
      name: nameInput,
      password: passwordInput,
    }

    this.setState(prev => ({
      savedPassword: [...prev.savedPassword, newPassword],
      nameInput: '',
      passwordInput: '',
      url: '',
    }))
  }

  onSearchPassword = event => {
    this.setState(prev => ({
      savedPassword: prev.savedPassword.filter(each => {
        if (each.url.toLowerCase().includes(event.target.value.toLowerCase())) {
          return each
        }
        return ''
      }),
    }))
  }

  isChecked = () => {
    this.setState(prev => ({isTicked: !prev.isTicked}))
  }

  passwordContainerItems = () => {
    const {savedPassword, isTicked} = this.state

    if (savedPassword.length === 0) {
      return (
        <div className="no-password-image">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            className="img-no-password"
            alt="no passwords"
          />
          <p className="input-head">No Passwords</p>
        </div>
      )
    }
    return savedPassword.map(each => (
      <SavedPasswordItem
        savedPassword={each}
        isTicked={isTicked}
        key={each.id}
        deletePassword={this.deletePassword}
      />
    ))
  }

  render() {
    const {nameInput, passwordInput, url, savedPassword, isTicked} = this.state

    return (
      <div className="app-container">
        <img
          alt="app logo"
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
        />
        <div className="input-card-container">
          <div className="input-card">
            <form className="form-container" onSubmit={this.submitDetails}>
              <h1 className="input-head">Add New Password</h1>
              <div className="web-name-con">
                <img
                  className="input-logo"
                  alt="website"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                />
                <input
                  type="text"
                  className="input"
                  value={url}
                  onChange={this.onChangeUrl}
                  placeholder="Enter Website"
                />
              </div>
              <div className="web-name-con">
                <img
                  className="input-logo"
                  alt="username"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                />
                <input
                  type="text"
                  className="input"
                  value={nameInput}
                  onChange={this.onChangeName}
                  placeholder="Enter Username"
                />
              </div>
              <div className="web-name-con">
                <img
                  className="input-logo"
                  alt="password"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                />
                <input
                  type="password"
                  className="input"
                  value={passwordInput}
                  onChange={this.onChangePassword}
                  placeholder="Enter Password"
                />
              </div>
              <button className="button" type="submit">
                Add
              </button>
            </form>
          </div>
          <img
            className="side-image"
            alt="password manager"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          />
        </div>
        <div className="password-saved-container">
          <div className="details">
            <div className="details">
              <h1 className="count-password">Your Passwords</h1>
              <p className="span">{savedPassword.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="mag-image"
              />
              <input
                type="search"
                className="search-text"
                onChange={this.onSearchPassword}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="saved-password">
            <div className="check-box-container">
              <input
                type="checkbox"
                value={isTicked}
                onClick={this.isChecked}
                id="label"
              />
              <label htmlFor="label" className="saved-password">
                Show Passwords
              </label>
            </div>
            <ul className="img-or-password-container">
              {this.passwordContainerItems()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default AppContainer
