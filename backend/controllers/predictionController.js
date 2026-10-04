import { spawn } from "child_process";
import Prediction from "../models/Prediction.js";

export const predictLoan = (req, res) => {
  const {
    age,
    income,
    creditScore,
    employment,
    loanAmount,
    loanTerm
  } = req.body;

  // -----------------------------------
  // 1. Run Prediction
  // -----------------------------------

  const pythonProcess = spawn(
    "../ml-model/venv/Scripts/python.exe",
    [
      "../ml-model/src/predict.py",
      age,
      income,
      creditScore,
      employment,
      loanAmount,
      loanTerm
    ],
    {
      cwd: process.cwd()
    }
  );

  let output = "";
  let errorOutput = "";

  pythonProcess.stdout.on("data", (data) => {
    output += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    errorOutput += data.toString();
  });

  pythonProcess.on("error", (error) => {
    console.error("Python Process Error:", error);

    return res.status(500).json({
      message: "Unable to start Python process",
      error: error.message
    });
  });

  pythonProcess.on("close", async (code) => {

    if (code !== 0) {
      console.error("Python Error:", errorOutput);

      return res.status(500).json({
        message: "Prediction failed",
        error: errorOutput
      });
    }

    try {

      // -----------------------------------
      // Parse Prediction Result
      // -----------------------------------

      const result = JSON.parse(output);

      if (result.error) {
        return res.status(400).json(result);
      }

      // -----------------------------------
      // 2. Run Explanation
      // -----------------------------------

      const explanationProcess = spawn(
        "../ml-model/venv/Scripts/python.exe",
        [
          "../ml-model/src/explain.py",
          age,
          income,
          creditScore,
          employment,
          loanAmount,
          loanTerm
        ],
        {
          cwd: process.cwd()
        }
      );

      let explanationOutput = "";
      let explanationError = "";

      explanationProcess.stdout.on("data", (data) => {
        explanationOutput += data.toString();
      });

      explanationProcess.stderr.on("data", (data) => {
        explanationError += data.toString();
      });

      explanationProcess.on("error", (error) => {
        console.error(
          "Explanation Process Error:",
          error
        );
      });

      explanationProcess.on("close", async (explanationCode) => {

        if (explanationCode !== 0) {
          console.error(
            "Explanation Error:",
            explanationError
          );

          return res.status(500).json({
            message: "Explanation generation failed",
            error: explanationError
          });
        }

        try {

          const explanationResult =
            JSON.parse(explanationOutput);

          // -----------------------------------
          // 3. Run Fairness Analysis
          // -----------------------------------

          const fairnessProcess = spawn(
            "../ml-model/venv/Scripts/python.exe",
            [
              "../ml-model/src/fairness.py"
            ],
            {
              cwd: process.cwd()
            }
          );

          let fairnessOutput = "";
          let fairnessError = "";

          fairnessProcess.stdout.on("data", (data) => {
            fairnessOutput += data.toString();
          });

          fairnessProcess.stderr.on("data", (data) => {
            fairnessError += data.toString();
          });

          fairnessProcess.on("error", (error) => {
            console.error(
              "Fairness Process Error:",
              error
            );
          });

          fairnessProcess.on("close", async (fairnessCode) => {

            if (fairnessCode !== 0) {
              console.error(
                "Fairness Error:",
                fairnessError
              );

              return res.status(500).json({
                message: "Fairness analysis failed",
                error: fairnessError
              });
            }

            try {

              const fairnessResult =
                JSON.parse(fairnessOutput);

              // -----------------------------------
              // 4. Save Prediction for User
              // -----------------------------------

              const predictionData = new Prediction({
                userId: req.user.id,

                // Applicant Information
                age,
                income,
                creditScore,
                employment,
                loanAmount,
                loanTerm,

                // Prediction
                prediction: result.prediction,

                approvedProbability:
                  result.probability.Approved,

                rejectedProbability:
                  result.probability.Rejected,

                // Decision Explanation
                explanation:
                  explanationResult.explanation,

                // Fairness Analysis
                fairness: {
                  fairnessScore:
                    fairnessResult.fairnessScore,

                  groups:
                    fairnessResult.groups
                }
              });

              // Save and get MongoDB document ID
              const savedPrediction =
                await predictionData.save();

              // -----------------------------------
              // 5. Final Response
              // -----------------------------------

              return res.status(200).json({

                message: "Prediction successful",

                prediction:
                  result.prediction,

                probability:
                  result.probability,

                explanation:
                  explanationResult.explanation,

                fairness:
                  fairnessResult,

                saved: true,

                // MongoDB Prediction ID
                predictionId:
                  savedPrediction._id

              });

            } catch (error) {

              console.error(
                "Fairness Result Error:",
                error
              );

              return res.status(500).json({
                message:
                  "Failed to process fairness result",
                error: error.message
              });
            }
          });

        } catch (error) {

          console.error(
            "Explanation Result Error:",
            error
          );

          return res.status(500).json({
            message:
              "Failed to process explanation result",
            error: error.message
          });
        }
      });

    } catch (error) {

      console.error(
        "Controller Error:",
        error
      );

      return res.status(500).json({
        message: "Failed to process prediction",
        error: error.message
      });
    }
  });
};


export const getPredictions = async (req, res) => {

  try {

    const predictions = await Prediction.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: predictions.length,
      predictions
    });

  } catch (error) {

    console.error(
      "Fetch Predictions Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch predictions",
      error: error.message
    });
  }
};


export const getPredictionById = async (req, res) => {

  try {

    const prediction = await Prediction.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!prediction) {
      return res.status(404).json({
        success: false,
        message: "Prediction not found"
      });
    }

    return res.status(200).json({
      success: true,
      prediction
    });

  } catch (error) {

    console.error(
      "Fetch Prediction By ID Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch prediction",
      error: error.message
    });
  }
};