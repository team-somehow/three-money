import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { providers, Contract, utils } from "ethers";
// import ThreeBank from "../../artifacts/contracts/ThreeBank.sol/ThreeBank.json";
import { arcanaProvider } from "../../main";
import contractAddress from "../../constants/contractAddress";

import { useAuth } from "@arcana/auth-react";
import {
    collection,
    getDocs,
    query,
    where,
    updateDoc,
    doc,
    getDoc,
} from "@firebase/firestore";
import { db } from "../../config/firebase";

function LoanPaymentListItem({ id, name, month, onPay, payAmount, panNumber }) {
	const auth=useAuth()
    // const provider = new providers.Web3Provider(arcanaProvider.provider);
    // const signer = provider.getSigner();
    // const contract = new Contract(contractAddress, ThreeBank.abi, signer);

    const handlePayInstallment = async () => {
        const amountInWei = utils.parseEther(payAmount.toString());

        // await contract.deposit(panNumber, {
        //     value: amountInWei,
        // });

		const q = query(
			collection(db, "ThreeBank"),
			where("arcanaUid", "==", auth.user.publicKey)
		);

		const querySnapshot = await getDoc(q);

		// console.log(querySnapshot.id,querySnapshot.data())

        // const q = query(
        //     collection(db, "ThreeBank"),
        //     where("pan", "==", panNumber)
        // );
        // const data = await getDoc(q);

        // data.forEach(doc=>console.log({id:doc.id,...doc.data()}))
    };

    return (
        <Box
            component={Paper}
            p={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
        >
            <Box>
                <Typography variant="h4">{name}</Typography>
                <Typography variant="h6">Pay for {month}</Typography>
            </Box>
            <Button
                variant="contained"
                onClick={handlePayInstallment}
                size="large"
            >
                Pay ₹{payAmount}
            </Button>
        </Box>
    );
}

export default LoanPaymentListItem;
