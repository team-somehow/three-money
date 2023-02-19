import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { AuthProvider, CHAIN } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";

const appID = "1d6361dc249a49bb64d73a880046f1929b6acd60";
export const arcanaProvider = new AuthProvider(appID, {
    network: "testnet", //defaults to 'testnet'
    position: "right", //defaults to right
    theme: "light", //defaults to dark
    alwaysVisible: true, //defaults to true which is Full UI mode
    chainConfig: {
        chainId: CHAIN.POLYGON_MUMBAI_TESTNET, //defaults to CHAIN.ETHEREUM_MAINNET
        rpcUrl: "https://polygon-rpc.com" //defaults to 'https://rpc.ankr.com/eth'
    }
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <>
        <ProvideAuth provider={arcanaProvider}>
            <App />
        </ProvideAuth>
    </>
);
