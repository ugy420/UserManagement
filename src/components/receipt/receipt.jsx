import React, { useState, useEffect } from "react";
import "./receipt.css";

export default function Receipt() {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    address: "",
    subject: "",
    file: null,
  });
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/files");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const files = await response.json();
      setFiles(files);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleAddClick = () => {
    setFormVisible(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("date", formData.date);
    data.append("address", formData.address);
    data.append("subject", formData.subject);
    data.append("file", formData.file);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      console.log("Server response:", result);
      if (response.ok) {
        alert("File sent successfully!");
        fetchFiles(); // Refresh the list of files
      } else {
        alert("Failed to send file.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the file.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Receipt</h1>
      <button className="button" onClick={handleAddClick}>
        Add
      </button>
      {formVisible && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Date:</label>
            <input
              className="input"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="label">Address to send:</label>
            <input
              className="input"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="label">Subject:</label>
            <input
              className="input"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="label">File to attach:</label>
            <input
              className="input"
              type="file"
              name="file"
              onChange={handleChange}
            />
          </div>
          <button className="submit-button" type="submit">
            Send
          </button>
        </form>
      )}
      <div className="received-files">
        <h2>Received Files</h2>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <a href={`http://localhost:5000/uploads/${file}`} download>
                {file}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
