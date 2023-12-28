import { FormEvent, useState } from "react";
import { Button, HideIcon, ShowIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchUrl } from "../../utils/fetch-url";

export const ResetPasswordPage = () => {
  interface ResetData {
    password: string;
    code: string;
  }
  const initialData: ResetData = { password: "", code: "" };
  const [formData, setFormData] = useState(initialData);
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchUrl('/password-reset/reset', {
        method: "POST",
        body: JSON.stringify({ ...formData }),
        headers: {
          "Content-Type": "application/json",
        }}).then(() => {
            localStorage.removeItem('from-forgot-password');
            navigate("/login");
        }).catch(err => alert(err.message));
  };

  const handlePasswordToggle = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  if(localStorage.getItem("from-forgot-password") !== "true") {
    return <Navigate to="/" />;
  }

  return (
    <form className={`${styles.body}`} onSubmit={handleSubmit}>
      <span className="text text_type_main-medium mb-6">Восстановление пароля</span>
      <div className={`${styles.inputgroup}`}>
        <input
          name="password"
          className={`${styles.input} mb-6`}
          placeholder="Введите новый пароль"
          type={passwordType}
          onChange={(e) => inputChangeHandler(e)}
        />
        <div className={`${styles.icon}`} onClick={handlePasswordToggle}>
          {passwordType === "password" ? (
            <ShowIcon type="primary" />
          ) : (
            <HideIcon type="primary" />
          )}
        </div>
      </div>
      <input
        name="code"
        className={`${styles.input} mb-6`}
        placeholder="Введите код из письма"
        onChange={(e) => inputChangeHandler(e)}
      />
      <Button htmlType="submit" type="primary">
        Сохранить
      </Button>
      <span className="text text_type_main-small mt-20">
        Вспомнили пароль? <a href="/login">Войти</a>
      </span>
    </form>
  );
};
