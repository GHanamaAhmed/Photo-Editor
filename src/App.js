import { Component } from "react";
import Sign from "./signin/sign";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import {GoogleOAuthProvider} from "@react-oauth/google"
import Home from "./home/home";
class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <GoogleOAuthProvider clientId="358966606624-pgpritdpki16r4rosn20b4ou9i6id757.apps.googleusercontent.com">
        <Router>
          <Routes>
            <Route path="/authentication/*" element={<Sign />} />
            <Route path="/home/*" element={<Home />} />
            <Route path="/*" element={<Navigate to={"/authentication"} replace />} />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    );
  }
}

export default App;
