import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String
        },
        assignedTeacher: {
            type: Schema.Types.ObjectId, ref: "User"
        },
        enrolledStudents: [{
            type: Schema.Types.ObjectId, ref: "Student"
        }],
        schedule: {
            day: { type: String },
            time: { type: String },
            room: { type: String },
        },
    },
    { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
