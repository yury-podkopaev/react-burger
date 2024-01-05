import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useState } from "react";
import styles from './forgot-password.module.css';
import { fetchUrl } from "../../utils/fetch-url";
import { useNavigate } from "react-router-dom";

export const ForgotPasswordPage = () => {
      const [email, setEmail] = useState('');
      const navigate = useNavigate();
    
      const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchUrl('/password-reset',{
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
              "Content-Type": "application/json",
            }}).then(() => {
                localStorage.setItem('from-forgot-password', 'true');
                navigate("/reset-password");
            });

      };
     return (
    <form className={`${styles.body}`} onSubmit={handleSubmit}>
      <span className="text text_type_main-medium mb-6">Восстановление пароля</span>
      <input
        name="email"
        className={`${styles.input} mb-6`}
        placeholder="Укажите e-mail"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button htmlType="submit" type="primary">
        Восстановить
      </Button>
      <span className="text text_type_main-small mt-20">
        Вспомнили пароль? <a href="/login">Войти</a>
      </span>
    </form>
  );
};
