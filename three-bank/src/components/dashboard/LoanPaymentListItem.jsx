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
} from "@firebase/firestore";
import { db } from "../../config/firebase";

function LoanPaymentListItem({ id, name, month, onPay, payAmount, panNumber }) {
	console.log(panNumber);
	// const provider = new providers.Web3Provider(arcanaProvider.provider);
	// const signer = provider.getSigner();
	// const contract = new Contract(contractAddress, ThreeBank.abi, signer);

	const handlePayInstallment = async () => {
		console.log("hello");

		const amountInWei = utils.parseEther(payAmount.toString());

		console.log("amountInWei", amountInWei);

		// await contract.deposit(panNumber, {
		//     value: amountInWei,
		// });

		console.log("fdas", id);

		const userDataRef = doc(db, "ThreeBank", id);
		const getData = await getDocs(userDataRef);

		console.log("getData", getData);

		// await updateDoc(userDataRef, {
		//     bankDetails: {
		//         balance: parseFloat(balance) + parseFloat(depositVal),
		//     },
		// });
		setBalance(parseFloat(balance) + parseFloat(depositVal));
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
			<Button variant="contained" onClick={handlePayInstallment} size="large">
				Pay ₹{payAmount}
			</Button>
		</Box>
	);
}

export default LoanPaymentListItem;
