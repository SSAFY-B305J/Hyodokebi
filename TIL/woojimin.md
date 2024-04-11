<details>
<summary> 2024.02.26 </summary>

### 오늘 한 일
1. 지라 32시간 채우기
2. 팀 미팅
	- 기획 아이디어 보강
    - 기획 발표 정리   
    - [아이디어 회의 3차](https://www.notion.so/3-43b80c54367345fda966ad651c5a3965?pvs=21) 
---
</details> 
<details>
<summary> 2024.02.27 </summary>

### 오늘 한 일
1. 기획 아이디어 구체화
2. [기능 명세서](https://www.notion.so/a947fc0a7c01422bbc693dff308fa1c5) 작성 회의
3. 전문가 리뷰 대비 질문지 작성
---
## 특강 - 자동화 되는 IT 개발
2024.02.28 김신일 컨설턴트
### 데이터센터
- 국내 전기량 중 1% 사용
- KT, LGU, SK브로드밴드, LG CNS, SK C&C, NAVER보유
- SK에코플랜트, GS건설, DL ENC, DL건설, 현대건설 추진중
- [[보고서]](https://scienceon.kisti.re.kr/mobile/srch/selectPORSrchReport.do?cn=TRKO201800039182)데이터센터산업 생태계 활성화를 위한 실태조사 연구 ⇒ 서버 자동화 진행중(EC2, AWS)

* 예전에는 데이터센터를 대기업에서 알아서 데이터센터를 가지고 있었음
* 요즘은 서버가 자동화 되어가는 추세 ex) AWS
### BaaS: Backend as a Service

- 백엔드 자동화
	- 자동차 관련 : EaaS Energy as a Service, BaaS Battery as a Service
    - [전기차와 EaaS](https://www2.deloitte.com/content/dam/Deloitte/kr/Documents/insights/deloitte-korea-review/18/kr_insights_deloitte-korea-review-18_08.pdf)
- MS, Google(Firebase), Amazon(AWS)이외에도 Back4App, Parse, Azure, backendless, ProgressKinvey 등 모르는 사이에 많은 기능들이 자동화 진행중이다.


- [Firebase](https://firebase.google.com/?hl=ko)
	- SSAFY내에서 하는 대부분은 빌드 (인증 등)
	- Remote Config
		- 일반적 회사에서 코드 → 테스트 → 제출 → 승인인데 오래걸림!
        - 데이터를 클라우드 방식으로 저장해 두었다가 필요할 때 쓸 수 있는 기능
    - Realtime Database(Cloud Firestore)
	    - key-value (JSON) 데이터 저장하고 동기화하여 서버리스 앱 빌드
    - Cloud Messaging
	    - 서버-기기 푸시 메시지 지원
    - Hosting
	    - 글로벌 CDN에서 지원, url주소 배포
    - Cloud Storage
    - Cloud Functions
	    - 서버에서 앱 로직 작성하고 실행
    - Statistics

---
</details> 
<details>
<summary> 2024.02.28 </summary>

### 오늘 한 일
1. 전문가 리뷰 질문 확정
2. 기능 정의 회의
---
	
</details> 
</details> 
<details>
<summary> 2024.02.29 </summary>

### 오늘 한 일
1. 기능 명세서 작성
---
### React 공부
* tap, menu에서의 button
![image.png](/uploads/8174ce041cbfb000f3b2bd4055ea51c3/image.png){: width="500" height="300"}
---
### 특강) 생성형 AI를 활용한 코드 리뷰 & 안드로이드 아키텍트 분석
- Generative A.I란?
    - 인공지능의 한 종류로, 새로운 데이터를 생성하고 인식하는 능력을 갖춘 시스템
    - OpenAI, Google, Meta 등에서 제작함.
    - 한국은 Naver CLOVA X, Samsung Gauss 등이 있음.
    - 검색 시스템과 비교
        - 검색은 직접적으로 탐색
        - 생성형 AI는 컨텐츠 사이에 있는 무언가를 추론하고 생성하는 것
- Generative A.I 핵심기술: 딥러닝
    - 딥러닝(Deep Learning)및 신경망(Neural Network): 인공 신경망을 활용하여 데이터에서 복잡한 패턴 학습
    - 생성 모델(Generative Models): 데이터셋을 분석하여 신규 데이터를 생성하는 인공지능 모델
        - Generative Adersarial Networks(GANs)
- 자연어 처리(Natural Language Processing)
    - 컴퓨터가 인간의 언어를 이해하고 처리하는 기술
        - GPT, 바트 등
    - 언어 모델(Language Model): 주어진 문장이나 단어 시퀀스의 확률을 예측하는 모델
    - 파운데이션 모델(Foundation Model): 일반적인 언어 이해능력을 가진 모델
    - 대규모 언어 모델(Large Language Model): 대량의 텍스트 데이터를 기반으로 학습되어 자연어 이해와 생성에 사용되는 모델
- 개발자의 생산성 향상을 도와주는 Generative A.I.
    - Generative A.I가 해결해야 하는 문제
        - 품질과 신뢰성 확보
        - 보안 및 개인정보 보호 문제
        - 라이선스 가격
        - 윤리적인 사용과 책임
- CodeReview와 Generative A.I.
    - Code Review란?
        - 개발자가 작성한 코드를 다른 개발자들이 검토하고 피드백하는 과정
        - 배움을 주고 받으며 좋은 SW개발자가 될 수 있는 실천법
        - 기대효과
        - 코드 품질 개선
        - 코드 작업 능력 향상
        - 협업 능력 향상
    - SSAFY에서의 Code Review
        - 팀원들 간의 코드리뷰를 통한 개발/소통 능력 향상
        - 현업에서의 코드리뷰 문화를 사전 경험
    - Generative A.I를 활용한 CodeReview
        - 장점
            - 자동화된 분석
            - 다양한 피드백
            - 객관성
        - 한계 및 주의사항
            - 신뢰성 및 정확도에 대한 고려
            - 보안 및 개인정보 보호에 대한 주의
            - 생성형 AI 남용
            - 프로젝트 팀원간의 협업에 대한 어려움
        - 효율적인 활용 방법: 보조 수단으로서의 활용
            - 팀별 코딩 컨벤션 고려
            - 개인 역량 및 지속적인 하긋ㅂ
            - 피드백을 주고 받는 문화 구축
        - 종류
            - CodeRabit
            - Adrenaline
            - codra
            - Metabob

</details> 
