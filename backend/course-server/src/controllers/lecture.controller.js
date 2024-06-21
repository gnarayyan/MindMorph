const path = require('node:path');
const { getVideoDurationInSeconds } = require('get-video-duration');
const lectureService = require('../services/lecture.service');
const lectureValidator = require('../validation/lecture.validation');
const deleteFolder = require('../utils/deleteFolder');
const createDirectory = require('../utils/createDirectory');
const moveFile = require('../utils/moveFile');
const generateTranscodings = require('../utils/video/generateTranscodings');
const copyFile = require('../utils/copyFile');
const sectionService = require('../services/section.service');
const transcodeVideo = require('./helper/transcodeAlgorithm');

// Create Lecture
const createLecture = async (req, res) => {
  // console.log('Files: ', req.files);
  console.log('Body: ', req.body);
  const file = req.files.file[0]; // file.path
  const destination = file.destination;
  const subtitles = req.files.subtitles
    ? req.files.subtitles.map((item) => ({
        language: item.originalname.split('.')[0],
        link: item.path,
      }))
    : [];

  const duration = !req.body.isAttachment
    ? await getVideoDurationInSeconds(file.path)
    : 1;
  const lecture = {
    title: file.filename.split('.')[0],
    file: file.path,
    subtitles,
    size: parseInt(file.size / 1024),
    duration,
    ...req.body, //courseId, sectionId, title?
  };

  // console.log('Duration: ', duration);
  const { error, value } = lectureValidator.create.validate(lecture);
  if (error) {
    deleteFolder(destination);
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    //TODO:  validate CourseId exist

    //TODO: validate sectionId exist

    // Create Lecture by Title
    const newLecture = await lectureService.createLecture({
      ...value,
      subtitles: [],
      file: '',
    });

    // Add lecture to section
    sectionService.addLectureToSection(lecture.sectionId, newLecture._id);

    // Using 'lectureId' create folder 'courseId/sectionId/lectureId'
    const lecturePath = await createDirectory(
      path.join(`${value.courseId}`, `${value.sectionId}`, `${newLecture._id}`)
    );

    // Move attachment and subtitles
    if (lecture.isAttachment) {
      const destination = path.join(lecturePath, `${file.filename}`);
      moveFile(lecture.file, destination);

      // Update path in DB
      const response = await lectureService.updateLectureById(newLecture._id, {
        file: destination,
      });

      return res.status(201).json(response);
    }
    // If not Attachment Transcoding and Segmentation
    // console.log('Lecture: ', lecture);
    await transcodeVideo(lecture.file, lecturePath, res, req); // videoPath, outputDir, res, req
    // await generateTranscodings(lecture.file, lecturePath);

    // TODO: Generate Playlist
    await copyFile('media/playlist.m3u8', `${lecturePath}/playlist.m3u8`);
    // await deleteFile(lecture.file);

    // Move Subtitles
    for (let index = 0; index < lecture.subtitles.length; index++) {
      let subtitle = lecture.subtitles[index];
      let source = subtitle.link;
      let destination = path.join(lecturePath, `${path.basename(source)}`);
      moveFile(source, destination);

      //Update path
      subtitle.link = destination;
    }
    // Update path in DB
    const response = await lectureService.updateLectureById(newLecture._id, {
      subtitles: lecture.subtitles,
      file: `${lecturePath}/playlist.m3u8`,
    });

    return res.status(201).json(response);
  } catch (error) {
    console.error('irror: ', error);
    return res.status(400).json({ message: error.message });
  }
};

// // Update Section
// const updateSection = async (req, res) => {
//   // console.log('Files: ', req.files);

//   const { error, value } = sectionValidator.update.validate(req.body);
//   if (error) return res.status(400).json({ message: error.details[0].message });
//   try {
//     console.log('Vaue: ', value);

//     const updatedSection = await sectionService.updateSectionById(
//       value.sectionId,
//       value
//     );
//     res.status(200).json(updatedSection);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete Section
// const deleteSection = async (req, res) => {
//   const sectionId = req.params.sectionId;

//   const { error, value } = sectionValidator.sectionId.validate({ sectionId });
//   if (error) return res.status(400).json({ message: error.details[0].message });

//   try {
//     const section = await sectionService.deleteSectionById(value.sectionId);
//     if (section)
//       return res
//         .status(200)
//         .json({ message: 'Requested Section Deleted', payload: section });
//     return res.status(400).json({
//       message: 'Failed to delete section. Requested "sectionId" may be invalid',
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Fetch a Section
// const getSection = async (req, res) => {
//   const sectionId = req.params.sectionId;

//   const { error, value } = sectionValidator.sectionId.validate({ sectionId });
//   if (error) return res.status(400).json({ message: error.details[0].message });

//   try {
//     const section = await sectionService.getSectionById(value.sectionId);
//     if (!section)
//       return res.status(400).json({
//         message:
//           'Failed to fetch section. Requested "sectionId" may be invalid',
//       });
//     return res.status(200).json(section);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

module.exports = {
  createLecture,
  // updateLecture,
  // deleteLecture,
  // getLecture,
  // getAllLectures,
};
