import requests
import pandas as pd
import numpy as np  # Import numpy for NaN handling

StablecoinsURL = 'https://stablecoins.llama.fi'

stablecoins = requests.get(StablecoinsURL + '/stablecoins/' + '?includePrices=true')

stablecoin_ids = [asset["id"] for asset in stablecoins.json()['peggedAssets']]
symbols = [asset["symbol"] for asset in stablecoins.json()['peggedAssets']]
response_data = {}

currencies = ["JPY", "VAR", "USD", "EUR", "CNY"]

# Determine the maximum number of data points for any stablecoin
max_data_points = 0

for stablecoin_id in stablecoin_ids:
    url = StablecoinsURL + "/stablecoincharts/all" + "?stablecoin=" + stablecoin_id
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        max_data_points = max(max_data_points, len(data))
    else:
        print(f"Failed to retrieve data for stablecoin ID {stablecoin_id}")

# Initialize a dictionary to store data for each stablecoin with consistent length
for stablecoin_id in stablecoin_ids:
    response_data[stablecoin_id] = {currency: [None] * max_data_points for currency in currencies}

# Initialize a list to store the "Date" data
dates = [None] * max_data_points

# Fetch and populate data for each stablecoin
for stablecoin_id in stablecoin_ids:
    url = StablecoinsURL + "/stablecoincharts/all" + "?stablecoin=" + stablecoin_id
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        
        for i, entry in enumerate(data):
            date = entry.get("date")
            dates[i] = date  # Update the list of dates
            
            for currency in currencies:
                key = "pegged" + currency
                pegged_currency = entry.get("totalCirculating", {}).get(key)
                
                if pegged_currency is not None:
                    response_data[stablecoin_id][currency][i] = pegged_currency
    else:
        print(f"Failed to retrieve data for stablecoin ID {stablecoin_id}")

# Create a DataFrame from the response data
df_data = {"Date": dates}
df_data.update({f"{stablecoin_id}_{currency}": data for stablecoin_id, currency_data in response_data.items() for currency, data in currency_data.items()})

df = pd.DataFrame(df_data)

# Drop columns so that only column remains where the stablecoin has their data with currency.
df = df.dropna(axis=1, how='all')
print(symbols)

# Rename the columns from stablecoin_ids to symbols
for col in df.columns:
    if col != "Date" and "_" in col:
        stablecoin_id = col.split("_")[0]
        symbol = symbols[stablecoin_ids.index(stablecoin_id)]
        df = df.rename(columns={col: f"{symbol}_{col.split('_')[1]}"})

df.to_csv("output2.csv", index = False)
#print(df)
