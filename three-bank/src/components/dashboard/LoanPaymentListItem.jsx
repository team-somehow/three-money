import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { providers, Contract, utils } from "ethers";
import ThreeBank from "../../artifacts/contracts/ThreeBank.sol/ThreeBank.json";
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
    const auth = useAuth();
    const provider = new providers.Web3Provider(arcanaProvider.provider);
    const signer = provider.getSigner();
    const contract = new Contract(contractAddress, ThreeBank.abi, signer);

    const handlePayInstallment = async () => {
        // return;
        if (!payAmount) return;

        const amountInWei = utils.parseUnits(payAmount.toString(), 18);

        console.log("1", amountInWei);

        const q = query(
            collection(db, "ThreeBank"),
            where("arcanaUid", "==", auth.user.publicKey)
        );

        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });

        // await contract.makeLoanPayment(panNumber, amountInWei);
        // const balance=
        const loanPayments = data[0].loanPayments;
        const loanRequest = data[0].loanRequest;
        let newData = [];
        for (let i = 0; i < loanPayments.length; i++) {
            if (loanPayments[i].id === id) {
                newData.push(loanPayments[i]);
            } else {
                let temp = loanPayments[i];
                temp.currentPayment = temp.currentPayment + 1;
                if (temp.currentPayment === parseInt(temp.loanTenure)) {
                    loanRequest.map((item) => {
                        if (item.loanId === loanPayments[i].id) {
                            item.approvedStatus = "completed";
                        }
                        return item;
                    });
                }
                const month = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                ];

                let x = month.findIndex((l) => l === temp.month);

                temp.month = month[x + 1];
                newData.push(temp);
            }
        }
        const accountRef = doc(db, "ThreeBank", data[0].id);
        await updateDoc(accountRef, {
            bankDetails: {
                balance: parseFloat(data[0].bankDetails.balance) - parseFloat(payAmount),
            },
            loanRequest: loanRequest,
            loanPayments: newData,
        });
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
