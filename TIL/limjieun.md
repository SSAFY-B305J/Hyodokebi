<details>
<summary> 2024.02.28 </summary>

## 오늘 한 일

- 기획서 기반으로 프로젝트 소개 PPT 작성 후 제출
- 기술 명세 회의 후 기술 명세서 작성
- 기획서 기반 프로젝트 소개 PPT 작성

## 오늘 배운 것

- 자동화되는 IT 개발 특강을 듣고 Baas의 개념과 Google의 Firebase가 제공하는 기능들에 대해 배웠다.
- React 특강을 듣고 리액트가 만들어지기 전의 프론트엔드 개발 방법에 대해 배우고, 리액트가 만들어진 이유에 대해 이해할 수 있었다.

## 아직 잘 모르는 것

- 사용자의 음식 선호도 조사(설문조사) 시 어떤 방식으로 보여줘야할지 고민했다. (음식 종류, 맛 등등)

</details>

<details>
<summary>2024.03.05</summary>

## 오늘 한 일

- 기능명세서 수정
- 와이어프레임 제작
- 목업 디자인 작업 시작

## 알고리즘

- 백준 1753 최단경로 : Java
- 프로그래머스 Lv. 0 가장 큰 수 찾기 : JavaScript

## 오늘 공부한 것

### 자바스크립트의 반복문 - for, for-in, forEach, for-of

### 1. for

ES1 시절부터 있었던 근본 반복문이다.

```
const arr = ['a', 'b', 'c']
arr.prop = 'prop'

for (let i = 0; i < arr.length; i++) {
  const e = arr[i]
  console.log(i, e)
}
// 0 "a"
// 1 "b"
// 2 "c"
```

- 반복문을 탐색을 시작할 인덱스를 선택할 수 있다.

- 단순히 배열 순회하려는 목적에 비해서 많은 작업이 필요하다. (추가적인 변수 선언, 증감식, 길이 계산 등)

### 2. for-in

for와 같이 ES1부터 있었던 근본 방식이다.

```
const arr = ['a', 'b', 'c']
arr.prop = 'prop'

for (const key in arr) {
  console.log(key, typeof key, arr[key])
}

// 0 "string" a
// 1 "string" b
// 2 "string" c
// 3 "string" prop prop
```

- `for-in` 방식으로 배열을 순회하는 것은 별로 좋지 못하다.

- key 값만 가져올 수 있고, key 값의 타입도 숫자가 아닌 문자열로 반환된다.

- 모든 enumerable한 키들을 죄다 순회한다. (위의 경우 `arr.prop`의 값도 출력한 것을 볼 수 있다.)
  > enumerable : 셀 수 있는

### 3. forEach

`Array.prototype.forEach()`<br>
ES5에서 추가된 새로운 방법이다.

```
const arr = ['a', 'b', 'c']
arr.prop = 'prop'

arr.forEach((e, index) => {
  console.log(e, index)
})

// a 0
// b 1
// c 2
```

- 배열의 요소와 인덱스 모두 접근 가능하다.

- 화살표 함수를 사용할 수 있다.

- `await`를 루프 내부에서 사용할 수 없다.

- 중간에 루프를 탈출하는 것은 어려우나 다른 문법의 경우 `break`로 탈출 가능하다.

### 4. for-of

ES6에 나온 가장 최신 기능이다.

```
const arr = ['a', 'b', 'c']
arr.prop = 'prop'

for (const e of arr) {
  console.log(e)
}

// a
// b
// c
```

- 모든 루프를 원하는 대로 순회할 수 있다.

- `await`를 사용한 for-await-of가 가능하다.

- `break`, `continue`를 사용할 수 있다.

- 키만 접근하거나 키와 값 모두 접근하는 것 모두 가능하다.

```
const arr = ['a', 'b', 'c']

// 키 접근
for (const key of arr.keys()) {
  console.log(key, typeof key)
}

// 키, 값 모두 접근
for (const [key, value] of arr.entries()) {
  console.log(key, value)
}
```

### 결론

`for-of`로 다른 순회문에서 할 수 있는 모든 것을 할 수 있어서 가장 좋다.

### 참고 자료

[for vs for-in vs forEach vs for-of 무엇으로 자바스크립트 리스트를 돌아야 하나](https://yceffort.kr/2021/06/best-solution-for-looping-over-array)

</details>

<details>
<summary> 2024.03.07 </summary>

## 오늘 한 일

- 기획서 기반으로 프로젝트 소개 PPT 작성 후 제출
- 기술 명세 회의 후 기술 명세서 작성
- 기획서 기반 프로젝트 소개 PPT 작성

## 오늘 배운 것

### Figma - Auto layout

자동으로 그래픽, 텍스트, 도형 등 포함하고 있는 에셋의 레이아읏을 일정하게 제어할 수 있는 기능을 제공한다. 성격에 따라 여러 에섯을 조합하여 규칙적인 레이아웃을 설정할 수도 있다.

Auto layout을 이용해서 버튼을 생성해보고, [Figma Project](https://www.figma.com/file/40CjlcvANsgg99zWV9Wup6/Figma-Study?type=design&node-id=1%3A2&mode=design&t=Fb1tFLDvtiewYJQy-1)를 생성하여 그 과정을 작성해보며 학습했다.

- Auto layout을 이용하면 버튼을 만들 때도 Rectangle 에셋 없이 만들 수 있다는 것을 알게 되었다.
- CSS의 `Flex`와 비슷하여 개발에서 더 편하게 작업할 수 있을 것 같다.

</details>
