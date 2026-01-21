import pandas as pd
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend

# Set style for professional look
plt.style.use('seaborn-v0_8-darkgrid')
colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']

try:
    print("Loading data...")
    df = pd.read_csv('D:/Pribadi/Portfolio/public/DataAnalyst/all_months_clean.csv', sep=';')
    
    # 1. Payment Risk Analysis Chart
    df['is_cancelled'] = df['Status Pesanan'].astype(str).str.contains('Batal', case=False, na=False)
    risk_df = df.groupby('Metode Pembayaran').agg(
        total_orders=('order_id', 'count'),
        cancelled_orders=('is_cancelled', 'sum')
    )
    risk_df['cancellation_rate'] = (risk_df['cancelled_orders'] / risk_df['total_orders']) * 100
    risk_df = risk_df.sort_values('cancellation_rate', ascending=False).head(5)
    
    fig, ax = plt.subplots(figsize=(10, 6))
    bars = ax.barh(risk_df.index, risk_df['cancellation_rate'], color=colors[0])
    ax.set_xlabel('Cancellation Rate (%)', fontsize=12, fontweight='bold')
    ax.set_title('Payment Method Cancellation Rates', fontsize=14, fontweight='bold', pad=20)
    ax.grid(axis='x', alpha=0.3)
    
    # Add value labels
    for i, (idx, row) in enumerate(risk_df.iterrows()):
        ax.text(row['cancellation_rate'] + 1, i, f"{row['cancellation_rate']:.1f}%", 
                va='center', fontsize=10, fontweight='bold')
    
    plt.tight_layout()
    plt.savefig('D:/Pribadi/Portfolio/public/DataAnalyst/chart_payment_risk.png', dpi=150, bbox_inches='tight')
    plt.close()
    print("✓ Generated chart_payment_risk.png")
    
    # 2. Regional Market Chart
    df['Provinsi'] = df['Provinsi'].astype(str).str.upper().str.strip()
    market_df = df.groupby('Provinsi')['Total Pembayaran'].sum().reset_index()
    market_df = market_df.sort_values('Total Pembayaran', ascending=False).head(5)
    market_df['Total Pembayaran (M)'] = market_df['Total Pembayaran'] / 1_000_000
    
    fig, ax = plt.subplots(figsize=(10, 6))
    bars = ax.barh(market_df['Provinsi'], market_df['Total Pembayaran (M)'], color=colors[1])
    ax.set_xlabel('Revenue (Million IDR)', fontsize=12, fontweight='bold')
    ax.set_title('Top 5 Provinces by Revenue', fontsize=14, fontweight='bold', pad=20)
    ax.grid(axis='x', alpha=0.3)
    
    for i, (idx, row) in enumerate(market_df.iterrows()):
        ax.text(row['Total Pembayaran (M)'] + 5, i, f"Rp {row['Total Pembayaran (M)']:.0f}M", 
                va='center', fontsize=10, fontweight='bold')
    
    plt.tight_layout()
    plt.savefig('D:/Pribadi/Portfolio/public/DataAnalyst/chart_market_dominance.png', dpi=150, bbox_inches='tight')
    plt.close()
    print("✓ Generated chart_market_dominance.png")
    
    # 3. Wholesale Products Chart
    wholesale_df = df.groupby('product_categories')['total_qty'].mean().reset_index()
    wholesale_df = wholesale_df.sort_values('total_qty', ascending=False).head(5)
    # Shorten category names for display
    wholesale_df['short_name'] = wholesale_df['product_categories'].str[:40] + '...'
    
    fig, ax = plt.subplots(figsize=(10, 6))
    bars = ax.barh(range(len(wholesale_df)), wholesale_df['total_qty'], color=colors[2])
    ax.set_yticks(range(len(wholesale_df)))
    ax.set_yticklabels(wholesale_df['short_name'], fontsize=9)
    ax.set_xlabel('Average Quantity per Transaction', fontsize=12, fontweight='bold')
    ax.set_title('Top 5 Product Categories by Avg Quantity', fontsize=14, fontweight='bold', pad=20)
    ax.grid(axis='x', alpha=0.3)
    
    for i, (idx, row) in enumerate(wholesale_df.iterrows()):
        ax.text(row['total_qty'] + 1, i, f"{row['total_qty']:.0f} units", 
                va='center', fontsize=10, fontweight='bold')
    
    plt.tight_layout()
    plt.savefig('D:/Pribadi/Portfolio/public/DataAnalyst/chart_wholesale.png', dpi=150, bbox_inches='tight')
    plt.close()
    print("✓ Generated chart_wholesale.png")
    
    # 4. Financial Impact - Summary Table as Image
    total_revenue = df['Total Pembayaran'].sum()
    total_shipping = df['Ongkos Kirim Dibayar oleh Pembeli'].sum()
    avg_shipping = df['Ongkos Kirim Dibayar oleh Pembeli'].mean()
    shipping_pct = (total_shipping / total_revenue) * 100
    
    fig, ax = plt.subplots(figsize=(10, 4))
    ax.axis('tight')
    ax.axis('off')
    
    table_data = [
        ['Metric', 'Value'],
        ['Total Revenue', f'Rp {total_revenue:,.0f}'],
        ['Total Shipping Paid', f'Rp {total_shipping:,.0f}'],
        ['Average Shipping Cost', f'Rp {avg_shipping:,.2f}'],
        ['Shipping % of Expenditure', f'{shipping_pct:.2f}%']
    ]
    
    table = ax.table(cellText=table_data, cellLoc='left', loc='center',
                     colWidths=[0.4, 0.6])
    table.auto_set_font_size(False)
    table.set_fontsize(12)
    table.scale(1, 2.5)
    
    # Style header
    for i in range(2):
        table[(0, i)].set_facecolor('#3b82f6')
        table[(0, i)].set_text_props(weight='bold', color='white')
    
    # Style data rows
    for i in range(1, len(table_data)):
        for j in range(2):
            table[(i, j)].set_facecolor('#f8f9fa' if i % 2 == 0 else 'white')
    
    plt.title('Financial Impact Summary', fontsize=14, fontweight='bold', pad=20)
    plt.tight_layout()
    plt.savefig('D:/Pribadi/Portfolio/public/DataAnalyst/chart_financial.png', dpi=150, bbox_inches='tight')
    plt.close()
    print("✓ Generated chart_financial.png")
    
    print("\n✓ All visualizations generated successfully!")
    
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
