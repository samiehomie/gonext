**Table of Contents**

- [About Next Brunch](#about-next-brunch)
- [Project Overview](#project-overview)
  - [랜딩 페이지](#랜딩-페이지)
  - [회원가입 및 로그인](#회원가입-및-로그인)
  - [프로필 설정](#프로필-설정)
  - [통합 검색](#통합-검색)
  - [태그 탐색](#태그-탐색)
  - [글 초안 작성](#글-초안-작성)
  - [글 삭제 및 발행](#글-삭제-및-발행)
  - [댓글](#댓글)
  - [작가 구독](#작가-구독)
- [Important files and folders](#important-files-and-folders)

## About Next Brunch

[Next Brunch](https://gonext-sam.vercel.app/)는 브런치스토리를 모방한 [Next.js](https://nextjs.org/) 기반의 웹 앱입니다. 사용자에게 브런치스토리와 유사한 직관적이고 효율적인 경험을 제공하도록 노력했습니다. 사용자가 쉽게 콘텐츠를 작성하고 공유할 수 있는 기능, 그리고 사용자 간의 상호작용을 중점으로 개발했습니다.

**[데모 확인하기](https://gonext-sam.vercel.app/)**

> **Note**
>
> React 18의 서버컴포넌트를 기반으로 하는 Next.js 13의 새 기능을 최대한 활용하고자 했습니다.
>
> CSS 프레임워크로 [TailwindCSS](https://tailwindcss.com/)를 사용했습니다.
>
> 웹 애플리케이션과 서비리스 함수 호스팅에는 [Vercel](https://vercel.com/)을, 데이터베이스와 CMS 호스팅에는 [Render](https://render.com/)를 사용했습니다.
>
> 총 제작기간은 20일이며, 혼자 제작하였습니다.
>
> 모바일/태블릿을 위한 반응형 레이아웃은 아직 구현되지 않았습니다.

## Project Overview

### 랜딩 페이지

많은 이미지를 처리하기 위해 Next.js의 Image 컴포넌트 최적화, 지연 로딩 기능을 사용했습니다. <br>
상호작용이 필요없는 부분은 React 18의 서버 컴포넌트로 만들어 서버에서 실행돼 클라이언트로 보내지는 HTML에 직접 렌더되도록 했습니다. 이때 HTML은 전체가 완성되길 기다리지 않고 서버 Suspense를 사용해 HTML을 작은 청크로 나누고 먼저 완료된 것부터 점진적으로 클라이언트로 보내지게 됩니다.

![Landing](/public/readme/landing.gif)

### 회원가입 및 로그인

인증과 인가에는 GitHub OAuth가 사용됩니다. <br>
이때 OAuth 프로세스는 Strapi의 [Users & Permissions plugin](https://docs.strapi.io/dev-docs/plugins/users-permissions)을 기반으로 필요한 기능을 추가 구현한 모듈로 처리했습니다. <br>
보안 강화 및 쿠키 데이터 수정 위해 Next.js의 미들웨어에서 수신받은 인증정보를 [Iron-session](https://github.com/vvo/iron-session)을 사용하여 수정 및 암호화 하였습니다.

![Login](/public/readme/login.gif)

### 프로필 설정

프로필 이미지를 수정하고 유저를 설명하는 태그와 자기 소개를 작성할 수 있습니다. <br>
작성을 완료하면 Next.js의 Caching API를 호출해 사용자 정보와 관련된 정적 페이지를 갱신합니다.

![alter-me](/public/readme/alter-me.gif)

### 통합 검색

Strapi의 컨텐츠 검색 API를 사용해 구현했습니다. <br>
사용자 입력시 데이터 요청이 발생하므로, lodash의 debounce를 사용해 이를 효율적으로 처리했습니다.

![search](/public/readme/search.gif)

### 태그 탐색

프로필과 글 작성시 입력한 태그는 모두 해당 태그가 포함된 유저 또는 글을 모은 페이지로 연결됩니다. <br>
작성된 글은 빌드시에 미리 생성된 페이지이며 글 간의 이동은 Next.js의 Link 컴포넌트를 사용해 새로고침 없는 클라이언트 사이드 라우팅으로 처리됩니다.

![writing-tag](/public/readme/writing-tag.gif)

### 글 초안 작성

웹 에디터는 [Toast UI Editor](https://ui.toast.com/tui-editor)를 기반으로 구현되었으며, 적용된 본문 이미지, 커버 이미지를 즉각 프리뷰 합니다. <br>
'저장' 버튼을 누르면 유저 개인 페이지에 초안으로 보관되며, 초안 발행 후 에디터에 새로운 내용을 작성하면 <br>
자동으로 초안 수정 상태로 전환돼 페이지 이동 없이 초안을 수정 및 업데이트 할 수 있습니다.

![write](/public/readme/write.gif)

### 글 삭제 및 발행

초안은 유저의 선택으로 최종적으로 삭제되거나 발행되어 다른 유저에게 공개됩니다. <br>
유저의 글은 정적으로 제공되며, 컨텐츠 갱신은 ISR를 트리거해 리빌드를 기다리지 않아도 됩니다.

![alter-writing](/public/readme/alter-writing.gif)

### 댓글

공개된 글에는 다른 유저가 댓글을 달 수 있으며 댓글은 작성자가 수정하거나 삭제할 수 있습니다. <br>
Strapi의 Comment 플러그인을 사용하여 구현했습니다.

![comment](/public/readme/comment.gif)

### 작가 구독

유저간 구독이 가능합니다. 유저 페이지에서 나를 구독하는 '구독자'와 내가 구독하는 '관심작가' 목록을 확인할 수 있습니다. <br>
내부적으로 [PostgreSQL](https://www.postgresql.org/)를 사용하는 Strapi에 유저와 유저를 잇는 다-대-다 조인 테이블을 생성하고, <br>
인증-인가 모듈을 수정해 유저 생성과 함께 조인 테이블에 해당 유저 로우가 추가되게 하여 구현했습니다.

![subscribe](/public/readme/subscribe.gif)

## Important files and folders

| File(s)                  | Description                                            |
| ------------------------ | ------------------------------------------------------ |
| `/app/(content)/book`    | 발행된 글을 묶어 책으로 발행한 '브런치북' 페이지       |
| `/app/(content)/keyword` | 선택된 태그를 포함하는 유저 또는 글 목록 페이지        |
| `/app/(content)/me`      | 유저 프로필 수정 페이지                                |
| `/app/(content)/ready`   | 발행전 초안과 삭제한 글 목록 페이지                    |
| `/app/(content)/user`    | 발행된 글과 구독자, 관심작가 목록을 포함한 유저 페이지 |
| `/app/(content)/write`   | 웹 에디터를 포함한 글작성 페이지                       |
| `/app/(content)/writing` | 발행된 글 페이지                                       |
| `/app/(content)/(index)` | 홈 페이지                                              |
| `/lib/actions.ts`        | ISR 트리거를 위한 Server Action                        |
