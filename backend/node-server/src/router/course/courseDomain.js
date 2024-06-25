const express = require('express');
const router = express.Router();
const {
  getAllCourseDomain,
  getCourseDomain,
  createCourseDomain,
  updateCourseDomain,
  deleteCourseDomain,
} = require('../../controller/course/courseDomain');

router.get('/', getAllCourseDomain);
router.get('/:id', getCourseDomain);
router.post('/', createCourseDomain);
router.patch('/:id', updateCourseDomain);
router.delete('/:id', deleteCourseDomain);

module.exports = router;
