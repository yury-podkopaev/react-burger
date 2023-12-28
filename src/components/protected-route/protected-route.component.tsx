import { Navigate, useLocation } from "react-router-dom";
import { ReactElement } from "react";
import { useAppSelector } from "../../services/hooks";
import { selectIsAuthChecked, selectUser } from "../../services/auth.store";

const ProtectedRouteElement = ({  onlyUnAuth = false, element }: {  onlyUnAuth?: boolean, element: ReactElement }): ReactElement => {
  const user = useAppSelector(selectUser);
  const isAuthChecked = useAppSelector(selectIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <div> ЗАГРУЗКА </div>; //TODO: add loader
  }

  if (onlyUnAuth && user.name) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user.name) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ element }: {element: ReactElement}): ReactElement => (
  <ProtectedRouteElement onlyUnAuth={true} element={element} />
);

