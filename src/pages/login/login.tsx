import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { FormEvent, useState } from "react";
import { useAppDispatch } from "../../services/hooks";
import { login } from "../../services/auth.store";
import {
  ShowIcon,
  HideIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const Login = () => {
  interface LoginData {
    email: string;
    password: string;
  }
  const initialData: LoginData = { email: "", password: "" };
  const [formData, setFormData] = useState(initialData);
  const [passwordType, setPasswordType] = useState("password");
  const dispatch = useAppDispatch();

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  const handlePasswordToggle = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <form className={`${styles.body}`} onSubmit={handleSubmit}>
      <span className="text text_type_main-medium mb-6">Вход</span>
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
        Войти
      </Button>
      <span className="text text_type_main-small mt-20">
        Вы новый пользователь? <a href="/register">Зарегистрироваться</a>
      </span>
      <span className="text text_type_main-small mt-4">
        Забыли пароль? <a href="/forgot-password">Восстановить пароль</a>
      </span>
    </form>
  );
};
