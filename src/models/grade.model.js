import mongoose, { Schema } from "mongoose";

const gradeSchema = new Schema(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },
        score: {
            type: Number,
            required: true
        },
        grade: {
            type: String
        },
    },
    { timestamps: true }
);

// Automatically assign letter grade based on score
gradeSchema.pre("save", function (next) {
    const score = this.score;

    if (score >= 90) this.grade = "A";
    else if (score >= 80) this.grade = "B";
    else if (score >= 70) this.grade = "C";
    else if (score >= 60) this.grade = "D";
    else if (score >= 50) this.grade = "E";
    else if (score >= 40) this.grade = "P";
    else this.grade = "F";

    next();
});


export const Grade = mongoose.model("Grade", gradeSchema);
