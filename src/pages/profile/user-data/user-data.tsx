import { FormEvent, useEffect, useState } from "react";
import styles from "./user-data.module.css";
import {
  Button,
  EditIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { UserData } from "../user.types";
import { getUser, selectIsUserLoading, updateUser, selectUser } from "../../../services/user.store";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";

export const UserDataPage = () => {
  const [isDataChanged, setDataChanged] = useState(false);

  const initialData: UserData = useAppSelector(selectUser);
  const isUserLoading = useAppSelector(selectIsUserLoading);
  let formData = initialData;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());    
  }, [dispatch]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataChanged(true);
    const { name, value } = event.target;
    formData = { ...formData, [name]: value };
  };

  const handleEditClick = (e: React.MouseEvent<HTMLElement>) => {
    const field = e.currentTarget.previousElementSibling;

    return field?.hasAttribute("disabled")
      ? field.removeAttribute("disabled")
      : field?.setAttribute("disabled", "disabled");
  };

  const handleReset = () => {
    formData = initialData;
    setDataChanged(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDataChanged(false);
    dispatch(updateUser(formData));
  };  

  return (
    isUserLoading ? <div>LOADING</div> :
    <form
      onReset={handleReset}
      onSubmit={handleSubmit}
      className={`${styles.wrapper}`}
    >
      <div className={`${styles.inputgroup}`}>
        <input
          name="name"
          className={`${styles.input} mb-6`}
          placeholder="Имя"
          value={formData.name}
          disabled
          onChange={(e) => inputChangeHandler(e)}
        />
        <div className={`${styles.icon}`} onClick={handleEditClick}>
          <EditIcon type="primary" />
        </div>
      </div>
      <div className={`${styles.inputgroup}`}>
        <input
          name="email"
          className={`${styles.input} mb-6`}
          placeholder="Логин"
          value={formData.email}
          disabled
          onChange={(e) => inputChangeHandler(e)}
        />
        <div className={`${styles.icon}`} onClick={handleEditClick}>
          <EditIcon type="primary" />
        </div>
      </div>
      <div className={`${styles.inputgroup}`}>
        <input
          name="password"
          type="password"
          className={`${styles.input} mb-6`}
          placeholder="Пароль"
          disabled
          onChange={(e) => inputChangeHandler(e)}
        />
        <div className={`${styles.icon}`} onClick={handleEditClick}>
          <EditIcon type="primary" />
        </div>
      </div>

      {isDataChanged && (
        <div className={`${styles.buttons}`}>
          <Button htmlType="reset" type="secondary">
            Отменить
          </Button>
          <Button htmlType="submit" type="primary">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};
