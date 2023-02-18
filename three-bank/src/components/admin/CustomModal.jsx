import { Button, Modal, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { arcanaProvider } from "../../main";
import { providers, Contract, utils, ethers } from "ethers";
import contractAddress from "../../constants/contractAddress";
import {
	arrayUnion,
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
// import ThreeBank from "../../artifacts/contracts/ThreeBank.sol/ThreeBank.json";
const data = {
	options: {
		chart: {
			height: 350,
			type: "radialBar",
			offsetY: -10,
		},
		plotOptions: {
			radialBar: {
				startAngle: -135,
				endAngle: 135,
				dataLabels: {
					name: {
						fontSize: "16px",
						color: undefined,
						offsetY: 120,
					},
					value: {
						offsetY: 76,
						fontSize: "22px",
						color: undefined,
						formatter: function (val) {
							return val * 10;
						},
					},
				},
			},
		},
		fill: {
			type: "gradient",
			gradient: {
				shade: "dark",
				shadeIntensity: 0.15,
				inverseColors: false,
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 50, 65, 91],
			},
		},
		stroke: {
			dashArray: 4,
		},
		labels: ["Credit Score"],
	},
};

const ChildModal = ({ open, status, onClose }) => {
	return (
		<Modal open={open} onClose={onClose}>
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Paper
					sx={{
						width: "40vw",
						height: "40vh",
						padding: "5vw",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					{status ? "SUCCESS" : "FAILED"}
					<Button onClick={() => onClose()} variant="outlined">
						Ok
					</Button>
				</Paper>
			</div>
		</Modal>
	);
};

const CustomModal = ({ open, handleClose, panCardNumber, amount, tenure }) => {
	const [status, setStatus] = useState(false);
	const [expand, setExpand] = useState(false);
	const [creditScore, setCreditScore] = useState(600);

	const approveLoan = async () => {
		// const provider = new providers.Web3Provider(arcanaProvider.provider);
		// const signer = provider.getSigner();
		// const contract = new Contract(contractAddress, ThreeBank.abi, signer);
		const q = query(
			/*  */ collection(db, "ThreeBank"),
			where("pan", "==", panCardNumber)
		);
		const arr = [];
		const datafromfirebase = await getDocs(q);

		datafromfirebase.forEach((doc) => {
			console.log(doc.id, "=>", doc.data());
			arr.push({ id: doc.id, ...doc.data() });
		});
		const accountRef = doc(db, "ThreeBank", arr[0].id);
		await updateDoc(accountRef, {
			loanPayments: arrayUnion({
				id: parseInt(Math.random() * 100),
				name: parseInt(Math.random() * 100),
				loanAmmount: amount,
				loanTenure: tenure,
				pan: panCardNumber,
				currentPayment: 0,
                month:"February"
			}),
		});

		console.log("success");

		let data = {
			loanType: "Home",
			loanAmount: ethers.utils.parseEther(amount),
			loanTenure: tenure,
			repaymentStatus: "ongoing",
		};

		// console.log(await contract.requestLoan(panCardNumber, data));

		setExpand(true);
		setStatus(true);
	};

	return (
		<>
			<Modal open={open} onClose={handleClose}>
				<div
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<ChildModal
						open={expand}
						status={status}
						onClose={() => setExpand(false)}
					/>
					<Paper
						sx={{
							width: "40vw",
							height: "fit-content",
							display: "flex",
							alignItems: "center",
							flexDirection: "column",
							padding: "2rem",
						}}
					>
						<Typography variant="h4">Information from Contract</Typography>
						<ReactApexChart
							options={data.options}
							series={[creditScore / 10]}
							type="radialBar"
							height={300}
						/>
						<Box>
							<Button onClick={() => approveLoan()}>Approve for Loan</Button>
							<Button onClick={() => handleClose()}>Reject Loan</Button>
						</Box>
					</Paper>
				</div>
			</Modal>
		</>
	);
};

export default CustomModal;
