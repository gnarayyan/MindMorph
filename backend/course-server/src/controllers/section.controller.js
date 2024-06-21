const sectionService = require('../services/section.service');
const sectionValidator = require('../validation/section.validation');
const courseService = require('../services/course.service');

// Create Section
const createSection = async (req, res) => {
  const { error, value } = sectionValidator.create.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newSection = await sectionService.createSection(value);
    await courseService.addSectionToCourse(value.courseId, newSection._id);
    res.status(201).json(newSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// // Update Section

/*
[
    {
        "fieldname": "files",
        "originalname": "#mind Relaxing lofi song # love mashup song abhi standup.. tranding now.mp4",
        "encoding": "7bit",
        "mimetype": "video/mp4",
        "destination": "media\\11\\663fb8089e216f10241df8be",
        "filename": "#mind Relaxing lofi song # love mashup song abhi standup.. tranding now.mp4",
        "path": "media\\11\\663fb8089e216f10241df8be\\#mind Relaxing lofi song # love mashup song abhi standup.. tranding now.mp4",
        "size": 50726943
    },
    {
        "fieldname": "files",
        "originalname": "bee.mp4",
        "encoding": "7bit",
        "mimetype": "video/mp4",
        "destination": "media\\11\\663fb8089e216f10241df8be",
        "filename": "bee.mp4",
        "path": "media\\11\\663fb8089e216f10241df8be\\bee.mp4",
        "size": 1293015
    }
]
*/
const updateSection = async (req, res) => {
  // console.log('Files: ', req.files);

  const { error, value } = sectionValidator.update.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    console.log('Vaue: ', value);

    const updatedSection = await sectionService.updateSectionById(
      value.sectionId,
      value
    );
    res.status(200).json(updatedSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Section
const deleteSection = async (req, res) => {
  const sectionId = req.params.sectionId;

  const { error, value } = sectionValidator.sectionId.validate({ sectionId });
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const section = await sectionService.deleteSectionById(value.sectionId);
    if (section)
      return res
        .status(200)
        .json({ message: 'Requested Section Deleted', payload: section });
    return res.status(400).json({
      message: 'Failed to delete section. Requested "sectionId" may be invalid',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch a Section
const getSection = async (req, res) => {
  const sectionId = req.params.sectionId;

  const { error, value } = sectionValidator.sectionId.validate({ sectionId });
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const section = await sectionService.getSectionById(value.sectionId);
    if (!section)
      return res.status(400).json({
        message:
          'Failed to fetch section. Requested "sectionId" may be invalid',
      });
    return res.status(200).json(section);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createSection,
  updateSection,
  deleteSection,
  getSection,
  // getAllSections,
};
