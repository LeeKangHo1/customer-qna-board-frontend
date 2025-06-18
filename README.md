# Vue 3 + Vite

## 📌 프로젝트 개요
### 📆 개발 기간

- **2025.06.15 ~ 2025.06.16 (2일)**
### 👤 개발 인원

- **1인 개인 프로젝트**

| 항목         | 내용                                                       |
| ---------- | -------------------------------------------------------- |
| **프로젝트 명** | 고객지원 질문·답변 게시판 (QnA Board)                               |
| **개요**     | 사용자가 질문을 등록하고, 관리자가 답변을 작성할 수 있는 QnA 게시판 웹 애플리케이션        |
| **개발 목적**  | Flask, Vue.js, MySQL을 활용한 실전 웹 프로젝트 구현 능력 향상 및 풀스택 구조 이해 |
| **주요 기술**  | Flask, Vue.js, MySQL, PyMySQL, REST API, JWT 인증          |
| **대상 사용자** | 일반 사용자, 게시판 관리자                                          |

---

## 🧪 기술 요구사항

- **프론트엔드**
    - Vue 3 (Vite + Composition API)
    - SCSS (Nesting), Bootstrap 기반 UI
    - 상태관리: Pinia
    - HTTP 통신: Axios
    - 라우터: vue-router
- **기타**
    - 질문 목록 페이징 처리

---

## 화면 페이지별 상세 설계

### 1)🧍 회원가입 페이지 (`/register`)

**기능:** 로그인 ID, 비밀번호, 이름, 이메일 입력 → 가입

**필수 UI 요소:**

- `Input`: 로그인 ID
- `Input`: 비밀번호 (조건 안내, 비밀번호 확인 입력 포함)
- `Input`: 이름
- `Input`: 이메일
- `Button`: 회원가입
- `Alert`: 중복 여부 및 유효성 메시지
- ✅ 유효성 검사: 형식 체크 및 중복 체크 API 호출

---

### 2) 🔐 로그인 페이지 (`/login`)

**기능:** 로그인 ID / 비밀번호 입력 → JWT 토큰 발급

**필수 UI 요소:**

- `Input`: 로그인 ID
- `Input`: 비밀번호
- `Button`: 로그인
- `Link`: 회원가입 페이지 이동
- `Alert`: 로그인 실패 메시지

---

### 3) 🏠 QnA 목록 페이지 (`/inquiries`)

**기능:** 전체 문의글 조회 + 검색/정렬/페이징

**권한:** 관리자 → 전체 / 일반 사용자 → 본인 문의글만

**UI 요소:**

- `SearchBar`: 키워드 검색 (제목/내용)
- `Dropdown`: 정렬 옵션 (최신순, 답변여부)
- `List`: 문의글 목록 (제목, 작성일, 상태, 비밀글 여부 아이콘)
- `Pagination`: 페이지 이동
- `Button`: 문의글 작성 (로그인 시만 노출)

---

### 4) 📝 문의글 작성 페이지 (`/inquiries/write`)

**기능:** 제목 / 내용 / 비밀글 여부 작성

**UI 요소:**

- `Input`: 제목
- `Textarea`: 내용
- `Checkbox`: 비밀글 설정
- `Button`: 등록 / 취소

---

### 5) 📄 문의글 상세 페이지 (`/inquiries/:id`)

**기능:** 문의글 + 답변 조회, 수정/삭제 가능

**UI 요소:**

- `Card`: 문의글 정보 (작성자 이름 마스킹, 내용, 상태, 등록일)
- `Card`: 답변 정보 (있을 경우만)
- `Button`: 문의글 수정 / 삭제 (작성자 또는 관리자만)
- `Button`: 답변 등록 / 수정 / 삭제 (관리자만)

---

### 6) 💬 답변 작성/수정 폼 (컴포넌트)

**기능:** 텍스트 입력 후 등록/수정

**UI 요소:**

- `Textarea`: 답변 내용
- `Button`: 등록 / 수정

---

### 7) 👤 마이페이지 (`/mypage`)

**기능:** 로그인 사용자의 내 문의글 목록

**UI 요소:**

- `List`: 본인이 작성한 문의글 목록 (제목, 날짜, 상태)
- `Pagination`: 페이지 이동
- `Button`: 상세 보기 이동

---

## 🧱 공통 컴포넌트 설계

| 컴포넌트명 | 설명 |
| --- | --- |
| `Navbar.vue` | 로그인/회원가입, 로그아웃, 마이페이지 링크 표시 |
| `InquiryList.vue` | 문의글 목록 리스트 전용 컴포넌트 |
| `AnswerBox.vue` | 답변 표시 컴포넌트 |
| `AuthGuard.vue` | 인증된 사용자만 접근 가능한 라우팅 처리 |
| `Alert.vue` | 에러/성공 메시지 표시용 컴포넌트 |
| `Pagination.vue` | 페이징 컴포넌트 |
| `SearchBar.vue` | 검색 키워드 입력 UI 컴포넌트 |
| `SortDropdown.vue` | 정렬 드롭다운 UI 컴포넌트 |

---

## 🧭 화면 흐름 예시 (비밀글 포함)

- 목록에서 `🔒 비밀글` 클릭
    
    → 작성자 또는 관리자면 상세 열람 가능
    
    → 아니라면 `권한 없음` 메시지 표시
    

---

## 피드백

### 1. 출력될 화면 그려달라고 gpt에 요청할 때

- html로 만들어 달라고 하고 그걸 vue로 전환해야 복잡한 화면도 정확하게 만들어 준다.

### 2. 폴더 구조

```bash
frontend/
├── public/
│   └── index.html                    # 앱 진입 HTML
│
├── src/
│   ├── api/
│   │   └── axios.js                  # Axios 인스턴스 설정
│
│   ├── assets/                       # 정적 리소스 (이미지 등)
│
│   ├── components/
│   │   ├── common/
│   │   │   └── Pagination.vue        # 페이징 컴포넌트
│   │   ├── inquiry/
│   │   │   ├── InquiryDetailPage.vue # 문의 상세 페이지 (기존 DetailPage가 이 위치로 이동)
│   │   │   ├── InquiryEditPage.vue   # 문의 수정 페이지
│   │   │   ├── InquiryList.vue       # 목록 컴포넌트
│   │   │   ├── InquiryWritePage.vue  # 작성 폼
│   │   │   └── SearchBar.vue         # 검색 바
│   │   └── layout/
│   │       └── NavBar.vue            # 상단 네비게이션
│
│   ├── pages/
│   │   ├── EditProfilePage.vue       # 회원정보 수정 페이지
│   │   ├── HomePage.vue              # 홈(목록) 페이지
│   │   ├── LoginPage.vue             # 로그인 페이지
│   │   ├── MyPage.vue                # 마이페이지
│   │   └── RegisterPage.vue          # 회원가입 페이지
│
│   ├── router/
│   │   └── router.js                 # vue-router 설정
│
│   ├── services/
│   │   └── inquiryService.js         # 문의 관련 API 호출 함수
│
│   ├── stores/
│   │   ├── inquiry.js                # 문의 상태관리 (Pinia)
│   │   ├── store.js                  # Pinia 등록용 루트 파일 (또는 메인 store)
│   │   └── user.js                   # 사용자 상태관리 (Pinia)
│
│   ├── App.vue                       # 루트 컴포넌트
│   └── main.js                       # 앱 진입점
│
├── .env                              # 환경 변수 설정
├── .gitignore
├── index.html                        # Vite 템플릿 HTML
├── style.css                         # 전역 스타일
```

- pages 폴더에서 user, inquiry폴더 만들어서 관련된 페이지를 분류해서 넣어야 한다.
    - 페이지는 page에 넣고 페이지에 쓰이는 컴포넌트를 컴포넌트에 넣어야 한다.
    - 급한 개발로 컴포넌트 분리를 하지 않아서 난잡한 상태
- 계속 돌려 쓰는 페이지는 컴포넌트→ common에 넣으면 된다.

## 상태 관리 관련 피드백

- stores 안에는 sate(상태, raw 데이터)만 넣어둔다. actions는 따로 → SRP 원칙
- gpt 추천

```bash
src/
├── stores/
│   ├── user.js              # state, getters 등만 포함 (Pinia store 정의)
│   └── inquiry.js
│
├── services/
│   ├── user/
│   │   └── userActions.js   # user 관련 action 함수들
│   └── inquiry/
│       └── inquiryActions.js # inquiry 관련 action 함수들
```

- 총 3단계 거쳐서 프론트에 데이터 전달
    - pina store ↔ api 자료 받아오는 함수 모음 ↔ vue