- border / outline 🍠
    
    ### border vs outline
    
    ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        .box {
          width: 100px;
          height: 100px;
          background-color: purple;
          margin-bottom: 40px;
          **box-sizing: border-box; <- !!**
        }
    
        .box1 {
          border: 10px solid black;
        }
    
        .box2 {
          outline: 10px solid red;
        }
      </style>
    </head>
    
    <body>
      <div class="box box1">border-box</div>
      <div class="box box2">content-box</div>
    </body>
    
    </html>
    ```
    
    위 코드를 실행하면, 아래 이미지처럼 결과가 나와요! 👇
    
    ![스크린샷 2024-07-18 오후 6.39.15.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/8ab8a9b0-0b42-464b-b18b-54e50914ef1c/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.39.15.png)
    
    위의 **box-sizing 설명** 부분은 제가 워크북에서 설명드린 내용을 바탕으로, 아래의 토글을 통해 직접 실습해주세요. 
    
    VSCode에서 여러 차례 실행해 보고, **개발자 도구(DevTools)**와 **직접 캡처한 이미지**를 활용하여 어떤 차이가 발생하는지 구체적으로 정리해 주세요.
    
    실습을 통해 발견한 차이점을 단순히 나열하기보다,
    
    - 어떤 상황에서 `content-box`와 `border-box`가 다르게 동작하는지 정리해주세요.
    - 레이아웃 구성이나 스타일링 과정에서 어떤 영향을 미치는지 등을 스스로 분석하고 기록해 주시면 학습 효과가 훨씬 커질 거에요.
    - border vs outline의 차이점 🍠
        
        기본적으로 `box-sizing: border-box;` 로 해둔 상태이므로 box1처럼 border로 지정하면 박스 내부적으로 테두리가 생기고, box2처럼 outline으로 지정해두면 box 외부에 테두리가 생기게 된다.
        
        | 속성 | border | outline |
        | --- | --- | --- |
        | 위치 | 박스 경계 안쪽 | 박스 바깥 |
        | 크기 영향 | ✅ 있음 | ❌ 없음 |
        | box-sizing 영향 | 받음 | 안 받음 |
        | 레이아웃 영향 | 있음 | 없음 |
        | 둥글기 (border-radius) | 적용됨 | 적용 안됨 |
    
- relative / absolute 🍠
    
    ### relative / absolute
    
    ### **📍 relative 포지션 이해하기**
    
    <aside>
    💡 **`relative`**는 Document Flow에 따라 **원래 본인이 있어야 할 위치를 기준**으로, 좌표 프로퍼티(top / bottom / left / right) CSS 스타일을 통해 위치를 이동시키는 속성이에요.
    
    </aside>
    
    ### **1. relative 실습해보기**
    
    ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        .box {
          width: 100px;
          height: 100px;
          background-color: purple;
          color: white;
          box-sizing: border-box;
          **position: relative;**
        }
      </style>
    </head>
    
    <body>
      <div class="box">BOX</div>
      <h1>고구마 상자</h1>
    </body>
    
    </html>
    ```
    
    위의 코드를 실행하면 아래와 같은 화면이 보여요:
    
    ![스크린샷 2024-07-18 오후 6.54.25.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/9afde3c4-1322-40ff-b7d6-6c7ca24dbde4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.54.25.png)
    
    자, 이제 보라색 박스를 위에서 50px만큼 아래로 내리고, 왼쪽에서 50px만큼 오른쪽으로 이동시켜봐요. **`relative`**를 설정한 후 아래와 같은 속성을 적용하세요.
    
    <aside>
    💡
    
    **이동 방향 이해하기:**
    
    - 위 → 아래로 이동: `top` CSS 적용
    - 왼쪽 → 오른쪽으로 이동: `left` CSS 적용
    - 아래 → 위로 이동: `bottom` CSS 적용
    - 오른쪽 → 왼쪽으로 이동: `right` CSS 적용
    </aside>
    
    ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        .box {
          width: 100px;
          height: 100px;
          background-color: purple;
          color: white;
          box-sizing: border-box;
          position: relative;
          top: 50px;
          left: 50px;
        }
      </style>
    </head>
    
    <body>
      <div class="box">BOX</div>
      <h1>고구마 상자</h1>
    </body>
    
    </html>
    ```
    
    ![스크린샷 2024-07-18 오후 6.56.12.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/b4018543-15bf-451e-921c-e4530f3645de/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.56.12.png)
    
    <aside>
    💡
    
    **실습 과제:
     -** 이제 여러분 차례예요! 위의 이미지 상태에서 고구마 상자를 아래 이미지처럼 이동시켜보세요.
    
    **힌트:**
    
    - `bottom`과 `right` 속성을 활용하세요
    - 필요하다면 고구마 상자 h1 태그에 class명을 부여해도 좋아요
    - ⭐️ **중요:** 음수 값도 사용할 수 있어요! (예: top: -20px)
    </aside>
    
    ![스크린샷 2024-07-18 오후 6.57.43.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/fd7e2bc8-0597-4eff-a26b-0ffbffe17e43/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.57.43.png)
    
    - 여러분의 코드를 아래에 첨부하세요 🍠
        
        ```html
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <style>
            .box {
              width: 100px;
              height: 100px;
              background-color: purple;
              color: white;
              box-sizing: border-box;
              position: relative;
              top: 50px;
              left: 50px;
            }
            .text{
              position: relative;
              bottom: 100px;
              right: -50px;
            }
          </style>
        </head>
        
        <body>
          <div class="box">BOX</div>
          <h1 class="text">고구마 상자</h1>
        </body>
        
        </html>
        ```
        
    
    ### **📍** absolute 포지션 이해하기
    
    <aside>
    💡  **`absolute`는 Document Flow에서 완전히 제외되며, `position: static`이 아닌 부모/조상 요소를 기준으로 위치가 결정돼요.**
    
    **기준이 되는 부모/조상 요소:**
    
    - `position: relative`
    - `position: absolute`
    - `position: fixed`
    
    이 중 가장 가까운 조상을 기준으로 삼아요. 만약 아무도 position이 설정되어 있지 않다면? 최상위 요소인 `<body>`를 기준으로 움직여요!
    
    **꼭 기억하세요:** 부모 요소를 기준으로 위치를 정하고 싶다면, 반드시 그 부모 요소에 `position: relative`를 선언하세요!
    
    </aside>
    
    ### **2. absolute 실습해보기**
    
    이제 absolute의 강력한 기능을 직접 체험해봐요:
    
    ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        /** 전체 선택자 기본적으로 설정된 마진을 없앰. */
        * {
          margin: 0;
          box-sizing: border-box;
        }
    
        .box1 {
          width: 500px;
          height: 500px;
          background-color: purple;
          color: white;
          position: relative;
        }
    
        .box2 {
          width: 200px;
          height: 200px;
          background-color: yellow;
        }
      </style>
    </head>
    
    <body>
      <div class="box1">BOX1</div>
      <h1 class="box2">BOX2</h1>
    </body>
    
    </html>
    ```
    
    위의 코드를 실행하면 아래와 같은 화면이 보여요:
    
    ![스크린샷 2024-07-18 오후 7.12.14.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/8af63428-2ea1-455d-94e5-52da156d58f6/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.12.14.png)
    
    <aside>
    🚨
    
    **실습 과제:
    - `position: absolute`**를 활용해서 아래 이미지처럼 BOX2를 BOX1 안으로 이동시켜보세요!
    
    **힌트:**
    
    1. BOX2에 `position: absolute`를 설정하세요
    2. BOX1이 이미 `position: relative`를 가지고 있으니, BOX2는 BOX1을 기준으로 움직일 거예요
    3. `top`, `left` 속성을 적절히 조합해보세요
    4. absolute로 설정하면 BOX2가 Document Flow에서 빠지면서 다른 요소들에 영향을 주지 않게 돼요!
    </aside>
    
    - **`position: absolute`**를 활용하여 본인의 힘으로, 아래와 같은 이미지로 BOX2를 이동시켜보세요! 🍠
        
        ![스크린샷 2024-07-18 오후 7.13.52.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/5a810066-8c42-4e8a-a2ac-fe8757085432/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.13.52.png)
        
        ### 코드는 아래에 첨부해주세요!
        
        ```html
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <style>
              /** 전체 선택자 기본적으로 설정된 마진을 없앰. */
              * {
                margin: 0;
                box-sizing: border-box;
              }
        
              .box1 {
                width: 500px;
                height: 500px;
                background-color: purple;
                color: white;
                position: relative;
              }
        
              .box2 {
                width: 200px;
                height: 200px;
                background-color: yellow;
                position: absolute;
                top: 0px; /* top과 left로 시작 지점을 정해주기 */
                left: 0px;
              }
            </style>
          </head>
        
          <body>
            <div class="box1">BOX1</div>
            <h1 class="box2">BOX2</h1>
          </body>
        </html>
        
        ```
- 정렬의 진수 🍠
    
    ### 다양한 정렬 방법
    
    **프론트엔드 개발**에서 요소를 가운데 정렬하는 건 정말 자주 마주치는 작업이에요. 
    
    상황에 따라 적절한 방법을 선택할 수 있도록, 5가지 핵심 정렬 방법을 마스터해봐요!
    
    <aside>
    💡
    
    **왜 여러 가지 방법을 알아야 할까요?**
    
    - 상황마다 최적의 방법이 다르기 때문이에요
    - 브라우저 호환성을 고려해야 할 때가 있어요
    - 레이아웃 구조에 따라 특정 방법이 더 효율적일 수 있어요
    </aside>
    
    ### 키워드 정리
    
    - text-align
        
        # text-align
        
        ### 기본 개념
        
        블록 요소 내부의 **인라인 콘텐츠**를 수평 정렬하는 속성이에요.
        
        ---
        
        ### 주요 값
        
        ```css
        text-align: left;     /* 왼쪽 정렬 (기본값) */
        text-align: right;    /* 오른쪽 정렬 */
        text-align: center;   /* 가운데 정렬 */
        text-align: justify;  /* 양쪽 정렬 */ <- 텍스트가 양쪽 끝에 딱 맞게 퍼짐
        text-align: start;    /* 문서 시작 방향 */ <- 오른쪽에서 왼쪽으로 읽는 언어의 경우에 지정하기 위해.
        text-align: end;      /* 문서 끝 방향 */ ,,
        ```
        
        ---
        
        ### 적용 대상
        
        - ✅ 텍스트
        - ✅ 인라인 요소 (`<span>`, `<a>`, `<img>`)
        - ✅ 인라인 블록 (`display: inline-block`)
        - ❌ **블록 요소 자체는 정렬 불가**예요
        
    - margin
        
        # margin
        
        ### 기본 개념
        
        요소의 **외부 여백**을 설정하는 속성이에요.
        
        ---
        
        ### 주요 값
        
        ```css
        /* 개별 설정 */
        margin-top: 10px;
        margin-right: 20px;
        margin-bottom: 10px;
        margin-left: 20px;
        
        /* 단축 속성 */
        margin: 10px;                /* 모든 방향 10px */
        margin: 10px 20px;           /* 상하 10px, 좌우 20px */
        margin: 10px 20px 30px;      /* 상 10px, 좌우 20px, 하 30px */
        margin: 10px 20px 30px 40px; **/* 상 우 하 좌 (시계방향) */**
        
        /* 특수 값 */
        margin: 0 auto;   /* 좌우 자동 여백 (가운데 정렬) */
        margin: inherit;  /* 부모 요소로부터 상속 */
        ```
        
        ### 핵심 특징
        
        - **margin collapse**: 인접한 블록 요소의 상하 마진은 **겹쳐요**
        - **auto 값**: 남은 공간을 자동으로 배분해요
        - 음수 값도 사용 가능해요
        
        ---
        
    - flex
        
        # flex
        
        ### 기본 개념
        
        **1차원 레이아웃** 시스템으로, 요소들을 행 또는 열로 배치하는 **강력한 도구**예요.
        
        ---
        
        ### 주요 값
        
        **Container 속성 (부모)**
        
        ```css
        /* Flex 컨테이너 선언 */
        display: flex;
        display: inline-flex;
        
        /* 방향 설정 */
        flex-direction: row;          /* 가로 방향 (기본값) */
        flex-direction: column;       /* 세로 방향 */
        flex-direction: row-reverse;  /* 가로 역방향 */
        flex-direction: column-reverse;/* 세로 역방향 */
        
        /* 줄바꿈 설정 */
        flex-wrap: nowrap;    /* 한 줄에 배치 (기본값) */
        flex-wrap: wrap;      /* 여러 줄 허용 */
        flex-wrap: wrap-reverse;
        
        /* 주축(진행방향) 정렬 */
        justify-content: flex-start;  /* 시작점 정렬 */
        justify-content: center;      /* 중앙 정렬 */
        justify-content: flex-end;    /* 끝점 정렬 */
        justify-content: space-between;/* 양 끝 배치 */
        justify-content: space-around; /* 균등 여백 */
        justify-content: space-evenly; /* 완전 균등 */
        
        /* 교차축(주축이 가로면 세로방향) 정렬 */
        align-items: stretch;     /* 늘리기 (기본값) */
        align-items: center;      /* 중앙 정렬 */
        align-items: flex-start;  /* 시작점 정렬 */
        align-items: flex-end;    /* 끝점 정렬 */
        align-items: baseline;    /* 텍스트 기준선 */
        
        /* 여러 줄 정렬 */
        align-content: stretch;
        align-content: center;
        align-content: space-between;
        
        /* 간격 설정 */
        gap: 20px;           /* 모든 간격 20px */
        row-gap: 10px;       /* 행 간격 */
        column-gap: 20px;    /* 열 간격 */
        ```
        
        **Item 속성 (자식)**
        
        ```css
        /* 크기 조절 */
        flex-grow: 1;     /* 늘어나는 비율 */
        flex-shrink: 1;   /* 줄어드는 비율 */
        flex-basis: 200px;/* 기본 크기 */
        
        /* 단축 속성 */
        flex: 1;          /* grow: 1, shrink: 1, basis: 0 */
        flex: 1 1 200px;  /* grow shrink basis */
        
        /* 개별 정렬 */
        align-self: center;   /* 자신만 다르게 정렬 */
        
        /* 순서 변경 */
        order: 1;         /* 표시 순서 (음수 가능) */
        ```
        
    - translate
        
        # translate
        
        ### 기본 개념
        
        요소를 **현재 위치에서 이동**시키는 변환 함수예요. **`Document Flow`**에 영향을 주지 않아요.
        
        ---
        
        ### 주요 문법
        
        ```css
        /* 2D 이동 */
        transform: translateX(100px);     /* X축 이동 */
        transform: translateY(50px);      /* Y축 이동 */
        transform: translate(100px, 50px);/* X, Y 동시 */
        transform: translate(50%, 50%);   /* 백분율 사용 */
        
        /* 3D 이동 */
        transform: translateZ(100px);     /* Z축 이동 */
        transform: translate3d(x, y, z);  /* 3D 이동 */
        
        /* 다른 transform과 조합 */
        transform: translate(50px, 100px) rotate(45deg);
        transform: translate(-50%, -50%) scale(1.2);
        ```
        
        ### 핵심 특징
        
        - **GPU 가속**: 성능이 우수해요
        - **백분율 기준**: 자기 자신의 크기가 기준이에요
        - **애니메이션**: transition, animation과 함께 자주 사용돼요
        - **position과 조합**: absolute와 함께 가운데 정렬에 활용돼요
        
        **관련 속성**
        
        ```css
        /* 변환 기준점 */
        transform-origin: center;     /* 중앙 (기본값) */
        transform-origin: top left;   /* 좌상단 */
        transform-origin: 50% 50%;    /* 백분율 */
        
        /* 3D 설정 */
        transform-style: preserve-3d;  /* 3D 공간 유지 */
        perspective: 1000px;           /* 원근감 */
        ```
        
    - grid
        
        # grid
        
        ### 기본 개념
        
        **2차원 레이아웃** 시스템으로, 행과 열을 동시에 다루는 가장 강력한 레이아웃 도구예요.
        
        ---
        
        ### 주요 문법
        
        ### **Container 속성 (부모)**
        
        ```css
        /* Grid 컨테이너 선언 */
        display: grid;
        display: inline-grid;
        
        /* 열 정의 */
        grid-template-columns: 200px 200px 200px;  /* 고정 크기 */
        grid-template-columns: 1fr 2fr 1fr;        /* 비율 */
        grid-template-columns: repeat(3, 1fr);     /* 반복 */
        grid-template-columns: minmax(100px, 1fr); /* 최소/최대 */
        grid-template-columns: auto-fit;           /* 자동 맞춤 */
        
        /* 행 정의 */
        grid-template-rows: 100px 200px;
        grid-template-rows: repeat(3, minmax(100px, auto));
        
        /* 영역 정의 */
        grid-template-areas: 
          "header header header"
          "sidebar main main"
          "footer footer footer";
        
        /* 간격 설정 */
        gap: 20px;              /* 모든 간격 */
        row-gap: 10px;          /* 행 간격 */
        column-gap: 20px;       /* 열 간격 */
        
        /* 자동 배치 */
        grid-auto-flow: row;    /* 행 방향 자동 배치 */
        grid-auto-flow: column; /* 열 방향 자동 배치 */
        grid-auto-flow: dense;  /* 빈 공간 채우기 */
        
        /* 자동 크기 */
        grid-auto-rows: 100px;   /* 자동 생성 행 크기 */
        grid-auto-columns: 1fr;  /* 자동 생성 열 크기 */
        
        /* 정렬 (전체) */
        justify-content: center;  /* 수평 정렬 */
        align-content: center;    /* 수직 정렬 */
        place-content: center;    /* 수평 + 수직 단축 */
        
        /* 정렬 (아이템) */
        justify-items: center;    /* 아이템 수평 정렬 */
        align-items: center;      /* 아이템 수직 정렬 */
        place-items: center;      /* 아이템 정렬 단축 */
        ```
        
        ### **Item 속성 (자식)**
        
        ```css
        /* 위치 지정 */
        grid-column: 1 / 3;      /* 1번째부터 3번째 라인까지 */
        grid-column: span 2;     /* 2개 열 차지 */
        grid-row: 2 / 4;         /* 2번째부터 4번째 라인까지 */
        
        /* 단축 속성 */
        grid-area: 2 / 1 / 4 / 3;  /* row-start / col-start / row-end / col-end */
        grid-area: header;          /* template-areas 이름 사용 */
        
        /* 개별 정렬 */
        justify-self: center;    /* 자신만 수평 정렬 */
        align-self: center;      /* 자신만 수직 정렬 */
        place-self: center;      /* 자신만 정렬 단축 */
        ```
        
        ### **유용한 함수들**
        
        ```css
        /* repeat(): 반복 */
        grid-template-columns: repeat(3, 1fr);
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        
        /* minmax(): 최소/최대값 */
        grid-template-columns: minmax(100px, 300px);
        grid-template-rows: minmax(50px, auto);
        
        /* fr 단위: 비율 */
        grid-template-columns: 1fr 2fr 1fr;  /* 1:2:1 비율 */
        ```
        
        - +) flex와 grid의 차이
            
            ## 🎯 한 줄 핵심
            
            👉 **flex = 1차원(한 줄 정렬)**
            
            👉 **grid = 2차원(행 + 열 전체 레이아웃)**
            
            ---
            
            ## 🧠 개념부터 딱
            
            ### 👉 Flexbox
            
            - 한 방향으로만 정렬 (가로 또는 세로)
            - 요소 “흐름” 맞추는 데 강함
            
            ```
            display:flex;
            ```
            
            ---
            
            ### 👉 Grid
            
            - 행 + 열 동시에 제어
            - “레이아웃 설계”에 강함
            
            ```
            display:grid;
            ```
            
            ---
            
            ## 🔥 가장 큰 차이
            
            | 구분 | Flex | Grid |
            | --- | --- | --- |
            | 구조 | 1차원 | 2차원 |
            | 방향 | 한 방향 | 행 + 열 |
            | 용도 | 정렬 | 전체 레이아웃 |
            | 제어 | 콘텐츠 중심 | 레이아웃 중심 |
            
            ---
            
            ## 💡 느낌으로 이해
            
            ### 👉 Flex (줄 세우기)
            
            ```
            [아이템][아이템][아이템]
            ```
            
            👉 한 줄에서
            
            - 간격 맞추고
            - 가운데 정렬하고
            - 순서 바꾸고
            
            ---
            
            ### 👉 Grid (칸 나누기)
            
            ```
            [  ][  ][  ]
            [  ][  ][  ]
            ```
            
            👉 전체 판을 먼저 짜고
            
            - 위치를 “좌표”로 배치
            
            ---
            
            ## 🎯 언제 뭐 쓰냐
            
            ### ✅ Flex 쓰는 경우
            
            - 버튼 정렬
            - 네비바
            - 카드 한 줄 정렬
            - 가운데 정렬
            
            👉 “요소 정렬” 문제일 때
            
            ---
            
            ### ✅ Grid 쓰는 경우
            
            - 페이지 전체 레이아웃
            - 대시보드
            - 갤러리
            - 카드 여러 줄 구조
            
            👉 “배치/설계” 문제일 때
            
            ---
            
            ## 🔥 코드 비교 (감 잡기)
            
            ### Flex
            
            ```
            display:flex;
            justify-content:center;
            align-items:center;
            ```
            
            👉 가운데 정렬 쉽게
            
            ---
            
            ### Grid
            
            ```
            display:grid;
            grid-template-columns:repeat(3, 1fr);
            ```
            
            👉 3열 구조 바로 만듦
            
            ---
            
            ## 🚨 중요한 포인트
            
            👉 둘은 경쟁 관계 아님
            
            실무에서는:
            
            👉 **Grid로 큰 틀 만들고 → Flex로 내부 정렬**
            
            이렇게 같이 씀
            
            ---
            
            ## ✍️ 한 줄 요약
            
            👉 **flex는 “정렬”, grid는 “레이아웃 설계”**
            
    
    ### 위의 키워드를 활용해서 가운데 정렬을 구현해보세요! 🍠
    
    <aside>
    💡
    
    HTML 요소는 여러분이 직접 만들어서, 가운데 정렬을 구현한 영상과 코드를 남겨주세요.
    향후 학습에 있어서 매우 중요한 부분이니, 꼭 직접 코드를 작성하면서 실습해보세요!
    
    </aside>
    
    - text-align
        
        ![image.png](attachment:357b51d4-a38e-436a-a1e7-a55b0aea318b:image.png)
        
        ```html
        <!DOCTYPE html>
        <html lang="ko">
          <head>
            <meta charset="UTF-8" />
            <title>text-align</title>
            <style>
              .parent {
                text-align: center;
                background: lightgray;
                padding: 40px;
              }
            </style>
          </head>
          <body>
            <div class="parent">
              <span>가운데</span>
            </div>
          </body>
        </html>
        
        ```
        
    - margin
        
        ![image.png](attachment:8abd877d-824b-4efa-b793-70df37cf63a2:image.png)
        
        ```html
        <!DOCTYPE html>
        <html lang="ko">
          <head>
            <meta charset="UTF-8" />
            <title>margin</title>
            <style>
              .box {
                width: 200px;
                margin: 0 auto; /* 좌우 자동 여백 (가운데 정렬) */
                background: lightblue;
                padding: 20px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="box">가운데</div>
          </body>
        </html>
        
        ```
        
    - flex
        
        ![image.png](attachment:af127730-05d8-4ec6-be26-1c4e486e4d3a:image.png)
        
        ```html
        <!DOCTYPE html>
        <html lang="ko">
          <head>
            <meta charset="UTF-8" />
            <title>flex</title>
            <style>
              .parent {
                display: flex;
                justify-content: center;
                align-items: center; /* 중앙 정렬 */
                height: 200px;
                background: lightgray;
              }
              .box {
                background: lightcoral;
                padding: 20px;
              }
            </style>
          </head>
          <body>
            <div class="parent">
              <div class="box">가운데</div>
            </div>
          </body>
        </html>
        
        ```
        
    - translate
        
        ![image.png](attachment:edd3df68-7843-404a-aa10-d035c90786ea:image.png)
        
        ```html
        <!DOCTYPE html>
        <html lang="ko">
          <head>
            <meta charset="UTF-8" />
            <title>translate</title>
            <style>
              .parent {
                position: relative;
                height: 200px;
                background: lightgray;
              }
              .box {
                position: absolute;
                top: 50%;
                left: 50%; /*요소의 왼쪽 위 꼭짓점이 부모의 중앙*/
                transform: translate(
                  -50%,
                  -50%
                ); /*자기 크기의 절반만큼 다시 이동(=>진짜 중앙 맞춰짐)*/
                background: lightgreen;
                padding: 20px;
              }
            </style>
          </head>
          <body>
            <div class="parent">
              <div class="box">가운데</div>
            </div>
          </body>
        </html>
        
        ```
        
    - grid
        
        ![image.png](attachment:82723739-577f-4f83-93d9-bc42926d705e:image.png)
        
        ```html
        <!DOCTYPE html>
        <html lang="ko">
          <head>
            <meta charset="UTF-8" />
            <title>grid</title>
            <style>
              .parent {
                display: grid;
                place-items: center; /* 아이템 정렬 단축 */
                height: 200px;
                background: lightgray;
              }
              .box {
                background: lightpink;
                padding: 20px;
              }
            </style>
          </head>
          <body>
            <div class="parent">
              <div class="box">가운데</div>
            </div>
          </body>
        </html>
        
        ```
        
- 반응형 background 🍠
    
    ### 아래 반응형 background 관련 키워드를 정리해보세요 🍠
    
    <aside>
    💡
    
    아래 키워드에 대해 정리한 후,  코드와 실행 영상을 남겨주세요!
    
    </aside>
    
    - background-image
        
        ## 1️⃣ `background-image`
        
        👉 요소의 배경 이미지 설정
        
        ```css
        background-image:url("image.jpg");
        ```
        
        ✔ 특징
        
        - 여러 개도 가능 (쉼표로 구분)
        - 기본값: 없음 (`none`)
    - background-repeat
        
        ## 2️⃣ `background-repeat`
        
        👉 이미지 반복 여부 설정
        
        ```css
        background-repeat:repeat;/* 기본값 */
        background-repeat:no-repeat;/* 반복 없음 */
        background-repeat:repeat-x;/* 가로 반복 */
        background-repeat:repeat-y;/* 세로 반복 */
        ```
        
        ✔ 반응형에서는 보통 `no-repeat` 많이 씀
        
    - background-position
        
        ## 3️⃣ `background-position`
        
        👉 이미지 위치 설정
        
        ```css
        background-position:center;
        background-position:topleft;
        background-position: 50% 50%;
        ```
        
        ✔ 기준: **부모 요소 기준**
        
    - background-size
        
        ## 4️⃣ `background-size` ⭐ (반응형 핵심)
        
        👉 이미지 크기 조절
        
        ```css
        background-size:cover;
        background-size:contain;
        background-size: 100% 100%;
        ```
        
        ### 🔥 핵심 옵션
        
        - `cover`
            
            👉 영역을 꽉 채움 (이미지 잘릴 수 있음)
            
        - `contain`
            
            👉 이미지 전체 보임 (빈 공간 생길 수 있음)
            
        
        ✔ 반응형에서 거의 **cover 사용**
        
    - 축약형
        
        ## 5️⃣ 축약형 (`background`)
        
        👉 모든 속성을 한 줄로 작성
        
        ```css
        background:url("image.jpg")center /coverno-repeat;
        ```
        
        ### 👉 순서 (중요)
        
        ```
        image position / size repeat color
        ```
        
        ✔ `/` → position과 size 구분
        
    - 코드, 실행 화면
        
        ![image.png](attachment:c1b85e67-5b5f-48f1-a382-66f4bd972df1:image.png)
        
        ```html
        <!DOCTYPE html>
        <html lang="ko">
          <head>
            <meta charset="UTF-8" />
            <title>background example</title>
            <style>
              body {
                margin: 0;
              }
        
              .box {
                width: 100%;
                height: 100vh;
        
                /* 축약형 */
                background: url("https://picsum.photos/800/600") center / cover
                  no-repeat;
              }
        
              .box2 {
                width: 300px;
                height: 200px;
                margin: 20px;
        
                background-image: url("https://picsum.photos/300/200");
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
              }
            </style>
          </head>
          <body>
            <div class="box"></div>
            <div class="box2"></div>
          </body>
        </html>
        
        ```
        
    
    [background - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/background)
    
- transform 🍠
    
    ### transform 🍠
    
    CSS **`transform`** 속성으로, 요소에 회전 크기 조절, 기울이기, 이동 효과를 부여할 수 있어요.
    
     `transform`은 CSS [시각적 서식 모델](https://developer.mozilla.org/en-US/docs/Web/CSS/Visual_formatting_model)의 좌표 공간을 변경해요.
    
    <aside>
    💡 아래 키워드에 대해 정리한 후, 코드와 실행 영상을 남겨주세요!
    
    </aside>
    
    - translate
        
        # 1️⃣ translate (이동)
        
        👉 요소의 위치 이동
        
        ```
        transform:translate(50px, 20px);
        ```
        
        - X축, Y축 이동
        - `%`는 **자기 자신 크기 기준**
        
        ```
        transform:translate(-50%, -50%);
        ```
        
        👉 중앙 정렬할 때 많이 사용
        
    - scale
        
        # 2️⃣ scale (크기)
        
        👉 요소 크기 확대/축소
        
        ```
        transform:scale(2);/* 2배 확대 */
        transform:scale(0.5);/* 절반 축소 */
        ```
        
        - 1 = 원래 크기
        - 0.5 = 절반
    - rotate
        
        # 3️⃣ rotate (회전)
        
        👉 요소 회전
        
        ```
        transform:rotate(45deg);
        ```
        
        - 단위: `deg` (도)
        - 시계 방향으로 회전
    - skew
        
        # 4️⃣ skew (기울이기)
        
        👉 요소를 비틀기
        
        ```
        transform:skew(20deg, 10deg);
        ```
        
        - X축 / Y축 기준으로 기울어짐
        - 잘 쓰진 않지만 UI 효과에 사용
    - matrix
        
        # 5️⃣ matrix (고급)
        
        👉 모든 transform을 한 번에 수학적으로 표현
        
        ```
        transform:matrix(a,b,c,d,e,f);
        ```
        
        ✔ 거의 안 직접 씀
        
        👉 브라우저 내부 계산용 느낌
        
    - 코드, 실행 화면
        
        ![image.png](attachment:727f10cf-e5ea-4934-b004-053cfc11b014:image.png)
        
        ```html
        <!DOCTYPE html>
        <html lang="ko">
          <head>
            <meta charset="UTF-8" />
            <title>transform 예제</title>
            <style>
              body {
                display: flex;
                gap: 20px;
                padding: 50px;
              }
        
              .box {
                width: 100px;
                height: 100px;
                background: purple;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
              }
        
              .translate {
                transform: translate(30px, 20px);
              }
        
              .scale {
                transform: scale(1.5);
              }
        
              .rotate {
                transform: rotate(45deg);
              }
        
              .skew {
                transform: skew(20deg);
              }
        
              .matrix {
                transform: matrix(1, 0.3, 0.3, 1, 30, 20);
              }
            </style>
          </head>
          <body>
            <div class="box translate">translate</div>
            <div class="box scale">scale</div>
            <div class="box rotate">rotate</div>
            <div class="box skew">skew</div>
            <div class="box matrix">matrix</div>
          </body>
        </html>
        ```
        
    
    [transform - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
    
- transition 🍠
    
    ### transition  🍠
    
    ## 🎯 transition이란?
    
    👉 CSS 속성 값이 바뀔 때
    
    **부드럽게 애니메이션 효과를 주는 속성**
    
    ```css
    transition:all 0.3s;
    ```
    
    <aside>
    💡 아래 키워드에 대해 정리한 후, 실습을 진행해주시고, 코드와 실행 영상을 남겨주세요!
    
    </aside>
    
    - transition-property
        
        # 1️⃣ `transition-property`
        
        👉 어떤 속성에 애니메이션을 적용할지
        
        ```css
        transition-property:background-color;
        transition-property:all;
        ```
        
        ✔ `all` → 모든 속성 적용
        
    - transition-duration
        
        # 2️⃣ `transition-duration`
        
        👉 애니메이션 지속 시간
        
        ```css
        transition-duration: 0.5s;
        ```
        
        ✔ 단위: `s` (초), `ms` (밀리초)
        
    - transition-timing-function
        
        # 3️⃣ `transition-timing-function`
        
        👉 애니메이션 속도 변화 (가속 느낌)
        
        ```css
        transition-timing-function:ease;
        transition-timing-function:linear;
        transition-timing-function:ease-in;
        transition-timing-function:ease-out;
        ```
        
        ✔ 많이 쓰는 것
        
        - `ease` → 기본 (부드러움)
        - `linear` → 일정한 속도
    - transition-delay
        
        # 4️⃣ `transition-delay`
        
        👉 애니메이션 시작 전 대기 시간
        
        ```css
        transition-delay: 0.2s;
        ```
        
        👉 0.2초 뒤 시작
        
    - transition-behavior
        
        # 5️⃣ `transition-behavior` (요즘 추가된 개념)
        
        👉 애니메이션 적용 방식 제어
        
        ```css
        transition-behavior:normal;
        transition-behavior:allow-discrete;
        ```
        
        ✔ `allow-discrete`
        
        👉 display 같은 **딱 끊기는 속성도 애니메이션 가능하게 시도**
        
        👉 아직 실무에서는 거의 안 씀
        
    - 축약형
        
        # 💡 축약형 (중요)
        
        ```
        transition:background-color 0.3sease 0.1s;
        ```
        
        👉 순서
        
        ```
        property duration timing-function delay
        ```
        
    - 코드, 실행 화면
        
        [화면 기록 2026-03-18 오후 6.20.40.mov](attachment:6b312a66-ef56-4ed8-b895-b340a28a95c0:화면_기록_2026-03-18_오후_6.20.40.mov)
        
        ```html
        <!DOCTYPE html>
        <html lang="ko">
          <head>
            <meta charset="UTF-8" />
            <title>transition 예제</title>
            <style>
              body {
                display: flex;
                gap: 20px;
                padding: 50px;
              }
        
              .box {
                width: 100px;
                height: 100px;
                background: purple;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
        
                transition-property: all;
                transition-duration: 0.4s;
                transition-timing-function: ease;
                transition-delay: 0s;
              }
        
              /* hover 시 변화 */
              .box:hover {
                background: orange;
                transform: scale(1.3) rotate(15deg);
              }
        
              /* delay 예제 */
              .delay {
                transition: all 0.5s ease 0.5s;
              }
        
              /* timing function 비교 */
              .linear {
                transition: all 0.5s linear;
              }
            </style>
          </head>
          <body>
            <div class="box">기본</div>
            <div class="box delay">delay</div>
            <div class="box linear">linear</div>
          </body>
        </html>
        
        ```
        
    
    ### 실습  🍠
    
    **`transition`** 키워드를 학습한 후, 해당 키워드와, **`transform에서 배운 특정 키워드를 활용`**하여, 아래와 같은 영상과 비슷하게 만들어주세요! (똑같을 필요는 없고, 기능만 같으면 됩니다.)
    
    단, **`transition 축약형`**을 사용해주세요!
    
    [화면 기록 2024-07-18 오후 7.51.38.mov](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/e6dc806f-17a6-483d-b55e-e3ae81b0d27c/%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.51.38.mov)
    
    - 코드 첨부 🍠
        
        ```html
        <!DOCTYPE html>
        <html lang="ko">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>transition 실습</title>
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
        
              body {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 120px;
                background: #fff;
                padding: 60px 0;
              }
        
              .diamond {
                width: 200px;
                height: 200px;
                transform: rotate(45deg);
                cursor: pointer;
                /* 축약형: property duration timing-function delay */
                transition: background-color 0.4s ease 0.05s, transform 0.4s ease 0.05s;
              }
        
              .diamond--pink {
                background-color: lightpink;
              }
        
              .diamond--pink:hover {
                background-color: purple;
                transform: rotate(45deg) scale(1.1);
              }
            </style>
          </head>
          <body>
            <div class="diamond diamond--pink"></div>
            <div class="diamond diamond--pink"></div>
            <div class="diamond diamond--pink"></div>
          </body>
        </html>
        
        ```
        
    - 실행 영상 첨부 🍠
        
        [화면 기록 2026-03-18 오후 10.57.12.mov](attachment:ecbedcda-c7c8-4521-8726-59ba66b31f4a:화면_기록_2026-03-18_오후_10.57.12.mov)
        
- animation 🍠
    
    ### animation 🍠
    
    <aside>
    💡 아래 키워드에 대해 학습한 후, 실습을 진행하시고 코드와 실행 영상을 남겨주세요!
    
    </aside>
    
    - animation-name
        
        ## 1️⃣ `animation-name`
        
        👉 사용할 **애니메이션 이름 지정**
        
        ```css
        animation-name:move;
        ```
        
        ✔ 반드시 `@keyframes`랑 이름 같아야 함
        
    - animation-duration
        
        ## 2️⃣ `animation-duration`
        
        👉 애니메이션 **진행 시간**
        
        ```css
        animation-duration: 1s;
        ```
        
        ✔ 단위: `s`, `ms`
        
    - animation-delay
        
        ## 3️⃣ `animation-delay`
        
        👉 시작 전 **대기 시간**
        
        ```css
        animation-delay: 0.5s;
        ```
        
        👉 0.5초 뒤 시작
        
    - animation-direction
        
        ## 4️⃣ `animation-direction`
        
        👉 애니메이션 **방향**
        
        ```css
        animation-direction:normal;
        animation-direction:reverse;
        animation-direction:alternate;
        ```
        
        ✔ 자주 쓰는 것
        
        - `normal` → 정방향
        - `reverse` → 반대로
        - `alternate` → 왔다 갔다
    - animation-iteration-count
        
        ## 5️⃣ `animation-iteration-count`
        
        👉 반복 횟수
        
        ```css
        animation-iteration-count: 3;
        animation-iteration-count:infinite;
        ```
        
        ✔ `infinite` → 무한 반복
        
    - animation-play-state
        
        ## 6️⃣ `animation-play-state`
        
        👉 실행 / 정지
        
        ```css
        animation-play-state:running;
        animation-play-state:paused;
        ```
        
        ✔ hover 멈춤할 때 많이 씀
        
    - animation-timing-function
        
        ## 7️⃣ `animation-timing-function`
        
        👉 속도 변화 (가속 느낌)
        
        ```css
        animation-timing-function:ease;
        animation-timing-function:linear;
        ```
        
        ✔
        
        - `ease` → 부드럽게
        - `linear` → 일정 속도
    - animation-fill-mode
        
        ## 8️⃣ `animation-fill-mode`
        
        👉 애니메이션 끝난 후 상태
        
        ```css
        animation-fill-mode:forwards;
        animation-fill-mode:backwards;
        animation-fill-mode:both;
        ```
        
        ✔
        
        - `forwards` → 끝 상태 유지
        - `backwards` → 시작 전 상태 적용
        - `both` → 둘 다 적용
    - @keyframes
        
        ## 9️⃣ `@keyframes`
        
        👉 **애니메이션 실제 동작 정의**
        
        ```css
        @keyframesmove {
        from {
            transform:translateX(0);
          }
        to {
            transform:translateX(200px);
          }
        }
        ```
        
        또는
        
        ```css
        @keyframesmove {
        0% { transform:translateX(0); }
        50% { transform:translateX(100px); }
        100% { transform:translateX(200px); }
        }
        ```
        
    - 축약형
        
        ## 💡 축약형 (핵심)
        
        ```css
        animation:move 1sease 0.3sinfinitealternateforwards;
        ```
        
        👉 순서
        
        ```css
        name duration timing-function delay iteration direction fill-mode
        ```
        
    - 코드, 실행 영상
        
        [화면 기록 2026-03-18 오후 11.11.16.mov](attachment:f3c3a321-21c7-4a57-80d6-1b76b122f32d:화면_기록_2026-03-18_오후_11.11.16.mov)
        
        ```html
        <!DOCTYPE html>
        <html lang="ko">
          <head>
            <meta charset="UTF-8" />
            <title>animation 예제</title>
            <style>
              body {
                display: flex;
                gap: 20px;
                padding: 50px;
              }
        
              .box {
                width: 100px;
                height: 100px;
                background: purple;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
              }
        
              /* 기본 애니메이션 */
              .basic {
                animation-name: move;
                animation-duration: 1s;
                animation-iteration-count: infinite;
              }
        
              /* delay */
              .delay {
                animation: move 1s ease 0.5s infinite;
              }
        
              /* alternate */
              .alternate {
                animation: move 1s ease infinite alternate;
              }
        
              /* forwards */
              .forwards {
                animation: move 1s ease forwards;
              }
        
              /* hover 시 멈춤 */
              .pause:hover {
                animation-play-state: paused;
              }
        
              /* keyframes */
              @keyframes move {
                from {
                  transform: translateX(0);
                }
                to {
                  transform: translateX(200px);
                }
              }
            </style>
          </head>
          <body>
            <div class="box basic">기본</div>
            <div class="box delay">delay</div>
            <div class="box alternate">왕복</div>
            <div class="box forwards">끝유지</div>
            <div class="box pause">hover 멈춤</div>
          </body>
        </html>
        ```
        
    
    [animation - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)
    
    ### 실습  🍠
    
     **`animation 키워드`**를 학습한 후, 아래와 비슷한 영상을 만들어주세요!
    
    단, **`animation 축약형`**을 사용해주세요!
    
    - [x]  원은 어떻게 만들까요?
    - Hint
        
        **`border-radius` 를 활용해봅시다~!**
        
    - [x]  계속 튀기는 애니메이션은 어떻게 하면 쉽게 만들까요?
    - Hint
        
        `infinte`, `alternate` 속성을 활용해봅시다!
        
    
    [화면 기록 2024-07-18 오후 8.01.20.mov](https://prod-files-secure.s3.us-west-2.amazonaws.com/e57bc1c9-a051-46a7-9c15-f5e2f1fea50c/6c0aa987-9afa-4c7b-8096-51940175eeb4/%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.01.20.mov)
    
    - 코드 첨부 🍠
        
        ```html
        <!DOCTYPE html>
        <html lang="ko">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>animation 실습</title>
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
        
              body {
                height: 100vh;
                background: #fff;
                display: flex;
                align-items: flex-end;
                justify-content: center;
                padding-bottom: 80px;
              }
        
              .ball {
                width: 160px;
                height: 160px;
                background-color: #8b008b;
                border-radius: 50%;
                /* 축약형: name duration timing-function delay iteration-count direction */
                animation: bounce 0.6s cubic-bezier(0.33, 0, 0.66, 0) 0s infinite
                  alternate;
              }
        
              @keyframes bounce {
                /* 꼭대기: 원 */
                from {
                  transform: translateY(-400px);
                  border-radius: 50%;
                  width: 160px;
                  height: 160px;
                }
                /* 바닥: 가로로 납작한 타원 */
                to {
                  transform: translateY(0);
                  border-radius: 50%;
                  width: 180px;
                  height: 140px;
                }
              }
            </style>
          </head>
          <body>
            <div class="ball"></div>
          </body>
        </html>
        
        ```
        
    - 실행 영상 첨부 🍠
        
        [화면 기록 2026-03-18 오후 11.16.01.mov](attachment:c3cd1833-a228-4db2-bd06-30b387ba4c11:화면_기록_2026-03-18_오후_11.16.01.mov)
        
- CSS 방법론 BEM 🍠
    
    <aside>
    💡
    
    아래 블로그를 참고하여 **BEM 방법론**에 대해 직접 정리해 보세요.
    
    </aside>
    
    [개발자 매튜 | BEM CSS 방법론 실전 가이드 - 예제로 배우는 네이밍 규칙](https://www.yolog.co.kr/post/css-bem-methodology)
    
    - 정리
        
        # 📦 BEM 방법론 정리
        
        ## 1. BEM이란?
        
        BEM은 CSS 클래스 네이밍 규칙으로
        
        **Block / Element / Modifier** 3가지로 구성된다.
        
        ```css
        .block {}
        .block__element {}
        .block--modifier {}
        .block__element--modifier {}
        ```
        
        👉 핵심 목적
        
        - 클래스 충돌 방지
        - 구조 명확화
        - 유지보수 쉽게
        
        ---
        
        ## 2. Block (블록)
        
        ### ✔ 개념
        
        독립적으로 존재하는 **컴포넌트 단위**
        
        ### ✔ 특징
        
        - 혼자서 의미 있음
        - 어디든 재사용 가능
        - 다른 요소에 의존하지 않음
        
        ### ✔ 예시
        
        ```css
        .card {}
        .header {}
        .button {}
        ```
        
        ```html
        <div class="card"> </div>
        ```
        
        👉 “이건 하나의 완성된 UI 덩어리다” = Block
        
        ---
        
        ## 3. Element (요소)
        
        ### ✔ 개념
        
        Block을 구성하는 내부 요소
        
        ### ✔ 규칙
        
        - `__` (더블 언더스코어) 사용
        - 반드시 Block에 속해야 함
        
        ```css
        .card__title {}
        .card__image {}
        .card__button {}
        ```
        
        ```html
        <div class="card">
        <h2 class="card__title"> </h2>
        </div>
        ```
        
        ---
        
        ### ❌ 잘못된 사용
        
        ```css
        .card__header__title❌
        ```
        
        👉 Element 안에 또 Element 만들지 않음
        
        ### ✅ 올바른 방식
        
        ```css
        .card__header {}
        .card__title {}
        ```
        
        ---
        
        ## 4. Modifier (수정자)
        
        ### ✔ 개념
        
        상태, 스타일, 변형을 나타냄
        
        ### ✔ 규칙
        
        - `-` (더블 대시) 사용
        - 단독 사용 ❌ (반드시 원본 클래스와 함께)
        
        ```css
        .button--primary {}
        .card--featured {}
        .card__button--disabled {}
        ```
        
        ```html
        <button class="button button--primary">버튼</button>
        ```
        
        ---
        
        ## 5. Modifier 종류
        
        ### 1️⃣ 상태 (Boolean)
        
        ```css
        .menu__item--active {}
        .button--disabled {}
        ```
        
        👉 on/off 느낌
        
        ---
        
        ### 2️⃣ 값 기반 (Key-Value)
        
        ```css
        .button--size-large {}
        .card--theme-dark {}
        ```
        
        👉 옵션 느낌
        
        ---
        
        ## 6. 핵심 패턴
        
        👉 **기본 + Modifier 조합**
        
        ```html
        <button class="button button--large button--primary">
        ```
        
        👉 장점
        
        - 재사용성 ↑
        - 코드 중복 ↓
        
        ---
        
        ## 7. BEM의 장점
        
        ### ✅ 1. 클래스 충돌 없음
        
        ```css
        .card__title
        .modal__title
        ```
        
        👉 완전히 분리됨
        
        ---
        
        ### ✅ 2. 구조가 명확함
        
        ```css
        .product-card__button
        ```
        
        👉 어디 소속인지 바로 알 수 있음
        
        ---
        
        ### ✅ 3. 유지보수 쉬움
        
        - 영향 범위 명확
        - 안전하게 수정/삭제 가능
        
        ---
        
        ### ✅ 4. 협업에 유리
        
        - 규칙 통일
        - 코드 이해 쉬움
        
        ---
        
        ## 8. BEM 사용 시 주의사항
        
        ### ❌ 1. Element 중첩 금지
        
        ```css
        .card__header__title❌
        ```
        
        ---
        
        ### ❌ 2. Modifier 단독 사용 금지
        
        ```css
        <buttonclass="--primary"> ❌
        ```
        
        ---
        
        ### ❌ 3. 의미 없는 이름 금지
        
        ```css
        .card__div❌
        .card__element1❌
        ```
        
        ---
        
        ## 9. BEM vs 일반 CSS
        
        ### ❌ 기존 방식
        
        ```css
        .title {}
        .button {}
        .active {}
        ```
        
        👉 어디에 쓰는지 모름 + 충돌 위험
        
        ---
        
        ### ✅ BEM 방식
        
        ```css
        .card__title {}
        .button--primary {}
        .navigation__item--active {}
        ```
        
        👉 의미 + 구조 + 안전성 확보
        
        ---
        
        ## 🎯 한 줄 핵심 정리
        
        👉 **BEM = “컴포넌트 기반으로 이름을 체계적으로 짓는 규칙”**
        
        ---
        
        ## 💡 진짜 중요한 포인트 (실무 감각)
        
        - Block = 컴포넌트
        - Element = 내부 구조
        - Modifier = 상태/옵션
        
        👉 결국 이거임:
        
        ```
        컴포넌트 + 구조 + 상태
        ```