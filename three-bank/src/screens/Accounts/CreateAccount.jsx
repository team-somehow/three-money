import {
    Avatar,
    Box,
    Container,
    List,
    ListItemAvatar,
    Typography,
    ListItem,
    ListItemText,
    Divider,
    Card,
    Button,
    Paper,
    Grid,
    ListItemIcon,
    TextField,
    CircularProgress
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    where,
    query,
    addDoc,
    onSnapshot,
    orderBy,
    serverTimestamp
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useAuth } from "@arcana/auth-react";
const storage = getStorage();

function CreateAccount() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [FHName, setFHName] = useState();
    const [address, setAddress] = useState();
    const [panNumber, setPanNumber] = useState();
    const [mNumber, setMNumber] = useState();
    const [yearlyIncome, setYearlyIncome] = useState(0);
    const PanCardRef = useRef();
    const [panCard, setPanCard] = useState();
    const AddressRef = useRef();
    const [addressProof, setAddressProof] = useState();
    const incomeRef = useRef();
    const [income, setIncome] = useState();
    const SignatureRef = useRef();
    const [signature, setSignature] = useState();
    const auth = useAuth();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (auth?.user !== null)
            (async () => {
                const q = query(
                    collection(db, "ThreeBank"),
                    where("arcanaUid", "==", auth.user.publicKey)
                );

                const querySnapshot = await getDocs(q);
                const dataArr = [];

                querySnapshot.forEach(doc => {
                    console.log(doc.id, " => ", doc.data());
                    dataArr.push({ id: doc.id, ...doc.data() });
                });
                console.log(dataArr);

                if (dataArr.length !== 0) {
                    const data = dataArr[0];
                    // thoos data in context
                    console.log("firebase", data);
                    navigate("/dashboard/details");
                } else {
                    console.log("nahi hai pan");
                }

                setLoading(false);
            })();
    }, [auth]);

    const createAccountSubmit = async () => {
        setIsLoading(true);
        // const panCardRefFb = ref(storage, `titleDeed/${panCard.name}`);
        // const snapshot0 = await uploadBytes(panCardRefFb, panCard);
        // const panCardUrl = await getDownloadURL(snapshot0.ref);

        // const addressProofRefFb = ref(
        //     storage,
        //     `titleDeed/${addressProof.name}`
        // );
        // const snapshot1 = await uploadBytes(addressProofRefFb, addressProof);
        // const addressProofUrl = await getDownloadURL(snapshot1.ref);

        // const incomeProofRefFb = ref(storage, `titleDeed/${income.name}`);
        // const snapshot2 = await uploadBytes(incomeProofRefFb, income);
        // const incomeProofUrl = await getDownloadURL(snapshot2.ref);

        // const signatureProofRefFb = ref(storage, `titleDeed/${signature.name}`);
        // const snapshot3 = await uploadBytes(signatureProofRefFb, signature);
        // const signatureProofUrl = await getDownloadURL(snapshot3.ref);
        // console.log("panCardUrl", panCardUrl);

        await addDoc(collection(db, "ThreeBank"), {
            arcanaUid: auth.user.publicKey,
            pan: panNumber,
            isAccountApproved: false,
            personalDetails: {
                name: name,
                fatherName: FHName,
                address: address,
                pan: panNumber,
                mobile: mNumber,
                incomeDetails: {
                    yearlyIncome: yearlyIncome
                },
                documents: {
                    panCardUrl: "https://brave.com/en-in/",
                    addressProofUrl: "https://brave.com/en-in/",
                    incomeProofUrl: "https://brave.com/en-in/",
                    signatureProofUrl: "https://brave.com/en-in/"
                    // panCardUrl: panCardUrl,
                    // addressProofUrl: addressProofUrl,
                    // incomeProofUrl: incomeProofUrl,
                    // signatureProofUrl: signatureProofUrl
                }
            },
            bankDetails: {
                balance: 0
            },
            loanRequest: [],
            loanPayments: []
        });
        setIsLoading(false);
        navigate("/dashboard/approved-status");
    };

    return (
        <Box
            elevation={12}
            sx={{
                background: "url('/assets/bg.jpg') no-repeat center center",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                position: "relative"
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.2)",
                    backdropFilter: "blur(1px) brightness(80%)"
                }}
            ></Box>
            <Box
                width={"80%"}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    mx: "auto",
                    borderBottomLeftRadius: "25px",
                    borderBottomRightRadius: "25px",
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(1px) brightness(80%)"
                }}
                zIndex={100}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        marginBottom: "1vh",
                        flexDirection: "column",
                        borderRadius: "1vh",
                        paddingY: "3vh",
                        paddingX: "2vw",
                        mb: 3,
                        gap: 2
                    }}
                >
                    <Typography variant="h4">
                        Complete your application
                    </Typography>
                    <TextField
                        placeholder="Enter Name"
                        label=" Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField
                        placeholder="Father/Husbands Name"
                        label="Father/Husband Name"
                        value={FHName}
                        onChange={e => setFHName(e.target.value)}
                    />
                    <TextField
                        placeholder="Enter Address"
                        label="Address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                    <TextField
                        placeholder="Enter PanCard Number"
                        label="PanCard Number"
                        value={panNumber}
                        onChange={e => setPanNumber(e.target.value)}
                    />
                    <TextField
                        placeholder="Enter Mobile Number"
                        label="Mobile Number"
                        value={mNumber}
                        onChange={e => setMNumber(e.target.value)}
                    />
                    <TextField
                        placeholder="Enter yearly income"
                        label="Yearly income"
                        value={yearlyIncome}
                        onChange={e => setYearlyIncome(e.target.value)}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        marginBottom: "1vh",
                        flexDirection: "column",
                        borderRadius: "1vh",
                        paddingY: "3vh",
                        paddingX: "2vw",
                        mb: 3,
                        gap: 2
                    }}
                >
                    <input
                        ref={PanCardRef}
                        style={{
                            display: "none"
                        }}
                        type="file"
                        onChange={e => setPanCard(e.target.files[0])}
                    />
                    <Button
                        onClick={() => PanCardRef.current.click()}
                        variant="contained"
                    >
                        Pan Card Proof
                    </Button>
                    <input
                        ref={AddressRef}
                        style={{
                            display: "none"
                        }}
                        type="file"
                        onChange={e => setAddressProof(e.target.files[0])}
                    />
                    <Button
                        onClick={() => AddressRef.current.click()}
                        variant="contained"
                    >
                        Address Proof
                    </Button>
                    <input
                        ref={incomeRef}
                        style={{
                            display: "none"
                        }}
                        type="file"
                        onChange={e => setIncome(e.target.files[0])}
                    />
                    <Button
                        onClick={() => incomeRef.current.click()}
                        variant="contained"
                    >
                        Income Proof
                    </Button>
                    <input
                        ref={SignatureRef}
                        style={{
                            display: "none"
                        }}
                        type="file"
                        onChange={e => setSignature(e.target.files[0])}
                    />
                    <Button
                        onClick={() => SignatureRef.current.click()}
                        variant="contained"
                    >
                        Signature Proof
                    </Button>

                    <Button
                        onClick={() => {
                            createAccountSubmit();
                            // navigate("/dashboard/approved-status");
                        }}
                        disabled={isLoading}
                    >
                        {!isLoading && "Submit"}

                        {isLoading && <CircularProgress></CircularProgress>}
                    </Button>
                </Box>
            </Box>
            <Box height={"5vh"} width={"100%"}></Box>
        </Box>
    );
}

export default CreateAccount;
