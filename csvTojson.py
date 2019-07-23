import pandas as pd
data = pd.read_csv("Combined Room Check Current.csv", encoding="latin1")
data = data.loc[data["Location"].notnull(), :]
data["OS"] = data["OS:"]
data["Mfg Date"] = data["Mfg. Date"] 
data.drop(columns=["OS:", "Mfg. Date"], inplace= True)
file = open("results.json", "w")
file.write(data.to_json(orient = "records"))
file.close()