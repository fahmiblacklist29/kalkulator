import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Main = () =>
{
  const [user, setUser] = useState([]);
  const [bil1, setBill1] = useState(0);
  const [bil2, setBill2] = useState(0);
  const [operator, setOperator] = useState("plus");
  const { id } = useParams();
  const [isModal, setModal] = useState("modal "); 
  const [msg, setMessage] = useState("");

  const [result, setResult] = useState(0)
  const [pembilang, setPembilang] = useState("");

  useEffect(() => {
    getInfoUser();
  }, []);

  useEffect(() => {
    setResult("")
    setPembilang("")
  }, [bil1, bil2, operator]);

  const navigate = useNavigate();

  const getInfoUser = async () => {
    // check session
    let uid = localStorage.getItem("user_id");
    
    if(null==uid)
    { navigate("/"); }
    
    const response = await axios.get(`http://localhost:5012/users/${id}`);
    setUser(response.data);
  };

  const closeModal = (e) => {
    setMessage("")
    setModal("modal ")
  }

  const doLogout = (e) => 
  {
    // e.preventDefault();
    try {
      // add log
      addLog();

      // update login info
      updateUser()

      // clear localstorage
      localStorage.clear("user_id");
      localStorage.clear("user_name");

      navigate("/");

    } catch (error) {
      console.log(error);
    }
  }

  const jumlah = (e) => 
  {
    try {
      let hasil;

      if(operator == "plus")
      { hasil = bil1 + bil2; }
      else if(operator == "minus")
      { hasil = bil1 - bil2; }
      else if(operator == "multiple")
      { hasil = bil1 * bil2; }
      else 
      { hasil = bil1 / bil2; }

      setResult(hasil);

    } catch (error) {
      console.log(error);
    }
  }

  const doPembilang = (e) =>
  {
    try {

      if(null==result)
      {
        setMessage(" Mohon temukan hasil terlebih dahulu !!!")
        setModal("modal is-active")
        return; 
      }
      let hasil = result;
      let hasilPembilang = "";
      
      if(hasil > 0)
      { hasilPembilang = getPembilang(hasil); }
      else
      { hasilPembilang = "minus "+getPembilang(hasil * -1)}
      
      setPembilang(hasilPembilang);

    } catch (error) {
      console.log(error);
    }
  }

  const getPembilang = (hasil) =>
  {
    let result = "";
    let huruf = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];
    
		if (hasil < 12) {
			result = " " + huruf[parseInt(hasil)];
		} else if (hasil <20) {
			result = getPembilang(hasil - 10) + " belas";
		} else if (hasil < 100) {
			result = getPembilang(hasil/10) + " puluh" + getPembilang(hasil % 10);
		} else if (hasil < 200) {
			result = " seratus" + getPembilang(hasil - 100);
		} else if (hasil < 1000) {
			result = getPembilang(hasil/100) + " ratus" + getPembilang(hasil % 100);
		} else if (hasil < 2000) {
			result = " seribu" + getPembilang(hasil - 1000);
		} else if (hasil < 1000000) {
			result = getPembilang(hasil/1000) + " ribu" + getPembilang(hasil % 1000);
		} else if (hasil < 1000000000) {
			result = getPembilang(hasil/1000000) + " juta" + getPembilang(hasil % 1000000);
		} else if (hasil < 1000000000000) {
			result = getPembilang(hasil/1000000000) + " milyar" + getPembilang(hasil % 1000000000);
		} else if (hasil < 1000000000000000) {
			result = getPembilang(hasil/1000000000000) + " trilyun" + getPembilang(hasil % 1000000000000);
		}    

    return result;
  }

  const updateUser = async (e) => {
    // e.preventDefault();
    try {
      
      let name = user.name;
      let password = user.password;
      let createDate = user.createDate;
      let loginDate = null;
      let logoutDate = new Date();

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

  const addLog = async (e) => {
    // e.preventDefault();
    try {
      
      let name = user.name;
      let loginDate = user.loginDate;
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



  return (
    <section class="hero bg-default is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form class="box">

                <div class="field">
                  <label for="" class="label">Bilangan Pertama</label>
                  <div class="control">
                    <input type="number" placeholder="Bilangan Pertama" class="input" 
                    value={bil1}
                    onChange={(e) => setBill1(parseInt(e.target.value))} required/>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Operator</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select
                        value={operator}
                        onChange={(e) => setOperator(e.target.value)}
                      >
                        <option value="plus">Penambahan (+)</option>
                        <option value="minus">Pengurangan (-)</option>
                        <option value="multiple">Perkalian (*)</option>
                        <option value="divide">Pembagian (/)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Bilangan Kedua</label>
                  <div class="control ">
                    <input type="number" placeholder="Bilangan Kedua" class="input"
                    value={bil2}
                    onChange={(e) => setBill2(parseInt(e.target.value))} required/>
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Hasil</label>
                  <div class="control ">
                    <input type="number" placeholder="Hasil" class="input"
                    value={parseInt(result)}
                    readOnly/>
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Pembilang</label>
                  <div class="control ">
                    <input type="text" placeholder="Pembilang" class="input"
                    value={pembilang}
                    readOnly/>
                  </div>
                </div>
                
                {/* <div class="field">
                  <label for="" class="checkbox">
                    <input type="checkbox" class="mr-1"/>
                      Remember me
                  </label>
                </div> */}
                <div class="field">
                  <button type="button" class="button is-success mr-1" onClick={(e) => jumlah()}>
                    Hasil
                  </button>
                  <button type="button" class="button is-success mr-1" onClick={(e) => doPembilang()}>
                    Pembilang
                  </button>
                  <button type="button" class="button is-danger" onClick={(e) => doLogout()}>
                    Keluar
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

export default Main