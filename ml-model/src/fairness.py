import sys
import json
import os
import pandas as pd
import joblib


# Get ml-model directory
BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)


# Dataset path
DATASET_PATH = os.path.join(
    BASE_DIR,
    "Data",
    "loan_dataset.csv"
)


# Model path
MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "logistic_model.pkl"
)


# Load dataset
df = pd.read_csv(DATASET_PATH)


# Load trained model
model = joblib.load(MODEL_PATH)


# Features used by model
features = [
    "Age",
    "Income",
    "CreditScore",
    "Employment",
    "LoanAmount",
    "LoanTerm"
]


# Predict all applications
df["PredictedStatus"] = model.predict(
    df[features]
)


# Get employment groups
groups = df["Employment"].unique()


group_results = []


# Analyze each group
for group in groups:

    group_data = df[
        df["Employment"] == group
    ]

    total = len(group_data)

    approved = (
        group_data["PredictedStatus"] == "Approved"
    ).sum()

    rejected = (
        group_data["PredictedStatus"] == "Rejected"
    ).sum()

    if total > 0:
        approval_rate = (
            approved / total
        ) * 100
    else:
        approval_rate = 0


    group_results.append({
        "employment": str(group),
        "totalApplications": int(total),
        "approved": int(approved),
        "rejected": int(rejected),
        "approvalRate": round(
            float(approval_rate),
            2
        )
    })


# -----------------------------------
# Fairness Score
# -----------------------------------

approval_rates = [
    group["approvalRate"]
    for group in group_results
]


if approval_rates:

    max_rate = max(approval_rates)
    min_rate = min(approval_rates)

    if max_rate > 0:
        fairness_score = (
            min_rate / max_rate
        ) * 100
    else:
        fairness_score = 100

else:
    fairness_score = 0


# Final result
result = {
    "success": True,
    "fairnessScore": round(
        float(fairness_score),
        2
    ),
    "groups": group_results
}


# Return JSON
print(
    json.dumps(result)
)