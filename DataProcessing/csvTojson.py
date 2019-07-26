import pandas as pd
import numpy as np
import json


room_check = pd.read_csv("RoomCheck.csv", encoding="latin1", na_values = ["PC not provided", "Verify", "Verify S/N", "None", "No Inventory #", "No Inventory#"]);

projector_list = pd.read_csv("ProjectorList.csv", encoding="latin1", na_values = ["PC not provided", "Verify", "Verify S/N", "None", "No Inventory #", "No Inventory#"])


computer_list = pd.read_csv("ComputerList.csv", encoding="latin1", na_values = ["PC not provided", "Verify", "Verify S/N", "None", "No Inventory #", "No Inventory#"])


room_check = room_check[["Location", "Lamp Hrs", "Lamp Hours(2)", "Projector Type", "Filter Hrs","Last Checked", "Model: Control | TP", "IP: Control | TP \xa0", "FW: Control | TP", "AMX IP", "Notes"]]
value = ["Location", "Lamp Hours(1)", "Lamp Hours(2)", "Projector Type", "Filter Hours", "Last Checked", "Control Model", "Control IP", "Control FW", "AMX IP", "Notes"]


room_check.rename(columns = dict(zip(room_check.columns, value)), inplace = True)


room_check = room_check.loc[room_check["Location"].notnull(), :]

computer_list = computer_list.loc[computer_list["Location"].notnull(), :]

computer_list = computer_list[["Location", "OS:", "Model #", "Service Tag", "Warranty Satus", "Purchase Date", "Mfg. Date", "UTT Tag", "Computer Name"]]

value = ["Location", "OS", "Computer Model", "Computer Service Tag", "Computer Warranty Satus", "Comuter Purchase Date", "Computer Mfg Date", "Computer UTT Tag", "Computer Name"]

computer_list.rename(columns = dict(zip(computer_list.columns, value)), inplace = True)

room_check.loc[room_check["Lamp Hours(2)"]== 0, "Lamp Hours(2)"] = np.nan

room_check["Lamp Hours(2)"].isnull().sum()

rooms = computer_list.join(room_check.set_index("Location"), on = "Location")

projector_list = projector_list[["Location", "Model #", "UT Tag", "Serial Number", "Manuf. Date", "Purchase Date"]]

value = ["Location", "Projector Model", "Projector UTT Tag", "Projector Serial Number", "Projector Mfg Date", "Projector Purchase Date"]

projector_list.rename(columns = dict(zip(projector_list.columns, value)), inplace = True)	

rooms_json = json.loads(rooms.to_json(orient = "records"))

temp = projector_list.columns[1:]

for i in rooms_json:
    for j in temp:
        i[j] = list(projector_list.loc[projector_list["Location"]==i["Location"], j])

file = open("DataBase.json", "w")

file.write(json.dumps(rooms_json))
file.close()

