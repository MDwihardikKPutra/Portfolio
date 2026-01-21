try:
    with open('D:/Pribadi/Portfolio/public/DataAnalyst/all_months_clean.csv', 'r', encoding='utf-8') as f:
        print(f.readline())
except Exception as e:
    print(f"Error: {e}")
