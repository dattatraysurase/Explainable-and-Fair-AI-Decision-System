import sys
import json
import os
import joblib
import pandas as pd


# Get ml-model directory path
BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)


# Create absolute path for trained model
MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "logistic_model.pkl"
)


# Load trained model
model = joblib.load(MODEL_PATH)


def predict_loan(
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


    # Prediction
    prediction = model.predict(new_loan)[0]


    # Prediction probabilities
    probabilities = model.predict_proba(new_loan)[0]
    classes = model.classes_


    probability_data = {}

    for class_name, probability in zip(
        classes,
        probabilities
    ):
        probability_data[class_name] = round(
            float(probability) * 100,
            2
        )


    # Final result
    result = {
        "prediction": prediction,
        "probability": probability_data
    }


    return result


if __name__ == "__main__":

    try:

        # Read command-line arguments
        age = int(sys.argv[1])
        income = int(sys.argv[2])
        credit_score = int(sys.argv[3])
        employment = sys.argv[4]
        loan_amount = int(sys.argv[5])
        loan_term = int(sys.argv[6])


        # Generate prediction
        result = predict_loan(
            age,
            income,
            credit_score,
            employment,
            loan_amount,
            loan_term
        )


        # Return JSON response to Node.js
        print(json.dumps(result))


    except Exception as error:

        print(
            json.dumps({
                "error": str(error)
            })
        )

        sys.exit(1)