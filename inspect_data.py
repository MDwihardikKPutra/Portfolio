import pandas as pd

try:
    df = pd.read_csv('D:/Pribadi/Portfolio/public/DataAnalyst/all_months_clean.csv', sep=';')
    print("Columns:")
    print(df.columns.tolist())
    print("\nFirst 3 rows:")
    print(df.head(3))
except Exception as e:
    print(f"Error reading CSV: {e}")
