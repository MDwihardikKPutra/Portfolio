try:
    with open('D:/Pribadi/Portfolio/public/DataAnalyst/all_months_clean.csv', 'r', encoding='utf-8') as f:
        header = f.readline().strip().split(';')
        with open('D:/Pribadi/Portfolio/columns.txt', 'w', encoding='utf-8') as out:
            for i, col in enumerate(header):
                out.write(f"{i}: {col}\n")
except Exception as e:
    print(f"Error: {e}")
