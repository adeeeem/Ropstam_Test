import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ErrorIcon from "@mui/icons-material/Error";

const styles = {
  approveBtn: {
    // fontFamily: "Orbitron",
    backgroundColor: "#00AEAE",
    color: "#fff",
    padding: "6px 24px",
    border: "1px solid #00AEAE",
    borderRadius: "0px 15px",
    "&:hover": {
      //   boxShadow: "0px 0px 20px 5px rgb(0 174 174 / 35%)",
      color: "#00AEAE",
    },
  },
};

const InvestmentModal = (props) => {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    console.log("Props in investment model: ", props);
  }, [props]);

  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header
        style={{
          display: "flex",
          justifyContent: "center",
          background: "#00AEAE",
          color: "white",
        }}
      >
        INVEST
      </Modal.Header>
      <Modal.Body>
        <Typography
          variant="body"
          sx={{ color: "#00AEAE", marginRight: "5px", fontWeight: "bold" }}
        >
          Required Amount:
        </Typography>
        <span>{props.requiredAmount}</span>
        <br />
        <label style={{ color: "#00AEAE", fontWeight: "bold" }}>
          Invest Amount:
        </label>
        <TextField
          fullWidth
          type="number"
          placeholder="0"
          value={props.investedAmount ?? ""}
          onChange={(e) => {
            props.setInvestedAmount(e.target.value);
            if (e.target.value <= props.requiredAmount) {
              setShowError(false);
            } else {
              setShowError(true);
            }
          }}
        />
        <br />
        {showError ? (
          <div
            style={{
              color: "white",
              textTransform: "capitalize",
              background: "red",
              marginTop: "10px",
              padding: "10px",
              display: "flex",
            }}
          >
            <div style={{ margin: "5px", marginRight: "10px" }}>
              <ErrorIcon />
            </div>
            <div>
              <span>
                Investment amount cannot be greater than required amount
              </span>
            </div>
          </div>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.handleClose} sx={styles.approveBtn}>
          Close
        </Button>
        <Button
          disabled={showError}
          onClick={() => {
            props.handleInvest(props.investmentModalData._id);
          }}
          sx={styles.approveBtn}
          className="m-2"
        >
          Invest
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InvestmentModal;
