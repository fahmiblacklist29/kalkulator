import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';


const Register = () =>
{
  const [name, setName] = useState("");
  const [password, setPw] = useState("");
  const [createDate, setCreateDate] = useState(new Date());
  const [repassword, setRePw] = useState("");

  const [isModal, setModal] = useState("modal "); 
  const [msg, setMessage] = useState("");

  const [userExist, setUserIsExist] = useState(false);

  const navigate = useNavigate();

  const saveUser = async (e) => {
    
    e.preventDefault();
    try {

      // check username exist
      setUserIsExist(false);
      setCreateDate(new Date())
      await getUsersByName();
      
      if(await userExist)
      {
        // console.log("Password tidak sama");
        setMessage("Username sudah terdaftar");
        setModal("modal is-active");
        return; 
      }
      
      if(password != repassword)
      {
        // console.log("Password tidak sama");
        setMessage("Password tidak sama");
        setModal("modal is-active");
        return; 
      }
      
      await axios.post("http://localhost:5012/users", {
        name,
        password,
        createDate,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };


  const getUsersByName = async () => {
    const response =  await axios.get(`http://localhost:5012/users/name/${name}`);
    if(null!=response)
    { setUserIsExist(true); }
  };

  const closeModal = (e) => {
    setMessage("")
    setModal("modal ")
  }

  return (
    <section class="hero bg-default is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form onSubmit={saveUser} class="box">

                <div class="field">
                  <label for="" class="label">Username</label>
                  <div class="control has-icons-left">
                    <input type="text" 
                    placeholder="Username" 
                    class="input" 
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    required/>
                    <span class="icon is-small is-left">
                      {/* <i class="fa fa-envelope"></i> */}
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Password</label>
                  <div class="control has-icons-left">
                    <input type="password" 
                      placeholder="*******" 
                      class="input"
                      value={password}
                      onChange={(e) => setPw(e.target.value)} 
                      required/>
                    <span class="icon is-small is-left">
                      {/* <i class="fa fa-lock"></i> */}
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Re-Type Password</label>
                  <div class="control has-icons-left">
                    <input type="password" 
                      placeholder="*******" 
                      class="input"
                      value={repassword}
                      onChange={(e) => setRePw(e.target.value)} 
                      required/>
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
                  <Link to="/" class="button is-danger mr-1">
                    Batal
                  </Link>
                  <button type="submit" class="button is-success">
                    Daftar
                  </button>
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

export default Register