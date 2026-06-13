- **리액트 렌더링 최적화**와 **`Referential Equality`**는 어떤 관계가 있을까요? 🍠

  ## 리액트는 **"참조가 바뀌었냐?"를 기준으로 리렌더링 여부를 결정**하는 프레임워크이다.

  ### 리액트의 기본 리렌더링 규칙

  리액트 컴포넌트는 세 가지 경우에 리렌더링된다.
  1. `state`가 바뀔 때
  2. `props`가 바뀔 때
  3. 부모 컴포넌트가 리렌더링될 때

  여기서 "바뀌었다"를 판단하는 기준이 바로 **참조 동일성(`===`)**이다.

  ***

  ### 문제: 객체/배열/함수는 매 렌더링마다 새로 만들어진다

  ```jsx
  function Parent() {
    const options = { theme: 'dark' }; // 매 렌더링마다 새 객체
    return <Child options={options} />;
  }
  ```

  `options`의 내용은 똑같아도, 렌더링마다 새 객체가 만들어지므로 참조가 달라진다. 리액트 입장에서는 **"props가 바뀌었다"** 고 판단하고 `Child`를 리렌더링한다.

  ***

  ### 해결: useMemo, useCallback

  `useMemo`와 `useCallback`은 **"의존성이 바뀌지 않으면 같은 참조를 재사용"** 하는 훅이다.

  ```jsx
  function Parent() {
    // deps가 안 바뀌면 같은 객체 참조를 유지한다
    const options = useMemo(() => ({ theme: 'dark' }), []);
    const handleClick = useCallback(() => {
      /* ... */
    }, []);

    return <Child options={options} onClick={handleClick} />;
  }
  ```

  참조가 유지되므로 `Child` 입장에서 props가 바뀐 것처럼 보이지 않는다.

  ***

  ### 해결: React.memo

  `React.memo`는 **"이전 props와 현재 props를 참조 동일성으로 비교해서, 같으면 리렌더링을 건너뛰는"** HOC이다.

  ```jsx
  const Child = React.memo(function Child({ options, onClick }) {
    return <div>{options.theme}</div>;
  });
  ```

  `React.memo`가 효과를 발휘하려면, 부모에서 넘기는 props의 참조가 안정적으로 유지되어야 한다. `useMemo` / `useCallback` 없이 쓰면 의미가 없다.

  ***

  ### 핵심 흐름 정리

  ```
  부모 리렌더링
      ↓
  props로 객체/함수를 넘김
      ↓
  참조가 바뀌었는가? (===)
      ↓ YES              ↓ NO
  자식 리렌더링    자식 리렌더링 스킵
  ```

  즉, 리액트 렌더링 최적화는 **"불필요하게 참조를 새로 만들지 않는 것"** 이 핵심이다. `useMemo`, `useCallback`, `React.memo`는 모두 이 참조 안정성을 지키기 위한 도구이다.

  ***

  ### 주의할 점

  참조가 같아도 **객체를 직접 수정(mutation)** 하면 리액트가 변경을 감지하지 못한다.

  ```jsx
  // ❌ 리액트가 변경을 감지 못한다
  state.count += 1;
  setState(state); // 참조가 그대로라 리렌더링 안 됨

  // ✅ 새 객체를 만들어야 한다
  setState({ ...state, count: state.count + 1 });
  ```

  이것이 리액트에서 **불변 패턴(새 객체 생성)**을 강조하는 이유이다.

- **`useCallabck`** 에 대하여 정리해주세요! 🍠

  # **`useCallabck`** 에 대하여 정리해주세요! 🍠

  ***
  - **`useCallabck`** 이 무엇인지? 🍠

    # **`useCallabck`** 이 무엇인지?

    ***
    - 함수(콜백)를 “메모이제이션” 한다는 게 무슨 뜻인지?
      메모이제이션이란 "이전에 계산한 결과를 저장해두고, 같은 조건이면 다시 계산하지 않고 저장해둔 걸 재사용하는 것"이다.
      `useCallback`은 **함수 자체**를 저장해두는 것이다.
      - `useMemo`는 함수를 **실행한 결과값**을 캐싱한다.
      - `useCallback`은 함수를 **실행하지 않고, 함수 자체**를 캐싱한다.

      ```tsx
      // useMemo: 함수 실행 결과를 캐싱한다
      const result = useMemo(() => computeExpensiveValue(a, b), [a, b]);

      // useCallback: 함수 자체를 캐싱한다
      const fn = useCallback(() => doSomething(a, b), [a, b]);
      ```

    - 언제 새 함수를 만들고, 언제 기존 함수를 재사용하는지?
      - **deps(의존성 배열)가 바뀌지 않았을 때** → 이전에 저장해둔 같은 함수를 돌려준다.
      - **deps가 하나라도 바뀌었을 때** → 새로운 함수를 만들어서 돌려주고, 저장해둔다.
        비교 알고리즘은 `Object.is`이다 (`===`와 거의 동일).

  - 왜 **`useCallabck`**을 사용하는지? 🍠
    # 왜 **`useCallabck`**을 사용하는지?
    ***
    - **불필요한 리렌더링 방지**와 어떤 관련이 있는지
      ```tsx
      // 렌더링마다 새 함수가 생긴다 (참조가 다르다)
      function Parent() {
        function handleClick() {
          /* ... */
        }
        return;
      }
      ```
      `Child`가 `React.memo`로 감싸져 있어도, `onClick`의 참조가 매번 달라지므로 리렌더링을 막을 수 없다.
      `useCallback`으로 감싸면 deps가 바뀌지 않는 한 같은 참조를 유지하므로, `React.memo`가 제대로 작동한다.
      ```tsx
      function Parent() {
        const handleClick = useCallback(() => {
          /* ... */
        }, []);
        return;
      }
      ```
    - 성능 최적화 관점에서 얻는 이득 vs 남용했을 때의 오버헤드
      **이득이 있는 경우**
      - `React.memo`로 감싼 자식 컴포넌트에 콜백을 넘길 때
      - `useEffect`의 의존성 배열에 함수가 들어갈 때
      - 커스텀 훅에서 반환하는 함수를 안정적으로 유지하고 싶을 때
        **남용했을 때 오버헤드**
        `useCallback` 자체도 비용이 있다. deps 비교, 함수 저장, 클로저 유지 모두 메모리와 연산을 사용한다.
        자식 컴포넌트가 느리지 않거나, `React.memo`가 없다면 `useCallback`은 오히려 코드만 복잡하게 만든다.
        > **`useCallback`은 성능 최적화 도구이다. 코드가 `useCallback` 없이도 잘 동작한다면, 먼저 근본 원인을 찾아 고쳐야 한다.**
  - **`useCallabck`** 기본 사용법 🍠

    # **`useCallabck`** 기본 사용법

    ***
    - **`useCallabck`**은 어떻게 사용하나요? (코드)

      ```tsx
      import { useCallback } from 'react';

      function ProductPage({ productId, referrer }) {
        const handleSubmit = useCallback(
          (orderDetails) => {
            post('/product/' + productId + '/buy', {
              referrer,
              orderDetails,
            });
          },
          [productId, referrer] // deps
        );

        return;
      }
      ```

    - `deps` 배열에 무엇을 넣어야 하는지 규칙
      콜백 함수 안에서 사용하는 **모든 리액티브 값**을 넣어야 한다.
      - `props`
      - `state`
      - 컴포넌트 안에서 선언된 변수/함수
      ```tsx
      // productId, referrer를 함수 안에서 쓰므로 deps에 넣는다
      const handleSubmit = useCallback(
        (orderDetails) => {
          post('/product/' + productId + '/buy', { referrer, orderDetails });
        },
        [productId, referrer]
      );
      ```
      ESLint의 `exhaustive-deps` 규칙을 켜두면 자동으로 경고해준다.
    - 의존성 변경 시 콜백이 어떻게 다시 만들어지는지
      ```
      첫 렌더링   → 함수를 만들어서 저장한다
      재렌더링    → deps를 Object.is로 비교한다
                    ├ 바뀐 게 없다 → 저장해둔 함수를 그대로 반환한다
                    └ 하나라도 바뀌었다 → 새 함수를 만들어 저장하고 반환한다
      ```

  - **`useCallabck`**에서 중요한 개념 🍠

    # **`useCallabck`**에서 중요한 개념

    ***
    - **참조 동일성(reference equality)** 이 왜 중요한지 (=== 비교)
      리액트는 props가 바뀌었는지를 `===`로 비교한다.
      함수는 렌더링마다 새로 만들어지면 내용이 같아도 참조가 다르므로 `===`가 `false`가 된다.
      `useCallback`은 deps가 유지되는 한 같은 참조를 돌려주므로 `===`가 `true`가 되어, `React.memo`가 리렌더링을 스킵할 수 있다.

      ```tsx
      // useCallback 없이
      handleClick === handleClick; // 다음 렌더에서 false

      // useCallback 사용
      handleClick === handleClick; // deps 안 바뀌면 true
      ```

    - 클로저와 상태: 콜백 안에서 state, props를 사용할 때 주의할 점
      `useCallback`으로 만든 함수는 클로저이다. 함수가 만들어진 시점의 state/props 값을 캡처한다.
      deps를 올바르게 지정하지 않으면, 함수 안의 값이 오래된 값(stale)을 참조하게 된다.
    - **stale closure(낡은 값 캡처)** 문제는 언제 생기는지, 어떻게 피하는지
      deps에 사용하는 값을 빠뜨렸을 때 발생한다.

      ```tsx
      // ❌ count가 deps에 없다. 항상 초기값 0을 캡처한다.
      const handleClick = useCallback(() => {
        console.log(count); // 항상 0
      }, []);

      // ✅ count를 deps에 넣는다
      const handleClick = useCallback(() => {
        console.log(count);
      }, [count]);
      ```

      **state 업데이트 시 stale closure를 피하는 방법**
      updater 함수를 사용하면 deps에서 state를 제거할 수 있다.

      ```tsx
      // ❌ todos를 deps에 넣어야 해서 콜백이 자주 바뀐다
      const handleAdd = useCallback(
        (text) => {
          setTodos([...todos, { id: nextId++, text }]);
        },
        [todos]
      );

      // ✅ updater 함수를 사용하면 deps에서 todos를 제거할 수 있다
      const handleAdd = useCallback((text) => {
        setTodos((todos) => [...todos, { id: nextId++, text }]);
      }, []); // deps가 비어있어도 항상 최신 todos로 업데이트된다
      ```

  - **`useCallabck`**을 사용한 콜백 메모이제이션 예시 🍠

    # **`useCallabck`**을 사용한 콜백 메모이제이션 예시

    ***
    - 부모에서 자식으로 콜백을 내려줄 때, `onClick`, `onChange` 같은 핸들러를 **`useCallabck`** 없이 넘겼을 때와 **`useCallabck`**으로 감싸서 넘겼을 때 차이
      **useCallback 없는 경우**

      ```tsx
      function Parent() {
        // 렌더링마다 새 함수가 생긴다
        function handleSubmit(orderDetails) {
          post('/buy', { orderDetails });
        }

        return;
        // ShippingForm이 React.memo로 감싸여 있어도 항상 리렌더링된다
      }
      ```

      **useCallback 사용하는 경우**

      ```tsx
      function Parent({ productId, referrer }) {
        // deps가 바뀌지 않으면 같은 함수 참조를 유지한다
        const handleSubmit = useCallback(
          (orderDetails) => {
            post('/product/' + productId + '/buy', { referrer, orderDetails });
          },
          [productId, referrer]
        );

        return;
        // deps가 안 바뀌면 ShippingForm은 리렌더링을 스킵한다
      }

      const ShippingForm = React.memo(function ShippingForm({ onSubmit }) {
        // ...
      });
      ```

      `useCallback`과 `React.memo`는 **세트**로 쓸 때 효과가 있다. 둘 중 하나만 쓰면 의미가 없다.

  - 이벤트 핸들러 / 비동기 로직에서 **`useCallabck`** 예시 🍠

    # 이벤트 핸들러 / 비동기 로직에서 **`useCallabck`** 예시

    ***
    - 버튼 클릭 시 API 호출하는 핸들러를 `useCallback`으로 감싸는 패턴

      ```tsx
      function UserProfile({ userId }) {
        const [loading, setLoading] = useState(false);

        const handleFetch = useCallback(async () => {
          setLoading(true);
          try {
            const data = await fetchUser(userId);
            console.log(data);
          } finally {
            setLoading(false);
          }
        }, [userId]); // userId가 바뀔 때만 새 함수를 만든다

        return 불러오기;
      }
      ```

    - `useEffect` 안에서 의존성으로 콜백을 넣을 때 패턴
      함수를 `useEffect`의 deps에 넣으면, 함수가 매 렌더링마다 새로 만들어지므로 Effect가 계속 재실행된다.

      ```tsx
      // ❌ createOptions가 렌더링마다 새로 만들어져서 Effect가 계속 실행된다
      function ChatRoom({ roomId }) {
        function createOptions() {
          return { serverUrl: '<https://localhost:1234>', roomId };
        }

        useEffect(() => {
          const connection = createConnection(createOptions());
          connection.connect();
          return () => connection.disconnect();
        }, [createOptions]); // 매 렌더링마다 재실행된다
      }
      ```

      **방법 1: useCallback으로 함수를 안정화한다**

      ```tsx
      // ✅ roomId가 바뀔 때만 createOptions가 새로 만들어진다
      function ChatRoom({ roomId }) {
        const createOptions = useCallback(() => {
          return { serverUrl: '<https://localhost:1234>', roomId };
        }, [roomId]);

        useEffect(() => {
          const connection = createConnection(createOptions());
          connection.connect();
          return () => connection.disconnect();
        }, [createOptions]);
      }
      ```

      **방법 2 (더 권장): 함수를 Effect 안으로 옮긴다**

      ```tsx
      // ✅ useCallback이 필요 없어진다
      function ChatRoom({ roomId }) {
        useEffect(() => {
          function createOptions() {
            return { serverUrl: '<https://localhost:1234>', roomId };
          }

          const connection = createConnection(createOptions());
          connection.connect();
          return () => connection.disconnect();
        }, [roomId]); // roomId만 deps에 있으면 된다
      }
      ```

    - 폼 제출 핸들러, 디바운스/스로틀 함수와 함께 사용할 때

      ```tsx
      import { useCallback } from 'react';
      import { debounce } from 'lodash';

      function SearchInput({ onSearch }) {
        // 렌더링마다 debounce 함수가 새로 만들어지는 걸 막는다
        const debouncedSearch = useCallback(
          debounce((query) => {
            onSearch(query);
          }, 300),
          [onSearch]
        );

        return (
          <input
            onChange={(e) => debouncedSearch(e.target.value)}
            placeholder="검색어를 입력하세요"
          />
        );
      }
      ```

- **`memo`**에 대하여 정리해주세요!🍠

  # **`memo`**에 대하여 정리해주세요!🍠

  ***
  - **`memo`**가 무엇인지? 🍠
    # **`memo`**가 무엇인지?
    ***
    `memo`는 **props가 바뀌지 않으면 컴포넌트의 리렌더링을 건너뛰게 해주는** 리액트 함수이다.
    ```tsx
    const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
    ```
    컴포넌트를 `memo`로 감싸면, 부모가 리렌더링되더라도 **props가 이전과 같다면 리렌더링을 스킵**한다. 이렇게 만들어진 컴포넌트를 "메모이제이션된 컴포넌트"라고 부른다.
    단, 아래 경우는 `memo`로 감싸도 **항상 리렌더링된다.**
    - 컴포넌트 자신의 `state`가 바뀔 때
    - 컴포넌트가 사용하는 `context`가 바뀔 때
      `memo`는 **부모로부터 내려오는 props 변경**에만 반응하지 않는 것이다.
  - 왜 **`memo`**를 사용하는지? 🍠
    # 왜 **`memo`**를 사용하는지?
    ***
    리액트는 기본적으로 **부모가 리렌더링되면 자식도 함께 리렌더링**한다.
    ```tsx
    function Parent() {
      const [count, setCount] = useState(0);
      return (
        <>
          <button onClick={() => setCount(count + 1)}>+
           {/* count가 바뀔 때마다 리렌더링된다 */}
        </>
      );
    }
    ```
    `ExpensiveChild`는 `name` prop이 전혀 바뀌지 않아도, 부모가 바뀔 때마다 리렌더링된다.
    렌더링 비용이 크다면 이건 낭비이다.
    `memo`를 사용하면 props가 같으면 리렌더링을 스킵한다.
    ```tsx
    const ExpensiveChild = memo(function ExpensiveChild({ name }) {
      return { name };
    });
    // 이제 name이 바뀌지 않으면 리렌더링되지 않는다
    ```
    props 비교는 `Object.is`(`===`와 거의 동일)로 **얕은 비교(shallow equality)**를 한다.
  - **`memo`** 기본 사용법 🍠

    # **`memo`** 기본 사용법

    ***

    ### 기본 사용법

    컴포넌트를 `memo`로 감싸서 내보내면 된다.

    ```tsx
    import { memo } from 'react';

    const Greeting = memo(function Greeting({ name }) {
      return <h1>Hello, {name}!</h1>;
    });

    export default Greeting;
    ```

    이제 `Greeting`은 `name` prop이 바뀔 때만 리렌더링된다. 부모가 리렌더링되어도 `name`이 같다면 스킵한다.

    ***

    ### `memo` + `useMemo` / `useCallback` 세트로 쓰기

    `memo`는 props를 **얕은 비교(shallow equality)**로 확인한다. 객체나 함수는 렌더링마다 새로 만들어지면 참조가 달라져서 `memo`가 무력화된다.

    ```tsx
    // ❌ person 객체가 렌더링마다 새로 만들어진다 → memo 무력화
    function Page() {
      const [name, setName] = useState('kim');
      const person = { name }; // 매 렌더링마다 새 객체
      return <Profile person={person} />;
    }
    ```

    ```tsx
    // ✅ useMemo로 객체 참조를 안정화한다
    function Page() {
      const [name, setName] = useState('kim');
      const person = useMemo(() => ({ name }), [name]);
      return <Profile person={person} />;
    }

    const Profile = memo(function Profile({ person }) {
      // ...
    });
    ```

    가장 좋은 방법은 props를 객체 대신 **원시값으로 쪼개서 넘기는 것**이다.

    ```tsx
    // ✅ 원시값으로 넘기면 useMemo 없이도 얕은 비교가 정확히 작동한다
    function Page() {
      const [name, setName] = useState('kim');
      return <Profile name={name} />;
    }
    ```

    함수를 넘길 때는 `useCallback`으로 참조를 안정화한다.

    ```tsx
    // ✅ useCallback으로 함수 참조를 유지한다
    const handleClick = useCallback(() => {
      /* ... */
    }, []);
    return <Button onClick={handleClick} />;
    ```

    ***

    ### 커스텀 비교 함수 (`arePropsEqual`)

    기본 얕은 비교로 부족할 때, 두 번째 인자로 비교 함수를 직접 넘길 수 있다.

    ```tsx
    const Chart = memo(function Chart({ dataPoints }) {
      // ...
    }, arePropsEqual);

    function arePropsEqual(oldProps, newProps) {
      return (
        oldProps.dataPoints.length === newProps.dataPoints.length &&
        oldProps.dataPoints.every((oldPoint, index) => {
          const newPoint = newProps.dataPoints[index];
          return oldPoint.x === newPoint.x && oldPoint.y === newPoint.y;
        })
      );
    }
    ```

    `true`를 반환하면 리렌더링을 스킵하고, `false`를 반환하면 리렌더링한다.
    단, 함수 props를 비교에서 빠뜨리면 stale closure 버그가 생기고, 깊은 비교(deep equality)는 앱을 느리게 만들 수 있으므로 신중하게 써야 한다.

  - **`memo`**를 언제 쓰면 좋은지 / 안 좋은지 🍠
    # **`memo`**를 언제 쓰면 좋은지 / 안 좋은지
    ***
    ### 쓰면 좋은 경우
    **같은 props로 자주 리렌더링되고, 렌더링 비용이 클 때** 효과적이다.
    - 부모의 state가 자주 바뀌지만, 해당 자식의 props는 거의 바뀌지 않을 때
    - 리스트에서 개별 아이템 컴포넌트처럼 많은 인스턴스가 동시에 렌더링될 때
    - 렌더링에 눈에 띄는 지연이 있을 때 (React DevTools Profiler로 확인 후 적용)
    ***
    ### 쓰면 안 좋은 경우 (또는 효과 없는 경우)
    **props가 항상 바뀐다면** `memo`는 비교 비용만 추가할 뿐 효과가 없다.
    ```tsx
    // ❌ 매 렌더링마다 새 객체/함수를 넘기면 memo가 무력화된다
    function Parent() {
      return (
        <MemoizedChild
          options={{ theme: 'dark' }} // 매번 새 객체
          onClick={() => {}} // 매번 새 함수
        />
      );
    }
    ```
    이 경우 `useMemo` / `useCallback` 없이 `memo`만 쓰면 의미가 없다.
    그 외 쓰지 않는 게 나은 경우는 아래와 같다.
    - 렌더링이 이미 충분히 빠를 때 → 코드만 복잡해진다
    - props가 항상 달라질 수밖에 없는 구조일 때 → 비교 비용만 낭비된다
    ***
    ### `memo` 없이도 리렌더링을 줄이는 방법
    `memo`를 추가하기 전에 아래 방법을 먼저 고려하는 게 좋다.
    **1. 자식을 JSX children으로 넘긴다**
    부모의 state가 바뀌어도 children은 리렌더링되지 않는다.
    ```tsx
    // ✅ count가 바뀌어도 children은 리렌더링되지 않는다
    function Parent({ children }) {
      const [count, setCount] = useState(0);
      return (
        <div>
          <button onClick={() => setCount(count + 1)}>+</button>
          {children}
        </div>
      );
    }
    ```
    **2. state를 필요한 곳에만 둔다**
    state를 위로 올리지 않고, 필요한 컴포넌트 안에만 유지한다.
    **3. 렌더링 로직을 순수하게 유지한다**
    리렌더링 자체가 문제라면 먼저 버그를 찾아 고친다. `memo`로 덮는 건 근본 해결이 아니다.
    **4. 불필요한 Effect를 줄인다**
    Effect에서 state를 연쇄적으로 업데이트하는 패턴은 렌더링을 반복적으로 유발한다.
    ***
    ### React Compiler를 쓴다면?
    React Compiler를 활성화하면 `memo`를 수동으로 쓸 필요가 없다. 컴파일러가 자동으로 동일한 최적화를 적용해준다.

- **`useMemo`** 에 대하여 정리해주세요! 🍠

  # **`useMemo`** 에 대하여 정리해주세요! 🍠

  ***
  - **`useMemo`**가 무엇인지? 🍠

    # **`useMemo`**가 무엇인지? 🍠

    ***

    `useMemo`는 **계산 결과를 메모이제이션해서 리렌더링 사이에 재사용**할 수 있게 해주는 리액트 훅이다.

    ```tsx
    const cachedValue = useMemo(calculateValue, dependencies);
    ```

    - `calculateValue`: 캐싱할 값을 계산하는 순수 함수이다. 인자를 받지 않고, 어떤 타입의 값이든 반환할 수 있다.
    - `dependencies`: `calculateValue` 안에서 사용하는 모든 리액티브 값의 배열이다.
      처음 렌더링에서는 `calculateValue`를 실행해서 결과를 저장한다. 이후 렌더링에서는 deps를 `Object.is`로 비교해서, 바뀐 게 없으면 저장해둔 값을 그대로 돌려주고, 바뀌었으면 다시 계산한다.

  - 왜 **`useMemo`**를 사용하는지? 🍠

    # 왜 **`useMemo`**를 사용하는지? 🍠

    ***

    ### 1. 비싼 계산을 반복하지 않기 위해

    렌더링마다 실행하기엔 비용이 큰 계산이 있을 때, 관련된 데이터가 바뀌지 않으면 이전 결과를 재사용한다.

    ```tsx
    // theme이 바뀌어도 filterTodos가 다시 실행되지 않는다
    function TodoList({ todos, tab, theme }) {
      const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
      // ...
    }
    ```

    `theme`이 바뀌어도 `todos`와 `tab`이 그대로라면 `filterTodos`는 다시 실행되지 않는다.

    ***

    ### 2. 자식 컴포넌트의 불필요한 리렌더링을 막기 위해

    `React.memo`로 감싼 자식에게 배열/객체를 넘길 때, 매 렌더링마다 새로 만들어지면 참조가 달라져서 `memo`가 무력화된다. `useMemo`로 참조를 안정화하면 `memo`가 제대로 작동한다.

    ```tsx
    // ❌ visibleTodos가 매 렌더링마다 새 배열 → List가 항상 리렌더링됨
    const visibleTodos = filterTodos(todos, tab);

    // ✅ deps가 안 바뀌면 같은 배열 참조 유지 → List 리렌더링 스킵
    const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
    ```

  - **`useMemo`** 기본 사용법 🍠

    # **`useMemo`** 기본 사용법 🍠

    ***

    ### 기본 형태

    ```tsx
    import { useMemo } from 'react';

    function TodoList({ todos, tab }) {
      const visibleTodos = useMemo(
        () => filterTodos(todos, tab), // 캐싱할 계산 함수
        [todos, tab] // deps
      );

      return <ul>{visibleTodos.map(/* ... */)}</ul>;
    }
    ```

    ***

    ### deps 규칙

    계산 함수 안에서 사용하는 **모든 리액티브 값(props, state, 컴포넌트 내부 변수)**을 deps에 넣어야 한다.

    ```tsx
    // ❌ dep 배열 누락 → 매 렌더링마다 재계산된다
    const visibleTodos = useMemo(() => filterTodos(todos, tab));

    // ✅ dep 배열 명시
    const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
    ```

    ***

    ### 객체를 반환할 때 주의사항

    화살표 함수에서 객체를 바로 반환하려면 소괄호로 감싸거나, `return`을 명시해야 한다.

    ```tsx
    // ❌ {} 가 함수 바디로 해석된다 → undefined 반환
    const options = useMemo(() => {
      matchMode: 'whole-word',
      text: text
    }, [text]);

    // ✅ return 명시
    const options = useMemo(() => {
      return {
        matchMode: 'whole-word',
        text: text
      };
    }, [text]);
    ```

    ***

    ### `useMemo` vs `useCallback`

    ```tsx
    // useMemo: 함수를 실행한 결과값을 캐싱한다
    const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

    // useCallback: 함수 자체를 캐싱한다
    const handleSubmit = useCallback((orderDetails) => {
      post('/buy', orderDetails);
    }, []);

    // useCallback은 사실 아래와 동일하다
    const handleSubmit = useMemo(
      () => (orderDetails) => {
        post('/buy', orderDetails);
      },
      []
    );
    ```

    함수를 메모이제이션할 때는 `useMemo` 대신 `useCallback`을 쓰는 게 더 간결하다.

  - **`useMemo`**에서 중요한 개념 🍠

    # **`useMemo`**에서 중요한 개념 🍠

    ***

    ### 계산이 "비싼지" 어떻게 아는가?

    `console.time`으로 직접 측정하는 게 가장 정확하다.

    ```tsx
    console.time('filter array');
    const visibleTodos = filterTodos(todos, tab);
    console.timeEnd('filter array');
    // 결과: filter array: 0.15ms
    ```

    1ms 이상 걸린다면 `useMemo`를 고려할 만하다. 단, 개발 환경은 프로덕션보다 느리고, Strict Mode에서는 계산 함수가 두 번 실행된다. 정확한 측정은 프로덕션 빌드에서 해야 한다.

    ***

    ### `useMemo`는 첫 렌더링을 빠르게 하지 않는다

    `useMemo`는 업데이트 시 불필요한 재계산을 스킵하는 것이다. 첫 렌더링 속도와는 관계없다.

    ***

    ### Strict Mode에서 계산이 두 번 실행되는 이유

    Strict Mode에서 리액트는 계산 함수를 두 번 호출한다. 이는 개발 환경에서만 발생하며, 계산 함수가 순수한지 확인하기 위해서이다. 순수 함수라면 결과가 동일하므로 문제없다.

    ***

    ### 루프 안에서 `useMemo`를 쓸 수 없다

    훅은 컴포넌트 최상단에서만 호출해야 하므로, 루프 안에서는 쓸 수 없다. 이 경우 개별 아이템을 별도 컴포넌트로 분리해야 한다.

    ```tsx
    // ❌ 루프 안에서는 사용할 수 없다
    items.map((item) => {
      const data = useMemo(() => calculate(item), [item]);
    });

    // ✅ 컴포넌트로 분리한다
    function Report({ item }) {
      const data = useMemo(() => calculate(item), [item]);
      return <Chart data={data} />;
    }
    ```

  - **`useMemo`** 실전 예시 🍠

    # **`useMemo`** 실전 예시 🍠

    ***

    ### 1. 비싼 필터링 캐싱하기

    ```tsx
    function TodoList({ todos, tab, theme }) {
      // theme이 바뀌어도 filterTodos는 재실행되지 않는다
      const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

      return (
        <div className={theme}>
          {visibleTodos.map((todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </div>
      );
    }
    ```

    ***

    ### 2. `memo` + `useMemo` 세트로 자식 리렌더링 막기

    ```tsx
    // 부모
    function TodoList({ todos, tab, theme }) {
      const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

      return (
        <div className={theme}>
          <List items={visibleTodos} /> {/* theme이 바뀌어도 리렌더링 안 함 */}
        </div>
      );
    }

    // 자식
    const List = memo(function List({ items }) {
      return <ul>{items.map(/* ... */)}</ul>;
    });
    ```

    `theme`이 바뀌어도 `visibleTodos`의 참조가 유지되므로, `List`는 리렌더링을 스킵한다.

    ***

    ### 3. `useEffect` deps에 객체를 넣어야 할 때

    ```tsx
    // ❌ options가 매 렌더링마다 새 객체 → Effect가 계속 재실행됨
    function ChatRoom({ roomId }) {
      const options = { serverUrl: '<https://localhost:1234>', roomId };

      useEffect(() => {
        const connection = createConnection(options);
        connection.connect();
        return () => connection.disconnect();
      }, [options]); // 매 렌더링마다 새 참조라 계속 실행됨
    }

    // ✅ useMemo로 참조 안정화
    function ChatRoom({ roomId }) {
      const options = useMemo(
        () => ({
          serverUrl: '<https://localhost:1234>',
          roomId,
        }),
        [roomId]
      );

      useEffect(() => {
        const connection = createConnection(options);
        connection.connect();
        return () => connection.disconnect();
      }, [options]); // roomId가 바뀔 때만 재실행됨
    }

    // ✅✅ 더 좋은 방법: 객체를 Effect 안으로 옮긴다
    function ChatRoom({ roomId }) {
      useEffect(() => {
        const options = { serverUrl: '<https://localhost:1234>', roomId };
        const connection = createConnection(options);
        connection.connect();
        return () => connection.disconnect();
      }, [roomId]); // useMemo 없이도 깔끔하다
    }
    ```

    ***

    ### 4. 다른 훅의 deps에 객체를 넘길 때

    ```tsx
    // ❌ searchOptions가 매 렌더링마다 새 객체 → useMemo가 매번 재계산됨
    function Dropdown({ allItems, text }) {
      const searchOptions = { matchMode: 'whole-word', text };

      const visibleItems = useMemo(() => {
        return searchItems(allItems, searchOptions);
      }, [allItems, searchOptions]); // searchOptions가 항상 달라짐
    }

    // ✅ deps를 원시값으로 직접 넣는다
    function Dropdown({ allItems, text }) {
      const visibleItems = useMemo(() => {
        const searchOptions = { matchMode: 'whole-word', text };
        return searchItems(allItems, searchOptions);
      }, [allItems, text]); // text는 string이라 안정적으로 비교된다
    }
    ```

- **추가로 본인이 학습한 내용에 대해서 정리해주세요** 🍠
  # **추가로 본인이 학습한 내용에 대해서 정리해주세요** 🍠
  ***
  ### 배포(Deployment)란?
  배포는 내 컴퓨터(localhost)에서만 돌아가던 코드를 실제 사용자가 인터넷을 통해 접근할 수 있도록 서버에 올리는 과정이다.
  배포를 위해서는 두 가지 과정이 필요하다.
  - **빌드(Build):** React, TypeScript 등으로 작성한 코드를 브라우저가 이해할 수 있는 HTML, CSS, JS 파일로 변환한다.
  - **호스팅(Hosting):** 변환된 파일을 24시간 켜져 있는 서버에 올려두고, 요청이 오면 응답한다.
    과거에는 서버를 직접 구매하고, 리눅스를 설치하고, 코드를 수동으로 업로드해야 했다. 실수가 잦고 비용도 많이 들었다.
  ***
  ### Vercel이란?
  Vercel은 복잡한 서버 설정 없이 웹사이트를 쉽고 빠르게 배포할 수 있도록 도와주는 클라우드 플랫폼이다. Next.js를 만든 팀에서 개발해서 React 기반 프로젝트와 궁합이 특히 좋다.
  주요 특징은 아래와 같다.
  - GitHub 저장소를 연결하면 코드를 push할 때마다 자동으로 배포가 시작된다.
  - HTTPS, 도메인 설정 등을 자동으로 처리해준다.
  - 배포 전에 테스트 주소(Preview)를 생성해서 팀원들과 미리 확인할 수 있다.
  - 전 세계에 분산된 CDN 서버 덕분에 사용자 위치와 관계없이 빠른 응답 속도를 제공한다.
  ***
  ### CI/CD란?
  CI/CD는 개발부터 배포까지의 과정을 자동화해서, 더 자주 더 안전하게 코드를 배포할 수 있게 하는 방법론이다.
  - \*CI(Continuous Integration, 지속적 통합)\*\*는 여러 개발자가 작성한 코드를 자주 합치는 과정이다. 코드가 합쳐질 때마다 자동으로 테스트와 빌드를 실행해서 문제가 있는 코드가 메인 브랜치에 들어오는 걸 막는다.
  - \*CD(Continuous Deployment, 지속적 배포)\*\*는 CI를 통과한 코드를 자동으로 서버에 배포하는 과정이다. 개발자가 수동으로 파일을 업로드할 필요 없이, 코드만 작성하면 사용자에게 즉시 전달된다.
  ***
  ### 세 가지를 한눈에 비교하면?
  |           | 배포               | Vercel                  | CI/CD                           |
  | --------- | ------------------ | ----------------------- | ------------------------------- |
  | 개념      | 서비스 공개        | 배포 플랫폼             | 자동화 프로세스                 |
  | 역할      | 코드를 세상 밖으로 | 배포를 쉽게 해주는 도구 | 개발~배포를 연결하는 파이프라인 |
  | 핵심 가치 | 접근성             | 생산성                  | 안정성                          |
  ***
  ### 언제 사용하면 좋은가?
  - 만든 프로젝트를 URL 링크로 포트폴리오에 공유하고 싶을 때 → **Vercel**
  - 코드 수정마다 수동으로 빌드하고 업로드하기 번거로울 때 → **CI/CD**
  - 팀 프로젝트에서 팀원 코드가 에러 없이 잘 합쳐지는지 검증하고 싶을 때 → **CI (GitHub Actions 등)**
  - 실무와 유사한 배포 프로세스를 경험해보고 싶을 때 → **Vercel + CI/CD 조합**
    결국 Vercel과 CI/CD는 "개발자가 비즈니스 로직에만 집중할 수 있도록, 배포와 검증은 도구가 대신 처리해준다"는 철학을 실현하는 도구이다.
