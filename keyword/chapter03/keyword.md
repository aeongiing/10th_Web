- **React Router**를 사용하지 않고, **Single Page Application** 만들어보기 🍠🍠🍠
    <aside>
    💡
    
    **React Router**를 사용하지 않고, **History API만으로 Single Page Application(SPA)을 직접 구현**해보는 시간을 가져보세요.
    
    이 과정에서 중요한 것은 단순히 SPA를 완벽하게 구축하는 것이 아니라, **SPA가 무엇이고 왜 필요한지, 그리고 React Router 같은 라이브러리가 어떤 배경에서 등장했는지 이해하는 것**입니다.
    
    라이브러리를 무조건 가져다 쓰기보다는,
    
    - **왜 이런 라이브러리가 나왔는지**
    - **직접 구현하면 어떤 불편함이 있는지**
    - **라이브러리가 제공하는 편의성이 무엇인지 등**
    
    이 점들을 스스로 경험해 보는 것이 학습의 핵심입니다.
    
    따라서 이번 목표는 **“SPA의 원리와 필요성을 이해하는 것**”에 중점을 두고 블로그를 읽어보시길 권장합니다.
    
    </aside>
    
    ### 📚 블로그
    
    [개발자 매튜 | React Router — History API를 활용한 SPA 라우팅 구현](https://www.yolog.co.kr/post/react-spa)
    
    ---
    
    - `pushState`, `popstate` 이벤트, 전체 리로드와의 차이 🍠
        
        `pushState`는 브라우저 History API의 메서드로, **페이지를 새로 불러오지 않고 URL만 변경**한다.
        
        ```jsx
        // 전체 리로드 방식
        window.location.href = '/movies'; // 서버에 새 HTML 요청 → 전체 새로고침
        
        // pushState 방식
        history.pushState({}, '', '/movies'); // URL만 바뀜, 페이지 새로고침 없음`
        ```
        
        `popstate`는 뒤로 가기/앞으로 가기 버튼을 눌렀을 때 발생하는 이벤트다.
        
        ```jsx
        window.addEventListener('popstate', (e) => {
          // URL이 바뀌었을 때 실행할 로직
          console.log('URL 변경됨:', location.pathname);
        });
        ```
        
        React Router는 내부적으로 이 두 가지를 활용해서 동작한다. `Link`를 클릭하면 `pushState`로 URL을 바꾸고, 뒤로 가기를 누르면 `popstate`를 감지해서 화면을 업데이트한다.
        
        - +) URL이 바뀌면 당연히 페이지도 바뀌는거 아닌가?
            
            매우 날카로운 질문입니다! "URL이 바뀌면 당연히 페이지도 바뀌는 것 아닌가?"라는 의문은 웹의 전통적인 동작 방식(SSR)을 생각하면 당연히 생길 수 있는 의문입니다.
            
            결론부터 말씀드리면, **"브라우저가 서버에 새 HTML을 요청하느냐(새로고침)"** 아니면 **"자바스크립트가 화면의 내용물만 갈아끼우느냐"**의 차이입니다.
            
            ---
            
            ### 1. 전통적인 방식 (Multi Page Application)
            
            전통적인 웹사이트에서는 주소창에 `naver.com/news`라고 치면 브라우저가 네이버 서버에 **"뉴스 페이지용 HTML을 새로 줘!"**라고 요청합니다.
            
            - **동작:** 흰 화면이 잠시 떴다가(새로고침), 서버에서 받은 완전히 새로운 HTML 파일이 화면을 덮어씁니다.
            - **단점:** 매번 전체 화면을 다시 그려야 하므로 느리고, 기존에 입력하던 데이터나 스크롤 위치가 초기화됩니다.
            
            ---
            
            ### 2. History API 방식 (Single Page Application)
            
            React 같은 SPA에서는 주소창의 URL은 바뀌지만, 브라우저는 **서버에 아무런 요청도 보내지 않습니다.**
            
            1. **눈속임 (URL 변경):** `pushState`를 쓰면 브라우저 주소창의 글자만 `/movies`로 바뀝니다. 브라우저는 "어? 주소가 바뀌었네? 하지만 서버에 새로 물어보진 않을게"라고 판단합니다.
            2. **내용물 교체 (JS 렌더링):** URL이 바뀌는 순간, React Router 같은 라이브러리가 자바스크립트로 "지금 주소가 `/movies`네? 그럼 영화 목록 컴포넌트를 화면에 그려야지!" 하고 **이미 로드된 페이지 안에서 DOM(요소)만 삭제하고 새로 추가**합니다.
            
            > **비유하자면:**
            > 
            > - **전통 방식:** 다른 방으로 이동하기 위해 아예 집 밖으로 나갔다가 다른 현관문으로 들어오는 것.
            > - **History API 방식:** 같은 방 안에서 벽지랑 가구 배치만 순식간에 바꿔서 마치 다른 방에 온 것처럼 느끼게 하는 것.
            
            ---
            
            ### 3. "페이지가 바뀐다"는 의미의 차이
            
            사용자 입장에서는 화면이 바뀌니 "페이지가 바뀌었다"고 느끼지만, **브라우저 기술적 관점**에서는 다릅니다.
            
            - **새로고침 없음:** 자바스크립트 메모리에 저장된 데이터가 그대로 유지됩니다. (예: 상단 검색바에 입력하던 글자가 그대로 남아 있음)
            - **네트워크 비용 절감:** 매번 수 메가바이트의 HTML/CSS/JS를 새로 다운로드할 필요가 없습니다.
            
            ### 4. 뒤로 가기를 눌렀을 때의 마법
            
            주소창만 바꿨는데 어떻게 뒤로 가기가 작동할까요?
            
            `pushState`로 주소를 바꾸면 브라우저는 내부적인 **'히스토리 스택(History Stack)'**에 그 주소를 차곡차곡 쌓아둡니다.
            
            사용자가 뒤로 가기를 누르면 브라우저는 스택에서 이전 주소를 꺼내고, `popstate` 이벤트를 발생시킵니다. 이때 리액트가 그 이벤트를 감지해서 "아, 사용자가 뒤로 갔구나! 그럼 다시 홈 화면 컴포넌트를 보여줘야지" 하고 화면을 다시 그려주는 것입니다.
            
            결국 **주소창은 브라우저의 기록 장치로만 사용하고, 실제 화면 제어권은 자바스크립트(React)가 쥐고 있는 상태**라고 이해하시면 정확합니다.
            
        - +) SSR은 페이지 이동 시에 DOM을 다 없애고 다시 만드는가?
            
            네, **전통적인 SSR(MPA 방식)**에서는 말씀하신 대로 동작하는 것이 맞습니다. 하지만 **현대적인 SSR(Next.js 등)**에서는 조금 다르게 동작합니다.
            
            이 차이를 이해하면 요즘 웹 개발 트렌드를 정확히 파악하실 수 있습니다.
            
            ---
            
            ### 1. 전통적인 SSR (정통 MPA 방식)
            
            우리가 흔히 아는 오래된 웹사이트들이나 PHP, JSP, Spring MVC(Thymeleaf) 등을 사용할 때의 방식입니다.
            
            - **동작:** 사용자가 링크를 클릭하면 브라우저가 서버에 새로운 페이지를 요청합니다.
            - **결과:** 서버가 완전히 새로운 HTML을 내려주기 때문에, 브라우저는 기존에 그려둔 **DOM(Document Object Model)을 통째로 날려버리고(Flash)**, 새로 받은 HTML로 처음부터 끝까지 다시 그립니다.
            - **특징:** 화면이 깜빡이는 현상이 발생하며, 상단 탭의 새로고침 아이콘이 돌아가는 것을 볼 수 있습니다.
            
            ### 2. 현대적인 SSR (SPA + SSR 방식)
            
            요즘 많이 쓰는 **Next.js**나 **Nuxt.js** 같은 프레임워크에서의 방식입니다.
            
            - **첫 방문 시:** 서버에서 완성된 HTML을 받아옵니다. 이때는 전통적인 SSR처럼 DOM이 생성됩니다.
            - **페이지 이동 시 (Hydration 이후):** 링크를 클릭해도 서버에서 새로운 HTML 전체를 받아오지 않습니다. 대신 **자바스크립트(JS)**가 가로채서 필요한 **데이터(JSON)**만 가져온 뒤, 바뀌어야 할 부분의 DOM만 똑똑하게 교체합니다.
            - **결과:** DOM 전체를 없애고 다시 만드는 게 아니라, **SPA(Single Page Application)**처럼 부드럽게 화면이 전환됩니다.
            - **특징:** SSR의 장점(빠른 첫 화면, SEO)과 SPA의 장점(부드러운 이동)을 모두 가집니다.
            
            ---
            
            ### 요약하자면
            
            - **전통적 SSR:** 네, 페이지 이동 시마다 기존 DOM을 다 버리고 새로 만듭니다.
            - **현대적 SSR:** 첫 로딩만 서버에서 그려오고, 그다음 이동부터는 **DOM 전체를 갈아엎지 않고 필요한 부분만 수정**합니다.
            
            지금 개발 중이신 앱의 성격에 따라 어떤 방식을 취할지 결정하시면 좋은데, 보통 사용자 경험(UX)을 중시한다면 후자의 방식을 선호하게 됩니다.
            
            혹시 지금 구상 중인 프로젝트에서 특정 프레임워크(React, Next.js 등)를 염두에 두고 계신가요?
            
        
    - 전체 리로드 방식과 SPA 라우팅 방식의 가장 큰 차이는 무엇일까? 🍠
        
        **전체 리로드 방식과 SPA 라우팅 방식의 가장 큰 차이**
        
        |  | 전체 리로드 | SPA 라우팅 |
        | --- | --- | --- |
        | 페이지 이동 시 | 서버에 HTML 재요청 | URL만 변경 |
        | 공통 UI (Navbar 등) | 매번 다시 그림 | 유지됨 |
        | 속도 | 느림 | 빠름 |
        | 스크롤 위치, 입력값 | 초기화됨 | 유지 가능 |
        
        가장 큰 차이는 **서버 요청 여부**다. 전체 리로드는 이동할 때마다 서버에서 새 HTML을 받아오지만, SPA는 처음 한 번만 받고 이후엔 JavaScript가 화면을 교체한다.
        
    - `preventDefault()`와 `stopPropagation()`의 차이와 역할은 무엇인가? 🍠
        
        `preventDefault()`는 **브라우저의 기본 동작을 막는다.**
        
        ```jsx
        // <a> 태그 클릭 시 페이지 이동하는 기본 동작을 막음
        document.querySelector('a').addEventListener('click', (e) => {
          e.preventDefault();
          // 이제 직접 라우팅 처리
          history.pushState({}, '', e.target.href);
        });
        
        // 폼 제출 시 페이지 새로고침되는 기본 동작을 막음
        document.querySelector('form').addEventListener('submit', (e) => {
          e.preventDefault();
          // 직접 데이터 처리
        });
        ```
        
        `stopPropagation()`은 **이벤트가 부모로 전파(버블링)되는 것을 막는다.**
        
        ```jsx
        document.querySelector('#outer').addEventListener('click', () => {
          console.log('outer 클릭'); // 버블링으로 여기까지 올라옴
        });
        
        document.querySelector('#inner').addEventListener('click', (e) => {
          e.stopPropagation(); // 부모로 전파 차단
          console.log('inner 클릭');
        });
        // inner 클릭해도 'outer 클릭'은 출력 안 됨
        ```
        
        > 📌 **한 줄 비교**
        > 
        > - `preventDefault()` — "브라우저야, 네가 하려던 거 하지 마"
        > - `stopPropagation()` — "부모 요소야, 이 이벤트 너한테 안 알려줄게"
        > 
        > SPA를 History API로 직접 구현할 때 `<a>` 태그의 기본 이동을 막으려면 `preventDefault()`를 써야 한다.
        > 
        
    - 선언적 라우팅(`Route`, `Routes`) 구조가 가지는 장점은 무엇일까? 🍠
        
        History API로 SPA를 직접 구현하면 이런 식이 된다.
        
        ```jsx
        // 명령형 방식 — 직접 URL 비교해서 컴포넌트 교체
        window.addEventListener('popstate', () => {
          const path = location.pathname;
          if (path === '/') {
            renderHome();
          } else if (path === '/movies') {
            renderMovies();
          } else if (path.startsWith('/movies/')) {
            renderMovieDetail(path.split('/')[2]);
          } else {
            render404();
          }
        });
        ```
        
        React Router의 선언적 방식은 이렇다.
        
        ```tsx
        // 선언적 방식 — URL과 컴포넌트 관계를 선언만 하면 됨
        const router = createBrowserRouter([
          { path: '/', element: <HomePage /> },
          { path: '/movies', element: <MoviesPage /> },
          { path: '/movies/:movieId', element: <MovieDetailPage /> },
          { path: '*', element: <NotFound /> },
        ]);`
        ```
        
        장점은 세 가지다.
        
        첫째, **"어떻게 라우팅할지"가 아니라 "무엇을 보여줄지"만 정의한다.** URL 비교 로직, 히스토리 관리, 이벤트 처리를 직접 안 해도 된다.
        
        둘째, **구조가 한눈에 보인다.** 라우트 설정만 봐도 앱의 페이지 구조를 바로 파악할 수 있다.
        
        셋째, **중첩 라우트, 동적 라우트, 에러 처리 같은 복잡한 케이스를 쉽게 처리할 수 있다.** 직접 구현하면 엣지 케이스가 생길 때마다 조건문이 계속 늘어난다.
        
        > 👉 History API로 직접 구현해보면 React Router가 왜 나왔는지, 어떤 불편함을 해결해주는지 체감이 된다. 라이브러리의 편의성은 불편함을 직접 겪어봐야 느껴진다.
        > 
    
    ---
    
    ### 🍠 직접 만든 Single Page Application 제출
    
    - 깃허브 주소
        
        https://github.com/aeongiing/10th_Web/tree/main/practice/chapter03/practice01
        
    - 실행 영상
        
        [화면 기록 2026-04-01 오전 1.06.02.mov](attachment:e9b73661-36cb-4b5e-8e51-121485b93efb:화면_기록_2026-04-01_오전_1.06.02.mov)
        
    - 실행 구조 정리
        
        **1. 경로 상태 관리 — App.tsx**
        
        ```tsx
        const [currentPath, setCurrentPath] = useState(window.location.pathname);
        ```
        
        - 현재 URL 경로를 React state로 관리
        
        **2. 뒤로가기/앞으로가기 감지 — App.tsx**
        
        ```tsx
        useEffect(() => {
          const handlePopState = () => setCurrentPath(window.location.pathname);
          window.addEventListener('popstate', handlePopState);
          return () => window.removeEventListener('popstate', handlePopState);
        }, []);
        ```
        
        - 브라우저 뒤로/앞으로 버튼 누를 때 `popstate` 이벤트 발생 → state 업데이트 → 리렌더링
        
        **3. 페이지 전환 함수 — router.ts**
        
        ```tsx
        export function navigate(path: string) {
          window.history.pushState(null, '', path);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
        ```
        
        - `pushState`: URL을 바꾸되 새로고침 없음
        - `dispatchEvent`: `pushState`는 자동으로 `popstate`를 안 발생시키므로 수동으로 dispatch
        
        **4. 경로에 따른 렌더링 — App.tsx**
        
        ```tsx
        switch (currentPath) {
          case '/':       return <Home />;
          case '/about':  return <About />;
          case '/posts':  return <Posts />;
          default:        return <NotFound />;
        }
        ```
        
        ---
        
        정리하면: **URL이 바뀔 때마다 `currentPath` state가 업데이트되고, switch문으로 어떤 컴포넌트를 렌더링할지 결정**하는 구조. React Router 없이 History API만으로 구현한 SPA.

**3. 추가 학습: Fetch vs Axios**

- [x] 두 기술의 장단점을 스스로 설명할 수 있을 정도로 정리했나요?
  - **`fetch`** 정리 (브라우저 순정 도구)
    - **정의:** 브라우저에 내장된 최신 표준 API로, 별도의 라이브러리 설치 없이 네트워크 요청을 보낼 수 있습니다.
    - **장점:** 설치가 필요 없어 가볍고 프로젝트 의존성이 낮음.
      - 브라우저 지원이 표준이라 어디서든 바로 실행 가능.
    - **단점:** 기능이 최소한이라 직접 구현해야 할 코드가 많음 (예: 타임아웃 설정 등).
      - 구형 브라우저(IE 등)에서 지원되지 않음.
  - **`axios`** 정리 (외부 라이브러리)
    - **정의:** 브라우저와 Node.js 환경에서 모두 사용할 수 있는 강력한 HTTP 클라이언트 라이브러리입니다.
    - **장점:** 요청/응답 가로채기(Interceptors) 기능 제공.
      - 요청 취소(Cancel Token) 기능이 있어 관리가 쉬움.
      - 구형 브라우저에서도 안정적으로 동작함.
    - **단점:** 별도로 설치(`npm install`)해야 하므로 패키지 용량이 늘어남.
  - **`fetch`**와 **`axios`**의 차이
    ### ① 설치 여부 (Setup)
    - **Fetch:** **설치 불필요.** 브라우저가 기본으로 가지고 있음.
    - **Axios:** **설치 필요.** 프로젝트 폴더에서 명령어로 내려받아야 사용 가능.
    ### ② JSON 데이터 처리 방식 (Data Handling)
    - **Fetch:** **2단계 처리.** 서버 응답을 받은 뒤, 반드시 `.json()` 메서드를 호출해서 본문을 자바스크립트 객체로 변환하는 과정을 거쳐야 합니다.
      - `res => res.json()` (수동 변환)
    - **Axios:** **자동 변환.** 응답을 받으면 이미 JSON이 객체로 변환되어 `response.data` 안에 들어있습니다.
      - `res.data` (자동 처리)
    ### ③ 에러 처리 방식 (Error Handling)
    - **Fetch:** **네트워크 장애 시에만 에러.** 404(찾을 수 없음)나 500(서버 에러) 응답을 받아도 "응답이 오긴 왔으므로" 성공(`resolve`)으로 간주합니다.
      - _반드시 `if (!response.ok)` 코드로 에러를 직접 체크해야 함._
    - **Axios:** **상태 코드로 자동 에러 판별.** 2xx 범위를 벗어나는 모든 응답(4xx, 5xx)을 즉시 거절(`reject`)하여 `catch` 구문으로 보냅니다.
      - _별도의 체크 없이 바로 예외 처리가 가능함._
    ### 💡 요약
    > "Fetch는 **'가볍고 표준적'**이지만 꼼꼼하게 코드를 직접 짜야 하고, Axios는 **'편리하고 강력'**하지만 별도의 도구를 빌려 쓰는 개념이다."
- [x] `fetch`와 `axios`의 가장 큰 차이점인 **설치 여부**, **JSON 데이터 처리 방식**, **에러 처리 방식**을 명확하게 이해했나요?
  - 차이점 상세 분석
    ## 📑 Fetch vs Axios 상세 비교 분석
    ### 1. 설치 및 환경 설정 (Setup)
    - **Fetch:** 브라우저의 **표준 내장 API**입니다.
      - **특징:** 설치가 필요 없습니다. `window.fetch`로 어디서든 호출 가능합니다.
      - **코드:** 별도 import 없이 바로 `fetch('/api/data')` 사용.
    - **Axios:** **서드파티 라이브러리**입니다.
      - **특징:** `npm`이나 `yarn`을 통해 프로젝트에 추가해야 합니다.
      - **코드:** `npm install axios` 실행 후, 상단에 `import axios from 'axios'` 작성 필요.
    ***
    ### 2. JSON 데이터 처리 방식 (Data Handling)
    데이터를 받아온 후 "자바스크립트 객체"로 만드는 과정의 차이입니다.
    - **Fetch (2단계 처리):**JavaScript
      1. 네트워크 요청을 보낸다.
      2. 응답 객체(`response`)를 받아온다.
      3. `.json()` 메서드를 호출해서 **한 번 더 변환**해야 실제 데이터를 쓸 수 있다.
         `fetch('url')
.then(response => response.json()) // 여기서 한 번 걸러줘야 함
.then(data => console.log(data));`
    - **Axios (1단계 자동 처리):**JavaScript
      1. 네트워크 요청을 보낸다.
      2. 응답을 받으면 Axios가 내부적으로 JSON을 **이미 파싱**해두었다.
      3. `response.data` 안에 데이터가 바로 들어있다.
         `axios.get('url')
.then(response => console.log(response.data)); // 이미 객체 상태임`
    ***
    ### 3. 에러 처리 방식 (Error Handling) - **가장 중요**
    "무엇을 에러로 볼 것인가"에 대한 기준이 다릅니다.
    - **Fetch (관대한 에러 처리):**
      - **기준:** 오직 **네트워크 장애**(인터넷 끊김, 서버 다운)만 `catch`로 보냅니다.
      - **문제:** 서버가 `404 Not Found`나 `500 Internal Server Error`를 보내도 Fetch는 "응답을 받긴 받았으니 **성공**이야!"라고 판단해서 `then`으로 보냅니다.
      - **해결:** 개발자가 직접 `if (!response.ok)` 코드를 써서 에러를 걸러내야 합니다.
    - **Axios (엄격한 에러 처리):**
      - **기준:** HTTP 상태 코드가 **2xx 범위를 벗어나면 무조건 에러**로 간주합니다.
      - **장점:** `404`나 `500` 응답이 오면 자동으로 `catch` 구문이 실행됩니다. 별도의 체크 코드가 필요 없어 간결합니다.
    ***
    ### 4. 기타 주요 기능 차이 (추가 학습용)
    - **타임아웃 (Timeout):**
      - **Axios:** 설정이 매우 쉽습니다. `{ timeout: 5000 }` 옵션만 주면 됩니다.
      - **Fetch:** 기본적으로 지원하지 않아 `AbortController`라는 복잡한 객체를 직접 구현해야 합니다.
    - **인터셉터 (Interceptors):**
      - **Axios:** 모든 요청을 보내기 직전이나 응답을 받기 직전에 공통 작업(예: 로그인 토큰 넣기)을 가로채서 할 수 있는 강력한 기능이 있습니다.
      - **Fetch:** 이런 기능이 없어 모든 요청 함수마다 일일이 코드를 작성해야 합니다.
    ***
    ### 💡 최종 결론: 무엇을 쓸까요?
    1. **공부용/가벼운 프로젝트:** 별도 설치 없는 **Fetch**를 써보며 원리를 익히는 것이 좋습니다.
    2. **실무/대규모 프로젝트:** 에러 처리가 쉽고 기능이 강력한 **Axios**를 사용하는 것이 생산성 측면에서 훨씬 유리합니다.
