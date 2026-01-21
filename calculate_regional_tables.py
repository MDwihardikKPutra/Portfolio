import pandas as pd

# Load the data with proper encoding and semicolon delimiter
df = pd.read_csv('D:/Pribadi/Portfolio/public/DataAnalyst/all_months_clean.csv', encoding='utf-8', sep=';', on_bad_lines='skip')

# Add is_cancelled column
df['is_cancelled'] = df['Status Pesanan'].str.lower().str.contains('batal|cancel', na=False)

# Top provinces to analyze
top_provinces = ['Jawa Barat', 'Banten', 'DKI Jakarta', 'Jawa Tengah', 'Jawa Timur']

print("=" * 80)
print("TABLE 1: Order Volume dan AOV per Provinsi")
print("=" * 80)

# Only completed orders for revenue
completed_df = df[~df['is_cancelled']]

table1 = completed_df.groupby('Provinsi').agg(
    Total_Orders=('order_id', 'count'),
    Revenue=('Total Pembayaran', 'sum')
)
table1['AOV'] = table1['Revenue'] / table1['Total_Orders']
table1 = table1.sort_values('Revenue', ascending=False).head(6)

print(f"{'Province':<20} {'Total Orders':>12} {'Revenue':>15} {'AOV':>12}")
print("-" * 60)
for prov, row in table1.iterrows():
    print(f"{prov:<20} {int(row['Total_Orders']):>12,} Rp {row['Revenue']/1e6:>10.1f}M Rp {row['AOV']:>8,.0f}")

print("\n")
print("=" * 80)
print("TABLE 2: Cancellation Rate per Provinsi")
print("=" * 80)

table2 = df.groupby('Provinsi').agg(
    Total_Orders=('order_id', 'count'),
    Cancelled_Orders=('is_cancelled', 'sum')
)
table2['Cancel_Rate'] = (table2['Cancelled_Orders'] / table2['Total_Orders'] * 100)
table2 = table2.sort_values('Total_Orders', ascending=False).head(6)

print(f"{'Province':<20} {'Total Orders':>12} {'Cancelled':>12} {'Cancel Rate':>12}")
print("-" * 60)
for prov, row in table2.iterrows():
    print(f"{prov:<20} {int(row['Total_Orders']):>12,} {int(row['Cancelled_Orders']):>12,} {row['Cancel_Rate']:>11.1f}%")

print("\n")
print("=" * 80)
print("TABLE 3: Payment Method Mix per Provinsi")
print("=" * 80)

# Define payment categories
def categorize_payment(method):
    method = str(method).lower()
    if 'shopeepay' in method or 'spaylater' in method:
        return 'Digital'
    elif 'cod' in method or 'bayar' in method:
        return 'COD'
    elif 'indomaret' in method or 'alfamart' in method:
        return 'OTC'
    else:
        return 'Online'  # VA, Transfer, etc.

df['payment_category'] = df['Metode Pembayaran'].apply(categorize_payment)

# Get top provinces by order volume
top_provs = df.groupby('Provinsi')['order_id'].count().sort_values(ascending=False).head(6).index

table3_data = []
for prov in top_provs:
    prov_df = df[df['Provinsi'] == prov]
    total = len(prov_df)
    digital = len(prov_df[prov_df['payment_category'] == 'Digital'])
    cod = len(prov_df[prov_df['payment_category'] == 'COD'])
    otc = len(prov_df[prov_df['payment_category'] == 'OTC'])
    online = len(prov_df[prov_df['payment_category'] == 'Online'])
    
    table3_data.append({
        'Province': prov,
        'Digital_Share': digital / total * 100,
        'COD_Share': cod / total * 100,
        'OTC_Share': otc / total * 100,
        'Online_Share': online / total * 100
    })

print(f"{'Province':<20} {'Digital':>10} {'COD':>10} {'OTC':>10} {'Online':>10}")
print("-" * 65)
for row in table3_data:
    print(f"{row['Province']:<20} {row['Digital_Share']:>9.1f}% {row['COD_Share']:>9.1f}% {row['OTC_Share']:>9.1f}% {row['Online_Share']:>9.1f}%")

print("\nScript completed!")
