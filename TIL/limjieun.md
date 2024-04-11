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

- 전문가 리뷰 후 기획 보강 회의 진행
- 프론트 팀원과 함께 목업 제작 (마이페이지 - 내 프로필, 내 프로필 수정, VIP 관련 페이지)

## 오늘 배운 것

### Figma - Auto layout

자동으로 그래픽, 텍스트, 도형 등 포함하고 있는 에셋의 레이아읏을 일정하게 제어할 수 있는 기능을 제공한다. 성격에 따라 여러 에섯을 조합하여 규칙적인 레이아웃을 설정할 수도 있다.

Auto layout을 이용해서 버튼을 생성해보고, [Figma Project](https://www.figma.com/file/40CjlcvANsgg99zWV9Wup6/Figma-Study?type=design&node-id=1%3A2&mode=design&t=Fb1tFLDvtiewYJQy-1)를 생성하여 그 과정을 작성해보며 학습했다.

- Auto layout을 이용하면 버튼을 만들 때도 Rectangle 에셋 없이 만들 수 있다는 것을 알게 되었다.
- CSS의 `Flex`와 비슷하여 개발에서 더 편하게 작업할 수 있을 것 같다.

### Figma

- CSS의 기본 폰트 사이즈는 16px이라는 것을 알게 되었다.
- 지금까지 진행한 피그마 목업 과정에서는 그런 것들을 고려하지 않고 페이지를 제작하여 기본적으로 텍스트 크기가 32px을 넘어갔다.
- Figma의 Prototype을 이용해서 화면을 확인했을 때도 실제 서비스되고 있는 웹 페이지 디자인과 달리 텍스트들이 여백 없이 화면에 꽉 찬 것을 볼 수 있었다.
- 이런 부분을 팀원들과 공유하고 앞으로의 작업에서는 폰트 값을 16px로 생각하고 제작해달라고 전달했다.

</details>

<details>
<summary>2024.03.11</summary>

## 오늘 한 것

- 개발 브랜치 생성
- 리액트 프로젝트 생성
- 깃랩과 지라를 연동하고 과정 문서화 진행

## 오늘 공부한 것

### 깃랩-지라 연동

깃랩과 지라를 연동하는 방법에 대해 배우고 노션에 정리했습니다.

- [GitLab & Jira 연동 팀원 공유용](https://www.notion.so/GitLab-Jira-1bfd29a8d31c4be1863f26491f47380d)
- [GitLab & Jira 연동 과정](https://www.notion.so/FE-a2440877fefe4147b52a9891ec96eb49?p=c9485bc375a2454dae90a6ad621773d3)

### 타입스크립트

타입스크립트의 기본 타입에 대해 공부했습니다.

#### Boolean

#### Number

#### String

#### Object

#### Array

```
  let arr: number[] = [1, 2, 3];
```

제네릭도 사용할 수 있다.

```
  let arr: Array<number> = [1,2,3];
```

#### Tuple

튜플은 배열의 길이가 고정되고 각 요소의 타입이 지정되어 있는 배열 형식

```
let arr: [string, number] = ['hi', 10];
```

#### Enum

특정 값(상수)들의 집합

````
enum Avengers { Capt, IronMan, Thor }
let hero: Avengers = Avengers.Capt;```
````

#### any

모든 타입에 대해서 허용

#### void

#### null

#### undefined

#### never

함수이 끝에 절대 도달하지 않는다는 의미를 지닌 타입

```
function neverEnd(): never {
  while (true) {

  }
}
```

</details>
