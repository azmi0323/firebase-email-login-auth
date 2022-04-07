import "./App.css";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import app from "./firebase.init";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [register, setRegister] = useState(false);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleRegisterChange = (event) => {
    setRegister(event.target.checked);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("password should contain at least one uppercase character");
      return;
    }
    setValidated(true);
    setError("");

    if (register) {
      signInWithEmailAndPassword(auth,email,password)
      .then(result=>{
        const user = result.user;
        console.log(user);
      })
      .catch(error=>{
        console.error(error);
        setError(error.message)
      })
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          setEmail("");
          setPassword("");
          emailVerification()
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
        });
    }
    event.preventDefault();
  };

  const handlePasswordReset=()=>{
    
  }

  const emailVerification =()=>{
    sendEmailVerification(auth.currentUser)
    .then(()=>{
      console.log('sent');
    })
  }
  return (
    <div>
      <div className="registration w-50 mx-auto mt-2">
        <h2 className="text-primary">
          Please {register ? "Login" : "Register"}!!
        </h2>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className=""
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleEmail}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={handlePassword}
              type="password"
              placeholder="Password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <p className="text-danger">{error}</p>
          <Form.Group
            onChange={handleRegisterChange}
            className="mb-3"
            controlId="formBasicCheckbox"
          >
            <Form.Check type="checkbox" label="Already Have An Account?" />
          </Form.Group>

          
          <Button onClick={handlePasswordReset} variant="link">Forget Password?</Button>
          <br />
          <Button variant="primary" type="submit">
            {register ? "Login" : "Register"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
