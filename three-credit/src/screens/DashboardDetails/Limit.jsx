import { Box, Typography, LinearProgress, Paper } from "@mui/material";
import { useState ,useContext,useEffect} from "react";
import AccountListItem from "../../components/AccountListItem";
import { CreditDataContext } from "../../contexts/CreditDataContextProvider";

function LinearProgressWithLabel(props) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
            }}
        >
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
        </Box>
    );
}

const Age = () => {
    const [progress, setProgress] = useState(10);
    const [accounts,setAccounts]=useState([])

    const creditDataCtx=useContext(CreditDataContext);

    useEffect(()=>{
        const {pan}=creditDataCtx
        console.log(pan)
        if(pan==="Vijaymalya"){
            setProgress(90)
        }
        setAccounts(creditDataCtx.accounts)
        console.log(creditDataCtx)
    },[creditDataCtx])


    return (
        <Box width={"76%"} mx={"auto"}>
            <Box
                sx={{
                    display: "flex",
                    direction: "column",
                    justifyContent: "center",
                    borderRadius: "1vh",
                    px: 4,
                    py: 2,
                    my: 4,
                    mt: 6,
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography
                    sx={{
                        fontSize: 40,
                        textAlign: "center",
                    }}
                >
                    Credit Use
                </Typography>
            </Box>

            <Box sx={{ marginBlock: 10 }}>
                <Box>
                    <Typography
                        fontSize={30}
                        color="text.secondary"
                    >{`${Math.round(progress)}%`}</Typography>
                </Box>
                <LinearProgressWithLabel value={progress} />
            </Box>
            {/* <DetailsCard
                mainHeading={"Medium Impact"}
                lastUpdated={JSON.stringify(
                    creditDataCtx.userCreditRequest[0].timestamp
                )}
                label={"Adept"}
                labelBackground={"green"}
                leftHeadingNumber={1}
                leftHeadingTitle={"Active Accounts"}
                rightHeadingNumber={`1y 3m`}
                rightHeadingTitle={"Age of Accounts"}
            /> */}
            <Box>
                <Typography variant="h4">Your Accounts</Typography>
                <AccountListItem
                    bankName={"Three Bank"}
                    cardNumber={"**** *890"}
                    isActive={true}
                />
            </Box>
        </Box>
    );
};

export default Age;
