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

## 폴더 구조
```bash
BurnFit-Frontend-Test/
├── README.md
├── App.tsx
├── package.json
└── src/
    └── screens/
        ├── HomeScreen.tsx
        ├── CalendarScreen.tsx
        ├── LibraryScreen.tsx
        └── MyPageScreen.tsx
