import mongoose from "mongoose";
import { CreateEventDto } from "./dtos/CreateEvent.dot";
import EventModel, { IEvent } from "./models/Event";
import { Event } from "./types/response";

// this event service instance shows how to create a event, get a event by id, and get all events with in-memory data

class EventService {
  async getEventById(id: string): Promise<IEvent | null> {
    return await EventModel.findById(id).exec();
  }

  async getEvents(
    city: string = "",
    page: number = 1,
    limit: number = 10,
    sortBy: string = "rating",
    sortDirection: string = "asc"
  ): Promise<IEvent[]> {
    const skip = (page - 1) * limit;
    const ascendance = sortDirection === "asc" ? 1 : -1;
    return await EventModel.find({ location: city })
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: ascendance })
      .exec();
  }

  async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
    const { name, description, rating, date, location, duration } =
      createEventDto;
    const newEvent = new EventModel({
      name,
      description,
      rating: Number(rating),
      date: new Date(date),
      location,
      duration,
    });

    await newEvent.save();
    return newEvent;
  }
}

export default EventService;
