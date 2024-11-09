import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const ModalPopup = ({ open, handleClose, message, type }) => {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    maxWidth: "90%",
    bgcolor: "background.paper",
    borderRadius: "16px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
    p: 4,
    zIndex: 1500,
  };

  const successModalStyle = { backgroundColor: "#e8f5e9" };
  const errorModalStyle = { backgroundColor: "#ffebee" };

  const titleStyle = {
    color: type === "success" ? "#4caf50" : "#f44336",
    fontWeight: 600,
    textAlign: "center",
    fontSize: "1.5rem",
    marginBottom: "10px",
    textTransform: "uppercase",
  };

  const messageStyle = {
    textAlign: "center",
    fontSize: "1rem",
    marginBottom: "20px",
    color: "#555",
    fontWeight: 400,
  };

  const buttonStyle = {
    display: "block",
    width: "100%",
    padding: "10px 20px",
    backgroundColor: type === "success" ? "#4caf50" : "#f44336",
    color: "#fff",
    borderRadius: "8px",
    textTransform: "uppercase",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: type === "success" ? "#45a049" : "#e53935",
    },
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          ...modalStyle,
          ...(type === "success" ? successModalStyle : errorModalStyle),
        }}
      >
        <Typography variant="h6" component="h2" sx={titleStyle}>
          {type === "success" ? "Thành Công!" : "Có Lỗi Xảy Ra!"}
        </Typography>
        <Typography variant="body1" sx={messageStyle}>
          {message}
        </Typography>
        <Button onClick={handleClose} sx={buttonStyle}>
          Đóng
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalPopup;
