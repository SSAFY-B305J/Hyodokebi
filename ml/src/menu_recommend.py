import sys
import pandas as pd
import numpy as np

sys.path.append("../models")

import model as md


# user_igd_info, menu_info = md.makeDefaultDataSet()

                    
def pre_training():
    print("start pre train")
    excel_file_path = './dataTmp.xlsx'

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
    
    print("end pre train")
    return predicted_R, user_igd_info, menu_info
    

def training_recommend_menu(user_igd_info, menu_info, vip_id, menu_ids):
    user_igd_info2 = md.updateDataSet(user_igd_info,vip_id,menu_ids)
    predict_R = md.menu_training(user_igd_info2, 10 )
    recommend_menu = md.predicted_menu(predict_R, menu_info, vip_id)
    return recommend_menu

def not_training_recommend_menu(predict_R, menu_info, vip_id):
    return md.predicted_menu(predict_R, menu_info, vip_id)


def train_model():
    return md.train_model()