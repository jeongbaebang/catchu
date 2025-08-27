# 프론트엔드 기술 과제
> React Native와 Firebase로 구현한 상품 리뷰 커뮤니티 앱

<div>
  <img align="right" width="40%" src="./assets/images/thumbnail.png">
</div>

### 📱 프로젝트 소개

상품에 대한 리뷰와 평점을 공유할 수 있는 모바일 커뮤니티 앱입니다.
사용자들이 직접 상품을 등록하고, 리뷰를 작성하며, 다른 사용자들과 소통할 수 있는 플랫폼을 제공합니다.

### ✨ 주요 기능

### 🔐 사용자 관리
- [x] 회원가입 및 로그인
- [x] 사용자 프로필 관리
- [x] 로그아웃 기능

### 📝 게시물 관리
- [x] 게시물 목록 조회
- [x] 게시물 상세 보기
- [x] 새 게시물 작성
- [x] 이미지 첨부 기능
- [x] 가격 정보 입력

### ⭐ 리뷰 시스템
- [x] 5점 만점 별점 시스템
- [x] 댓글 작성 및 조회
- [x] 좋아요 기능 (인증 사용자만)

### 📱 사용자 경험
- [x] 스켈레톤 UI
- [x] 직관적인 하단 탭 네비게이션
- [x] 매끄러운 페이지 전환

---

### 데모 영상

[![데모 영상](https://img.youtube.com/vi/tEhZDWNi5qc/sddefault.jpg)](https://youtu.be/tEhZDWNi5qc)

*클릭하시면 전체 기능 시연을 볼 수 있습니다*

## 🛠 기술 스택

### Frontend
- **React Native**: 크로스플랫폼 모바일 앱 개발
- **Expo**: React Native 개발 플랫폼
- **TypeScript**: 타입 안전성을 위한 정적 타입 언어

### Backend & Database
- **Firebase Authentication**: 사용자 인증 및 관리
- **Firebase Firestore**: NoSQL 데이터베이스
- **Firebase Storage**: 이미지 파일 저장

### 개발 도구
- **Expo CLI**: 개발 및 빌드 도구
- **TypeScript**: 코드 품질 향상

## 🚀 설치 및 실행

### 필수 조건
- Node.js 16.0 이상
- npm 또는 yarn
- Expo CLI
- Android Studio 또는 Xcode (실제 기기 테스트용)

### 설치 방법

```bash
# 저장소 복제
git clone https://github.com/jeongbaebang/catchu.git

# 디렉토리 이동
cd catchu

# 의존성 설치
npm install

# Expo 개발 서버 실행
npm start
```

### 환경 변수

```
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```
