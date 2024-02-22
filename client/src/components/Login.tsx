import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import styles from "../styles/AuthForm.module.css";

interface LoginFormData {
  name: string;
  password: string;
}

const LoginForm: FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    name: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      //const resJson = await response.json();
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error login up:", error);
    }
  };

  return (
      <div className={styles.main}>
        <h2 className={styles.title_form}>Authorization</h2>
        <form onSubmit={handleSubmit}>
          <TextField
              name="name"
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange} required
          />
          <TextField
              name="password"
              type="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange} required
          />
          <button type="submit"  style={{ color: 'white', backgroundColor: 'rgb(0, 33, 82)' }} >Sign in</button>
        </form>
      </div>
  );
};

export default LoginForm;
