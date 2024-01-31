import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
export function RouteSetuo() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={< App />}></Route>
            </Routes>
        </BrowserRouter>
    )
}