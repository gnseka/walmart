import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { postLogin } from "../utils";
import { toast } from "react-toastify";

function SignUp({ setshowSignUp }) {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    name: "",
  });

  const [isChecked, setisChecked] = useState(false);

  const [errormessage, seterrormessage] = useState("");

  function handleFormChange(argument, event) {
    seterrormessage("");
    if (argument === "email") {
      setFormData({
        password: formData.password,
        userName: event.target.value,
        name: formData.name,
      });
    } else if (argument === "password") {
      setFormData({
        password: event.target.value,
        userName: formData.userName,
        name: formData.name,
      });
    } else if (argument === "name") {
      setFormData({
        password: formData.password,
        userName: formData.userName,
        name: event.target.value,
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

    const response = await postLogin({
      username: formData.userName,
      password: formData.password,
      name: formData.name,
    });

    if (response.id) {
      setshowSignUp(false);
      toast("user created with id " + response.id);
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="enter name"
            onChange={(event) => {
              handleFormChange("name", event);
            }}
          />
        </Form.Group>

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

export default SignUp;
