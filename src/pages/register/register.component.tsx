import { FormEvent, useState } from "react";
import { useAppDispatch } from "../../services/hooks";
import { register } from "../../services/auth.store";
import { Button, HideIcon, ShowIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { UserData } from "../profile/user.types";

export const RegisterPage = () => {

  const initialData: UserData = { name: "", email: "", password: "" };
  const [formData, setFormData] = useState(initialData);
  const [passwordType, setPasswordType] = useState("password");

  const dispatch = useAppDispatch();

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  const handlePasswordToggle = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <form className={`${styles.body}`} onSubmit={handleSubmit}>
      <span className="text text_type_main-medium mb-6">Регистрация</span>
      <input
        name="name"
        className={`${styles.input} mb-6`}
        placeholder="Имя"
        onChange={(e) => inputChangeHandler(e)}
      />
      <input
        name="email"
        className={`${styles.input} mb-6`}
        placeholder="E-mail"
        onChange={(e) => inputChangeHandler(e)}
      />
      <div className={`${styles.inputgroup}`}>
        <input
          name="password"
          className={`${styles.input} mb-6`}
          placeholder="Пароль"
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
      <Button htmlType="submit" type="primary">
        Зарегистрироваться
      </Button>
      <span className="text text_type_main-small mt-20">
        Уже зарегистрированы? <a href="/login">Войти</a>
      </span>
    </form>
  );
};
