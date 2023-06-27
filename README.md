# <span id='top'> 먹을사람🍴</span>
<img src="http.png" width="1000" />

> 📎 <a href='https://daengnyang.netlify.app'>배포 URL</a> <br/>
> 
> <br/>
> 
> 이메일 로그인 테스트 계정
>  - ID : `daengnyang@last25.com`
>  - Password : `last2023`

<br/><br/>
 
## 1. 서비스 소개
**먹을사람은 내주변에서 같이 밥먹을 사람을 구하는 SNS/커뮤니티 서비스입니다.**
- 인접한 사용자간 먹을 친구를 구하는 게시글을 올릴 수 있습니다.<br/>
- 혼자 사기 힘든 음식이나 물건을 공동구매할 수 있습니다. <br/>
- 반려동물 커뮤니티 서비스를 이용할 수 있습니다. <br/>

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
#### 🔥 2023-06-01 ~ 2023-05-27
<img width="1874" alt="표" src="https://user-images.githubusercontent.com/105365737/210504168-43b9f888-eb95-46a1-9fe4-0580a7c5cf0e.png">

  - 요구사항 파악 및 프로젝트 규칙 설립 : 2022-11-29 ~ 2022-12-09
  - 공통UI 컴포넌트 개발 : 2022-12-09 ~ 2022-12-13
  - 페이지 퍼블리싱 : 2022-12-13 ~ 2022-12-17
  - 기능 개발 : 2022-12-16 ~ 2022-12-27
  - 버그 수정 및 유지보수 : 2022-12-26 ~ 2023-01-05

### 3-1. 개발 환경
- IDE : Visual Studio Code 1.74.2
- OS : macOS Monterey, Windows 10

### 3-2. 기술 스택

- FE : React v18, react-hook-form v7
- BE : 제공된 API 사용

### ✔️Frond-end
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"><img src="https://img.shields.io/badge/Css-1572B6?style=for-the-badge&logo=Css&logoColor=white">
### ✔️Back-end
- 제공된 API 사용

### 3-3. 협업 툴
- 버전 관리 : Git, <a href='https://github.com/FRONTENDSCHOOL5/final-25-would-you'>GitHub</a>
- 진행 상황 관리(칸반 보드) : <a href='https://github.com/orgs/FRONTENDSCHOOL5/projects/8/views/1'>GitHub Projects</a>
- 이슈 관리 : <a href='https://www.notion.so/9d86b0e071f04bd1b8d7c0cfd0a9de64'>Notion</a>
- 문서 관리 : <a href='https://www.notion.so/25-EO-89bab0269b814b02add83a382537f910'>Notion</a>
- 메신저 : Discord

### 3-4. 테스트 툴
- API 테스트 : Postman

<br/>

<p align="right"><a href="#top">(Top)</a></p>

## 4. 프로젝트 구조
* `src/api/` : api파일
* `src/assets/` : 서비스에서 사용하는 에셋 파일 (폰트, 아이콘, 이미지)
* `src/components/` : 서비스에서 사용하는 컴포넌트 (캐러셀, 공통 컴포넌트, 공통 레이아웃)
* `src/context/` : 전역 데이터를 공유하기 위해 정의한 Context 파일
* `src/hooks/` : 재사용을 위해 분리한 Custom Hook
* `src/pages/` : 공통 컴포넌트를 사용해 만든 페이지
* `src/routes/` : 페이지 라우팅을 위한 파일
* `src/styles/` : 전역 스타일 파일
* `src/utils/` : 재사용을 위해 분리한 유틸 파일

```
**체크해야ㅏ함**
📦 FINAL-25-WOULD-YOU
├─ 📦 publi
│  └─ 📜 index.html
└─ 📦 src
   ├─ 📂 assets
   │  ├─ 📂 fonts
   │  └─ 📂 images
   ├─ 📂 components
   │  ├─ 📂 common
   │  └─ 📂 layout
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

## 5. Git Branch 전략
![image](https://github.com/FRONTENDSCHOOL5/final-25-would-you/assets/116716381/99844518-cbde-48e2-aab1-8408daa10a4d)

* 프로젝트 규모가 크지 않으므로 main Branch를 보호하기 위해 3개의 Branch 사용
    - main : 배포만을 위한 브랜치(언제나 실행가능한 상태 유지)
    - develop : main으로 가기전 각기능과 유기적으로 돌아가는는 개발만을 위한 브랜치
    - feature : 기능을 개발하는 브랜치
        - 브랜치명 규칙 : `feat/#이슈번호` or `feat/login/#이슈번호`
        - 예) `feat/#1` or `feat/login/#1`

<br/>

<p align="right"><a href="#top">(Top)</a></p>

<br/>


## 6. <span id = "code"> 핵심 코드 </span>

### 1) 정종미
- 리액트 훅폼을 이용해서 토

useContext

- token, accountname이 여러 컴포넌트 내에서 api통신을 할 때 필요로 하는 것을 발견.
- 전역에서 필요한 token, accountname을 useContext를 이용하여 관리.
- useContext를 사용함으로써 prop drilling을 방지.
- token, accountname을 얻기 위한 불필요한 데이터 요청 방지.

### 2) CustomHook

- 모달 구현 시 모달이 필요한 여러 컴포넌트 내에서 동일한 로직이 반복적으로 사용되는 것을 발견.
- 이를, useModal 이라는 커스텀 훅으로 만듦으로써 코드의 중복 최소화 및 상태 관리 로직의 재사용성을 높임.

### 3) Button 컴포넌트

- 재사용성이 높은 버튼을 공통 컴포넌트로 만들어 여러 페이지 내에서 사용할 수 있게 구현함.
- 기본 버튼 컴포넌트 구현 후 버튼의 스타일 컴포넌트에서 사이즈,disabled,색상 등을 prop 인자로 받아와서 여러 페이지에서 사용할 수 있게 구현함.
- 특히, 버튼의 사이즈를 SIZES 라는 객체(s,ms,m)로 변수를 지정하여 확장성있는 코드로 구현함.

## 7. 페이지 캡쳐
### 1) 홈
### 2) 채팅
### 3) 게시글
### 4) 프로필
### 5) 판매 상품

<br/>

<p align="right"><a href="#top">(Top)</a></p>

<br/>

## 08. 느낀
## 🐰 김민승
