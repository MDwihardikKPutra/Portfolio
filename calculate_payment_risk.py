import pandas as pd
import numpy as np

try:
    df = pd.read_csv('D:/Pribadi/Portfolio/public/DataAnalyst/all_months_clean.csv', sep=';')
    
    df['Total Pembayaran'] = pd.to_numeric(df['Total Pembayaran'], errors='coerce').fillna(0)
    df['is_cancelled'] = df['Status Pesanan'].astype(str).str.contains('Batal', case=False, na=False)
    
    # 1. Base Aggregation
    group = df.groupby('Metode Pembayaran')
    stats = group.agg(
        Total_Order=('order_id', 'count'),
        Cancelled_Order=('is_cancelled', 'sum')
    )
    
    # 2. Realized Revenue (from Non-Cancelled only)
    completed_df = df[~df['is_cancelled']]
    realized_stats = completed_df.groupby('Metode Pembayaran')['Total Pembayaran'].agg(['sum', 'mean']).rename(columns={'sum': 'Realized_Revenue', 'mean': 'AOV'})
    
    # Merge
    stats = stats.join(realized_stats)
    
    # Fill NaN for methods with 0 completed orders
    stats['Realized_Revenue'] = stats['Realized_Revenue'].fillna(0)
    stats['AOV'] = stats['AOV'].fillna(0)
    
    # 3. Estimate Loss
    # Loss = Cancelled_Count * AOV (of that method)
    # If AOV is 0 (e.g. all cancelled), maybe fallback to global AOV? 
    # But unlikely for major methods.
    stats['Revenue_Loss'] = stats['Cancelled_Order'] * stats['AOV']
    
    # 4. Gross Value
    stats['Gross_Value'] = stats['Realized_Revenue'] + stats['Revenue_Loss']
    
    # 5. Completed Count
    stats['Completed_Order'] = stats['Total_Order'] - stats['Cancelled_Order']
    
    # 6. Rates
    stats['Cancellation_Rate'] = (stats['Cancelled_Order'] / stats['Total_Order']) * 100
    stats['Completion_Rate'] = 100 - stats['Cancellation_Rate']
    
    # Sort by Total Order for relevance
    stats = stats.sort_values('Total_Order', ascending=False)
    
    # Save nicely formatted columns for the UI
    output_cols = ['Total_Order', 'Completed_Order', 'Cancelled_Order', 
                   'Cancellation_Rate', 'Completion_Rate', 
                   'Gross_Value', 'Revenue_Loss', 'Realized_Revenue']
    
    final_output = stats[output_cols]
    
    # Print to file
    with open('payment_risk_results_v2.txt', 'w') as f:
        f.write(final_output.to_string())
        
except Exception as e:
    with open('payment_risk_results_v2.txt', 'w') as f:
        f.write(str(e))
