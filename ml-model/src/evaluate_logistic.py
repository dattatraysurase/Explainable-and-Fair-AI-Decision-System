import joblib

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report,
    confusion_matrix
)

from preprocessing import (
    load_data,
    clean_data,
    split_data
)


def evaluate_model():

    # Load and clean dataset
    df = load_data()
    df = clean_data(df)

    # Get test data
    X_train, X_test, y_train, y_test = split_data(df)

    # Load trained model
    model = joblib.load("models/logistic_model.pkl")

    # Make predictions
    y_pred = model.predict(X_test)

    # Calculate metrics
    accuracy = accuracy_score(y_test, y_pred)

    precision = precision_score(
        y_test,
        y_pred,
        pos_label="Approved"
    )

    recall = recall_score(
        y_test,
        y_pred,
        pos_label="Approved"
    )

    f1 = f1_score(
        y_test,
        y_pred,
        pos_label="Approved"
    )

    print("Logistic Regression Evaluation")
    print("--------------------------------")

    print(f"Accuracy : {accuracy:.4f}")
    print(f"Precision: {precision:.4f}")
    print(f"Recall   : {recall:.4f}")
    print(f"F1 Score : {f1:.4f}")

    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))

    print("Confusion Matrix:")
    print(confusion_matrix(y_test, y_pred))


if __name__ == "__main__":
    evaluate_model()