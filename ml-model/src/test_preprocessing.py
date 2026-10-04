from preprocessing import (
    load_data,
    clean_data,
    split_data
)


df = load_data()

print("Original Shape:", df.shape)

df = clean_data(df)

print("After Cleaning:", df.shape)

X_train, X_test, y_train, y_test = split_data(df)

print("Training Features:", X_train.shape)
print("Testing Features:", X_test.shape)

print("Training Target:", y_train.shape)
print("Testing Target:", y_test.shape)
