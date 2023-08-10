# DeFi Llama API with Python

import requests

import pandas as pd

import json 

BaseURL = 'https://api.llama.fi'

"""
protocols = requests.get(BaseURL + '/protocols')

print(protocols.json()[0])
"""

StablecoinsURL = 'https://stablecoins.llama.fi'

stablecoins = requests.get(StablecoinsURL + '/stablecoins/' + '?includePrices=true')

print(stablecoins.json())




