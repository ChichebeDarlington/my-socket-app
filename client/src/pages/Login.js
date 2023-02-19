
const Login = ({handleChange,handleSubmit,username}) => {

  return (
    <div>
        <input className="input"
         type="text"
          placeholder="username"
           value={username}
            onChange={handleChange} 
            />
        <button 
        className="btn" 
        onClick={handleSubmit}>
          Login
          </button>
    </div>
  )
}

export default Login