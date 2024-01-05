import { Navigate, useLocation } from "react-router-dom";
import { ReactElement } from "react";
import { useAppSelector } from "../../services/hooks";
import { selectIsAuthChecked, selectIsAuthorized } from "../../services/auth.store";

const ProtectedRouteElement = ({  onlyUnAuth = false, element }: {  onlyUnAuth?: boolean, element: ReactElement }): ReactElement => {
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const isAuthChecked = useAppSelector(selectIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <div> ЗАГРУЗКА </div>; //TODO: add loader
  }

  if (onlyUnAuth && isAuthorized) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isAuthorized) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ element }: {element: ReactElement}): ReactElement => (
  <ProtectedRouteElement onlyUnAuth={true} element={element} />
);

