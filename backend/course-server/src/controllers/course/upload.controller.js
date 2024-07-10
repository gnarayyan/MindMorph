const fs = require('fs');
const path = require('path');
const uploadSectionValidator = require('../../validation/course/upload.validator');

// TODO: Implement limit for size of [video, srt and zip] and no of files that can be uploaded

// Create a new course
const courseSectionUpload = (req, res) => {
  const courseId = req.params.courseId;
  const data = { ...req.body, courseId };
  const { error, value } = uploadSectionValidator.validate(data);

  // If Joi validation fails, send an error response
  if (error) return res.status(400).json({ message: error.details[0].message });

  // No files attached
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  // List all files and directories from 'uploads' folder
  const filesList = listFiles(`media/${value.courseId}/`);

  // Send the list of files to the client
  res.json(filesList);
};

// Function to list files and directories
function listFiles(dir, fileList = []) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fileList.push({ name: file, type: 'directory' });
      listFiles(fullPath, fileList); // Recurse into a subdirectory
    } else {
      fileList.push({ name: file, type: 'file' });
    }
  });
  return fileList;
}

module.exports = courseSectionUpload;
