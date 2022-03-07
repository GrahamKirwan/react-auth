import { Switch, Route, Redirect } from "react-router-dom";

import { useContext } from "react";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { AuthContext } from "./components/store/auth-context";

function App() {
  const ctx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!ctx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        
          <Route path="/profile">
          {ctx.isLoggedIn && <UserProfile />}
          {!ctx.isLoggedIn && <Redirect to="/auth" />}
            
          </Route>
        <Route path="*">
          <h1>404</h1>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
