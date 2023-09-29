# DeFi Llama API with Python

import requests

import pandas as pd

import json 

BaseURL = 'https://api.llama.fi'

StablecoinsURL = 'https://stablecoins.llama.fi'

stablecoins = requests.get(StablecoinsURL + '/stablecoins/' + '?includePrices=true')

# print(stablecoins.json())

pegged_assets = stablecoins.json()['peggedAssets']

flattened_data = []

for asset in pegged_assets:
    for chain, chain_data in asset["chainCirculating"].items():
        current_data = chain_data.get("current", {})  # Get current data, handle missing key
        chain_circulating = current_data.get("peggedUSD")
        current_circulating = asset['circulating'].get("peggedUSD")
        price = asset['price']

        if price and current_circulating is not None:
            market_cap = price * current_circulating
            percentage_off_peg = (price - 1) * 100
        else: 
            market_cap = None
            percentage_off_peg = None 

        flattened_data.append({
            'asset_id': asset['id'],
            'asset_name': asset['name'],
            'symbol': asset['symbol'],
            'gecko_id': asset['gecko_id'],
            'pegType': asset['pegType'],
            'pegMechanism': asset['pegMechanism'],
            'chain': chain,
            'chain_circulating': chain_circulating,
            'current_circulating': current_circulating,
            'price': price,
            '% Off Peg': percentage_off_peg,
            'market_cap': market_cap
        })

df = pd.DataFrame(flattened_data)
sorted_data = df.sort_values('market_cap', ascending = False)
sorted_data.reset_index(drop = True, inplace = True)

print(sorted_data.head(10)) # stablecoins with chains they are circulating

CoinGecko_url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=stablecoins&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"

coingecko_stablecoins = pd.DataFrame(requests.get(CoinGecko_url).json())

#print(coingecko_stablecoins.iloc[0])

flattened_coingecko = []

for i in range(coingecko_stablecoins.shape[0]):
    flattened_coingecko.append({
        "id": coingecko_stablecoins.iloc[i]["id"],
        "total_volume": coingecko_stablecoins.iloc[i]["total_volume"],
        "ath": coingecko_stablecoins.iloc[i]["ath"],
        "ath_change_percentage": coingecko_stablecoins.iloc[i]["ath_change_percentage"],
        "ath_date": coingecko_stablecoins.iloc[i]["ath_date"],
        "atl": coingecko_stablecoins.iloc[i]["atl"],
        "atl_change_percentage": coingecko_stablecoins.iloc[i]["atl_change_percentage"],
        "atl_date": coingecko_stablecoins.iloc[i]["atl_date"],
    })
#print(coingecko_stablecoins)
print(pd.DataFrame(flattened_coingecko))

# Merge the two DataFrames using 'gecko_id' and 'id' columns as the key
merged_df = pd.merge(df, pd.DataFrame(flattened_coingecko), left_on='gecko_id', right_on='id', how='inner')

# Drop the duplicate 'id' column if needed
merged_df.drop(columns='id', inplace=True)

# To find the most dominant stablecoin

total_market_cap = 0

unique_stablecoin_market_caps = set()

# Iterate through the merged_df rows
for index, row in merged_df.iterrows():
    stablecoin_id = row['gecko_id']
    market_cap = row['market_cap']

    if pd.isna(market_cap):
        market_cap = 0

    # Check if the (stablecoin_id, market_cap) tuple has not been added before
    if (stablecoin_id, market_cap) not in unique_stablecoin_market_caps:
        total_market_cap += market_cap  # Add market_cap to the total
        unique_stablecoin_market_caps.add((stablecoin_id, market_cap))  # Add the tuple to the set


# Calculate the percentage of each stablecoin's market cap relative to the total market cap
merged_df['market_cap_percentage'] = merged_df.apply(lambda row: (row['market_cap'] / total_market_cap) * 100 if row['market_cap'] is not None else 0, axis=1)

print(merged_df)

merged_df.to_csv('output.csv', index=False)  

# Find the stablecoin with the highest market cap percentage
most_dominant_stablecoin = merged_df[merged_df['market_cap_percentage'] == merged_df['market_cap_percentage'].max()]

# Print the most dominant stablecoin
print("Most Dominant Stablecoin:")
print(most_dominant_stablecoin.iloc[0][['asset_name', 'market_cap_percentage']])

