import "./App.css";
import { getAuth } from "firebase/auth";
import app from "./firebase.init";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";

const auth = getAuth(app);

function App() {
  const handleEmail = (event) => {
    console.log(event.target.value);
  };
  const handlePassword = (event) => {
    console.log(event.target.value);
  };
  const handleSubmited = (event) => {
    console.log("clicked");
    event.preventDefault();
  };
  return (
    <div>
      <div className="registration w-50 mx-auto mt-2">
        <h2 className="text-primary">Please Register!!</h2>
        <Form onSubmit={handleSubmited} className="">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePassword} type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
