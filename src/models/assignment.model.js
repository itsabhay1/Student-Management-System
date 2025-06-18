import mongoose, { Schema } from "mongoose";

const assignmentSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
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
        dueDate: {
            type: Date,
            required: true
        },
        isExam: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

export const Assignment = mongoose.model("Assignment", assignmentSchema);
