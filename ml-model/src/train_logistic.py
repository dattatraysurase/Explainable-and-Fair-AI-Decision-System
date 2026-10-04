import joblib

from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression

from preprocessing import (
    load_data,
    clean_data,
    split_data,
    create_preprocessor
)


def train_model():

    # Load dataset
    df = load_data()

    # Clean dataset
    df = clean_data(df)

    # Split data
    X_train, X_test, y_train, y_test = split_data(df)

    # Create preprocessor
    preprocessor = create_preprocessor()

    # Create ML pipeline
    model = Pipeline(
        steps=[
            ("preprocessor", preprocessor),
            (
                "classifier",
                LogisticRegression(
                    max_iter=1000,
                    random_state=42
                )
            )
        ]
    )

    # Train model
    model.fit(X_train, y_train)

    # Save model
    joblib.dump(
        model,
        "models/logistic_model.pkl"
    )

    print("Logistic Regression model trained successfully.")
    print("Model saved to models/logistic_model.pkl")


if __name__ == "__main__":
    train_model()