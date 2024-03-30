import numpy as np
import pandas as pd

from unittest import result
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import *
import threading

from sklearn.metrics import mean_squared_error

import menu_recommend as mr

app = mr.md.app

@app.route("/pyapi/music/res", methods=['POST'])
def music_receive():
    
    musicRequestDto = request.json  # jpa에서 보낸 데이터  
    Music = mr.md.Music
    print(musicRequestDto)
    
    sorted_indices = np.argsort(mr.md.combined_matrix[musicRequestDto['vipId']-1])[::-1]
    recommended_musics = Music.Music.query.filter(
        Music.Music.music_id.in_(sorted_indices),
        Music.Music.music_year.between(musicRequestDto['ageGroup'][0], musicRequestDto['ageGroup'][1]),
        Music.Music.music_id.notin_(musicRequestDto['vipSavedMusics'] + musicRequestDto['vipDisLikedMusics'])
    ).limit(9).all()
    
    dict_musics = [music.to_dict() for music in recommended_musics]
    return jsonify(dict_musics)
        
# def calculate_rmse(R, P, Q, non_zeros):
#     error = 0

#     full_pred_matrix = np.dot(P, Q.T)

#     # 여기서 non_zeros는 아래 함수에서 확인할 수 있다.
#     x_non_zero_ind = [non_zeros[0] for non_zeros in non_zeros]
#     y_non_zero_ind = [non_zeros[1] for non_zeros in non_zeros]

#     # 원 행렬 R에서 0이 아닌 값들만 추출한다.
#     R_non_zeros = R[x_non_zero_ind, y_non_zero_ind]

#     # 예측 행렬에서 원 행렬 R에서 0이 아닌 위치의 값들만 추출하여 저장한다.
#     full_pred_matrix_non_zeros = full_pred_matrix[x_non_zero_ind, y_non_zero_ind]

#     mse = mean_squared_error(R_non_zeros, full_pred_matrix_non_zeros)
#     rmse = np.sqrt(mse)

#     return rmse

# def matrix_factorization(R, K, steps=200, learning_rate=0.01, r_lambda=0.01):
#     num_users, num_items = R.shape

#     np.random.seed(1)
#     P = np.random.normal(scale=1.0/K, size=(num_users, K))
#     Q = np.random.normal(scale=1.0/K, size=(num_items, K))
    
#     # R>0인 행 위치, 열 위치, 값을 non_zeros 리스트에 저장한다.
#     non_zeros = [ (i, j, R[i, j]) for i in range(num_users)
#                   for j in range(num_items) if R[i, j] > 0 ]

#     # SGD 기법으로 P, Q 매트릭스를 업데이트 함
#     for step in range(steps):
#         for i, j, r in non_zeros:
#             # 잔차 구함
#             eij = r - np.dot(P[i, :], Q[j, :].T)

#             # Regulation을 반영한 SGD 업데이터 적용
#             P[i, :] = P[i, :] + learning_rate*(eij * Q[j, :] - r_lambda*P[i, :])
#             Q[j, :] = Q[j, :] + learning_rate*(eij * P[i, :] - r_lambda*Q[j, :])

#         rmse = calculate_rmse(R, P, Q, non_zeros)
#         # if step % 10 == 0:
#         #     print("iter step: {0}, rmse: {1:4f}".format(step, rmse))

#     return P, Q

# # 예측 확률 구하기
# # P, Q => matric_fac... 의 결과로 얻은 두개의 행렬
# def predict(P, Q):
#     return np.dot(P, Q.T)

#############################################################################################################
#############################################################################################################


@app.route("/pyapi/menu/<vip_id>", methods=['GET'])
def recommend_menu(vip_id):
    menuIds = []
    if len(menuIds) > 0:
        recommend_menu = mr.training_recommend_menu(user_igd_info, menu_info, vip_id, menuIds)
    else:
        recommend_menu = mr.not_training_recommend_menu(predicted_R, menu_info, vip_id)
    print(recommend_menu)
    return jsonify(recommend_menu)

if __name__ == '__main__':

    predicted_R, user_igd_info, menu_info = mr.pre_training()
    threading.Thread(target = mr.train_model).start()
    # threading.Thread(target=app.run(debug=true)).start()
    

    app.run(debug=True)
