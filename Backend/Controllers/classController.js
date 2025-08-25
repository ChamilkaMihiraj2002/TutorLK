const Class = require('../Models/Class.model');

// ======================= CLASS CONTROLLERS =======================

exports.createClass = async (req, res) => {
  try {
    const data = req.body;    

    if (!data) {
        return res.status(400).json({ message: 'All data are required' });
    }

    const { user, subject, classCode, location, classTime, groupLink } = data;

    const newClass = new Class({
        user,
        subject,
        classCode,
        location,
        classTime,
        groupLink
    });

    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getClasses = async (req, res) => {
    try {
        const classes = await Class.find().sort({ createdAt: -1 }); // latest first
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getClassesByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const classes = await Class.find({ user: userId }).sort({ createdAt: -1 });
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteClassById = async (req, res) => {
    try {
        const classId = req.params.classId;
        const deletedClass = await Class.findByIdAndDelete(classId);
        if (!deletedClass) {
        return res.status(404).json({ message: 'Class not found' });
        }
        res.json({ message: 'Class deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    } 
};

exports.updateClassById = async (req, res) => {
    try {
        const classId = req.params.classId;
        const updatedData = req.body;
        const updatedClass = await Class.findByIdAndUpdate(classId, updatedData, { new: true });
        if (!updatedClass) {
        return res.status(404).json({ message: 'Class not found' });
        }
        res.json(updatedClass);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ message: 'Error fetching classes', error: error.message });
  }
};