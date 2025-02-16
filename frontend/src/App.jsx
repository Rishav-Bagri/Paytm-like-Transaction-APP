import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/Sendmoney";


function App() {
    return (
        <div className="">
            <BrowserRouter>
                    <Routes>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/send" element={<SendMoney />} />
                    </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
