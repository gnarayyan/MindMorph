const express = require('express');
const uploadSectionFiles = require('../middlewares/section.middleware');
const controller = require('../controllers/section.controller');
const router = express.Router();

router.post('/', controller.createSection);
router.put('/', controller.updateSection);
router.delete('/:sectionId', controller.deleteSection);
router.get('/:sectionId', controller.getSection);
router.get('/course/:courseId', controller.getAllSections);
// router.get('/:courseId', controller.getAllSectionsOfACourse);

module.exports = router;
