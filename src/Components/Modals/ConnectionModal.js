import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";

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

const ConnectionModal = (props) => {
  useEffect(() => {
    console.log("Props in connection modal: ", props);
  }, [props]);

  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Modal.Title style={{ color: "#00AEAE" }}>Connect MetaMask</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <spna>
          Please connect to MetaMask or you won't be able to continue further
        </spna>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            console.log("On click close button called");
            props.handleClose();
          }}
          sx={styles.approveBtn}
        >
          Close
        </Button>
        <Button
          onClick={() => {
            console.log("On click connect button called");
            props.connectToMetamask();
          }}
          sx={{ ...styles.approveBtn, margin: "7px" }}
        >
          Connect
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConnectionModal;
