import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Applicant Information
    age: {
      type: Number,
      required: true
    },

    income: {
      type: Number,
      required: true
    },

    creditScore: {
      type: Number,
      required: true
    },

    employment: {
      type: String,
      required: true,
      enum: ["Salaried", "Self-Employed", "Unemployed"]
    },

    loanAmount: {
      type: Number,
      required: true
    },

    loanTerm: {
      type: Number,
      required: true
    },

    // Prediction
    prediction: {
      type: String,
      required: true,
      enum: ["Approved", "Rejected"]
    },

    approvedProbability: {
      type: Number,
      required: true
    },

    rejectedProbability: {
      type: Number,
      required: true
    },

    // Decision Explanation
    explanation: [
      {
        feature: {
          type: String,
          required: true
        },

        value: {
          type: Number,
          required: true
        },

        effect: {
          type: String,
          enum: ["Positive", "Negative", "Neutral"],
          required: true
        }
      }
    ],

    // Fairness Analysis
    fairness: {
      fairnessScore: {
        type: Number,
        required: true
      },

      groups: [
        {
          employment: {
            type: String,
            required: true
          },

          totalApplications: {
            type: Number,
            required: true
          },

          approved: {
            type: Number,
            required: true
          },

          rejected: {
            type: Number,
            required: true
          },

          approvalRate: {
            type: Number,
            required: true
          }
        }
      ]
    }
  },
  {
    timestamps: true
  }
);

const Prediction = mongoose.model(
  "Prediction",
  predictionSchema
);

export default Prediction;