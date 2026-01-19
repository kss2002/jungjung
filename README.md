# 정정 (JungJung) - 국회 자료 AI 검색 서비스

> LangGraph 기반 RAG (Retrieval-Augmented Generation) 에이전트를 활용한 국회 회의록 검색 웹 애플리케이션

## 📌 프로젝트 소개

**정정(JungJung)**은 대한민국 국회 회의록 및 관련 자료를 AI 기반으로 검색하고 분석할 수 있는 웹 서비스입니다. HyDE(Hypothetical Document Embeddings) 기법과 RAG 파이프라인을 활용하여 질문에 대한 정확한 검색 결과와 AI 생성 답변을 제공합니다.

## ✨ 주요 기능

### 🔍 AI 기반 스마트 검색

- **RAG 검색**: 국회 회의록 관련 질문 → HyDE + 벡터 검색 + 답변 생성
- **LLM 응답**: 일반 질문 → GPT 기반 자연어 응답
- **라우터 자동 분류**: 질문 유형에 따라 최적의 검색 모드 자동 선택

### 📊 통계 대시보드

- 오늘 발의된 법안 수
- 참여 의원 현황
- 정당별 활동 현황 (Bar Chart)
- 자료 유형 분포 (Pie Chart)

### 📑 근거 출처 표시

- 검색 결과의 출처 및 참고 자료 링크
- RAG 청크별 관련도 점수 표시
- 원문 청크 내용 확인 가능

## 🛠 기술 스택

### Frontend

| 기술         | 버전   | 설명                 |
| ------------ | ------ | -------------------- |
| React        | 19.2.0 | UI 라이브러리        |
| TypeScript   | 5.9.3  | 타입 안정성          |
| Vite         | 7.2.4  | 빌드 도구            |
| TailwindCSS  | 4.1.18 | 스타일링             |
| React Router | 7.11.0 | 라우팅               |
| Recharts     | 3.6.0  | 데이터 시각화        |
| Radix UI     | -      | Headless UI 컴포넌트 |
| Lucide React | -      | 아이콘               |

### Backend API

- **LangGraph** 기반 에이전트 (별도 백엔드 서버)
- HyDE (Hypothetical Document Embeddings)
- 벡터 검색 + LLM 답변 생성

## 📁 프로젝트 구조

```
jung2/
├── src/
│   ├── api/              # API 호출 함수
│   │   ├── searchApi.ts  # 검색 API
│   │   ├── sourceApi.ts  # 출처 API
│   │   └── statsApi.ts   # 통계 API
│   ├── components/       # UI 컴포넌트
│   │   ├── Content.tsx   # 검색 + 피드 영역
│   │   ├── Header.tsx    # 헤더
│   │   ├── Source.tsx    # 출처/청크 패널
│   │   ├── Stats.tsx     # 통계 대시보드
│   │   └── ui/           # 공통 UI 컴포넌트 (shadcn/ui)
│   ├── lib/              # 유틸리티
│   ├── pages/            # 페이지 컴포넌트
│   ├── routes/           # 라우팅 설정
│   └── types/            # TypeScript 타입 정의
├── api/                  # API 스펙 문서
│   └── swagger.json      # OpenAPI 스펙
├── data/                 # 목업 데이터
└── public/               # 정적 파일
```

## 🚀 시작하기

### 사전 요구사항

- Node.js 18+
- Yarn 1.22+

### 설치

```bash
# 저장소 클론
git clone [repository-url]
cd jung2

# 의존성 설치
yarn install
```

### 개발 서버 실행

```bash
yarn dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

### 프로덕션 빌드

```bash
yarn build
```

### 빌드 미리보기

```bash
yarn preview
```
