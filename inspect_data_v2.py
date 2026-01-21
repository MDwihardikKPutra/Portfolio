import pandas as pd

try:
    df = pd.read_csv('D:/Pribadi/Portfolio/public/DataAnalyst/all_months_clean.csv', sep=';')
    print("---COLUMNS START---")
    for col in df.columns:
        print(col)
    print("---COLUMNS END---")
except Exception as e:
    print(f"Error reading CSV: {e}")
