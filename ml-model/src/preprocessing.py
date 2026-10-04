import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder


DATA_PATH = "Data/loan_dataset.csv"

FEATURES = [
    "Age",
    "Income",
    "CreditScore",
    "Employment",
    "LoanAmount",
    "LoanTerm"
]

TARGET = "LoanStatus"


def load_data():
    df = pd.read_csv(DATA_PATH)
    return df


def clean_data(df):
    # Remove duplicate records
    df = df.drop_duplicates()

    return df


def split_data(df):
    X = df[FEATURES]
    y = df[TARGET]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.20,
        random_state=42,
        stratify=y
    )

    return X_train, X_test, y_train, y_test


def create_preprocessor():

    categorical_features = ["Employment"]

    preprocessor = ColumnTransformer(
        transformers=[
            (
                "categorical",
                OneHotEncoder(handle_unknown="ignore"),
                categorical_features
            )
        ],
        remainder="passthrough"
    )

    return preprocessor