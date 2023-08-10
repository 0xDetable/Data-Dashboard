# DeFi Llama API with Python

import requests

import pandas as pd

import json 

BaseURL = 'https://api.llama.fi'

protocols = requests.get(BaseURL + '/protocols')

print(protocols.json()[0])