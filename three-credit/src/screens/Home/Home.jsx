import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@arcana/auth-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBlock: "50px" }}>
        Welcome to 3 Credit
      </h1>
      <div>
        <Auth
          externalWallet={false}
          theme="dark"
          onLogin={() => {
            navigate("/create-account");
          }}
        ></Auth>
      </div>
    </div>
  );
};

export default Home;
