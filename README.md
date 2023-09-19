# NextBrunch

[NextBrunch](https://gonext-sam.vercel.app/)는 프론트엔드 프레임워크로 [Next.js](https://nextjs.org/)와 백엔드 처리를 위한 CMS로 [Strapi](https://strapi.io/)를 사용한 글쓰기 중심 커뮤니티 입니다.

[TailwindCSS](https://tailwindcss.com/)를 사용하여 스타일링하고 인증과 인가에는 GitHub OAuth가 사용됩니다. 이때 OAuth 프로세스는 Strapi의 [Users & Permissions plugin](https://docs.strapi.io/dev-docs/plugins/users-permissions)과 [Iron-session](https://github.com/vvo/iron-session)을 사용하여 처리됩니다. 글쓰기 기능에 사용되는 웹 에디터는 [Toast UI Editor](https://ui.toast.com/tui-editor)를 기반으로 구현됐습니다. Strapi가 제공하는 컨텐츠 API를 사용해 사용자간 구독 및 해제, 댓글, 작성글 발행 및 삭제 기능을 제공합니다. 사용자 상호작용에 의한 불필요한 리렌더, 데이터 갱신의 최소화 위해 Next.js의 Caching API가 사용됐습니다.

**[View NextBrunch](https://gonext-sam.vercel.app/)**

> **Note**
>
> 본 애플리케이션은 기술증진 및 증명을 목적으로 제작된 `브런치스토리`의 클론앱 입니다.
>
> 리액트 서버컴포넌트를 기반으로 하는 Next.js 13의 새 기능을 최대한 활용하고자 했습니다.
>
> 2023.09.10 기준 모바일/태블릿을 위한 반응형 레이아웃은 구현되지 않았습니다.

## Table of Contents

- [Features](#features)
- [Project Overview](#project-overview)
  - [Important files and folders](#important-files-and-folders)

## Features

- 유저는 작가가 되어 글을 작성하고 작성된 글은 유저 개인 페이지에 초안으로 보관됩니다.
- 글 작성에 사용되는 웹 에디터는 적용된 본문 이미지, 커버 이미지를 즉각 프리뷰 합니다.
- 초안은 유저의 선택으로 최종적으로 삭제되거나 발행되어 다른 유저에게 공개됩니다.
- 유저의 글은 정적으로 제공되며, 컨텐츠 갱신은 Incremental Static Revalidation를 트리거해 리빌드를 기다리지 않아도 됩니다.
- 공개된 글에는 다른 유저가 댓글을 달 수 있으며 댓글은 작성자가 수정하거나 삭제할 수 있습니다.
- 유저간 구독이 가능합니다. 유저 페이지에서 나를 구독하는 '구독자'와 내가 구독하는 '관심작가' 목록을 확인할 수 있습니다.
- GitHub 로그인으로 간단히 가입할 수 있습니다. 유저 프로필은 GitHub 계정 정보를 사용해 자동 생성되고 가입후 수정 가능합니다.
- 유저는 유저 자신과 작성한 글에 태그를 부여할 수 있고 태그를 클릭하면 같은 태그의 유저 또는 글 목록이 표시됩니다.
- 키워드로 앱 모든 컨텐츠를 검색하는 통합 검색 기능을 제공합니다.

## Project Overview

| [홈](https://gonext-sam.vercel.app/)                                                                            | [브런치북](https://gonext-sam.vercel.app/book/1)                                                                        |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| ![Home](https://i.ibb.co/d5qwkzL/homeindex.png) | ![book](https://i.ibb.co/7pLYYR5/brunchbook.png) |

### Important files and folders

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
