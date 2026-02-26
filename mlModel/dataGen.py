import pandas as pd
import random
rows = []

for i in range(500):
    income = random.randint(100000, 2000000)
    age = random.randint(18, 65)
    occupation = random.randint(0, 3)
    category = random.randint(0, 3)
    homeLoan = random.randint(0, 1)
    agriLand = random.randint(0, 1)
    business = random.randint(0, 1)
    scheme_incomeLimit = random.choice([300000, 500000, 800000, 1200000])
    scheme_sector = random.randint(0, 4)
    scheme_minAge = random.choice([18, 21, 25])

    if income <= scheme_incomeLimit and age >= scheme_minAge:
        eligible = 1
    else:
        eligible = 0

    rows.append([
        income, age, occupation, category, homeLoan, agriLand, business,
        scheme_incomeLimit, scheme_sector, scheme_minAge, eligible
    ])

columns = [
    "income", "age", "occupation", "category", "homeLoan", "agriLand", "business",
    "scheme_incomeLimit", "scheme_sector", "scheme_minAge", "eligible"]

df = pd.DataFrame(rows, columns=columns)

df.to_csv("scheme_dataset.csv", index=False)