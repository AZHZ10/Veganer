# Veganer App (Android)
채식을 시작하는 사람들을 위한 정보 제공 및 기록 서비스 앱입니다.  
렌즈, 챗봇, 캘린더 서비스를 제공합니다.

## 개발자
이은우(@clairew99)  
김영서(@kkys00)  
임아현(@philosophy1106)

## STACKS   
<img src="https://img.shields.io/badge/React-Native-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>  
<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=Python&logoColor=white"/> <img src="https://img.shields.io/badge/OpenCV-5C3EE8?style=flat-square&logo=OpenCV&logoColor=white"/> <img src="https://img.shields.io/badge/EasyOCR-7EBC6F?style=flat-square&logo=Python&logoColor=white"/> <img src="https://img.shields.io/badge/SBERT-005571?style=flat-square&logo=Python&logoColor=white"/> <img src="https://img.shields.io/badge/Flask-000000?style=flat-square&logo=Flask&logoColor=white"/> <img src="https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=Amazon AWS&logoColor=white"/> 


## 환경 구축
[윈도우(Windows)에 react native 개발 환경 구축](https://dev-yakuza.posstree.com/ko/react-native/install-on-windows/)

## Installation

```bash
npm install
```

## 실행
1. USB 포트로 기기와 노트북 연결
2. 설정 > 휴대전화 정보 > 소프트웨어 정보 > 빌드번호 7번 클릭 > 개발자 모드 전환
3. 설정 > 개발자 옵션 > USB 디버깅 ON
4. `adb devices` List of devices attached에 나의 디바이스가 device로 뜨는지 확인
5. `adb reverse tcp:8081 tcp:8081`
6. `npm run android` VSCode에서 실행

## Usage
### 1. Lens
<p align="center">
    <img src="https://user-images.githubusercontent.com/88617509/206687550-3c5d8809-7939-4e49-be6d-38edfa567906.gif">
</p>

- 사용자는 하단 탭에서 카메라 버튼을 클릭하여 메뉴 이미지를 직접 찍거나 
앨범에서 가져올 수 있습니다.
- Easy OCR로 메뉴 이름을 읽어 특정 메뉴에 일반적으로 무조건 들어가는 논비건 재료가 있다면 논비건, 만드는 사람에 따라 들어갈 수도, 안 들어갈 수도 있는 논비건 재료가 있을 경우 
논비건 가능성이 있다고 판별
- 논비건 재료가 무조건 들어가는 메뉴에 대해서는 `X` 아이콘을, 논비건일 가능성이 있다면 `경고` 아이콘을 표시
- 각 메뉴에 일반적으로 포함되거나 포함될 수 있는 논비건 재료에 대한 정보를 표로 구성하여 제공  
> 렌즈의 api를 제공하는 flask 서버 코드 https://github.com/AZHZ10/Veganer-lens-backend.git

### 2. Chatbot
<p align="center">
    <img src="https://user-images.githubusercontent.com/88617509/206691262-54848169-4f04-4949-a8e1-5cff968ae25a.gif">
</p>

- 비건의 정의, 채식의 단계 등 채식에 대한 일반적인 지식, FAQ, 약 400개 메뉴에 대한 논비건 여부 및 주의 재료 정보 제공
- Sentence Transformer를 활용해 사용자 질문 문장의 임베딩 값을 계산하고 챗봇이 갖고 있는 질문 임베딩 데이터셋과 cosine 유사도 계산한 뒤 유사도가 최대인 임베딩 값에 대한 답변을 출력합니다.  
> 챗봇의 api를 제공하는 flask 서버 코드 https://github.com/AZHZ10/Veganer-chatbot-backend.git

### 3. Calendar
<p align="center">
    <img src="https://user-images.githubusercontent.com/29935149/206724084-2ae7f271-f136-45d4-852c-ffbb3b35295f.gif">
    <img src="https://user-images.githubusercontent.com/29935149/206724074-514fad79-addb-4893-9a49-046a86f35c0a.gif">
</p>

- 자신의 채식 단계를 설정하면, 설정한 날을 시작일로 하여 나의 채식 기간을 표시
- 사용자는 해당하는 날짜를 눌러 하루 세 번의 식사 중 채식을 실천한 횟수를 기록. 하루 세 번의 식사 중 채식을 실천한 횟수가 많을수록 더 짙은 초록색으로 달력에 표시
