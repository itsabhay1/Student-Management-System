import mongoose, { Schema } from "mongoose";

const feeSchema = new Schema(
  {
    student: { 
        type: Schema.Types.ObjectId, 
        ref: "Student", 
        required: true },
    type: {                    // Tuition, Hostel, etc.
        type: String, 
        required: true 
    }, 
    amount: { 
        type: Number, 
        required: true 
    },
    status: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    dueDate: { 
        type: Date, 
        required: true 
    },
    remarks: { 
        type: String 
    },
  },
  { timestamps: true }
);

export const Fee = mongoose.model("Fee", feeSchema);
