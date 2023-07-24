import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Modal } from "react-bootstrap";
import BlackSpinner from "../Spinners/BlackSpinner";

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

const ProposeChangesModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "items",
          color: "#00AEAE",
        }}
      >
        <Modal.Title>Propose Changes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Paper elevation={0} style={{ margin: "0 auto" }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Box>
                <div className="mt-3">
                  <form
                    className="form-group"
                    onSubmit={props.handlePdfSubmit}
                    encType="multipart/form-data"
                  >
                    <Typography
                      variant="h5"
                      className="regular-label"
                      sx={{
                        fontSize: "18px",
                        color: "#000",
                      }}
                    >
                      Upload Document
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <label
                          htmlFor="pdfUpload"
                          className="btn btn-lg uploadLabel"
                        >
                          {props.isLoadingIPFS ? (
                            <BlackSpinner />
                          ) : (
                            <span>Choose File</span>
                          )}
                        </label>
                        <input
                          id="pdfUpload"
                          className="form-control uploadLabel file-input"
                          type="file"
                          required
                          onChange={props.handlePdfFileChange}
                        />
                      </div>
                      <div>
                        {props.fileName && (
                          <div className="file-name">{props.fileName}</div>
                        )}
                      </div>
                      {props.pdfFileError && (
                        <div className="error-msg">{props.pdfFileError}</div>
                      )}
                    </div>
                    <br />
                    <Button
                      variant="contained"
                      onClick={props.handleOpenPdfViewer}
                      style={{
                        background: "#00AEAE",
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontWeight: "500",
                        fontStyle: "normal",
                        width: "100%",
                      }}
                    >
                      View PDF
                    </Button>
                    <br />
                  </form>
                  <br />
                </div>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Modal.Body>
      <Modal.Footer>
        <Button sx={styles.approveBtn} onClick={props.handleClose}>
          Close
        </Button>
        <Button
          sx={{ ...styles.approveBtn, margin: "5px 0px 5px 10px" }}
          onClick={props.handlePdfSubmit}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProposeChangesModal;
