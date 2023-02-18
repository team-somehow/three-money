import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { useAuth } from "@arcana/auth-react";

const CreateAccount = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [panNumber, setPanNumber] = useState("");

  useEffect(() => {
    setLoading(true);
    console.log(auth?.user);
    if (auth?.user !== null)
      (async () => {
        const q = query(
          collection(db, "CreditDetails"),
          where("arcanaUid", "==", auth.user.publicKey)
        );

        const querySnapshot = await getDocs(q);
        const dataArr = [];

        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          dataArr.push({ id: doc.id, ...doc.data() });
        });
        console.log(dataArr);

        if (dataArr.length !== 0) {
          const data = dataArr[0];
          // thoos data in context
          console.log("firebase", data);
          navigate("/dashboard");
        } else {
          console.log("nahi hai pan");
        }

        setLoading(false);
      })();
  }, [auth]);

  const submit = () => {
    (async () => {
      const docRef = await addDoc(collection(db, "CreditDetails"), {
        pan: panNumber,
        arcanaUid: auth.user.publicKey,
      });
      console.log("Document written with ID: ", docRef.id);

      navigate("/dashboard");
    })();
  };

  if (loading)
    return (
      <div className="center-container">
        <CircularProgress />
      </div>
    );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "1vh",
      }}
    >
      <TextField
        value={panNumber}
        onChange={(e) => setPanNumber(e.target.value)}
        placeholder="Enter pan number"
      />
      <Button variant="outlined" onClick={submit}>
        Submit
      </Button>
    </div>
  );
};

export default CreateAccount;
