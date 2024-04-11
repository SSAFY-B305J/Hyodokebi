

<details>
<summary> 2024.02.26 </summary>
<br/>

## 오늘 한일
- 데이터 추천 모델에 작용할 활성화 함수 공부
- 아이디어 구체화 및 기획서 초안 작성

## 오늘 배운 것
```
💡 활성화 함수?
    모델의 층과 층 사이에서 데이터가 이동할 때 선형성을 읽도록 처리해주는 함수!
    모델의 층과 층 사이에서 데이터가 이동할 때 선형성을 잃도록 처리해주는 함수!
    즉, 선형 데이터를 비선형으로 바꿀 때 사용한다.
    활성화 함수로 선형을 써버린다면… 여러층을 쌓아도 선형이 유지되므로 하나의 층과 다를것이 없으니 무조건 비선형으로 선택!
```
<br/>

### sigmoid
<hr/>

![sigmoid](/uploads/570b7d17ecb1725f1268b618c824f07f/sigmoid.png)

- 입력값을 0~1 사이의 값으로 변환
- 결과값을 확률로 해석하는 `로지스틱 회귀` 등에 적합

<br/>

### tanh
<hr/>
![tanh](/uploads/39cd955721acf8e9e77f7c53bab4a512/tanh.png)

- sigmoid 변형함수
- 함수의 중심이 원점으로 이동 → 가중치 최적화가 sigmoid 보다 원할 → 하지만, 형태는 동일하므로 여전히 vanishing gradient 문제 존재

<br/>

### ReLU
<hr/>

![ReLU](/uploads/e04e99ed6a01c486372b46d921bb6553/ReLU.png)

- 0보다 큰 입력값은 그대로 다음층에 전달
- 0 이하의 값은 다음 층으로 전달 X

<br/>

### ELU
<hr/>


![ELU](/uploads/77058fd12412a4801ac8abe3f3d48bb2/ELU.png)


- ReLU 의 장점을 모두 포함
- dying ReLU 현상을 해결

<br/>

### Softplus
<hr/>


![Softplus](/uploads/43490a2a7aae711d08171ba468baeb73/Softplus.png)

- ReLU 함수를 부드럽게 근사시킨 함수
- 전구간에서 미분이 가능

## 아직 잘 모르는 것
- 해당 활성화 함수를 어떤 학습을 하는 모델에 적용해야 좋은 결과를 보이는지 조사
- 추천 모델의 종류에 대해 학습하기

</details>



<details>
<summary> 2024.02.27 </summary>

## 오늘 한 일
- 기획서 완성
- 전문가 리뷰 대비 질문지 초안 작성
- 기능 구체화

## 오늘 배운 것
- [모듈형 특강] 보안을 듣고 관련 이슈들과 지식에 대해 알 수 있었다.

## 아직 잘 모르는 것
- 보안 관련하여 내가 할 수 있는것과 프로젝트에 적용할 부분을 정하고 학습할 필요성이 있다.

</details> 

<details>
<summary> 2024.02.28 </summary>

## 오늘 한 일
- 기능 명세서 초안 작성
- 전문가 리뷰 대비 질문지 완성

## 오늘 배운 것

<br/>

### 다중 퍼셉트론 ( Multilayer Perceptron )
<hr/>

![MLP](/uploads/bc0a960a470f564bac63a22d03caf90b/MLP.png)

**사용 라이브러리 및 예시 ( GPT )**

```python
import tensorflow as tf

# 다층 퍼셉트론 구축
model = tf.keras.Sequential([
    tf.keras.layers.Flatten(input_shape=(input_dim,)),  # 입력 데이터를 1차원으로 펼치는 레이어
    tf.keras.layers.Dense(128, activation='relu'),     # 첫 번째 은닉층
    tf.keras.layers.Dense(64, activation='relu'),      # 두 번째 은닉층
    tf.keras.layers.Dense(output_dim, activation='softmax')  # 출력층
])

# 모델 컴파일
model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# 모델 학습
model.fit(X_train, y_train, epochs=10, batch_size=32, validation_data=(X_val, y_val))
```

**특징**

- **비선형** 데이터 학습
    - 선형 데이터 → 비선형 데이터로 변환 : 활성화 함수 활용

## 아직 잘 모르는 것
- 머신러닝 모델의 종류 및 주 활용분야에 대해 더 학습하기

</details> 
