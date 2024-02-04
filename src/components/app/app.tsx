import { HomePage } from "../../pages/home/home";
import { AppHeader } from "../app-header/app-header.component";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  OnlyAuth,
  OnlyUnAuth,
} from "../protected-route/protected-route.component";
import { Login } from "../../pages/login/login";
import { useEffect } from "react";
import { setIsAuthChecked, setToken } from "../../services/auth.store";
import { NotFoundPage } from "../../pages/not-found/not-found";
import { IngredientDetails } from "../burger-ingredients/ingredient-details/ingredient-details.component";
import { Modal } from "../modal/modal.component";
import { RegisterPage } from "../../pages/register/register.component";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { UserDataPage } from "../../pages/profile/user-data/user-data";
import { ProfilePage } from "../../pages/profile/profile";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import { fetchIngredients } from "../../services/burger-ingredients.store";
import { useAppDispatch } from "../../services/hooks";
import { Orders } from "../../pages/profile/orders/orders";
import { OrderDetails } from "../orders-list/order-details/order-details.component";
import { Feed } from "../../pages/feed/feed";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    token && dispatch(setToken(token));
    dispatch(setIsAuthChecked(true));
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/login" element={<OnlyUnAuth element={<Login />} />} />
        <Route
          path="/register"
          element={<OnlyUnAuth element={<RegisterPage />} />}
        />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth element={<ForgotPasswordPage />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuth element={<ResetPasswordPage />} />}
        />
        <Route
          path="/ingredients/:ingredientId"
          element={<IngredientDetails />}
        />
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:number" element={<OrderDetails />} />
        <Route path="/profile" element={<OnlyAuth element={<ProfilePage />} />}>
          <Route
            index
            path="/profile"
            element={<OnlyAuth element={<UserDataPage />} />}
          />
          <Route
            path="/profile/orders"
            element={<OnlyAuth element={<Orders />} />}
          />
          <Route
            path="/profile/orders/:number"
            element={<OnlyAuth element={<OrderDetails />} />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal onClose={handleModalClose} header="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:number"
            element={
              <Modal onClose={handleModalClose} header="Детали заказа ">
                <OrderDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
