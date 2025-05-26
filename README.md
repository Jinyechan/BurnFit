# BurnFit Frontend 과제

## 과제 개요
React Native를 사용한 캘린더 기능 구현

## 구현 내용

### Level 1: React Native 기본 앱 구조
- Bottom Tab Navigator 구현
- 4개 탭 화면 (Home, Calendar, Library, MyPage)
- 각 탭별 아이콘 및 화면 전환

### Level 2: 캘린더 라이브러리 구현
- react-native-calendars 사용
- 날짜 선택 기능
- 운동 완료 표시 및 삭제
- 통계 정보 표시

### Level 3: 제스처 및 애니메이션
- react-native-reanimated, react-native-gesture-handler 사용
- 위/아래 스와이프 제스처로 운동 추가/삭제
- 애니메이션 효과 적용
- 사용자 상호작용 개선

## 설치 및 실행

### 패키지 설치
```bash
npm install
Android 실행
bashnpx react-native run-android
iOS 실행
bashcd ios && pod install && cd ..
npx react-native run-ios
주요 기능

캘린더 날짜 선택: 탭하여 날짜 선택
운동 추가: 위로 스와이프 또는 + 버튼 클릭
운동 삭제: 아래로 스와이프
통계 표시: 총 운동 횟수, 월별 운동 횟수
애니메이션: 부드러운 전환 효과

기술 스택

React Native 0.72.6
TypeScript
React Navigation
react-native-calendars
react-native-reanimated
react-native-gesture-handler


## 설치 명령어 (README에 포함할 내용)
```bash
# 프로젝트 생성
npx react-native init BurnFitApp --template react-native-template-typescript

# 패키지 설치
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
npm install react-native-calendars react-native-reanimated react-native-gesture-handler
npm install react-native-vector-icons react-native-screens react-native-safe-area-context

# iOS 추가 설정 (iOS 개발 시)
cd ios && pod install && cd ..
