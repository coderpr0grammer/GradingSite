import "./App.css";
import RoutesTree from "./components/navigation/RoutesTree";
import Layout from "./components/layout/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import AuthenticationContextProvider, { AuthenticationContext } from "./infrastructure/Authentication/authentication.context";

function App() {
  return (
    
      <div className="App">
        <AuthenticationContextProvider>
        <Router>
          <Layout>
            <RoutesTree />
          </Layout>
        </Router>
        </AuthenticationContextProvider>
      </div>
  );
}

export default App;