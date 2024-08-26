const express = require("express");
let jwt = require("jsonwebtoken");
let User = require("../database/user");
let PatientRequestDoctor = require("../database/patientRequestDoctor");
let sendEmail = require("../email/sendMail");
let template = require("../email/template");
let sendEmail2 = require("../email/sendMail2");
let template2 = require("../email/template2");
const router = express.Router();
require("dotenv").config();

router.get("/", (req, res) => {
  res.send("Consultation Api running :)");
});

router.post("/getdoctor", async (req, res) => {
  try {
    console.log("Received request for /getdoctor");
    let token = req.body.token;
    let data = jwt.decode(req.body.token);
    console.log("Decoded token data:", data);

    let patientEmail = data.email;
    console.log("Patient email:", patientEmail);

    let requestDoctorData = await PatientRequestDoctor.findOne({
      email: patientEmail,
    });
    console.log("Request doctor data:", requestDoctorData);

    let doctors = await User.find({ role: "doctor" },'uuid email name picture');
    console.log("Number of doctors found:", doctors.length);

    if (requestDoctorData === null) {
      console.log("No existing request data found for patient");
      return res.status(200).json({
        doctors,
      });
    }

    // doctors = doctors.filter((doctor) => {
    //   return !requestDoctorData.reqeustDoctors.includes(doctor.uuid);
    // });
    console.log("Number of filtered doctors:", doctors.length);

    return res.status(200).json({ doctors });
  } catch (err) {
    console.error("Error in /getdoctor route:", err);
    return res.status(500).json({
      error: "An error occurred while fetching doctors",
      details: err.message,
    });
  }
});

router.post("/request/:id", async (req, res) => {
  try {
    console.log("Received request for /request/:id");
    let token = req.body.token;
    let data = jwt.decode(req.body.token);
    console.log("Decoded token data:", data);

    let patientEmail = data.email;
    console.log("Patient email:", patientEmail);

    let patientRequests = await PatientRequestDoctor.findOne({
      email: patientEmail,
    });
    console.log("Existing patient requests:", patientRequests);

    if (patientRequests === null) {
      console.log("Creating first request for patient");
      let arr = [req.params.id];
      let newRequest = new PatientRequestDoctor({
        email: patientEmail,
        reqeustDoctors: arr,
      });
      await newRequest.save();
      console.log("New request saved");
    } else {
      console.log("Updating existing request for patient");
      let newArrayOfRequest = patientRequests.reqeustDoctors;
      newArrayOfRequest.push(req.params.id);
      await PatientRequestDoctor.findOneAndUpdate(
          { email: patientEmail },
          { reqeustDoctors: newArrayOfRequest }
      );
      console.log("Request updated");
    }

    let doctorData = await User.findOne({ uuid: req.params.id });
    console.log("Doctor data:", doctorData);

    if (!doctorData) {
      throw new Error("Doctor not found");
    }

    let doctorEmail = doctorData.email;
    console.log("Doctor email:", doctorEmail);

    let patientEmailResult, doctorEmailResult;

    try {
      console.log("Sending email to patient");
      patientEmailResult = await sendEmail2(template2, patientEmail);
      console.log("Email sent to patient:", patientEmailResult);
    } catch (emailError) {
      console.error("Error sending email to patient:", emailError);
    }

    try {
      console.log("Sending email to doctor");
      let finalDoctorTemplate = template(patientEmail);
      doctorEmailResult = await sendEmail(finalDoctorTemplate, doctorEmail);
      console.log("Email sent to doctor:", doctorEmailResult);
    } catch (emailError) {
      console.error("Error sending email to doctor:", emailError);
    }

    if (patientEmailResult && doctorEmailResult) {
      console.log("All Mails Sent");
      res.status(200).json({ message: "All Mails Sent" });
    } else {
      console.log("Some emails failed to send");
      res.status(500).json({
        message: "Some emails failed to send",
        patientEmailResult,
        doctorEmailResult
      });
    }
  } catch (err) {
    console.error("Error in /request/:id route:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
      stack: err.stack
    });
  }
});

module.exports = router;