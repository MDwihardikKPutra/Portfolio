import pandas as pd
import sys

# Set encoding to handle potential special chars
pd.options.display.float_format = '{:.2f}'.format

try:
    print("Loading data...")
    df = pd.read_csv('D:/Pribadi/Portfolio/public/DataAnalyst/all_months_clean.csv', sep=';')
    
    # Redirect output to file
    with open('D:/Pribadi/Portfolio/analysis_results.txt', 'w') as f:
        f.write(f"Total Rows: {len(df)}\n")
        f.write(f"Unique Order Statuses: {df['Status Pesanan'].unique()}\n")
        
        f.write("\n--- Status Pesanan Distribution ---\n")
        f.write(str(df['Status Pesanan'].value_counts()) + "\n")

        # 1. Payment Risk Analysis
        # Cancellation Rate by Payment Method
        df['is_cancelled'] = df['Status Pesanan'].astype(str).str.contains('Batal', case=False, na=False)
        
        risk_df = df.groupby('Metode Pembayaran').agg(
            total_orders=('order_id', 'count'),
            cancelled_orders=('is_cancelled', 'sum')
        )
        risk_df['cancellation_rate'] = (risk_df['cancelled_orders'] / risk_df['total_orders']) * 100
        risk_df = risk_df.sort_values('cancellation_rate', ascending=False)
        
        f.write("\n--- 1. Payment Risk Analysis (Top 5 Highest Cancellation Rate) ---\n")
        f.write(risk_df.head(5).to_string() + "\n")

        # 2. Regional Market Dominance
        df['Provinsi'] = df['Provinsi'].astype(str).str.upper().str.strip()
        market_df = df.groupby('Provinsi')['Total Pembayaran'].sum().reset_index()
        market_df = market_df.sort_values('Total Pembayaran', ascending=False)
        
        f.write("\n--- 2. Regional Market Dominance (Top 5 Provinces by Revenue) ---\n")
        f.write(market_df.head(5).to_string() + "\n")

        # 3. Favorite Wholesale Products
        wholesale_df = df.groupby('product_categories')['total_qty'].mean().reset_index()
        wholesale_df = wholesale_df.sort_values('total_qty', ascending=False)
        
        f.write("\n--- 3. Favorite Wholesale Products (Top 5 by Avg Qty) ---\n")
        f.write(wholesale_df.head(5).to_string() + "\n")

        # 4. Financial Impact
        total_revenue = df['Total Pembayaran'].sum()
        total_shipping = df['Ongkos Kirim Dibayar oleh Pembeli'].sum()
        avg_shipping = df['Ongkos Kirim Dibayar oleh Pembeli'].mean()
        shipping_pct = (total_shipping / total_revenue) * 100
        
        f.write("\n--- 4. Financial Impact ---\n")
        f.write(f"Total Revenue: {total_revenue:,.0f}\n")
        f.write(f"Total Shipping Paid: {total_shipping:,.0f}\n")
        f.write(f"Average Shipping Cost per Order: {avg_shipping:,.2f}\n")
        f.write(f"Shipping Cost Contribution to Expenditure: {shipping_pct:.2f}%\n")

except Exception as e:
    print(f"Error: {e}")
