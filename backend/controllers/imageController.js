const Image = require('../models/Image');
const path = require('path');
const fs = require('fs');


exports.getImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json({ images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching images' });
  }
};


exports.addImage = async (req, res) => {
  const { alt, category } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const newImage = new Image({
      alt,
      category,
      filename: file.filename,
    });

    await newImage.save();
    res.status(201).json({ image: newImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding image' });
  }
};


exports.updateImage = async (req, res) => {
  const { id } = req.params;
  const { alt, category } = req.body;
  const file = req.file;

  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    image.alt = alt || image.alt;
    image.category = category || image.category;

    if (file) {
      const oldFilePath = path.join(__dirname, '../uploads', image.filename);
      
      
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }

      image.filename = file.filename;
    }

    await image.save();
    res.status(200).json({ image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating image' });
  }
};


exports.deleteImage = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const filePath = path.join(__dirname, '../uploads', image.filename);

    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      console.warn(`File not found at ${filePath}`);
    }

    
    await image.deleteOne();

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting image' });
  }
};
