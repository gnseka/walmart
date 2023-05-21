import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { loginUser, getUserId } from "../utils";

import { toast } from "react-toastify";

function LoginForm({ setShow }) {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [isChecked, setisChecked] = useState(false);

  const [errormessage, seterrormessage] = useState("");

  function handleFormChange(argument, event) {
    seterrormessage("");
    if (argument === "email") {
      setFormData({
        password: formData.password,
        userName: event.target.value,
      });
    } else if (argument === "password") {
      setFormData({
        password: event.target.value,
        userName: formData.userName,
      });
    }
  }

  const handleCheckBox = () => {
    seterrormessage("");
    setisChecked(!isChecked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isChecked) {
      seterrormessage("Please Agree to Terms and conditions");
      return;
    }

    if (formData.userName.length < 5) {
      seterrormessage("Enter Name more than 5 character");
      return;
    }

    if (formData.password.length < 5) {
      seterrormessage("Enter Password more than 5 character");
      return;
    }
    const userId = await getUserId(formData.userName);

    localStorage.setItem("username", formData.userName);
    localStorage.setItem("userId", userId);

    const response = await loginUser({
      username: formData.userName,
      password: formData.password,
    });

    console.log(formData);
    console.log(isChecked);
    console.log(response, "logged up user response");

    if (response.token) {
      setShow(false);
      toast("user logged with token " + response.token);
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(event) => {
            handleFormChange("email", event);
          }}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(event) => {
            handleFormChange("password", event);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          value={isChecked}
          type="checkbox"
          label="Agree with terms and Conditions"
          onChange={handleCheckBox}
        />
      </Form.Group>
      <h4 style={{ color: "red", fontFamily: "monospace" }}>{errormessage}</h4>
      <Button
        disabled={errormessage.length}
        variant="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Form>
  );
}

export default LoginForm;
