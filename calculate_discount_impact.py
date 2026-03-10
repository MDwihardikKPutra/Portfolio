import pandas as pd

try:
    df = pd.read_csv('D:/Pribadi/Portfolio/public/DataAnalyst/all_months_clean.csv', sep=';')
    
    df['Total Diskon'] = pd.to_numeric(df['Total Diskon'], errors='coerce').fillna(0)
    df['Total Pembayaran'] = pd.to_numeric(df['Total Pembayaran'], errors='coerce').fillna(0)
    df['Ongkos Kirim Dibayar oleh Pembeli'] = pd.to_numeric(df['Ongkos Kirim Dibayar oleh Pembeli'], errors='coerce').fillna(0)
    
    df['has_discount'] = df['Total Diskon'] > 0
    
    no_disc = df[df['has_discount'] == False]
    with_disc = df[df['has_discount'] == True]
    
    with open('analysis_results.txt', 'w') as f:
        f.write(f"NO_DISC_COUNT={len(no_disc)}\n")
        f.write(f"NO_DISC_AOV={no_disc['Total Pembayaran'].mean()}\n")
        f.write(f"NO_DISC_SHIP={no_disc['Ongkos Kirim Dibayar oleh Pembeli'].mean()}\n")
        f.write(f"WITH_DISC_COUNT={len(with_disc)}\n")
        f.write(f"WITH_DISC_AOV={with_disc['Total Pembayaran'].mean()}\n")
        f.write(f"WITH_DISC_SHIP={with_disc['Ongkos Kirim Dibayar oleh Pembeli'].mean()}\n")

except Exception as e:
    with open('analysis_results.txt', 'w') as f:
        f.write(str(e))
