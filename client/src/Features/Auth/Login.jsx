import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../helpers/auth";
import { login } from "../../slices/authSlice";

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tried, setTried] = useState(0);
  const [content, setContent] = useState("");

  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "scroll",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const values = useSelector((state) => state.auth);
  console.log(values);

  function handleClick() {
    navigate("/register");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let loginObj = {
      email: email,
      password: password,
    };

    console.log("submit data login", loginObj);

    try {
      let attempts = tried + 1;
      setTried(attempts);
      console.log(tried);

      const response = await loginUser(loginObj);
      console.log("Login response", response);

      if (!response.token) {
        setContent("Something went wrong! Do you need to register?");
      } else {
        dispatch(
          login({
            email: email,
            token: response.token,
            user_id: response.user.user_id,
            firstname: response.user.firstname,
          })
        );
      }

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("JWToken", response.token);

      response.token && navigate("/userlanding");
      return content;
    } catch (error) {
      console.log(error);
    }
  }
  console.log("selector has: ", values);

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="loginform">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Username:{" "}
                <input
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid black",
                    borderRadius: "5px",
                    padding: "5px",
                    margin: "5px",
                  }}
                  autoComplete="off"
                  id="username"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <br />
              <label>
                Password:{" "}
                <input
                  autoComplete="off"
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <br />
              <div>
                <button disabled={email.length < 1 || password.length < 1}>
                  Submit
                </button>
              </div>
            </form>

            <div>
              <p>{content}</p>
            </div>

            <br />
            <div>
              <button className="register" onClick={handleClick}>
                Register
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
