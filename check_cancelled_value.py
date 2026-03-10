import pandas as pd

try:
    df = pd.read_csv('D:/Pribadi/Portfolio/public/DataAnalyst/all_months_clean.csv', sep=';')
    
    # Ensure numeric columns
    df['Total Pembayaran'] = pd.to_numeric(df['Total Pembayaran'], errors='coerce').fillna(0)
    df['is_cancelled'] = df['Status Pesanan'].astype(str).str.contains('Batal', case=False, na=False)
    
    cancelled = df[df['is_cancelled'] == True]
    print(f"Cancelled Count: {len(cancelled)}")
    print(f"Cancelled Total Pembayaran Sum: {cancelled['Total Pembayaran'].sum()}")
    print("Sample Cancelled Rows:")
    print(cancelled[['order_id', 'Total Pembayaran', 'Status Pesanan']].head())

except Exception as e:
    print(e)
