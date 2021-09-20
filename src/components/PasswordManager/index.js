import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    checked: false,
    searchValue: '',
  }

  onPasswordSearch = event => {
    this.setState({searchValue: event.target.value})
  }

  onShowPassword = event => {
    this.setState({checked: event.target.checked})
  }

  onAddWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onAddUsename = event => {
    this.setState({usernameInput: event.target.value})
  }

  onAddPassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onAddUserDetails = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state

    const newUserObject = {
      id: v4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newUserObject],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  deletePassword = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(
        eachObj => eachObj.id !== id,
      ),
    }))
  }

  getFilteredPasswords = () => {
    const {passwordsList, searchValue} = this.state
    return passwordsList.filter(eachPass =>
      eachPass.website.toLowerCase().includes(searchValue.toLowerCase()),
    )
  }

  renderPasswordItem = passwordList => {
    const {checked} = this.state

    return passwordList.map(eachPassword => (
      <PasswordItem
        passwordDetails={eachPassword}
        key={eachPassword.id}
        isPasswordShown={checked}
        deletePassword={this.deletePassword}
      />
    ))
  }

  renderNoPassword = () => (
    <div className="nopassword-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-password"
      />
      <p className="no-password-text">No Passwords</p>
    </div>
  )

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      checked,

      searchValue,
    } = this.state

    const filteredPasswordList = this.getFilteredPasswords()

    return (
      <div className="background-container">
        <div className="app-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            className="app-logo"
            alt="app logo"
          />
          <div className="passwordImg-form-container">
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="password-manager-lg-img"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                alt="password manager"
                className="password-manager-img"
              />
            </picture>
            <form
              className="password-form-container"
              onSubmit={this.onAddUserDetails}
            >
              <h1 className="addForm-heading">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="inputBar-img"
                />
                <input
                  type="text"
                  className="inputBar"
                  value={websiteInput}
                  onChange={this.onAddWebsite}
                  placeholder="Enter Website"
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="inputBar-img"
                />
                <input
                  type="text"
                  className="inputBar"
                  value={usernameInput}
                  onChange={this.onAddUsename}
                  placeholder="Enter Username"
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="inputBar-img"
                />
                <input
                  type="password"
                  className="inputBar"
                  value={passwordInput}
                  onChange={this.onAddPassword}
                  placeholder="Enter Password"
                />
              </div>
              <button type="submit" className="btn">
                Add
              </button>
            </form>
          </div>
          {/* bottom password display  container */}
          <div className="password-display-container">
            <div className="passwordCount-searchBar-container">
              <div className="pass-count-container">
                <h1 className="password-count">Your Passwords</h1>
                <p className="password-counter">
                  {filteredPasswordList.length}
                </p>
              </div>
              <div className="search-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
                <input
                  className="search-input"
                  type="search"
                  value={searchValue}
                  onChange={this.onPasswordSearch}
                  placeholder="Search"
                />
              </div>
            </div>
            <hr className="line" />
            <div className="showPassword-radio-container">
              <input
                type="checkbox"
                id="showPassword"
                className="show-password-input"
                onChange={this.onShowPassword}
                checked={checked}
              />
              <label htmlFor="showPassword" className="show-pass-label">
                Show passwords
              </label>
            </div>
            <ul className="password-item-container">
              {filteredPasswordList.length === 0
                ? this.renderNoPassword()
                : this.renderPasswordItem(filteredPasswordList)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
