#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import numpy as np
from sklearn.metrics import mean_squared_error


# In[2]:


# 모델 관련 함수 정의


# In[3]:


# 변수 상수 저장
PREDICT_USER = 89
SELECT_N_MENU = 14
K_VALUE = 52


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

# 에측결과를 토대로 메뉴 선택하기
def predicted_menu(predicted, userNo, nMenu):
    user_like_menu = predicted[userNo-1].copy();
    predicted_name = []
    print(user_like_menu)
    for i in range(0,nMenu):
        max_idx = np.argmax(user_like_menu)
        if user_like_menu[max_idx] < 0 or user_like_menu[max_idx] == 0 : break
        predicted_name += [user_info.columns[max_idx]]
        # print(i, " : ", user_info.columns[max_idx])
        user_like_menu[max_idx] = 0
    return predicted_name


# In[ ]:





# In[5]:


# 데이터 불러오기


# In[6]:


excel_file_path = './data/dataTmp.xlsx'

# 엑셀 파일의 각 시트를 다른 변수에 저장
menu_info = pd.read_excel(excel_file_path, sheet_name='Sheet1', header = 0, index_col = 0)
user_info = pd.read_excel(excel_file_path, sheet_name='Sheet2', header = 0, index_col = 0)

# 각 시트 데이터 확인
# print("Sheet1 데이터:")
# print(menu_info.head())

# print("\nSheet2 데이터:")
# print(user_info.head())


# In[7]:


# print제한 없애기
pd.set_option('display.max_seq_items', None)
pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)


# In[8]:


# 사용자 - 메뉴 정보가 저장된 데이터프레임 배열로 바꾸기
user_info.arr = user_info.to_numpy()


# In[9]:


### 사용자 - 선호메뉴 데이터를 통한 매뉴 추천


# In[ ]:





# In[10]:


P, Q = matrix_factorization(user_info.arr, K=K_VALUE)
predicted_R = predict(P,Q)


# In[11]:


print(predicted_R.shape)


# In[12]:


predict_menu = predicted_menu(predicted_R, PREDICT_USER, SELECT_N_MENU)
print(predict_menu)


# In[13]:


for i in range(0, user_info.shape[1]):
    if user_info.iloc[9,i] == 1 :
        print(user_info.columns[i])


# In[ ]:





# In[ ]:





# In[14]:


## 사용자 - 재료, 재료 - 선호메뉴 기반 메뉴 추천


# In[15]:


user_igd_info = pd.DataFrame(0, index=[f"User{i+1}" for i in range(0, user_info.shape[0])], columns=[f"{i}" for i in menu_info.columns])


# In[16]:


for row in range(0,user_info.shape[0]):
    for col in range(0, user_info.shape[1]):
        if user_info.iloc[row,col] > 0:
            for igdIdx in range(0, menu_info.shape[1]):
                if menu_info.iloc[col,igdIdx] > 0:
                    user_igd_info.iloc[row, igdIdx] += menu_info.iloc[col,igdIdx]
                    # user_igd_info.iloc[row, igdIdx] += 1

#print(user_igd_info)


# In[17]:


user_igd_info.arr = user_igd_info.to_numpy()
menu_info.arr = menu_info.to_numpy()


# In[18]:


predicted_R_V2 = predict(user_igd_info.arr,menu_info.arr)


# In[19]:


predict_menu_V2 = predicted_menu(predicted_R_V2, PREDICT_USER, SELECT_N_MENU)


# In[20]:


for i in range(0, user_info.shape[1]):
    if user_info.iloc[9,i] == 1 :
        print(user_info.columns[i])


# In[21]:


print(user_igd_info.arr.shape)
print(menu_info.arr.shape)


# In[22]:


# 내가 먼저 분해해놓고 활용하기
def predict_V3(R, P_tmp, Q_tmp, steps=200, learning_rate=0.01, r_lambda=0.01):
    
    num_users, num_items = R.shape
    
    P = P_tmp.copy() * 0.1
    Q = Q_tmp.copy() * 0.1
    
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

    return np.dot(P, Q.T)


# In[23]:


predicted_R_V3 = predict_V3(user_info.arr, user_igd_info.arr, menu_info.arr)


# In[24]:


predict_menu_V3 = predicted_menu(predicted_R_V3, PREDICT_USER, SELECT_N_MENU)
print(predict_menu_V3)
print(predict_menu_V2)


# In[25]:


print(user_info.index[PREDICT_USER-1])
for i in range(0, user_info.shape[1]):
    if user_info.iloc[PREDICT_USER-1,i] == 1 :
        print(user_info.columns[i])


# In[ ]:





# In[26]:


## 사용자 - 재료 기반 메뉴 추천

# 사용자 - 재료 사이의 관계를 잠재요인 분석으로 행렬분해
# 해당 결과를 통해 선호 재료 선택
# 해당 선호 재료 배열과 메뉴별 재료 배열을 곱해서 가장 연관성이 높은 메뉴 선택


# In[27]:


# 선호 재료 출력하기
def predicted_menu_V4(predicted, userNo, nMenu):
    user_like_igd = predicted[userNo-1].copy();
    predicted_name = []

    user_like_menu = predict(user_like_igd, menu_info.arr*0.1)
    print(user_like_menu)
    for i in range(0,nMenu):
        max_idx = np.argmax(user_like_menu)
        if user_like_menu[max_idx] < 0 or user_like_menu[max_idx] == 0 : break
        predicted_name += [user_info.columns[max_idx]]
        # print(i, " : ", user_info.columns[max_idx])
        user_like_menu[max_idx] = 0
    return predicted_name


# In[ ]:





# In[28]:


print(user_igd_info.arr)


# In[29]:


P_V4, Q_V4 = matrix_factorization(user_igd_info.arr, K = K_VALUE, learning_rate=0.01, steps=500)


# In[30]:


predicted_R_V4 = predict(P_V4, Q_V4)


# In[31]:


predict_menu_V4 = predicted_menu_V4(predicted_R_V4, PREDICT_USER, K_VALUE)
print(predict_menu_V4)


# In[32]:


predicted_R_V4


# In[45]:


age_igd_info


# In[33]:


## 사용자 - 나이 연관성 추가해서 모델 구현


# In[34]:


user_age_info = pd.read_excel(excel_file_path, sheet_name='Sheet3', header = 0, index_col = 0)


# In[44]:


age_igd_info = pd.DataFrame(0, index=[f"{i}" for i in user_age_info.columns], columns=[f"{i}" for i in menu_info.columns])


# In[ ]:


for row in range(0,user_age_info.shape[0]):
    for col in range(0, user_age_info.shape[1]):
        if user_age_info.iloc[row,col] > 0:
            for igdIdx in range(0, menu_info.shape[1]):
                if menu_info.iloc[col,igdIdx] > 0:
                    user_igd_info.iloc[row, igdIdx] += menu_info.iloc[col,igdIdx]
                    # user_igd_info.iloc[row, igdIdx] += 1

#print(user_igd_info)


# In[ ]:


user_age_info.arr = user_age_info.to_numpy()


# In[ ]:





# In[35]:


### 결과 비교


# In[36]:


print(predict_menu)
print(predict_menu_V2)
print(predict_menu_V3)
print(predict_menu_V4)


# In[37]:


for i in range(0, user_info.shape[1]):
    if user_info.iloc[PREDICT_USER-1,i] == 1 :
        print(user_info.columns[i])


# %%

def modelV2(data):
    print(data)

