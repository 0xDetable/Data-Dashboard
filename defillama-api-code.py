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
        pegged_usd = current_data.get("peggedUSD")
        flattened_data.append({
            'asset_id': asset['id'],
            'asset_name': asset['name'],
            'symbol': asset['symbol'],
            'gecko_id': asset['gecko_id'],
            'pegType': asset['pegType'],
            'pegMechanism': asset['pegMechanism'],
            'chain': chain,
            'current_peggedUSD': pegged_usd
        })

df = pd.DataFrame(flattened_data)
sorted_data = df.sort_values('current_peggedUSD', ascending = False)
sorted_data.reset_index(drop = True, inplace = True)

print(sorted_data.head(10)) # stablecoins with chains they are circulating

# stable coin price

stablecoin_prices = requests.get(StablecoinsURL + '/stablecoinprices')
stablecoin_price_df = pd.DataFrame(stablecoin_prices.json())

stablecoin_price_df.sort_values('date', ascending = False, inplace = True) # sort the price data recent to oldest according to unix timestamps
stablecoin_price_df.reset_index(drop = True, inplace = True) # correct the index

print(stablecoin_price_df.head(10))

# MCAP

stablecoin_mcaps = requests.get(StablecoinsURL + '/stablecoinchains') # gives the current mcap sum of stablecoins on each chain

stablecoin_mcap = pd.DataFrame(stablecoin_mcaps.json())

print(stablecoin_mcap)

# TVL data for protocols 

protocols = requests.get(BaseURL + '/protocols')

print(protocols.json()[0])

# Price percentage change

CoinsURL = 'https://coins.llama.fi'

chain_name = 'ethereum'
contract_address = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
coins = chain_name + ':' + contract_address
percentage = requests.get(CoinsURL + '/percentage/' + coins + '?timestamp=' + '1664364537' + '&lookForward=false' + '&period=3w')

percentage_df = pd.DataFrame(percentage.json())

print(percentage_df)