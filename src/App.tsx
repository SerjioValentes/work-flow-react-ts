import React, {useState} from 'react';
import LoginPage from "./pages/LoginPage";
import './index.css';
import HomePage from "./pages/HomePage";

function App() {

    const [accessToken, setAccessToken] = useState<string | null>(null)

    if (accessToken) {
        return (
            <div>
                <HomePage/>
            </div>
        )} else {
        return (<LoginPage setAccessToken={setAccessToken} />);
    }
}

export default App;
