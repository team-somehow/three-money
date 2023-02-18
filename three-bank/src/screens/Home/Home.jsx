import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "@arcana/auth-react";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <h1 style={{ textAlign: "center", marginBlock: "50px" }}>
                    Welcome to 3 Bank
                </h1>
                <Auth
                    externalWallet={false}
                    theme="dark"
                    onLogin={() => {
                        navigate("/account/create");
                    }}
                ></Auth>
            </div>
        </div>
    );
};

export default Home;
