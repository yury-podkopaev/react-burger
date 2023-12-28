import { HomePage } from "../../pages/home/home";
import { AppHeader } from "../app-header/app-header.component";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  OnlyAuth,
  OnlyUnAuth,
} from "../protected-route/protected-route.component";
import { Login } from "../../pages/login/login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsAuthChecked, setToken } from "../../services/auth.store";
import { NotFoundPage } from "../../pages/not-found/not-found";
import { IngredientDetails } from "../burger-ingredients/ingredient-details/ingredient-details.component";
import { Modal } from "../modal/modal.component";
import { RegisterPage } from "../../pages/register/register.component";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { UserDataPage } from "../../pages/profile/user-data/user-data";
import { ProfilePage } from "../../pages/profile/profile";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";

function App() {
  const dispatch = useDispatch();
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
          element={<OnlyAuth element={<IngredientDetails />} />}
        />
        <Route path="/home" element={<OnlyAuth element={<HomePage />} />} />
        {/* <Route path="/orders-list" element={<OnlyAuth element={<HomePage />} />} /> */}
        <Route path="/profile" element={<OnlyAuth element={<ProfilePage />} />}>
          <Route
            index
            path="/profile"
            element={<OnlyAuth element={<UserDataPage />} />}
          />
          <Route
            path="/profile/orders"
            element={<OnlyAuth element={<NotFoundPage />} />}
          />
          <Route
            path="/profile/orders/:id"
            element={<OnlyAuth element={<NotFoundPage />} />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal onClose={handleModalClose}  header="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
