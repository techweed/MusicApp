import React, {Suspense} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import routes from "./routes";
import AppSpinner from "./components/spinner";

const AppRoutes = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        {routes.map(({component: Component, path, ...rest}) => (
          <Route
            {...rest}
            key={path}
            path={path}
            element={
              <Suspense fallback={<AppSpinner />}>
                <Component />
              </Suspense>
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
