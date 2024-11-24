const About = require('../models/About');


const getAboutData = async (req, res) => {
  try {
    const aboutData = await About.findOne(); 
    if (!aboutData) {
      return res.status(404).json({ message: 'About Us data not found' });
    }
    res.json({ data: aboutData });
  } catch (error) {
    console.error('Error fetching About Us data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const updateAboutData = async (req, res) => {
  const { description, teamDescription } = req.body;

  try {
    
    const aboutData = await About.findOne();
    if (aboutData) {
      
      aboutData.description = description;
      aboutData.teamDescription = teamDescription;
      await aboutData.save();
      return res.status(200).json({ message: 'About Us data updated successfully' });
    } else {
      
      const newAboutData = new About({ description, teamDescription });
      await newAboutData.save();
      return res.status(201).json({ message: 'About Us data created successfully' });
    }
  } catch (error) {
    console.error('Error updating About Us data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getAboutData, updateAboutData };
