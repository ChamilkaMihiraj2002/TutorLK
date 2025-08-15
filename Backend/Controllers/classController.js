const Classes = require('../Models/Class.model');

exports.createClass = async (req, res) => {
  try {
    const data = req.body;    

    if (!data) {
        return res.status(400).json({ message: 'All data are required' });
    }

    const { user, subject, classCode, location, classTime, groupLink } = data;

    const newClass = new Classes({
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
        const classes = await Classes.find().sort({ createdAt: -1 }); // latest first
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getClassesByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const classes = await Classes.find({ user: userId }).sort({ createdAt: -1 });
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteClassById = async (req, res) => {
    try {
        const classId = req.params.id;
        const deletedClass = await Classes.findByIdAndDelete(classId);
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
        const classId = req.params.id;
        const updatedData = req.body;
        const updatedClass = await Classes.findByIdAndUpdate(classId, updatedData, { new: true });
        if (!updatedClass) {
        return res.status(404).json({ message: 'Class not found' });
        }
        res.json(updatedClass);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};