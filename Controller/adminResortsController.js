const Resort = require('../Model/resort');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|mp4|mov|avi/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images and Videos Only!');
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 } // Limit file size to 100MB
});

const resort = async (req, res) => {
  try {
    const { name, description, location, amenities, price } = req.body;

    // Get the file paths of the uploaded photos
    const photos = req.files['photos'] ? req.files['photos'].map((file) => file.filename) : [];
    const videos = req.files['videos'] ? req.files['videos'].map((file) => file.filename) : [];

    const amenitieArray = amenities.split(',')

    // Create a new resort with the uploaded photo paths
    const newResort = new Resort({ name, description, location, photos, videos, amenities: amenitieArray, price })
    await newResort.save();

    res.status(201||200).json({message: "Resort added Successfully",newResort});
  } catch (err) {
    res.status(500).json({ msg: 'Server error', err });
  }
};

module.exports = { resort, upload };