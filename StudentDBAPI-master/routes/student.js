const express = require("express");
const  router = express.Router();

const {
  createStudent,
  getStudents, 
  getStudentById,
  deleteStudent,
  updateStudent,
  StudentPhotoUpload,
  } = require("../controllers/student");

  const { protect } = require("../middleware/auth");

  router
  .route("/")
  .get(protect,getStudents)
  .post(protect,createStudent);

  router
  .route("/:id/photo")
  .put(protect, StudentPhotoUpload);

  router
  .route("/:id")
  .get(protect,getStudentById)
  .delete(protect, deleteStudent);


  router
  .route("/:id")
  .get(protect,getStudentById)
  .put(protect, updateStudent);


  module.exports = router