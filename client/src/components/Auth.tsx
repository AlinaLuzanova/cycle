import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AuthForm.module.css";
import TextField from "@mui/material/TextField";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const RegisterForm: FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const resJson = await response.json();
      if (resJson.text === "OK") {
        console.log(resJson.user);
        localStorage.setItem("user", resJson.user);
        navigate("/");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className={styles.main}>
      <h2 className={styles.title_form}>Registration</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          id="outlined-basic"
          label="Name"
          variant="outlined"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          name="email"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          name="password"
          type="password"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          style={{ color: "white", backgroundColor: "rgb(0, 33, 82)" }}
        >
          {" "}
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
