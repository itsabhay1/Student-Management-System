import mongoose, { Schema } from "mongoose";

const submissionSchema = new Schema(
  {
    assignment: { 
        type: Schema.Types.ObjectId, 
        ref: "Assignment", 
        required: true 
    },
    student: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    content: {              // link / text / file path
        type: String, 
        required: true 
    },
    submittedAt: { 
        type: Date, 
        default: Date.now 
    },
    marks: { 
        type: Number 
    },
    evaluated: { 
        type: Boolean, 
        default: false 
    },
  },
  { timestamps: true }
);

export const Submission = mongoose.model("Submission", submissionSchema);
