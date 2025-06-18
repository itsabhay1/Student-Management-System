import mongoose, { Schema } from "mongoose";

const timetableSchema = new Schema(
  {
    course: { 
        type: Schema.Types.ObjectId, 
        ref: "Course", 
        required: true 
    },
    teacher: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    day: {
      type: String,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      required: true,
    },
    startTime: { 
        type: String, 
        required: true 
    }, 
    endTime: { 
        type: String, 
        required: true 
    }, 
    room: { 
        type: String, 
        required: true 
    },
  },
  { timestamps: true }
);

export const Timetable = mongoose.model("Timetable", timetableSchema);
