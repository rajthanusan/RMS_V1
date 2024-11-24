const Service = require('../models/Service');

exports.createServiceCard = async (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const newService = new Service({ title, description, image });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    console.error('Error creating service card:', error);
    res.status(500).json({ message: 'Failed to create service card' });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Failed to fetch services' });
  }
};

exports.updateServiceCard = async (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;

  try {
    const updateData = { title, description };
    if (image) updateData.image = image;

    const updatedService = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedService) return res.status(404).json({ message: 'Service card not found' });

    res.status(200).json(updatedService);
  } catch (error) {
    console.error('Error updating service card:', error);
    res.status(500).json({ message: 'Failed to update service card' });
  }
};

exports.deleteServiceCard = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) return res.status(404).json({ message: 'Service card not found' });

    res.status(200).json({ message: 'Service card deleted successfully' });
  } catch (error) {
    console.error('Error deleting service card:', error);
    res.status(500).json({ message: 'Failed to delete service card' });
  }
};
