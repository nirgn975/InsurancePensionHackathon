import json
from os import path

import pandas as pd

print('Importing..')
data_directory = path.abspath(path.join(path.dirname(__file__), 'op_data_hackathon.xlsx'))
xls_file = pd.read_excel(data_directory)

data = []
for index in range(len(xls_file['instrument_id'])):
    instrument_id = str(xls_file['instrument_id'][index])
    instrument_type = str(xls_file['instrument_type'][index])
    instrument_sub_type = str(xls_file['instrument_sub_type'][index])
    instrument_name = str(xls_file['instrument_name'][index])
    managing_body = str(xls_file['managing_body'][index])
    fund = int(xls_file['fund'][index])
    fund_name = str(xls_file['fund_name'][index])
    fair_value = float(xls_file['fair_value'][index])
    par_value = float(xls_file['par_value'][index])

    data.append({
        'instrument_id': instrument_id,
        'instrument_type': instrument_type,
        'instrument_sub_type': instrument_sub_type,
        'instrument_name': instrument_name,
        'managing_body': managing_body,
        'fund': fund,
        'fund_name': fund_name,
        'fair_value': fair_value,
        'par_value': par_value,
    })


with open('data.json', 'w', encoding='utf-8') as outfile:
    json.dump(data, outfile, ensure_ascii=False)

print('Import completed successfully.')
