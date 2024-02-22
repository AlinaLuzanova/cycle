import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Main.module.css";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

interface RegisterFormProps {
  onSubmit: (formData: RegisterFormData) => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ onSubmit }) => {
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
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const resJson = await response.json();
      if (resJson.text === "OK") {
        navigate("/");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className={styles.main}>
      <h3 className={styles.title_form}>Registration</h3>
      <div className={styles.content}>
        <div className={styles.mainContent}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit"> Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
