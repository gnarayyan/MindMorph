// Express Endpoints
// Create Lecture
router.post('/lectures', async (req, res) => {
  try {
    const newLecture = await lectureService.createLecture(req.body);
    res.status(201).json(newLecture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create Section
router.post('/sections', async (req, res) => {
  try {
    const newSection = await sectionService.createSection(req.body);
    res.status(201).json(newSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create Course
router.post('/courses', async (req, res) => {
  try {
    const newCourse = await courseService.createCourse(req.body);
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update Lecture
router.put('/lectures/:id', async (req, res) => {
  try {
    const updatedLecture = await Lecture.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedLecture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Lecture
router.delete('/lectures/:id', async (req, res) => {
  try {
    await Lecture.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Lecture deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Fetch All Lectures
router.get('/lectures', async (req, res) => {
  try {
    const lectures = await Lecture.find({});
    res.status(200).json(lectures);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update Section
router.put('/sections/:id', async (req, res) => {
  try {
    const updatedSection = await Section.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Section
router.delete('/sections/:id', async (req, res) => {
  try {
    await Section.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Section deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Fetch All Sections
router.get('/sections', async (req, res) => {
  try {
    const sections = await Section.find({}).populate('lectures');
    res.status(200).json(sections);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update Course
router.put('/courses/:id', async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Course
router.delete('/courses/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Fetch All Courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find({}).populate('sections');
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
