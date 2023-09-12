# NextBrunch

[NextBrunch](https://gonext-sam.vercel.app/)는 프론트엔드 프레임워크로 [Next.js](https://nextjs.org/)와 백엔드 처리를 위한 CMS로 [Strapi](https://strapi.io/)를 사용한 글쓰기 중심 커뮤니티 입니다.

[TailwindCSS](https://tailwindcss.com/)를 사용하여 스타일링하고 인증과 인가에는 GitHub OAuth가 사용됩니다. 이때 OAuth 프로세스는 Strapi의 [Users & Permissions plugin](https://docs.strapi.io/dev-docs/plugins/users-permissions)과 [Iron-session](https://github.com/vvo/iron-session)을 사용하여 처리됩니다. 글쓰기 기능에 사용되는 웹 에디터는 [Toast UI Editor](https://ui.toast.com/tui-editor)를 기반으로 구현됐습니다. Strapi가 제공하는 컨텐츠 API를 사용해 사용자간 구독 및 해제, 댓글, 작성글 발행 및 삭제 기능을 제공합니다. 사용자 상호작용에 의한 불필요한 리렌더, 데이터 갱신의 최소화 위해 Next.js의 Caching API가 사용됐습니다.


**[View Demo](https://gonext-sam.vercel.app/)** 

> **Note**
>
> 본 애플리케이션은 기술증진 및 증명을 목적으로 제작된  `브런치스토리`의 클론앱 입니다.
>
> 리액트 서버컴포넌트를 기반으로 하는 Next.js 13의 새 기능을 사용하고자 했으며, Server Action과 같은 실험단계 기능도 적극 사용하였습니다.
>
> 2023.09.10 기준 모바일/태블릿을 위한 반응형 레이아웃은 구현되지 않았습니다.

## Table of Contents

- [Features](#features)
- [Project Overview](#project-overview)
  - [Important files and folders](#important-files-and-folders)

## Features

- A performant, static blog with editable posts, authors, and site settings
- A native and customizable authoring environment, accessible on `yourblog.com/studio`
- Real-time and collaborative content editing with fine-grained revision history
- Side-by-side instant content preview that works across your whole site
- Support for block content and the most advanced custom fields capability in the industry
- Webhook-triggered Incremental Static Revalidation; no need to wait for a rebuild to publish new content
- Free and boosted Sanity project with unlimited admin users, free content updates, and pay-as-you-go for API overages
- A project with starter-friendly and not too heavy-handed TypeScript and Tailwind.css

## Project Overview

| [Blog](https://nextjs-blog.sanity.build)                                                                          | [Studio](https://nextjs-blog.sanity.build/studio)                                                                          |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| ![Blog](https://github.com/sanity-io/nextjs-blog-cms-sanity-v3/assets/81981/adc1a90e-644e-456a-b630-ac44e4636e24) | ![Sanity Studio](https://github.com/sanity-io/nextjs-blog-cms-sanity-v3/assets/81981/93a39af1-a806-45ca-8648-0cc7e2295eea) |

### Important files and folders

| File(s)                                     | Description                                              |
| ------------------------------------------- | -------------------------------------------------------- |
| `sanity.config.ts`                          |  Config file for Sanity Studio                           |
| `sanity.cli.ts`                             |  Config file for Sanity CLI                              |
| `/pages/studio/[[...index]].tsx`            |  Where Sanity Studio is mounted                          |
| `/pages/api/revalidate.ts`                  |  Serverless route for triggering ISR                     |
| `/pages/api/draft.ts`                       |  Serverless route for triggering Draft mode              |
| `/schemas`                                  |  Where Sanity Studio gets its content types from         |
| `/plugins`                                  |  Where the advanced Sanity Studio customization is setup |
| `/lib/sanity.api.ts`,`/lib/sanity.image.ts` | Configuration for the Sanity Content Lake client         |
| `/components/PreviewProvider.tsx`           | Configuration for the live Preview Mode                  |
