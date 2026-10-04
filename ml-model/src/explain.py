import sys
import json
import os
import joblib
import pandas as pd
import shap


# Get ml-model directory path
BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)


# Model path
MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "logistic_model.pkl"
)


# Dataset path
DATASET_PATH = os.path.join(
    BASE_DIR,
    "Data",
    "loan_dataset.csv"
)


# Load trained model
model = joblib.load(MODEL_PATH)


# Load dataset
df = pd.read_csv(DATASET_PATH)


# Features used by model
features = [
    "Age",
    "Income",
    "CreditScore",
    "Employment",
    "LoanAmount",
    "LoanTerm"
]


def explain_loan(
    age,
    income,
    credit_score,
    employment,
    loan_amount,
    loan_term
):

    # Create input data
    new_loan = pd.DataFrame([{
        "Age": age,
        "Income": income,
        "CreditScore": credit_score,
        "Employment": employment,
        "LoanAmount": loan_amount,
        "LoanTerm": loan_term
    }])


    # Get preprocessor and classifier
    preprocessor = model.named_steps["preprocessor"]
    classifier = model.named_steps["classifier"]


    # Background data
    sample_size = min(100, len(df))

    background_data = df[features].sample(
        n=sample_size,
        random_state=42
    )


    # Transform background data
    background_transformed = preprocessor.transform(
        background_data
    )

    if hasattr(background_transformed, "toarray"):
        background_transformed = background_transformed.toarray()


    # Transform new loan
    new_loan_transformed = preprocessor.transform(
        new_loan
    )

    if hasattr(new_loan_transformed, "toarray"):
        new_loan_transformed = new_loan_transformed.toarray()


    # Feature names after preprocessing
    feature_names = preprocessor.get_feature_names_out()


    # Create SHAP explainer
    explainer = shap.LinearExplainer(
        classifier,
        background_transformed
    )


    # Calculate SHAP values
    shap_values = explainer(
        new_loan_transformed
    )


    values = shap_values.values[0]


    # Store original feature contributions
    contribution = {
        "Age": 0.0,
        "Income": 0.0,
        "CreditScore": 0.0,
        "Employment": 0.0,
        "LoanAmount": 0.0,
        "LoanTerm": 0.0
    }


    # Combine one-hot encoded features
    for feature_name, value in zip(
        feature_names,
        values
    ):

        if "Age" in feature_name:
            contribution["Age"] += float(value)

        elif "Income" in feature_name:
            contribution["Income"] += float(value)

        elif "CreditScore" in feature_name:
            contribution["CreditScore"] += float(value)

        elif "Employment" in feature_name:
            contribution["Employment"] += float(value)

        elif "LoanAmount" in feature_name:
            contribution["LoanAmount"] += float(value)

        elif "LoanTerm" in feature_name:
            contribution["LoanTerm"] += float(value)


    # Create explanation result
    explanation = []

    for feature, value in contribution.items():

        if value > 0:
            effect = "Positive"
        elif value < 0:
            effect = "Negative"
        else:
            effect = "Neutral"

        explanation.append({
            "feature": feature,
            "value": round(value, 4),
            "effect": effect
        })


    # Sort by strongest contribution
    explanation.sort(
        key=lambda x: abs(x["value"]),
        reverse=True
    )


    return explanation


if __name__ == "__main__":

    try:

        # Read command-line arguments
        age = int(sys.argv[1])
        income = int(sys.argv[2])
        credit_score = int(sys.argv[3])
        employment = sys.argv[4]
        loan_amount = int(sys.argv[5])
        loan_term = int(sys.argv[6])


        # Generate explanation
        result = explain_loan(
            age,
            income,
            credit_score,
            employment,
            loan_amount,
            loan_term
        )


        # Return JSON to Node.js
        print(
            json.dumps({
                "success": True,
                "explanation": result
            })
        )


    except Exception as error:

        print(
            json.dumps({
                "success": False,
                "error": str(error)
            })
        )

        sys.exit(1)