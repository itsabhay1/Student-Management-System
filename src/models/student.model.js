import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
    {
        fullName: { 
            type: String, 
            required: true, 
            trim: true 
        },
        rollNumber: { 
            type: String, 
            required: true, 
            unique: true, 
            trim: true 
        },
        email: { 
            type: String, 
            required: true, 
            unique: true 
        },
        course: { 
            type: String, 
            required: true 
        },
        year: { 
            type: Number, 
            required: true 
        },
        section: { 
            type: String 
        },
        user: { 
            type: Schema.Types.ObjectId, 
            ref: "User" 
        }, // the user who created this
    },
    { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);