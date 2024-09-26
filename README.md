
# Swasthya-Sampark

## Introduction

Swasthya-Sampark is a healthcare platform designed to connect patients with doctors for real-time symptom tracking, consultations, and AI-driven health advice. The project was developed as part of a hackathon entry for Technoverse 2024, where it reached the finalist stage among 500+ teams.

## Modules

1. **Smart Health Solutions (Symptom Triage)**
    - AI-powered symptom checker for real-time health insights.
    - Key Features: 24/7 symptom assessments, AI-driven care navigation, instant recommendations.

2. **Doctor Portal**
    - Manage appointments, view patient records, and perform consultations.
    - Key Features: Schedule management, access to patient records.

3. **HealthGPT (AI Chatbot)**
    - Interactive AI chatbot for health queries, symptoms, and treatments.
    - Key Features: Instant health answers, information on health conditions, medication guidance.

4. **Report Summary Generation**
    - Converts medical reports from images to text using ML algorithms.
    - Key Features: AI-driven report transformation, quick and precise conversion.

5. **Patient Portal**
    - Access health records, track medical history, and manage appointments.
    - Key Features: Health record access, appointment scheduling.

6. **Consultation Management**
    - Streamlines patient-doctor consultation processes.
    - Key Features: Manage consultation flow, real-time interaction through chat or video calls.

## Purpose and Function

The platform aims to simplify healthcare accessibility by providing AI-powered consultations and enabling patients to connect directly with doctors. The AI chatbot analyzes symptoms and suggests health advice, enhancing consultation efficiency and user engagement.

## Tools Used

- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** React
- **Security:** JWT for authentication
- **Real-time Communication:** socket.io
- **AI Engine:** Gemini LLM
- **Validation:** Zod for schema validation

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ozearkhan/Swasthya-Sampark.git
   ```
2. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Navigate to the frontend directory and install dependencies:
   ```bash
   cd ../swasthyaSampark
   npm install
   ```

### Environment Configuration

Create a `.env` file in the `backend` directory with the following template. Replace the placeholders with your generated keys and URLs:

```env
# Environment Configuration for Swasthya-Sampark Backend

# Application Environment
NODE_ENV=development

# Server Configuration
PORT=3001

# Database Configuration
MONGODB_URI=<your_mongodb_connection_string>

# JWT Secret for Authentication
JWT_SECRET=<your_jwt_secret_key>

# AI Engine Configuration
GEMINI_API_KEY=<your_gemini_api_key>
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest
MODEL_NAME=gemini-1.5-pro

# Email Configuration
EMAIL=<your_email@example.com>
PASS=<your_email_password>
```

### Generating Required Keys and API URLs

1. **MongoDB URI**:
    - Create a MongoDB Atlas account and generate a connection string for your database.

2. **JWT Secret**:
    - Generate a secure secret string for JSON Web Token (JWT) authentication.

3. **Gemini API Key**:
    - Sign up for access to the Google Generative Language API and obtain your API key.

4. **Email and Password**:
    - Use a secure email service for transactional emails. If using Gmail, consider setting up an App Password if 2FA is enabled.

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
2. Start the frontend application:
   ```bash
   cd ../swasthyaSampark
   npm start
   ```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.txt) file for details.

## Contact

For any inquiries or issues, feel free to reach out to the project maintainers via [ozearkhan1224@gmail.com](mailto:ozearkhan1224@gmail.com).

---

