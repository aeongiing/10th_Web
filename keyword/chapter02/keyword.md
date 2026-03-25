- JSX는 반드시 하나의 태그만 반환해야 한다.
    
    ## JSX는 반드시 하나의 태그만 반환해야 한다
    
    React 컴포넌트에서 JSX를 반환할 때는 **무조건 하나의 부모 태그**로 감싸야 해요.
    
    ---
    
    ### **⭕ 가능한 경우**
    
    ```tsx
    function App() {
      return (
         <strong>상명대학교</strong>
      )
    }
    export default App
    ```
    
    ### **❌ 불가능한 경우**
    
    ```tsx
    function App() {
      return (
         <strong>상명대학교</strong>
         <p>매튜/김용민</p>
      )
    }
    export default App
    ```
    
    ---
    
    <aside>
    🍠
    
    그러면, 위와 같이 **여러 개의 태그를 동시에 반환하려고 할 때**는 어떻게 해야 할까요?
    
    ### **<> </> (fragment) 사용!**
    
    </aside>
    
    - 답변 🍠
        
        ```jsx
        // 코드 아래 첨부
        function App(){
        	return (
        		<>
        			<strong>상명대학교</strong>
        			<p>매튜/김용민</p>
        		</>
        	)
        }
        
        export default App
        ```
        
        <aside>
        🍠
        
        이유: 
        
        ## 왜 `<> </>` (Fragment)를 쓰는 걸까?
        
        ```
        function App() {
        	return (
        		<>
        			<strong>상명대학교</strong>
        			<p>매튜/김용민</p>
        		</>
          );
        }
        ```
        
        👉 이유는 딱 하나다
        
        **“불필요한 DOM 요소를 만들지 않기 위해서”**
        
        ---
        
        ## 💡 div로 감싸면 생기는 문제
        
        ```
        function App() {
        	return (
        		<div>
        			<strong>상명대학교</strong>
        			<p>매튜/김용민</p>
        		</div>
        	);
        }
        ```
        
        👉 이렇게 하면 실제 DOM에는
        
        ```
        <div>
        	<strong>상명대학교</strong>
        	<p>매튜/김용민</p>
        </div>
        ```
        
        👉 **의미 없는 div가 하나 더 생김**
        
        ---
        
        ## ⚠️ 이게 왜 문제냐?
        
        - DOM 구조가 불필요하게 복잡해짐
        - CSS 깨질 수 있음 (특히 flex / grid)
        - 디버깅 어려워짐
        
        ---
        
        ## ✅ Fragment를 쓰면
        
        ```
        <>
        	<strong>상명대학교</strong>
        	<p>매튜/김용민</p>
        </>
        ```
        
        👉 실제 DOM은 이렇게 됨:
        
        ```
        <strong>상명대학교</strong>
        <p>매튜/김용민</p>
        ```
        
        👉 **추가 요소 없이 깔끔하게 렌더링**
        
        ---
        
        ## 🎯 언제 쓰냐?
        
        👉 “묶어야 하는데, div는 필요 없을 때”
        
        - 레이아웃 영향 주기 싫을 때
        - DOM 최소화하고 싶을 때
        - 의미 없는 wrapper 피하고 싶을 때
        
        ---
        
        ## 🧠 한 줄 정리
        
        👉 **Fragment = 그룹화는 하되, DOM에는 남기지 않는 wrapper**
        
        </aside>
        
    - 해설
        
        ```jsx
        function App() {
          return (
             <>
              <strong>상명대학교</strong>
              <p>매튜/김용민</p>
             </>
          )
        }
        
        export default App
        
        ```
        
        많은 분들이 `<> 빈 태그(Fragment)`의 존재를 잘 모르시는 경우가 있어요.
        
        여러 개의 태그를 반환해야 하지만, 특별히 **스타일링이나 레이아웃을 위해 부모 태그가 필요하지 않을 때**, 굳이 불필요한 `<div>` 같은 태그를 추가할 필요가 없어요.
        
        이럴 때는 `<> </>` **Fragment**를 사용하면, **추가적인 DOM 요소 없이** 여러 태그를 묶어서 반환할 수 있습니다.
        
        즉, 화면에는 불필요한 태그가 생기지 않고 코드도 훨씬 깔끔해져요.


다만, props가 많아지면 `props.tech`, `props.name`처럼 계속 적기 번거로워요.
그래서 우리가 이전에 핸드북 자바스크립트때 학습한 **구조 분해 할당**을 쓰면 코드가 훨씬 깔끔해져요.

<aside>
🍠

여러분들이, 직접 한번 구조분해 할당을 활용해서 어떻게 깔끔하게 코드를 작성할 수 있을지 고민해보세요!! 
저는 두가지 방식이 크게 떠오르는데요, 여러분들이 생각하는 방식으로 한번 해결해보세요! 저는 해설로 한번 저의 생각을 공유드릴테니 여러분들도 한번 직접 고민해보세요

</aside>

- 구조분해 할당 활용
    
    ### 기본
    
    ```tsx
    // props를 직접 사용해요.
    const List = (props) => {
      return (
        <li>
          {props.tech}
        </li>
      )
    }
    
    export default List
    ```
    
    ### 방법 1: 매개변수에서 바로 구조분해
    
    ```tsx
    const List = ({ tech }) => {
    	return <li>{tech}</li>;
    };
    ```
    
    ### 방법 2: 함수 안에서 구조분해
    
    ```tsx
    const List = (props) => {
    	const { tech } = props;
    	return <li>{tech}</li>;
    };
    ```
    
    ## 🔍 구조분해 할당이란?
    
    👉 **객체나 배열에서 값을 꺼내서 변수로 바로 만드는 문법**
    
    실무에서는 보통 **매개변수에서 바로 구조분해**하는 방식이 많이 보임 !
    
    ### 🔥 왜 실무에서 많이 쓰는가
    
    - 코드 짧아짐
    - 가독성 좋아짐
    - 필요한 값만 바로 꺼낼 수 있음
    
- 해설 🍠
    
    **방식 1) 매개변수에서 바로 구조 분해해요.**
    
    ```tsx
    const List = ({ tech }) => {
      return <li>{tech}</li>
    }
    
    export default List
    ```
    
    ---
    
    **방식 2) 함수 내부에서 구조 분해해요.**
    
    ```tsx
    const List = (props) => {
      const { tech } = props
      return <li>{tech}</li>
    }
    
    export default List
    ```

- **위의 영상과 블로그를 보고 Lazy Initialization(게으른 초기화)**에 대해 설명해주세요 🍠
    
    # 🧠 Lazy Initialization 핵심 개념
    
    ## ✅ 한 줄 정의
    
    > **초기값을 바로 계산하지 않고, 함수로 넘겨서 최초 렌더링 때만 실행하는 것**
    > 
    
    ---
    
    # 🔥 왜 필요할까?
    
    문제 상황부터 보면 이해가 쉽습니다.
    
    ```tsx
    const [data, setData] = useState(generateInitialData());
    ```
    
    이 코드에서 `generateInitialData()`는:
    
    - 컴포넌트가 **렌더링될 때마다 실행됨**
    - 즉, **state랑 상관없는 리렌더링에도 계속 실행됨**
    
    👉 결과
    
    → 불필요한 연산 반복
    
    → 성능 낭비 💥
    
    실제로 블로그에서도
    
    👉 “리렌더링마다 무거운 계산이 반복된다” 문제로 설명됨
    
    ---
    
    # 🚀 Lazy Initialization 적용
    
    ```tsx
    const [data, setData] = useState(generateInitialData);
    ```
    
    또는
    
    ```tsx
    const [data, setData] = useState(() => generateInitialData());
    ```
    
    ## 💡 차이 핵심
    
    | 방식 | 실행 시점 |
    | --- | --- |
    | `generateInitialData()` | 렌더링마다 실행 ❌ |
    | `generateInitialData` (함수 전달) | **초기 렌더링 때만 실행 ✅** |
    
    ---
    
    # ⚙️ 내부 동작 원리
    
    React는 이렇게 동작합니다:
    
    1. `useState`에 **값이 아니라 함수가 들어오면**
    2. **초기 렌더링 시에만 그 함수를 실행해서 초기값으로 사용**
    3. 이후 리렌더링에서는 **다시 실행하지 않음**
    
    👉 즉,
    
    - 초기화는 “lazy(게으르게)” 한 번만
    - 이후는 기존 값 재사용
    
    ---
    
    # 📌 실제 예시 (중요)
    
    ## ❌ 잘못된 코드 (매번 localStorage 접근)
    
    ```tsx
    const [theme, setTheme] = useState(localStorage.getItem("theme"));
    ```
    
    👉 렌더링할 때마다 localStorage 읽음 (비효율)
    
    ---
    
    ## ✅ Lazy Initialization 적용
    
    ```tsx
    const [theme, setTheme] = useState(
      () => localStorage.getItem("theme") || "light"
    );
    ```
    
    👉 처음 한 번만 실행됨 (성능 최적화)
    
    블로그에서도 이 패턴을 대표적인 사용 예로 설명함
    
    ---
    
    # 🎯 언제 써야 할까?
    
    다음 상황이면 무조건 써주는 게 좋습니다:
    
    ### 1️⃣ 무거운 연산
    
    - 배열 생성 (ex. 10만 개 데이터)
    - 정렬, 필터링
    
    ### 2️⃣ 외부 접근
    
    - `localStorage`
    - `sessionStorage`
    - 쿠키
    
    ### 3️⃣ 초기값 계산이 복잡한 경우
    
    ---
    
    # ❌ 안 써도 되는 경우
    
    ```tsx
    const [count, setCount] = useState(0);
    ```
    
    👉 단순 값이면 그냥 넣어도 OK
    
    (굳이 함수로 감쌀 필요 없음)
    
    ---
    
    # 🧩 핵심 요약
    
    - Lazy Initialization = **초기값을 함수로 넘겨서 1번만 실행**
    - 렌더링마다 실행되는 **불필요한 계산 방지**
    - 성능 최적화 핵심 패턴
    - `useState(() => value)` 형태로 사용
    
    ---
    
    # 💬 한 줄 정리
    
    > “Lazy Initialization은 useState의 초기값을 함수로 전달해서, 초기 렌더링 시에만 계산되도록 하여 불필요한 연산을 줄이는 최적화 기법.”
    > 
    
    ---
    
- **App.tsx** 파일에 직접 카운터가 1씩 증가, 1씩 감소하는 기능을 만들어주세요 🍠
    - 직접 작성한 코드 **App.tsx** 파일을 올려주세요!
        
        ```tsx
        import "./App.css";
        import { useState } from "react";
        
        function App() {
        	const [count, setCount] = useState(0);
        
        	const handleIncrement = () => {
        		setCount(count + 1);
        	};
        
        	const handleDecrement = () => {
        		setCount(count - 1); 
        	};
        
        	return (
        		<>
        			<h1>{count}</h1>
        			<button onClick={handleIncrement}>숫자 증가</button>
        			<button onClick={handleDecrement}>숫자 감소</button>
        		</>
        	);
        }
        
        export default App;
        ```
        
    - 정답 (스스로 혼자 해보고 꼭 열어서 확인해주세요!)
        
        ```tsx
        import { useState } from 'react';
        
        function App() {
          const [count, setCount] = useState(0);
        
          const handleIncrement = () => {
            setCount(count + 1);
          };
        
          const handleDecrement = () => {
            setCount(count - 1);
          };
        
          return (
            <>
              <h1>{count}</h1>
              <div>
                <button onClick={handleIncrement}>+1 증가</button>
                <button onClick={handleDecrement}>-1 감소</button>
              </div>
            </>
          );
        }
        
        export default App;
        
        ```
        
- 영상을 보고 실습을 하면서 몰랐던 개념들을 토글을 열어 정리해주세요 🍠
    
    # 📝 실습하면서 몰랐던 개념 정리
    
    이번 카운터 실습을 통해 React의 `useState`와 관련된 몇 가지 중요한 개념을 새롭게 이해하게 되었다.
    
    ---
    
    ## 1️⃣ State는 즉시 변경되지 않는다 (스냅샷)
    
    처음에는 `setCount(count + 1)`을 실행하면 `count` 값이 바로 바뀔 것이라고 생각했다.
    
    하지만 실제로는 현재 함수 내부에서는 값이 변하지 않고, **다음 렌더링에서 변경된 값이 반영된다**는 것을 알게 되었다.
    
    👉 즉, state는 즉시 바뀌는 값이 아니라
    
    - *렌더링 시점의 값을 기준으로 동작하는 “스냅샷”**이라는 개념을 이해하게 되었다.
    
    ---
    
    ## 2️⃣ setState는 값 변경이 아니라 “업데이트 요청”이다
    
    `setCount`는 값을 바로 바꾸는 함수가 아니라,
    
    **React에게 다음 렌더링에서 값을 바꿔달라고 요청하는 역할**을 한다는 것을 알게 되었다.
    
    이 개념을 이해하면서 왜 `console.log`를 찍으면 이전 값이 나오는지도 자연스럽게 이해할 수 있었다.
    
    ---
    
    ## 3️⃣ 상태 변경 → 리렌더링 → 화면 업데이트 흐름
    
    이번 실습을 통해 React는
    
    👉 상태(state)가 변경되면
    
    👉 컴포넌트를 다시 렌더링하고
    
    👉 그 결과가 화면에 반영된다는 흐름으로 동작한다는 것을 이해했다.
    
    즉, React는 직접 DOM을 조작하는 것이 아니라
    
    **state를 기반으로 UI를 다시 그리는 방식**이라는 점이 인상적이었다.
    
    ---
    
    ## 4️⃣ 같은 값으로 업데이트하면 리렌더링이 발생하지 않는다
    
    React는 이전 상태와 새로운 상태를 비교해서 값이 같으면 렌더링을 생략한다는 점도 새롭게 알게 되었다.
    
    👉 단순히 `setState`를 호출한다고 해서 항상 화면이 바뀌는 것이 아니라
    
    **값이 실제로 변경되어야만 렌더링이 일어난다**는 점이 중요하다.
    
    ---
    
    # 🎯 정리
    
    이번 실습을 통해
    
    - state는 즉시 변경되지 않는다
    - setState는 값 변경이 아니라 업데이트 요청이다
    - React는 state를 기준으로 렌더링된다
    
    라는 핵심 개념들을 이해할 수 있었다.