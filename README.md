# <span id='top'> 먹을사람🍴</span>
<img src="https://github.com/FRONTENDSCHOOL5/final-25-would-you/assets/116716381/5809f4a2-962a-47b2-9986-713c6f815d8f" width="1000" />

<br/>

>  이메일 로그인 테스트 계정
>  - ID : `WouldU5@last25.com`
>  - Password : `252525`
>
<br/>
 
## 1. 서비스 소개
### 먹을사람은 내주변에서 같이 밥먹을 사람을 구하는 SNS 커뮤니티 서비스입니다.
- 인접한 사용자간 먹을 친구를 구하는 게시글을 올릴 수 있습니다.<br/>
- 혼자 사기 힘든 음식이나 물건을 공동구매할 수 있습니다. <br/>
- 반려동물 커뮤니티 서비스를 이용할 수 있습니다. <br/>

### 주요 기능 
1. 회원 가입 및 로그인 기능
2. 피드 업로드 기능
3. 상품 등록 및 판매 기능
4. 사용자간 팔로우 기능 
5. 프로필 수정
<br/>

<p align="right"><a href="#top">(Top)</a></p>

<br/>

## 2. 팀원 소개
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/jjo-mi?tab=repositories"><img src=""width="200px;" alt=""/><br /><sub><b>FE 팀장 : 정종미 </b></sub></a><br /></td>
      <td align="center"><a href=""><img src="" width="200px;" alt=""/><br /><sub><b>FE 팀원 : 김지우 </b></sub></a><br /></td>
      <td align="center"><a href=""><img src="" width="200px;" alt=""/><br /><sub><b>FE 팀원 : 신기찬 </b></sub></a><br /></td>
      <td align="center"><a href=""><img src="" width="200px;" alt=""/><br /><sub><b>FE 팀원 : 정선빈 </b></sub></a><br /></td>
  </tbody>
</table>


<br/>

<p align="right"><a href="#top">(Top)</a></p>

<br/>

## 3. 개발 환경 및 기술 스택
### 3-1. 개발 일정
#### 🔥 2023-06-01 ~ 2023-06-27

<img src="https://github.com/FRONTENDSCHOOL5/final-25-would-you/assets/116716381/f921c5bb-a6a6-4df1-a6a5-db38b6e9d8e2f" width="1000" />

  - 요구사항 파악 및 프로젝트 규칙 설립 : 2023-06-01 ~ 2023-06-02
  - 화면정의서 및 환경설정: 2023-06-05 ~ 2023-06-07 
  - 공통UI 컴포넌트 개발 : 2023-06-08 ~ 2023-06-11
  - 페이지 퍼블리싱 : 2023-06-12 ~ 2023-06-15
  - 기능 개발 : 2023-06-15 ~ 2023-06-25
  - 버그 수정 및 유지보수 : 2023-06-22 ~ 2023-06-27

### 3-2. 기술 스택

 #### ✔️Frond-end
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/reactrouter-CC2936?style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/reacthookform-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white">
 
  <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">
 
  <img src="https://img.shields.io/badge/Css-1572B6?style=for-the-badge&logo=Css&logoColor=white"> <img src="https://img.shields.io/badge/cssmodules-000000?style=for-the-badge&logo=cssmodules&logoColor=white">

 #### ✔️Back-end
 - 제공된 API 사용

 #### ✔️Etc
  <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">

### 3-4. 협업 툴
- 버전 관리 : Git, <a href='https://github.com/FRONTENDSCHOOL5/final-25-would-you'>GitHub</a>
- 진행 상황 관리(칸반 보드) : <a href='https://github.com/orgs/FRONTENDSCHOOL5/projects/8/views/1'>GitHub Projects</a>
- 이슈 관리 : <a href='https://github.com/FRONTENDSCHOOL5/final-25-would-you/issues'>GitHub issues</a>
- 문서 관리 : <a href='https://www.notion.so/25-EO-89bab0269b814b02add83a382537f910'>Notion</a>
- 메신저 : Discord

### 3-5. 테스트 툴
- API 테스트 : Postman

<br/>

<p align="right"><a href="#top">(Top)</a></p>

## 4. 프로젝트 구조
* `src/api/` : 유지보수와 재사용성을 위한 분
* `src/assets/` : 서비스에서 사용하는 에셋 파일 (폰트, 아이콘, 이미지)
* `src/components/` : 서비스에서 사용하는 컴포넌트 (캐러셀, 공통 컴포넌트, 공통 레이아웃)
* `src/context/` : 전역 데이터를 공유하기 위해 정의한 Context 파일
* `src/hooks/` : 재사용을 위해 분리한 Custom Hook
* `src/pages/` : 공통 컴포넌트를 사용해 만든 페이지
* `src/routes/` : 페이지 라우팅을 위한 파일
* `src/styles/` : 전역 스타일 파일
* `src/utils/` : 재사용을 위해 분리한 유틸 파일

```
📦 FINAL-25-WOULD-YOU
├─ 📦 publi
│  └─ 📜 index.html
└─ 📦 src
   ├─ 📂 api
   ├─ 📂 assets
   │  ├─ 📂 fonts
   │  └─ 📂 images
   ├─ 📂 components
   │  ├─ 📂 common
   │  │   ├─ 📂 Chat
   │  │   ├─ 📂 Comment
   │  │   ├─ 📂 Header
   │  │   ├─ 📂 HeaderTest
   │  │   ├─ 📂 Input
   │  │   ├─ 📂 Modal
   │  │   ├─ 📂 Post
   │  │   ├─ 📂 Product
   │  │   ├─ 📂 Profile
   │  │   ├─ 📂 TabMenu
   │  │   └─ 📂 User
   │  └─ 📂 layout 
   ├─ 📂 context
   ├─ 📂 hooks
   ├─ 📂 pages
   │  ├─ 📂 Chat
   │  │  ├─ 📂 ChatList
   │  │  └─ 📂 ChatRoom
   │  ├─ 📂 Feed
   │  ├─ 📂 Join
   │  │  ├─ 📂 JoinEmail
   │  │  └─ 📂 JoinProfileSetting
   │  ├─ 📂 Login
   │  │  ├─ 📂 LoginEmail
   │  │  └─ 📂 LoginMain
   │  ├─ 📂 NotFound
   │  ├─ 📂 Post
   │  ├─ 📂 Product
   │  ├─ 📂 Profile
   │  │  └─ 📂 MyProfile
   │  ├─ 📂 ProfileModification
   │  ├─ 📂 SearchUser
   │  ├─ 📂 Splash
   │  └─ 📂 Upload
   ├─ 📂 routes
   ├─ 📂 styles
   ├─ 📂 utils
   ├─ 📜 App.jsx
   └─ 📜 index.jsx
```

<br/>

<p align="right"><a href="#top">(Top)</a></p>

<br/>


## 5. 개발전략
### 5-1. Git Branch 전략
<img src="https://github.com/FRONTENDSCHOOL5/final-25-would-you/assets/116716381/99844518-cbde-48e2-aab1-8408daa10a4d" width="700" align="center" />

* 프로젝트 규모가 크지 않으므로 main Branch를 보호하기 위해 3개의 Branch 사용
    - main : 배포만을 위한 브랜치(언제나 실행가능한 상태 유지)
    - develop : main으로 가기전 각기능과 유기적으로 돌아가는는 개발만을 위한 브랜치
    - feature : 기능을 개발하는 브랜치
        - 브랜치명 규칙 : `feat/#이슈번호` or `feat/login/#이슈번호`
        - 예) `feat/#1` or `feat/login/#1`


### 5-2. 개발프로세스
 #### > 작업전 이슈관리 <a href='https://github.com/FRONTENDSCHOOL5/final-25-would-you/issues'>GitHub issues</a> 등록
 #### > 작업 중 이슈별 기능브랜치 생성 후 작업하여 Develop 브랜치에 머지 후 개별 테스트
     **커밋 컨벤션**
       - 커밋 메시지는 `[타입] 주제 #이슈번호`와 같이 작성한다. `[타입]` 뒤에 띄어쓰기 한 후에, 작성할 것!
           - 예) `[add] ListView에 빠진 문구 추가 #2`
       - 커밋 메시지는 제삼자가 봤을 때 무엇을 했는지 파악할 수 있게 자세히 작성한다.
       - 커밋 메시지는 어떻게 보단 **무엇과 왜**를 설명한다.
       - 타입의 종류
           - `🐛 fix`: 올바르지 않은 동작을 고친 경우 ⇒ 버그 수정
           - `✨ feat`: 새로운 기능을 추가한 경우 ⇒ 새 기능
           - `♻️ refactor`: 내부 로직은 변경하지 않고 코드를 개선한 경우 ⇒ 코드 리팩토링
           - `🎨 style`: 코드 개선과 상관없이 사소하게 코드를 수정한 경우 ⇒ 코드 구조 및 형태 개선
           - `📝 (마크업) or 💄(css) design`: 사용자 UI를 추가, 수정한 경우 (마크업, 퍼블리싱 작업)
           - `add`: 폴더, 파일 등을 추가한 경우
           - `🚚 move`: 폴더, 파일, 코드 등의 위치를 이동한 경우 ⇒ 리소스 이동, 이름 변경
           - `rename`: 폴더명, 파일명 등을 수정한 경우
           - `🔥 remove`: 폴더, 파일, 코드 등을 삭제한 경우 ⇒ 코드 및 파일 삭제
           - `assets`: 에셋을 추가, 수정한 경우
           - `📝 docs`: 문서를 추가, 수정한 경우 ⇒ 문서 추가 및 수정
           - `chore`: 위의 모든 경우에 포함되지 않는 기타 수정사항
 - **전체** Develop 브랜치가 실행가능한 상태가 되면 maim 브랜치에 머지(마크업/기능)  


### 5-3. 
<br/>

<p align="right"><a href="#top">(Top)</a></p>

<br/>


## 6. <span id = "code"> 핵심 코드 </span>

### 6-1. useContext

- token, accountname이 여러 컴포넌트 내에서 api통신을 할 때 필요로 하는 것을 발견.
- 전역에서 필요한 token, accountname을 useContext를 이용하여 관리.
- useContext를 사용함으로써 prop drilling을 방지.
- token, accountname을 얻기 위한 불필요한 데이터 요청 방지.

### 6-2. CustomHook

- 모달 구현 시 모달이 필요한 여러 컴포넌트 내에서 동일한 로직이 반복적으로 사용되는 것을 발견.
- 이를, useModal 이라는 커스텀 훅으로 만듦으로써 코드의 중복 최소화 및 상태 관리 로직의 재사용성을 높임.

### 6-3. Button 컴포넌트

- 재사용성이 높은 버튼을 공통 컴포넌트로 만들어 여러 페이지 내에서 사용할 수 있게 구현함.
- 기본 버튼 컴포넌트 구현 후 버튼의 스타일 컴포넌트에서 사이즈,disabled,색상 등을 prop 인자로 받아와서 여러 페이지에서 사용할 수 있게 구현함.
- 특히, 버튼의 사이즈를 SIZES 라는 객체(s,ms,m)로 변수를 지정하여 확장성있는 코드로 구현함.

## 7. 페이지 캡쳐
### 7.1. 홈 🏠 
|시작 화면|회원가입 페이지|로그인 페이지|
|---|---|---|
|![splash](https://user-images.githubusercontent.com/112460383/210291447-6c88dc14-ba44-4870-af05-7d40c589fe5a.gif)|![회원가입](https://user-images.githubusercontent.com/112460383/210291056-665177a0-08af-4765-9d7c-a79946dd5f91.gif)|![로그인](https://user-images.githubusercontent.com/112460383/210291068-b8cbf123-455c-4dd2-b8aa-c6150bc0b762.gif)|
### 7.2. 채팅 💬
### 7.3. 게시글 🗒️
### 7.4. 프로필 🧑‍💻
### 7.5. 공구중인 상품 🛒

<br/>

<p align="right"><a href="#top">(Top)</a></p>

<br/>

## 8. 느낀점
### 🐰정종미
----------------------
