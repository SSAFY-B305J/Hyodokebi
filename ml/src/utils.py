import numpy as np
from sklearn.metrics import mean_squared_error
import pandas as pd
from models import db

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
        # if step % 10 == 0:
        #     print("iter step: {0}, rmse: {1:4f}".format(step, rmse))

    return P, Q

# 예측 확률 구하기
# P, Q => matric_fac... 의 결과로 얻은 두개의 행렬
def predict(P, Q):
    return np.dot(P, Q.T)

def menu_training(user_igd_info, K=51 ,learning_rate = 0.01, steps = 500 ):
    user_igd_data = user_igd_info.to_numpy()
    P, Q = matrix_factorization(user_igd_data*0.1, K, learning_rate = 0.01, steps = 500 )
    predicted_R = predict(P,Q)
    return predicted_R


# ### 추천할 때 사용될 함수


# 데이터 수정하기
def updateDataSet(user_igd_info, menu_info, vip_id, menu_ids):
    vip_id = int(vip_id)
    user_igd_info_tmp = user_igd_info.copy()
    for menu_id in menu_ids:
        menu_id = int(menu_id)
        for idx in range(0, menu_info.shape[1]):
            if menu_info.iloc[menu_id-1,idx] == 1:
                user_igd_info_tmp.iloc[vip_id-1, idx] += 2
    return user_igd_info_tmp

    
# 에측결과를 토대로 메뉴 선택하기
# model_prac.ipynb -> predicted_menu_V4
def predicted_menu(predicted, menu_info, user_no, nMenu=9):
    
    user_no = int(user_no)
    menu_data = menu_info.to_numpy()
    user_like_igd = predicted[user_no-1].copy()
    predicted_menu = []

    user_like_menu = predict(user_like_igd, menu_data*0.1)

    for i in range(0,nMenu):
        max_idx = np.argmax(user_like_menu)
        if user_like_menu[max_idx] < 0 or user_like_menu[max_idx] == 0 : break
        predicted_menu += [max_idx+1]
        user_like_menu[max_idx] = 0

    recommended_menu = recommend_menu(predicted_menu)
    return recommended_menu

def recommend_menu(menu_ids):
    recommended_menu = pd.DataFrame(columns=["menu_id", "menu_name", "cate_image"])
    print(recommended_menu)
    for idx in range(0,len(menu_ids)):
        sql_query = "SELECT m.menu_id, m.menu_name, c.cate_image FROM menu m,cate c WHERE m.cate_cate_id = c.cate_id and m.menu_id = %s" %menu_ids[idx]
        menu_info = pd.read_sql(sql=sql_query, con=db.engine)
        if not menu_info.empty:
            recommended_menu = pd.concat([recommended_menu, menu_info], axis=0)
        print(recommended_menu)
    return recommended_menu.to_json(orient="records")

def makeDataSet():
    
    sql_query = "SELECT max(vip_id) FROM vip v"
    nVip = pd.read_sql(sql=sql_query, con=db.engine).iloc[0,0]
    sql_query = "SELECT * FROM menu m"
    menu_info = pd.read_sql(sql=sql_query, con=db.engine) 
    sql_query = "SELECT * FROM recipe re"
    rci_info = pd.read_sql(sql=sql_query, con=db.engine)
    sql_query = "SELECT * FROM mi"
    mi_info = pd.read_sql(sql=sql_query, con=db.engine )
    sql_query = "SELECT * FROM saved_menu"
    user_info = pd.read_sql(sql=sql_query, con=db.engine)

    menu_info = pd.DataFrame(0, index = [idx for idx in range(0, menu_info.shape[0])] , columns = [ col for col in range(0, mi_info.shape[0]+1)])
    for row in range(0, rci_info.shape[0]):
        menu_info.iloc[rci_info.iloc[row,1]-1, rci_info.iloc[row,2]-1] += 1 
        
    flag = False
    user_igd_info = pd.DataFrame(0, index = [ idx for idx in range(0,nVip) ], columns = [ col for col in range(0, mi_info.shape[0]+1)])
    for row in range(0, user_info.shape[0]):
        vip_id = user_info.iloc[row,1]
        menu_id = user_info.iloc[row,2]
        for idx in range(0, rci_info.shape[0]):
            if menu_id == rci_info.iloc[idx,1]:
                flag = True
                user_igd_info.iloc[vip_id-1, rci_info.iloc[idx,2]] += rci_info.iloc[idx,3]
                # user_igd_info.iloc[vip_id-1, rci_info.iloc[idx,2]] += 1
            elif flag : 
                flag = False
                break
            
    return user_igd_info, menu_info
