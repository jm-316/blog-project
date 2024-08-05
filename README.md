# My Blog

**배포 링크**: [https://jwitter-mauve.vercel.app](https://myblog316.netlify.app/)

## 프로젝트 소개
My Blog는 마이 블로그는 리액트와 Firebase를 사용해서 만든 블로그 프로젝트입니다.

## 사용 기술
- **Frontend**: React, TypeScript, React-Query, React-Router-DOM, CSS
- **Backend**: Firebase
- **Build**: Vite
- **Deploy**: Netlify

## 기능 소개
- **게시글 작성**: 제목과 내용을 입력할 수 있으며, 4개의 카테고리 중 하나를 선택할 수 있습니다. 게시글에는 댓글을 달 수 있습니다.
- **카테고리화**: 게시글 작성 시 선택한 카테고리별로 글을 분류하고 확인할 수 있습니다.
- **마이페이지**: 사용자가 작성한 게시글만 모아볼 수 있습니다.
- **다크모드**: 하단의 버튼을 클릭하여 다크모드로 전환할 수 있습니다.

## 실행 화면
  https://github.com/jm-316/blog-project/assets/130331748/80d451f6-d278-4cbd-9651-97abec1a53a5

## 프로젝트 후기
이번 블로그 프로젝트의 목표는 타입스크립트를 사용하고, CSS의 기본 기능들만을 이용하여 만드는 것이었습니다. 그동안 리액트만 사용하다가 처음으로 타입스크립트와 함께 사용하면서 타입 정의에서 많은 어려움을 겪었습니다. 이전에는 props를 전달할 때나 이벤트 함수를 만들 때 데이터 타입을 크게 신경 쓰지 않았지만, 타입스크립트를 사용하면서 데이터 타입을 명확하게 정의하는 것이 필요했습니다. 타입 정의를 하나씩 하면서 전달하고자 하는 데이터에 대해 한 번 더 고민하게 되었고, 데이터 타입이 달라 발생할 수 있었던 에러를 줄일 수 있었습니다.

프로젝트를 시작하기 전, CSS를 어떤 방식으로 진행할지 고민을 많이 했습니다. Tailwind, Styled-components, Bootstrap 등 다양한 방법이 있었지만, 프론트엔드 개발자라면 CSS를 잘 다루어야 한다는 생각에 다른 라이브러리를 사용하지 않고 CSS의 기본 기능들만으로 작성했습니다. 다만, CSS를 작성하다 보면 클래스 이름이 겹칠 수 있기 때문에 모듈 형식의 CSS로 작성했습니다.

이번 프로젝트를 통해 타입스크립트의 중요성과 CSS에 대해 더욱 깊이 이해할 수 있었으며, 이번에 배운 것들을 바탕으로 다음 프로젝트에서는 더욱 완성도 높은 결과물을 만들고 싶습니다.
