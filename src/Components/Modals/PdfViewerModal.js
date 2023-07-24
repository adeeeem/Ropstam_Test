import React from "react";
import Modal from "react-bootstrap/Modal";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core";
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core";
import { Button } from "@mui/material";

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

function PdfViewerModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} size="lg">
      <Modal.Header closeButton>PDF Viewer</Modal.Header>
      <Modal.Body>
        <div className="pdf-container">
          {/* Show pdf */}
          {props.viewPdf && (
            <>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={props.viewPdf}
                  plugins={[props.defaultLayoutPluginInstance]}
                />
              </Worker>
            </>
          )}
          {/* if we dont have pdf or viewPdf state is null */}
          {!props.viewPdf && <>No pdf file selected</>}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button sx={styles.approveBtn} onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PdfViewerModal;
