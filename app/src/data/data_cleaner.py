import csv

with open('landings.csv', 'r') as f:
    _ = next(f) # drop header
    raw_rows = list(csv.reader(f, skipinitialspace=True))

clean_rows = []
for raw_row in raw_rows:
    year, state, species, pounds, dollars, _, collection, confidentiality = raw_row
    try:
        row = {
                'Year': int(year),
                'State': state.replace('*',''),
                'Species': species,
                'Pounds': int(pounds.replace(',','')),
                'Dollars': int(dollars.replace(',','')),
                'Collection': collection,
                'Confidentiality': confidentiality
              }
        clean_rows.append(row)
    except:
        continue

header = ['Year', 'State', 'Collection', 'Pounds', 'Species', 'Confidentiality', 'Dollars']
with open('clean_landings.csv', 'w') as f:
    writer = csv.DictWriter(f, fieldnames=header)
    writer.writeheader()
    for row in clean_rows:
        writer.writerow(row)
