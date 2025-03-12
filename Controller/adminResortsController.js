const Resort = require('../Model/resort');
const multer = require('multer');
const fs = require('fs')
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


// Update a resort
const updateResort = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, location, amenities, price } = req.body;

    const resort = await Resort.findById(id);
    if (!resort) {
      return res.status(404).json({ msg: 'Resort not found' });
    }

    // // Get new uploaded files
    // const newPhotos = req.files['photos'] ? req.files['photos'].map((file) => file.filename) : [];
    // const newVideos = req.files['videos'] ? req.files['videos'].map((file) => file.filename) : [];

    // Merge new files with existing ones
    // const updatedPhotos = [...resort.photos, ...newPhotos];
    // const updatedVideos = [...resort.videos, ...newVideos];
    const updatedAmenities = amenities ? amenities : resort.amenities;

    // Update resort details
    const updatedResort = await Resort.findByIdAndUpdate(
      id,
      { name, description, location, amenities: updatedAmenities, price },
      { new: true }
    );

    res.status(200).json({ message: 'Resort updated successfully', updatedResort });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', err });
  }
};

// Delete a resort
const deleteResort = async (req, res) => {
  try {
    const { id } = req.params;

    const resort = await Resort.findById(id);
    if (!resort) {
      return res.status(404).json({ msg: 'Resort not found' });
    }

    // Delete resort photos and videos from the server
    [...resort.photos, ...resort.videos].forEach((file) => {
      const filePath = path.join(__dirname, '../uploads/', file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Delete file
      }
    });

    await Resort.findByIdAndDelete(id);

    res.status(200).json({ message: 'Resort deleted successfully' });
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server error', err });
  }
};

module.exports = { resort,updateResort, deleteResort, upload };