import './index.css'

const PasswordItem = props => {
  const {passwordDetails, isPasswordShown, deletePassword} = props
  const {id, website, username, password} = passwordDetails
  const initial = website[0].toUpperCase()
  const starImgURL =
    'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'

  const onClickDeleteLogo = () => {
    deletePassword(id)
  }

  return (
    <li className="password-item">
      <div className="initial-container">
        <p className="initial">{initial}</p>
      </div>
      <div className="password-details-container">
        <p className="website">{website}</p>
        <p className="username">{username}</p>
        {isPasswordShown ? (
          <p className="password">{password}</p>
        ) : (
          <img src={starImgURL} alt="stars" className="star-img" />
        )}
      </div>
      <button
        type="button"
        className="delete-btn"
        testid="delete"
        onClick={onClickDeleteLogo}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-logo"
        />
      </button>
    </li>
  )
}

export default PasswordItem
