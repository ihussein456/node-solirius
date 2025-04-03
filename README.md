# CSV Upload API

Hi Solirius team this is my submission: 

A full-stack Node.js application for uploading and validating user emails from a CSV file. This project simulates real-world backend patterns including file streaming, asynchronous processing, concurrency limiting, rate limiting, and status tracking.

> Built as a technical challenge to demonstrate backend engineering capabilities and production-level project structure.

---

## Overview

This app allows users to upload a `.csv` file with user records (name, email), and it processes each entry asynchronously to validate the email address.

**Core features:**
- CSV upload via HTML form or API endpoint
- Asynchronous email validation (simulated)
- Concurrency limited to 5 validations at a time
- Upload progress tracking via upload ID
- Rate limiting (10 uploads/min per IP)
- Logging with Winston
- Modular architecture and ESM support
- Unit tests using Jest

---

## 🔧 Tech Stack

- **Backend:** Node.js (ESM), Express.js
- **Frontend:** Vanilla HTML/CSS (served statically)
- **File Parsing:** csv-parser (streaming)
- **Rate Limiting:** express-rate-limit
- **Concurrency:** p-limit
- **Testing:** Jest
- **Logging:** Winston
- **Hosting:** Render.com

---

## 🗂 Project Structure

```
file-upload-api/
├── public/                     # Frontend UI
│   └── index.html              # Upload form
├── uploads/                   # Uploaded CSVs (ignored)
├── src/                       # Backend source code
│   ├── server.js              # Express app entry
│   ├── config/logger.js       # Winston setup
│   ├── controllers/           # Upload controller logic
│   ├── middleware/            # Rate limiter middleware
│   └── utils/emailValidator.js # Async validation logic
├── tests/                     # Jest test suite
│   └── emailValidator.test.js
├── example.csv                # Sample CSV input
├── .gitignore                 # Ignored files
├── package.json               # App config and dependencies
├── jest.config.mjs            # ESM test config
└── README.md                  # You’re here
```

---

## 🧪 Running Locally

### 1. Clone & install dependencies:
```bash
git clone https://github.com/ihussein456/node-solirius
cd node-solirius
npm install
```

### 2. Start the server:
```bash
npm start
```

Server will run at:
```
http://localhost:3000
```

### 3. Run tests:
```bash
npm test
```

---

## 🌐 Live Demo

Frontend and API are deployed on Render:
```
https://node-solirius.onrender.com
```

### POST `/upload`
Upload a `.csv` file:
- `form-data` key: `file`
- Response includes summary with `uploadId`

### GET `/status/:uploadId`
Returns progress of the ongoing upload.

---

## 📁 Example CSV Format
```csv
name,email
John Doe,john@example.com
Jane Smith,invalid-email
```

---


This project demonstrates the ability to:
- Build production-ready Node.js APIs
- Handle file uploads with streaming
- Orchestrate async workflows with concurrency limits
- Gracefully handle errors and log activity
- Structure a backend project using modern patterns
- Serve full-stack apps from one repo

---
