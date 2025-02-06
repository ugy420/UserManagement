import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Endpoint to handle file uploads
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send({ message: `File uploaded successfully: ${req.file.filename}` });
});

// Endpoint to fetch uploaded files
router.get("/files", (req, res) => {
  const directoryPath = path.join(__dirname, "../uploads");
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan files.");
    }
    res.json(files);
  });
});

export default router;
