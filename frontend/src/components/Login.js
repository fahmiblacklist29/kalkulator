import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';


const Login = () => {  

  const [userMod, setUserMod] = useState([]);
  const [id, setId] = useState("");
  const [user, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  const [loginDate, setLoginDate] = useState(new Date);

  const [isLoginValid, setLoginValid] = useState(false);
  const [isAlreadyLogin, setAlreadyLogin] = useState(false);

  const [isModal, setModal] = useState("modal "); 
  const [msg, setMessage] = useState("");

  useEffect(() => {

    let id = localStorage.getItem("user_id");
    if(null!=id)
    { getInfoUser(id); }
    
  }, []);

  const navigate = useNavigate();

  const getInfoUser = async (userid) => {
    const response = await axios.get(`http://localhost:5012/users/${userid}`);
    // setUser(response.data);
    navigate(`/main/${userid}`);
  };

  const closeModal = (e) => {
    setMessage("")
    setModal("modal ")
  }

  const processLogin = async (e) => {
    
    e.preventDefault();
    try {

      // set login date
      setLoginDate(new Date());
      setLoginValid(false);
      
      if(null == user || user.trim == "")
      {
        setMessage("Mohon isi username !!!");
        setModal("modal is-active");
        return; 
      }
      
      if(null == pass || pass.trim == "")
      {
        setMessage("Mohon isi password !!!");
        setModal("modal is-active");
        return; 
      }

      await doLogin();
      
      if(await isLoginValid)
      { 
        if(await isAlreadyLogin)
        {
          // Add log
          addLogLogin();

          // Update login
          updateUser();

          navigate(`/main/${id}`);
        }
        else
        {
          // Update login
          updateUser();

          navigate(`/main/${id}`);
        }

        localStorage.setItem('user_id', userMod._id);
        localStorage.setItem('user_name', userMod.name);
        
      }

      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const addLogLogin = async (e) => {
    // e.preventDefault();
    try {
      
      let name = userMod.name;
      let loginDate = userMod.loginDate;
      let logoutDate = new Date();

      await axios.post("http://localhost:5012/log", {
        name,
        loginDate,
        logoutDate,
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (e) => {
    // e.preventDefault();
    try {
      
      let name = userMod.name;
      let password = userMod.password;
      let createDate = userMod.createDate;
      let loginDate = new Date();
      let logoutDate = null;

      await axios.patch(`http://localhost:5012/users/${id}`, {
        name,
        password,
        createDate,
        loginDate,
        logoutDate
      });

    } catch (error) {
      console.log(error);
    }
  };

  const doLogin = async () => {
    const response =  await axios.get(`http://localhost:5012/users/login/${user}&${pass}`);
    if(null==response)
    {
      setMessage("Username tidak ditemukan !!!");
      setModal("modal is-active");
      setLoginValid(false);
    }
    else 
    { 
      if(null!=response.data[0].loginDate)
      { setAlreadyLogin(true); }
      setUserMod(response.data[0]);
      setLoginValid(true); 
      setId(response.data[0]._id)
    }
  };


  return (
    <section class="hero bg-default is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form onSubmit={processLogin} class="box">

                <div class="field">
                  <label for="" class="label">Username</label>
                  <div class="control has-icons-left">
                    <input type="text" placeholder="Username" class="input" 
                    value={user}
                    onChange={(e) => setUsername(e.target.value)} required/>
                    <span class="icon is-small is-left">
                      {/* <i class="fa fa-envelope"></i> */}
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Password</label>
                  <div class="control has-icons-left">
                    <input type="password" placeholder="*******" class="input"
                    value={pass}
                    onChange={(e) => setPassword(e.target.value)} required/>
                    <span class="icon is-small is-left">
                      {/* <i class="fa fa-lock"></i> */}
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                  </div>
                </div>
                
                {/* <div class="field">
                  <label for="" class="checkbox">
                    <input type="checkbox" class="mr-1"/>
                      Remember me
                  </label>
                </div> */}
                <div class="field">
                  <button type="submit" class="button is-success mr-1">
                    Masuk
                  </button>
                  <Link to="register" className="button is-success">
                    Daftar
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className={isModal}>
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Error message</p>
            <button class="delete" aria-label="close" onClick={closeModal}></button>
          </header>
          <section class="modal-card-body">
            {msg}
          </section>
          <footer class="modal-card-foot">
            <button class="button" onClick={closeModal}>Cancel</button>
          </footer>
        </div>
      </div>
    </section>
  );
}

 
export default Login;