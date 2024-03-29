import sys
import pandas as pd
import numpy as np

sys.path.append("../models")

import models.model as md


# user_igd_info, menu_info = md.makeDefaultDataSet()

                    
def pre_training():
    excel_file_path = './data/dataTmp.xlsx'

    # 엑셀 파일의 각 시트를 다른 변수에 저장
    menu_info = pd.read_excel(excel_file_path, sheet_name='Sheet1', header = 0, index_col = 0)
    user_info = pd.read_excel(excel_file_path, sheet_name='Sheet2', header = 0, index_col = 0)

    user_igd_info = pd.DataFrame(0, index=[f"User{i+1}" for i in range(0, user_info.shape[0])], columns=[f"{i}" for i in menu_info.columns])
    for row in range(0,user_info.shape[0]):
        for col in range(0, user_info.shape[1]):
            if user_info.iloc[row,col] > 0:
                for igdIdx in range(0, menu_info.shape[1]):
                    if menu_info.iloc[col,igdIdx] > 0:
                        user_igd_info.iloc[row, igdIdx] += menu_info.iloc[col,igdIdx]
    
    predicted_R = md.menu_training(user_igd_info, 51)
    return predicted_R
    
    