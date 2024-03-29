#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import numpy as np
from sklearn.metrics import mean_squared_error
import pymysql


# In[ ]:





# # DB 연결

# In[2]:


# import os
# from dotenv import load_dotenv
# load_dotenv()

# global db
# global cursor

# db = pymysql.connect(
#     host=os.getenv("MYSQL_HOST"), 
#     port=3306, 
#     user=os.getenv("MYSQL_USER"), 
#     passwd=os.getenv("MYSQL_PASSWORD"), 
#     db=os.getenv("MYSQL_DB"), 
#     charset='utf8'
# )

# cursor = db.cursor()


# In[3]:


# 훈련에 사용될 함수


# In[4]:


# 실제 R 행렬과 예측 행렬의 오차를 구하는 함수
def calculate_rmse(R, P, Q, non_zeros):
    error = 0

    full_pred_matrix = np.dot(P, Q.T)

    # 여기서 non_zeros는 아래 함수에서 확인할 수 있다.
    x_non_zero_ind = [non_zeros[0] for non_zeros in non_zeros]
    y_non_zero_ind = [non_zeros[1] for non_zeros in non_zeros]

    # 원 행렬 R에서 0이 아닌 값들만 추출한다.
    R_non_zeros = R[x_non_zero_ind, y_non_zero_ind]

    # 예측 행렬에서 원 행렬 R에서 0이 아닌 위치의 값들만 추출하여 저장한다.
    full_pred_matrix_non_zeros = full_pred_matrix[x_non_zero_ind, y_non_zero_ind]

    mse = mean_squared_error(R_non_zeros, full_pred_matrix_non_zeros)
    rmse = np.sqrt(mse)

    return rmse

# 행렬분해하는 함수
def matrix_factorization(R, K, steps=200, learning_rate=0.01, r_lambda=0.01):
    num_users, num_items = R.shape

    np.random.seed(1)
    P = np.random.normal(scale=1.0/K, size=(num_users, K))
    Q = np.random.normal(scale=1.0/K, size=(num_items, K))
    
    # R>0인 행 위치, 열 위치, 값을 non_zeros 리스트에 저장한다.
    non_zeros = [ (i, j, R[i, j]) for i in range(num_users)
                  for j in range(num_items) if R[i, j] > 0 ]

    # SGD 기법으로 P, Q 매트릭스를 업데이트 함
    for step in range(steps):
        for i, j, r in non_zeros:
            # 잔차 구함
            eij = r - np.dot(P[i, :], Q[j, :].T)

            # Regulation을 반영한 SGD 업데이터 적용
            P[i, :] = P[i, :] + learning_rate*(eij * Q[j, :] - r_lambda*P[i, :])
            Q[j, :] = Q[j, :] + learning_rate*(eij * P[i, :] - r_lambda*Q[j, :])

        rmse = calculate_rmse(R, P, Q, non_zeros)
        if step % 10 == 0:
            print("iter step: {0}, rmse: {1:4f}".format(step, rmse))

    return P, Q

# 예측 확률 구하기
def predict(P, Q):
    return np.dot(P, Q.T)


# In[ ]:





# # 서비스에 사용할 함수

# In[ ]:





# ### 서버가 시작될 때 기본으로 실행될 함수

# In[5]:


excel_file_path = './data/dataTmp.xlsx'

# 엑셀 파일의 각 시트를 다른 변수에 저장
menu_info = pd.read_excel(excel_file_path, sheet_name='Sheet1', header = 0, index_col = 0)
user_info = pd.read_excel(excel_file_path, sheet_name='Sheet2', header = 0, index_col = 0)


# In[ ]:


# db 사용자 추가하면 지우기
user_igd_info = pd.DataFrame(0, index=[f"User{i+1}" for i in range(0, user_info.shape[0])], columns=[f"{i}" for i in menu_info.columns])
for row in range(0,user_info.shape[0]):
    for col in range(0, user_info.shape[1]):
        if user_info.iloc[row,col] > 0:
            for igdIdx in range(0, menu_info.shape[1]):
                if menu_info.iloc[col,igdIdx] > 0:
                    user_igd_info.iloc[row, igdIdx] += menu_info.iloc[col,igdIdx]


# In[6]:


# def makeDefaultDataSet():
#     # 메뉴 데이터 가져오기
#     cursor.execute("SELECT * FROM menu")
#     menu_info = cursor.fetchall()

#     # 재료 데이터 가져오기
#     cursor.execute("SELECT * FROM mi")
#     igd_info = cursor.fetchall()
    
#     # 조리법 데이터 가져오기
#     cursor.execute("SELECT * from wtc")
#     wtc_info = cursor.fetchall()
    
#     # 다 합치기
#     menu_data = pd.DataFrame()
#     for row in menuInfo:
#
#
#     user_igd_info = pd.DataFrame(0, index = [vip_id for vip_id in menu_data.index], columns = [ menu_id for menu_data.columns ])
#     return user_igd_info, menu_info

# 선호확률 학습하기
def menu_training(user_igd_info, K,learning_rate = 0.01, steps = 500 ):
    user_igd_data = user_igd_info.to_numpy()
    user_igd_data *= 0.1
    P, Q = matrix_factorization(user_igd_data, K, learning_rate = 0.01, steps = 500 )
    predicted_R = predict(P,Q)
    return predicted_R


# ### 추천할 때 사용될 함수

# In[7]:


# 데이터 수정하기
def updateDataSet(user_igd_info, vip_id, menu_ids):
    user_igd_info_tmp = user_igd_info.copy()
    for menu_id in menuIds:
        user_igd_info_tmp.iloc[vip_id-1, menu_id] += 2
    return user_igd_info_tmp

# 에측결과를 토대로 메뉴 선택하기
# model_prac.ipynb -> predicted_menu_V4
def predicted_menu(predicted, userNo, nMenu):
    
    menu_data = menu_info.to_numpy()
    user_like_igd = predicted[userNo-1].copy();
    predicted_name = []

    user_like_menu = predict(user_like_igd, menu_data*0.1)

    for i in range(0,nMenu):
        max_idx = np.argmax(user_like_menu)
        if user_like_menu[max_idx] < 0 or user_like_menu[max_idx] == 0 : break
        predicted_name += [user_info.columns[max_idx]]
        user_like_menu[max_idx] = 0
    return predicted_name


# In[ ]:





# In[8]:


# !jupyter nbconvert --to script model.ipynb

