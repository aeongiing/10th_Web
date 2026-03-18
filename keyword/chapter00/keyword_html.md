- 시맨틱 태그란? 🍠
    - **`div`** 태그로만 페이지를 구조화 하는 것이 좋은가?
        
        # div 태그로만 페이지를 구조화 하는 것이 좋은가?
        
        과거에는 웹 페이지의 레이아웃을 구성할 때 의미를 가진 태그가 부족하여 `<div>` 태그로만 만들었어요.
        
        정확하게 말하면, 아래와 같이 `class`나 `id` 속성을 부여하여 각 영역의 역할을 대신 지정했어요.
        
        ```tsx
        <!-- 좋지 않은 예시 -->
        <div class="header">
          <div class="navigation">...</div>
        </div>
        <div class="content">
          <div class="article">...</div>
        </div>
        <div class="footer">...</div>
        ```
        
        하지만 이렇게 하면 몇 가지 문제가 있어요.
        
        **문제점:**
        
        - 어떤 부분이 헤더인지, 네비게이션인지 구분하기 어려움
        - 검색엔진이 웹사이트 구조를 파악하기 어려움
        - 시각장애인을 위한 스크린 리더가 내용을 제대로 읽어주기 어려움
        
        <aside>
        🍠
        
        이를 해결하기 위해? 어떤 것이 나왔을까요?? 
        
        **태그 자체에 의미를 담아 콘텐츠의 구조와 역할을 명확히 표현**할 수 있는 시맨틱 태그!
        
        </aside>
        
    - **`시맨틱 태그`**로 해결하자
        
        # 시맨틱 태그로 해결하자
        
        **시맨틱 태그**란 **"의미가 있는 태그"**를 뜻합니다. 각 태그가 어떤 역할을 하는지 이름만 봐도 알 수 있어요.
        
        ```tsx
        <!-- 좋은 예시 -->
        <header>
          <nav>...</nav>
        </header>
        <main>
          <article>...</article>
        </main>
        <footer>...</footer>
        ```
        
        **주요 시맨틱 태그들:**
        
        - **`<header>`** : 웹사이트나 섹션의 머리말 부분
        - **`<nav>`** : 네비게이션(메뉴) 링크들
        - **`<main>`** : 문서의 주요 내용
        - **`<article>`** : 독립적인 글이나 콘텐츠 (블로그 포스트, 뉴스 기사 등)
        - **`<section>`** : 문서의 구획을 나누는 영역
        - **`<aside>`** : 본문과 관련 있지만 독립적인 콘텐츠 (사이드바, 광고 등)
        - **`<footer>`** : 웹사이트나 섹션의 바닥글
        
    - 멀티미디어 요소를 나타내는 태그
        
        # 멀티미디어 요소를 나타내는 태그
        
        <aside>
        💡 이전, IE를 사용하던 시대는, Active X나 플래시를 설치하여, 영상을 보던 시대가 있었어요.
        하지만, `audio`, `video`, `canvas` 태그가 나오면서 Active X 플러그인이 따로 필요하지 않게 되었어요!  ❌
        
        </aside>
        
        **주요 멀티미디어 태그들:**
        
        - **`<img>`** : 이미지 삽입
        - **`<video>`** : 동영상 재생
        - **`<audio>`** : 음성 파일 재생
        - **`<canvas>`** : 그래픽이나 애니메이션을 그릴 수 있는 영역
        
        ```tsx
        <!-- 멀티미디어 태그 예시 -->
        <img src="profile.jpg" alt="프로필 사진">
        <video controls>
          <source src="movie.mp4" type="video/mp4">
        </video>
        <audio controls>
          <source src="music.mp3" type="audio/mp3">
        </audio>
        ```
        
    - IE에서 사용되던 불필요한 태그 제거
        
        # IE(Internet Explorer)에서 사용되던 불필요한 태그 제거
        
        <aside>
        🍠
        
        HTML5에서는 더 이상 사용하지 않는 태그들이 있습니다: `<acronym>`, `<applet>`, `<dir>`, `<isindex>` 등이 이에 해당되요!
        
        </aside>
        
    - 기타 태그 추가 정리해보기 🍠
        
        **폼 관련 태그들:**
        
        - `<form>` : 사용자 입력 양식
        - `<input>` : 다양한 입력 필드
        - `<button>` : 클릭 가능한 버튼
        - `<select>`, `<option>` : 드롭다운 선택 메뉴
        
        **텍스트 관련 태그들:**
        
        - `<strong>` : 중요한 텍스트 (굵게)
        - `<em>` : 강조 텍스트 (기울임)
        - `<mark>` : 하이라이트된 텍스트
        
        **추가로 태그를 정리해주세요:**
        
        ## 1️⃣ 레이아웃 관련 태그
        
        - `<h1>~<h6>` : 제목글
        - `<p>` : 단락
        - `<hr>` : 수평 구분선
        
        ```
        <p>안녕하세요 반갑습니다</p>
        <hr>
        ```
        
        ---
        
        # 2️⃣ 목록(List) 관련 태그
        
        - `<ul>` : 순서 없는 목록 (bullet)
        - `<ol>` : 순서 있는 목록 (번호)
        - `<li>` : 목록 항목
        
        ```
        <ul>
        <li>사과</li>
        <li>바나나</li>
        </ul>
        
        <ol>
        <li>1단계</li>
        <li>2단계</li>
        </ol>
        ```
        
        ---
        
        # 3️⃣ 링크 관련 태그
        
        - `<a>` : 다른 페이지나 사이트로 이동하는 링크
        
        ```
        <a href="https://google.com">구글로 이동</a>
        ```
        
        주요 속성
        
        - `href` : 이동할 주소
        - `target="_blank"` : 새 탭에서 열기
        
        ---
        
        # 4️⃣ 표(Table) 관련 태그
        
        - `<table>` : 표 전체
        - `<tr>` : 행(row)
        - `<td>` : 데이터 셀
        - `<th>` : 제목 셀
        - `<thead>` : 표 머리
        - `<tbody>` : 표 본문
        
        ```
        <table>
        <thead>
        <tr>
        <th>이름</th>
        <th>나이</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>홍길동</td>
        <td>25</td>
        </tr>
        </tbody>
        </table>
        ```
        
        ---
        
        # 5️⃣ 자주 쓰는 기타 태그
        
        - `<details>` : 펼치기 UI
        - `<summary>` : details 제목
        - `<figure>` : 이미지/그래픽 묶음
        - `<figcaption>` : 이미지 설명
        
        ```
        <figure>
        <imgsrc="cat.jpg">
        <figcaption>고양이 사진</figcaption>
        </figure>
        ```
        
        ---
        
        💡 **실무에서 제일 많이 쓰는 태그 TOP 10**
        
        ```
        div
        span
        a
        img
        ul / li
        button
        input
        form
        section
        article
        ```
        
        <aside>
        🍠 HTML에는 더 많은 태그들이 있어요. 추가로 알아보며 더 정리해보록 하세요!
        
        </aside>
- body 태그 (Semantic Tag 활용) 🍠
    
    # **body 태그 (Semantic Tag 활용)**
    
    `<body />` 태그에는 사용자가 화면으로 볼 수 있는 내용이 들어가요.
    
    웹 사이트나 웹 어플리케이션을 만들 때는 서비스의 목적에 따라 구조가 달라져요.
    
    - **영상 서비스를 제공**하는 유튜브
    - **사용자 게시글을 중심**으로 하는 페이스북이
    - **활동 피드**를 담은 인스타그램 등
    
    웹 사이트는 설계 목적에 따라 매우 달라질 수 있어요.
    
    그래서 정해진 틀을 그대로 쓰기보다는, 사용자에게 어떤 부분을 강조할지를 정해서 구조를 잡는 게 중요해요. 의미 있는 정보를 시각적으로 잘 표현하는 게 필요해요.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/73f82818-771e-415d-aeae-e7d21ae3cac7/Untitled.png)
    
    `div` 태그만 남발하는 **Ambiguous Sections**보다는, 시멘틱 태그를 활용한 **Clear Sections**이 HTML 해석에도 유리하고 접근성도 좋아요.
    
    그래서 시멘틱 태그를 적절히 사용해서 얻을 수 있는 장점을 충분히 활용하는 걸 추천해요.
    
    - **`Sementic Tag`**를 잘 활용하였을 때 장점은? 🍠
        
        ### 1️⃣ 가독성 향상 (코드 이해가 쉬움)
        
        태그 자체에 **의미가 있어서 코드 구조를 파악하기 쉬움.**
        
        예시)
        
        ```
        <header>
        <nav></nav>
        <main>
        <section></section>
        </main>
        <footer></footer>
        ```
        
        → 어떤 영역인지 **이름만 보고도 바로 이해 가능**
        
        반대로 div만 쓰면
        
        ```
        <div class="header"></div>
        <div class="nav"></div>
        <div class="main"></div>
        ```
        
        → **class를 봐야 해당 태그가 어떤 의미인지 알 수 있음..!**
        
        ---
        
        ### 2️⃣ SEO(검색 엔진 최적화) 향상
        
        검색 엔진(예: **Google**)이
        
        웹페이지 구조를 **더 정확하게 이해할 수 있음.**
        
        예를 들어
        
        - `<article>` → 글 콘텐츠
        - `<nav>` → 메뉴
        - `<header>` → 페이지 상단
        
        → 검색 엔진이 **콘텐츠 구조를 분석하기 쉬움!**
        
        ---
        
        ### 3️⃣ 웹 접근성 향상
        
        스크린 리더 같은 **보조 기술**이 페이지 구조를 이해하기 쉬워짐.
        
        예:
        
        - `<nav>` → 네비게이션 영역
        - `<main>` → 주요 콘텐츠
        - `<footer>` → 하단 정보
        
        → 시각 장애 사용자도 **페이지 구조를 쉽게 파악 가능!**
        
        ---
        
        ### 4️⃣ 유지보수 쉬움
        
        협업이나 수정할 때 **구조 파악이 빠릅니다.**
        
        예
        
        ```
        <main>
        <article>
        <section>
        ```
        
        → 어떤 역할인지 바로 알 수 있어서
        
        **팀 프로젝트에서 유지보수가 쉬움!**        
- 태그 정리 🍠
    - `element` vs `container`
        
        ### Element Level
        
        `Element Level` 태그들은 화면에 직접적인 UI 요소를 나타내요.
        
        ```tsx
        <h1>
        <h2>
        .
        .
        <h6>
        
        <address>
        <blockquote>
        <p> : UI를 나타내는 것
        <pre>
        <table>
        <ol>
        <ul>
        <a>
        <abbr> : 축약을 나타내요
        <audio>
        <b>
        <span>
        <cite>
        <code>
        <data>
        <i>
        <mark> : UI를 나타내는 것
        ```
        
        이 태그들은 주로 텍스트나 콘텐츠 자체를 표현할 때 사용해요.
        
        ---
        
        ### Container Level
        
        `Container Level` 태그들은 여러 가지 요소를 담을 수 있는 태그예요.
        
        ```tsx
        <div>
        <section>
        <article>
        <header>
        <footer>
        <aside>
        <nav>
        <main>
        ```
        
        이 태그들은 구조를 나누고, 영역별 의미를 드러내는 데 사용해요.
        
        그래서 단순히 묶기만 하는 **`div`** 보다는, 의미를 담은 시멘틱 컨테이너 태그를 쓰는 게 좋아요.
        
        - Element Level과 Container Level은 무엇을 의미하며, 어떤 것이 다른지 정리해주세요.
            
            ## 1️⃣ Element Level
            
            **Element Level 태그**는 **화면에 직접적인 콘텐츠(UI 요소)를 표현하는 태그**이다.
            
            주로 **텍스트, 이미지, 링크, 표 등 실제 콘텐츠 자체를 나타낼 때 사용된다.**
            
            예시 태그
            
            ```
            <h1> ~<h6>
            <p>
            <a>
            <span>
            <b>
            <i>
            <mark>
            <code>
            <table>
            <ul>
            <ol>
            <audio>
            ```
            
            예시
            
            ```html
            <h1>웹 개발</h1>
            <p>HTML은 웹페이지의 구조를 만드는 언어입니다.</p>
            <a href="https://google.com">구글</a>
            ```
            
            ➡️ 이러한 태그들은 **사용자에게 보여지는 콘텐츠 자체를 표현하는 역할**을 한다.
            
            ---
            
            ## 2️⃣ Container Level
            
            **Container Level 태그**는 **여러 요소를 담는 구조적 태그**이다.
            
            즉, **여러 Element들을 묶어 하나의 영역을 구성하는 역할**을 한다.
            
            예시 태그
            
            ```
            <div>
            <section>
            <article>
            <header>
            <footer>
            <aside>
            <nav>
            <main>
            ```
            
            예시
            
            ```html
            <header>
            <h1>웹사이트 제목</h1>
            </header>
            
            <main>
            <section>
            <p>본문 내용</p>
            </section>
            </main>
            ```
            
            ➡️ 이러한 태그들은 **페이지 구조를 나누고 영역의 의미를 표현하는 역할**을 한다.
            
            ---
            
            # 3️⃣ Element Level과 Container Level의 차이
            
            | 구분 | Element Level | Container Level |
            | --- | --- | --- |
            | 의미 | 콘텐츠 자체를 표현 | 여러 요소를 담는 구조 |
            | 역할 | 텍스트, 링크, 데이터 표현 | 페이지 구조 구분 |
            | 사용 목적 | 실제 UI 요소 표시 | 레이아웃 및 영역 구성 |
            | 예 | `<p>`, `<a>`, `<span>` | `<section>`, `<article>`, `<nav>` |
            
            ---
            
            # 4️⃣ 정리
            
            **Element Level 태그**는 텍스트나 링크와 같은 **콘텐츠 자체를 표현하는 태그**이고,
            
            **Container Level 태그**는 여러 요소를 묶어 **웹페이지의 구조와 영역을 구성하는 태그**이다.
            
            따라서 웹페이지를 설계할 때는 **Element Level 태그로 콘텐츠를 표현하고, Container Level 태그로 구조를 구성한다.**
            
        
        <aside>
        💡 모든 html 태그를 암기할 필요도 없고, 암기하는 것은 쉽지 않습니다. 
        많이 사용하는 Tag 위주로, 기억해두고, 나중에 필요할 때 아래의 mdn과 같은 자료를 활용하면 매우 좋습니다.
        
        </aside>
        
        https://developer.mozilla.org/ko/docs/Web/HTML/Element
        
    - `block` vs `inline` 🍠
        
        ### Block 요소
        
        **`block`** 요소는 한 줄을 전부 차지해요. 그래서 줄이 자동으로 바뀌고, 다른 요소들은 그 다음 줄에 배치돼요.
        
        ![스크린샷 2024-07-17 오전 7.37.29.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/f2672c25-642f-4adb-b8a7-b350cbf2de52/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-17_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_7.37.29.png)
        
        ```html
        <h1>
        <h2>
        <h3>
        <h4>
        <h5>
        <h6>
        
        <address>
        
        <blockquote>
        
        <p>
        
        <pre>
        
        <table>
        
        <ol>
        
        <ul>
        ```
        
        ---
        
        ### Inline 요소
        
        **`inline`** 요소는 자기 크기만큼만 공간을 차지해요. 만약 옆에 남은 공간이 부족하면, 자동으로 다음 줄로 넘어가요.
        
        ![스크린샷 2024-07-17 오전 7.37.56.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/62d49404-42e4-433e-bb62-43c6f026d345/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-17_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_7.37.56.png)
        
        ```html
        <a>
        
        <abbr>
        
        <audio>
        
        <b>
        
        <span>
        
        <cite>
        
        <code>
        
        <data>
        
        <i>
        
        <mark>
        ```
        
        ### 실습 🍠
        
        - 그러면, **`inline-block`**은 어떠한 방식으로 동작할까요? 🍠
            - **`inline-block`**은 **inline과 block의 특징을 동시에 가진 display 속성**이다.
            - **inline처럼 한 줄에 나란히 배치된다.**
            - **block처럼 width와 height를 설정할 수 있다.**
            
            즉, **한 줄에 배치되면서 크기 조절도 가능한 요소**이다.
            
        - **`block`**, **`inline`**, **`inline-block`** 직접 html과 css를 활용해서 무엇이 다른지, **`VS Code Live Server Extension을 활용`**하여, 실습 한 이미지를 첨부하여 설명해주세요. 🍠
            
            ![image.png](attachment:39ee8ddb-0fba-4cf2-a3b0-cd221b8679d2:image.png)
            
            ```html
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <title>practice01</title>
              <style>
                .block { display: block; background: #B5D4F4; padding: 8px; margin-bottom: 4px; }
                .inline { display: inline; background: #9FE1CB; padding: 8px; }
                .inline-block { display: inline-block; background: #F5C4B3; padding: 8px; width: 100px; height: 50px; margin-right: 4px; }
              </style>
            </head>
            <body>
             
              <h3>block</h3>
              <div class="block">A</div>
              <div class="block">B</div>
              <div class="block">C</div>
             
              <h3>inline</h3>
              <span class="inline">A</span>
              <span class="inline">B</span>
              <span class="inline">C</span>
             
              <h3>inline-block</h3>
              <div class="inline-block">A</div>
              <div class="inline-block">B</div>
              <div class="inline-block">C</div>
             
            </body>
            </html>
            ```
            
            1. **Block 요소**
            - 한 줄 전체를 차지
            - 자동 줄바꿈 발생
            - width, height 설정 가능
            - 예: `<h1>~<h6>`, `<p>`, `<div>`, `<ul>`, `<table>` 등
            
            1. **Inline 요소**
            - 자기 크기만큼만 차지
            - 줄바꿈 없이 옆에 나란히 배치
            - width, height 설정 **불가**
            - 예: `<a>`, `<span>`, `<strong>`, `<em>`, `<code>` 등
            
            1. **Inline-block**
            - inline처럼 **나란히 배치**
            - block처럼 **width, height 설정 가능**
            - 두 가지 특징을 동시에 가짐