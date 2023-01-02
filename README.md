# DashBoard_WebServer

## 2022 YBIGTA 겨울 Conference

- 팀명: 이 동네 어때?
- 주제: 부동산 Review 3줄 요약 dashboard
- 상세
  - 부동산 Review에서 확인할 수 있는 서울시 동별 여론 요약
  - 구/동을 선택하여 해당 지역의 여론 요약 report를 제공
  - Summary: 동별 Review들에 대한 세 줄 요약
  - Charts: 5개 category에 대해 정량화한 지표 제공
- 사용
  - front server 구동: React Server 위치에서 명령어 `npm run dev`
  - server 구동: Node Server 위치에서 명령어 `npm run server`
  - browser: http://127.0.0.1:5173/ 접속
- Stack
  - Node.js: web backend 환경 구축
  - React.js: web front 환경 구축
  - Chart.js: web 상에서 분석 결과물 시각화
    - `npm install react-chartjs-2`
