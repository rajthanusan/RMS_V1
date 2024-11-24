const Event = require('../models/Event');




exports.createEvent = async (req, res) => {
  try {
    const { title, subtitle, location, description, eventDate } = req.body;
    const image = req.file?.filename;

    if (!location) {
      return res.status(400).json({ error: 'Location is required' });
    }

    const newEvent = new Event({
      title,
      subtitle,
      location,
      description,
      image,
      eventDate,
    });

    await newEvent.save();

    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
};


exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};


exports.updateEvent = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.file) {
      updates.image = req.file.filename;
    }

    if (!updates.location) {
      return res.status(400).json({ error: 'Location is required' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
};


exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
};





exports.updateEventStatus = async (req, res) => {
  const { id } = req.params; 
  const { status } = req.body; 

  try {
    
    if (!["Active", "Inactive"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value. It should be either 'Active' or 'Inactive'" });
    }

    
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { status }, 
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event status updated successfully", event: updatedEvent });
  } catch (error) {
    console.error("Error updating event status:", error);
    res.status(500).json({ message: "Error updating event status" });
  }
};
