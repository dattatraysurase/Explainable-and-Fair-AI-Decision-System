import pandas as pd

df = pd.read_csv("./Data/loan_dataset.csv")

print("Dataset Shape:", df.shape)

print("\nColumns:")
print(df.columns.tolist())

print("\nFirst 5 Records:")
print(df.head())

print("\nData Types:")
print(df.dtypes)

print("\nMissing Values:")
print(df.isnull().sum())

print("\nLoan Status Distribution:")
print(df["LoanStatus"].value_counts())