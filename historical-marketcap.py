import requests

import pandas as pd

import json 

StablecoinsURL = 'https://stablecoins.llama.fi'

stablecoins = requests.get(StablecoinsURL + '/stablecoins/' + '?includePrices=true')

print("----------------------------------------------")
stablecoin_ids = [asset["id"] for asset in stablecoins.json()['peggedAssets']]
response_data = {}
currencies = ["JPY", "VAR", "USD", "EUR", "CNY"]

for stablecoin_id in stablecoin_ids:
    url = StablecoinsURL + "/stablecoincharts/all" + "?stablecoin=" + stablecoin_id
    response = requests.get(url)
    
    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        data = response.json()
        
        
        pegged_data = []  # List to store pegged values along with dates
            
        for entry in data:
            date = entry.get("date")
            pegged_values = {}
                
            for currency in currencies:
                key = "pegged" + currency
                pegged_currency = entry.get("totalCirculating", {}).get(key)
                    
                # Check if pegged_currency is not None before storing it
                if pegged_currency is not None:
                    pegged_values[currency] = pegged_currency
            
            pegged_data.append({"date": date, **{f"{currency}": value for currency, value in pegged_values.items()}})
            
        response_data[stablecoin_id] = pegged_data
    else:
        print(f"Failed to retrieve data for stablecoin ID {stablecoin_id}")

response_data_df = []

for stablecoin_id, pegged_currency in response_data.items():
    response_data_df.append({"id": stablecoin_id, "pegged_currency": pegged_currency})

df = pd.DataFrame(response_data_df)

print(df)

