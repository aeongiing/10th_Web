- **useReducer** 학습 회고

    <aside>
    📢 이번 **useReducer** 실습을 해결해보면서 어땠는지 **회고**해봅시다.
    
    - **핵심 키워드**에 대해 완벽하게 이해했는지? 
    - **이해한 점 - 어려운 점 (개선 방법) - 회고** 순서로 작성해주세요.
    - **참고 자료**가 있다면 아래에 남겨주세요.
    
    </aside>
    
    ### ✅ 핵심 키워드 이해도
    
    `useReducer`, `reducer`, `dispatch`, `action`, `initialState`, `Context 연계`
    
    전반적으로 개념 자체는 이해했다. 특히 "왜 useState 대신 useReducer를 쓰는가"라는 질문에 스스로 답할 수 있게 된 것이 이번 학습의 핵심이었다.
    
    ---
    
    ### 💡 이해한 점
    
    `useState`는 단순한 값 하나를 바꿀 때 편리하지만, 상태 업데이트 케이스가 increment / decrement / reset처럼 여러 개로 나뉘기 시작하면 컴포넌트 안에 로직이 점점 쌓이는 문제가 생긴다.
    
    `useReducer`는 그 로직을 **reducer 함수 하나로 밖으로 꺼낼 수 있다**는 것이 핵심이다. 컴포넌트는 `dispatch({ type: "increment" })`만 날리면 되고, 실제로 어떻게 상태가 바뀌는지는 reducer가 전담하는 구조로, 관심사 분리가 자연스럽게 이루어진다는 것을 실습하면서 체감했다.
    
    또 TypeScript와 함께 사용할 때 `Action` 타입을 유니온으로 정의해두면 `dispatch`에서 자동완성이 되고 잘못된 타입은 컴파일 단계에서 잡히는 점도 좋았다. 폼 상태 관리 예제에서 `payload`까지 타입이 보장되는 것이 특히 실용적으로 느껴졌다.
    
    `dispatch`를 props로 내려보내는 패턴도 새로웠다. state 전체를 drilling하는 것이 아니라 dispatch 함수 하나만 내리면 하위 컴포넌트가 필요한 액션을 쏘는 구조가 꽤 깔끔하다고 생각했다.
    
    ---
    
    ### 🤔 어려운 점 & 개선 방법
    
    **어려웠던 부분은 reducer 함수를 처음 설계할 때**였다. 어떤 단위로 action을 쪼개야 하는지, payload를 언제 써야 하는지 감이 잘 안 잡혔다. Counter 예제는 단순해서 괜찮았지만, 폼 예제처럼 객체 상태가 들어오니 `...state` spread를 빠뜨리거나 케이스를 누락하는 실수가 나왔다.
    
    **개선 방법**: action 설계 전에 "이 상태가 어떤 이유로 바뀔 수 있는가"를 먼저 리스트업하고 그것을 action type으로 매핑하는 습관을 들이면 좋을 것 같다. 그리고 default 케이스에서 항상 `state`를 그대로 반환하는 것을 절대 빠뜨리지 말아야겠다고 다짐했다.
    
    `useReducer + Context` 조합은 개념은 이해했지만 아직 손에 익지는 않았다. Provider로 감싸고 `useContext`로 꺼내 쓰는 흐름을 실제 프로젝트에서 한 번 직접 구현해봐야 완전히 내 것이 될 것 같다.
    
    ---
    
    ### 📝 회고
    
    useState를 쓰다가 `if/else` 혹은 조건 분기가 늘어날 때마다 "이거 어딘가로 빼야 하는데"라는 느낌이 들었는데, useReducer가 그 해답이었다는 것이 이번에 명확해졌다. Redux를 처음 봤을 때 왜 저렇게 복잡하게 쓰는지 의아했는데, useReducer를 먼저 이해하고 나니 Redux의 철학도 자연스럽게 연결되는 느낌이었다.
    
    다음엔 Context와 묶어서 간단한 전역 상태 시스템을 직접 만들어보는 실습을 해볼 것이다.

- **`Redux Toolkit`** 사용법을 공식문서를 보며 직접 정리해보기 🍠
  [Getting Started | Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
  - Provider

    ## Provider

    `Provider`는 React 앱 전체에 Redux store를 공급하는 컴포넌트이다.
    `react-redux`에서 import해서 사용하며, 앱의 최상단을 감싸는 방식으로 사용한다.

    ```tsx
    import { Provider } from "react-redux";
    import { store } from "./store";

    root.render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    ```

    Provider로 감싸지 않으면 하위 컴포넌트에서 `useSelector`, `useDispatch`를 사용할 수 없다.

  - configureStore

    ## configureStore

    Redux store를 생성하는 함수이다. 기존 Redux의 `createStore`를 대체하며, 훨씬 간단하게 설정할 수 있다.

    ```tsx
    import { configureStore } from "@reduxjs/toolkit";
    import counterReducer from "./counterSlice";

    export const store = configureStore({
      reducer: {
        counter: counterReducer,
      },
    });

    // 타입 추출 (TypeScript에서 자주 사용)
    export type RootState = ReturnType<typeof store.getState>;
    export type AppDispatch = typeof store.dispatch;
    ```

    **기본으로 제공되는 것들:**
    - `redux-thunk` 미들웨어가 자동으로 포함된다.
    - Redux DevTools Extension이 자동으로 연결된다.
    - 여러 slice reducer를 `reducer` 객체에 넣으면 자동으로 합쳐진다.

  - createSlice

    ## createSlice

    Redux의 핵심 보일러플레이트를 한 번에 해결해주는 함수이다.
    slice 이름, 초기 상태, reducer 함수들을 한 객체에 정의하면 **action creator와 reducer를 자동으로 생성**해준다.

    ```tsx
    import { createSlice } from "@reduxjs/toolkit";

    interface CounterState {
      value: number;
    }

    const initialState: CounterState = {
      value: 0,
    };

    const counterSlice = createSlice({
      name: "counter", // slice 이름 (action type 접두사로 사용됨)
      initialState,
      reducers: {
        increment(state) {
          state.value += 1; // Immer 덕분에 직접 수정하는 것처럼 쓸 수 있다
        },
        decrement(state) {
          state.value -= 1;
        },
        incrementByAmount(state, action) {
          state.value += action.payload;
        },
      },
    });

    export const { increment, decrement, incrementByAmount } =
      counterSlice.actions;
    export default counterSlice.reducer;
    ```

    **핵심 포인트:**
    - `state.value += 1`처럼 직접 수정하는 코드를 써도 된다. 내부적으로 **Immer** 라이브러리가 불변성을 알아서 처리해주기 때문이다.
    - `createSlice`가 자동 생성하는 action type은 `"counter/increment"` 형태이다.
    - `counterSlice.actions`에서 action creator를 꺼내 쓴다.
    - `counterSlice.reducer`를 `configureStore`의 reducer에 등록한다.

  - useSelector

    ## useSelector

    Redux store의 상태를 컴포넌트에서 읽어오는 훅이다.

    ```tsx
    import { useSelector } from "react-redux";
    import { RootState } from "./store";

    function Counter() {
      const count = useSelector((state: RootState) => state.counter.value);

      return <h1>{count}</h1>;
    }
    ```

    **주의할 점:**
    - selector 함수가 반환하는 값이 바뀔 때만 컴포넌트가 리렌더링된다.
    - TypeScript 사용 시 `state: RootState` 타입을 명시해야 자동완성이 제대로 된다.
    - 필요한 값만 골라서 반환하는 것이 성능상 좋다. store 전체를 그대로 반환하는 것은 피해야 한다.

  - useDispatch

    ## useDispatch

    action을 store에 보내는 훅이다. `dispatch`를 가져와서 action creator와 함께 호출하면 상태가 업데이트된다.

    ```tsx
    import { useDispatch } from "react-redux";
    import { AppDispatch } from "./store";
    import { increment, incrementByAmount } from "./counterSlice";

    function Counter() {
      const dispatch = useDispatch<AppDispatch>();

      return (
        <div>
          <button onClick={() => dispatch(increment())}>+1</button>
          <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
        </div>
      );
    }
    ```

    **TypeScript에서의 팁:**
    `useDispatch<AppDispatch>()`처럼 타입을 명시하면 thunk를 dispatch할 때도 타입 오류가 나지 않는다. 매번 타입을 쓰기 번거롭다면 커스텀 훅으로 분리해두는 패턴이 자주 쓰인다.

    ```tsx
    // hooks.ts
    import { useDispatch, useSelector } from "react-redux";
    import type { RootState, AppDispatch } from "./store";

    export const useAppDispatch = () => useDispatch<AppDispatch>();
    export const useAppSelector = (selector: (state: RootState) => unknown) =>
      useSelector(selector);
    ```

  - 기타 **`Redux Toolkit`** 사용 방법을 상세하게 정리해 보세요

    ## 기타 Redux Toolkit 사용 방법

    ### createAsyncThunk — 비동기 처리

    API 호출 같은 비동기 로직을 처리할 때 사용한다. `pending` / `fulfilled` / `rejected` 세 가지 action을 자동으로 생성해준다.

    ```tsx
    import { createAsyncThunk } from "@reduxjs/toolkit";

    export const fetchUser = createAsyncThunk(
      "user/fetchUser",
      async (userId: number) => {
        const res = await fetch(`/api/users/${userId}`);
        return res.json();
      },
    );

    // slice의 extraReducers에서 처리
    const userSlice = createSlice({
      name: "user",
      initialState: { data: null, loading: false },
      reducers: {},
      extraReducers: (builder) => {
        builder
          .addCase(fetchUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
          });
      },
    });
    ```

    ### RTK Query — 데이터 페칭 & 캐싱

    `createApi`를 사용하면 데이터 페칭 로직을 훨씬 간단하게 관리할 수 있다. 자동으로 훅을 생성해주기 때문에 별도의 `useEffect` + `useState` 조합 없이도 API 호출이 가능하다.

    ```tsx
    import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

    export const apiSlice = createApi({
      reducerPath: "api",
      baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
      endpoints: (builder) => ({
        getUser: builder.query({
          query: (id) => `/users/${id}`,
        }),
      }),
    });

    export const { useGetUserQuery } = apiSlice;

    // 컴포넌트에서
    const { data, isLoading } = useGetUserQuery(userId);
    ```

    ***

    ## 전체 데이터 흐름 정리

    ```
    컴포넌트
      → useDispatch로 action dispatch
      → configureStore의 reducer가 받아서 처리
      → store의 state 업데이트
      → useSelector로 변경된 state를 컴포넌트에 반영
    ```

    useReducer + Context 조합보다 규모가 커지거나, 비동기 처리 / 캐싱 / DevTools 연동이 필요해지는 시점에 Redux Toolkit을 도입하는 것이 적절하다.

- **Zustand** 🍠

  # **Zustand** 🍠

  ***

    <aside>
    💡
    
    **Zustand** 또한 처음 접하실 때 다소 복잡하게 느껴질 수 있습니다. 하지만 이번 챕터에서는 제가 위에서 **Redux**와 **Redux Toolkit**에 대해 정리해 드린 것 처럼 여러분이 **스스로 탐색하고 정리하는 학습 습관을 기르는 것**을 목표로 하기 때문에, 기본 개념 설명은 따로 제공하지 않았습니다.
    
    대신, 아래의 권장 학습 방법을 따라가며 주도적인 학습 경험을 만들어 보세요.
    
    ---
    
    ### 1. 제공된 개념 설명 먼저 정독하기
    
    - 이번 챕터에 포함된 **Zustand 관련 개념 설명**을 먼저 차분히 읽어보며 전체적인 구조와 흐름을 잡아주세요.
    - 이해가 잘 되지 않는 부분은 표시해 두었다가, 공식 문서나 추가 자료 조사로 보완해 보시길 추천합니다.
    
    ### 2. 공식 문서 및 자료 추가 탐색
    
    - **Zustand** 공식 문서와 신뢰할 수 있는 블로그 글을 참고해 보세요.
    - 특히 다음 관점을 중심으로 학습하면 도움이 됩니다:
        - 제공된 개념 설명과 공식 문서의 내용이 어떻게 연결되는지
        - 예시 코드가 어떤 의도와 패턴을 기반으로 작성되었는지
    - 다른 상태관리 라이브러리(Redux Toolkit 등)와 비교해 보는 것도 이해에 도움이 됩니다.
    
    ### 3. 워크북 작성 원칙 (중요!)
    
    - 워크북의 각 토글을 하나씩 펼쳐 보면서
        
        **제공된 개념 설명 + 직접 찾아본 내용**을 기반으로 정리해 주세요.
        
    - ⚠️ **절대 복사/붙여넣기를 하지 마세요!** ⚠️
        
        직접 이해하고 자신의 문장으로 정리하는 과정이 학습 효과를 극대화합니다.
        
    
    ### 4. 영상 활용
    
    - 학습이 막막하게 느껴진다거나 다양한 내용을 알고 싶다면 아래 제공된 설명 영상을 참고해 주세요.
    - 영상의 실습 흐름에 맞춰 따라 하면서,
        - 개념 설명에서 읽은 내용
        - 공식 문서에서 확인한 API 및 패턴
            
            이 실제 코드에서 어떻게 적용되는지 연결해 보시면 훨씬 깊은 이해를 얻을 수 있습니다.
            
    
    ---
    
    앞으로의 개발 과정에서는 **필요한 지식을 스스로 탐색하고, 정리하고, 기록하는 능력**이 매우 중요해집니다.
    
    이번 미션을 통해 이러한 능력을 더욱 단단하게 쌓아 가시길 응원합니다! 🚀
    
    </aside>
    
    ### 🎥 강의 영상
    
    https://youtu.be/NOdAIlFreOI?si=958aros8pbEXNVsJ
    
    <aside>
    🍠
    
    위의 영상을 보고 **Zustand**에 대해 정리해주세요!
    
    또한 아래 공식문서 또한 읽어보시면서 부족한 내용을 보충해서 정리해주세요!
    
    </aside>
    
    ### 📚 공식 문서
    
    [Zustand](https://zustand-demo.pmnd.rs/)
    
    - **Zustand**란 무엇인가요? 🍠
        
        # **Zustand**란 무엇인가요?
        
        ---
        
        Zustand는 작고, 빠르고, 확장 가능한 훅 기반의 상태 관리 라이브러리이다. 보일러플레이트가 없고 특정 방식을 강요하지 않으면서도, flux 방식과 유사한 명확한 규칙을 갖추고 있다.이름은 독일어로 "상태(state)"를 의미한다. zombie child 문제, React 동시성, 혼합 렌더러 간 context 손실 같은 까다로운 문제들을 내부적으로 처리해주기 때문에, React 생태계에서 이 모든 것을 올바르게 처리하는 몇 안 되는 상태 관리자 중 하나이다.
        
    - 왜 **Zustand**를 사용할까요? 🍠
        
        # 왜 Zustand를 사용할까요?
        
        ---
        
        Zustand는 단순하고 의견을 강요하지 않으며, Redux처럼 앱 전체를 context provider로 감쌀 필요가 없다. 훅을 사용해 상태를 처리하고, 별도의 설정이 필요하지 않다.
        
        - **Provider 불필요**: 앱 최상단을 감쌀 필요 없이 어디서든 훅으로 바로 사용할 수 있다.
        - **보일러플레이트 최소화**: Redux처럼 action, reducer, dispatch를 따로 만들 필요 없이 store 하나에 다 담을 수 있다.
        - **선택적 구독**: 필요한 상태만 골라서 구독하므로 불필요한 리렌더링이 발생하지 않는다.
        - **비동기 지원 내장**: 비동기 로직을 store 안에 자연스럽게 담을 수 있다.
        - **미들웨어 지원**: persist, devtools, immer 등 다양한 미들웨어를 쉽게 붙일 수 있다.
    - **Zustand** 기본 사용법 🍠
        
        # **Zustand** 기본 사용법
        
        ---
        
        ### 1) Store 만들기
        
        `create` 함수로 store를 만든다. store 자체가 훅이며, 원시값, 객체, 함수 무엇이든 담을 수 있다. `set` 함수는 상태를 merge한다.
        
        ```tsx
        import { create } from 'zustand'
        
        interface BearState {
          bears: number
          increasePopulation: () => void
          removeAllBears: () => void
          updateBears: (newBears: number) => void
        }
        
        const useBearStore = create<BearState>((set) => ({
          bears: 0,
          increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
          removeAllBears: () => set({ bears: 0 }),
          updateBears: (newBears) => set({ bears: newBears }),
        }))
        ```
        
        ### 2) 컴포넌트에서 사용하기
        
        Provider 없이 어디서든 훅을 사용할 수 있다. 구독한 상태가 변경될 때만 해당 컴포넌트가 리렌더링된다.
        
        ```tsx
        function BearCounter() {
          const bears = useBearStore((state) => state.bears)
          return <h1>{bears}마리의 곰이 있어요</h1>
        }
        
        function Controls() {
          const increasePopulation = useBearStore((state) => state.increasePopulation)
          return <button onClick={increasePopulation}>+1</button>
        }
        ```
        
    - **Zustand**에서 중요한 개념 🍠
        
        # **Zustand**에서 중요한 개념
        
        ---
        
        ### 1) set 함수
        
        상태를 업데이트할 때 사용한다. 기존 상태와 자동으로 merge되므로 spread 연산자 없이도 원하는 필드만 업데이트할 수 있다.
        
        ```tsx
        // 직접 값 전달
        set({ bears: 0 })
        
        // 이전 상태를 기반으로 업데이트
        set((state) => ({ bears: state.bears + 1 }))
        ```
        
        ### 2) get 함수
        
        store 내부에서 현재 상태를 읽을 때 사용한다. action 안에서 다른 상태 값을 참조해야 할 때 유용하다.
        
        ```tsx
        const useStore = create<State>((set, get) => ({
          count: 0,
          double: () => {
            const current = get().count  // 현재 상태를 읽어옴
            set({ count: current * 2 })
          },
        }))
        ```
        
        ### 3) 선택적 구독 (selector)
        
        Zustand에서는 selector를 사용해 수동으로 렌더링 최적화를 적용하는 것이 권장된다. store 전체가 아닌 필요한 값만 골라 구독하면, 해당 값이 바뀔 때만 리렌더링된다.
        
        ```tsx
        // ❌ store 전체를 구독 → 어떤 상태가 바뀌어도 리렌더링
        const state = useStore()
        
        // ✅ 필요한 값만 구독 → bears가 바뀔 때만 리렌더링
        const bears = useStore((state) => state.bears)
        ```
        
    - **Zustand** 객체 상태 관리 예시 🍠
        
        # **Zustand** 객체 상태 관리 예시
        
        중첩된 객체 상태를 관리할 때는 `set`의 merge 특성을 활용한다. 단, 얕은 merge(shallow merge)만 되므로 중첩 객체는 spread로 직접 처리해야 한다.
        
        ---
        
        ```tsx
        import { create } from 'zustand'
        
        interface UserState {
          user: {
            name: string
            age: number
            email: string
          }
          updateName: (name: string) => void
          updateAge: (age: number) => void
          reset: () => void
        }
        
        const initialUser = { name: '', age: 0, email: '' }
        
        const useUserStore = create<UserState>((set) => ({
          user: initialUser,
          updateName: (name) =>
            set((state) => ({ user: { ...state.user, name } })),
          updateAge: (age) =>
            set((state) => ({ user: { ...state.user, age } })),
          reset: () => set({ user: initialUser }),
        }))
        ```
        
    - **Zustand** 비동기 로직 예시 🍠
        
        # **Zustand** 비동기 로직 예시
        
        Zustand에서는 비동기 API 호출도 간단하게 store 안에서 사용할 수 있다. action이 비동기인지 동기인지 Zustand는 상관하지 않는다.
        
        ---
        
        **Zustand**에서는 비동기 API 호출도 간단하게 store 안에서 사용할 수 있어요.
        
        ```tsx
        import { create } from 'zustand'
        
        interface UserState {
          user: { id: number; name: string } | null
          loading: boolean
          error: string | null
          fetchUser: (id: number) => Promise<void>
        }
        
        const useUserStore = create<UserState>((set) => ({
          user: null,
          loading: false,
          error: null,
          fetchUser: async (id) => {
            set({ loading: true, error: null })
            try {
              const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
              const data = await res.json()
              set({ user: data, loading: false })
            } catch (e) {
              set({ error: '유저를 불러오지 못했어요.', loading: false })
            }
          },
        }))
        ```
        
    - **Zustand** + Persist 미들웨어 🍠
        
        # **Zustand** + Persist 미들웨어
        
        Zustand는 미들웨어를 활용해 로컬스토리지 등에 상태를 저장할 수 있다. `persist` 미들웨어는 페이지 새로고침이나 앱 재시작 시에도 store의 상태를 유지할 수 있게 해준다. 기본 storage는 `localStorage`이다.
        
        ---
        
        **Zustand**는 미들웨어를 활용해 로컬스토리지 등에 상태를 저장할 수 있어요.
        
        ```tsx
        import { create } from 'zustand'
        import { persist } from 'zustand/middleware'
        
        interface AuthState {
          token: string | null
          setToken: (token: string) => void
          logout: () => void
        }
        
        const useAuthStore = create<AuthState>()(
          persist(
            (set) => ({
              token: null,
              setToken: (token) => set({ token }),
              logout: () => set({ token: null }),
            }),
            {
              name: 'auth-storage',
              // partialize로 일부 상태만 저장하는 것도 가능
              // partialize: (state) => ({ token: state.token }),
            },
          ),
        )
        ```
        
    - **Zustand** + Immer 함께 쓰기 🍠
        
        # **Zustand** + Immer 함께 쓰기
        
        불변성 관리를 쉽게 하고 싶다면 Immer 미들웨어도 사용 가능하다. `immer` 미들웨어를 사용하면 중첩 객체를 직접 수정하는 것처럼 코드를 작성하면서도 불변성을 자동으로 유지할 수 있다. 사용 전에 `immer` 패키지를 별도로 설치해야 한다.
        
        immer 없이 같은 코드를 쓰려면 `{ ...state.profile, address: { ...state.profile.address, city } }` 처럼 매번 전체를 spread해야 한다. 중첩이 깊어질수록 immer의 가치가 커진다.
        
        ---
        
        불변성 관리를 쉽게 하고 싶다면 Immer 미들웨어도 사용 가능해요.
        
        ```tsx
        import { create } from 'zustand'
        import { immer } from 'zustand/middleware/immer'
        
        interface ProfileState {
          profile: {
            name: string
            address: {
              city: string
              zip: string
            }
          }
          updateCity: (city: string) => void
        }
        
        const useProfileStore = create<ProfileState>()(
          immer((set) => ({
            profile: {
              name: '예원',
              address: {
                city: '인천',
                zip: '21000',
              },
            },
            updateCity: (city) =>
              set((state) => {
                // immer 덕분에 직접 수정하는 코드를 쓸 수 있다
                // spread 없이 깊은 중첩 객체도 바로 수정 가능
                state.profile.address.city = city
              }),
          })),
        )
        ```
        
    - **Zustand** vs Context API 🍠
        
        # **Zustand** vs Context API
        
        Context API는 테마, 언어 설정처럼 자주 바뀌지 않는 전역 값에는 적합하다. 하지만 자주 업데이트되는 상태를 관리하거나 규모가 커지면 리렌더링 문제가 심해진다. Zustand는 이런 상황에서 훨씬 효율적인 대안이 된다.
        
        ---
        
        | 항목 | Context API | Zustand |
        | --- | --- | --- |
        | Provider 필요 여부 | 필요 | 불필요 |
        | 보일러플레이트 | 많음 | 거의 없음 |
        | 리렌더링 최적화 | 어려움 | 쉬움 (selector) |
        | 비동기 처리 | 별도 처리 필요 | store 안에서 바로 가능 |
        | 미들웨어 지원 | 없음 | persist, devtools, immer 등 |
        | DevTools 연동 | 없음 | devtools 미들웨어로 지원 |
        | 학습 곡선 | 낮음 | 매우 낮음 |

- **React 전역 상태 관리 완벽 가이드 블로그** 읽고 개념 정리하기 🍠

  # **React 전역 상태 관리 완벽 가이드 블로그** 읽고 개념 정리하기 **🍠**

  ***

  [개발자 매튜 | React 전역 상태 관리 완벽 가이드: Context API vs Zustand vs Jotai](https://www.yolog.co.kr/post/global-state/)
  - **`Context API`**의 **`value 전체 구독 메커니즘`**과 **`Zustand`**의 **`selector 기반 구독`**의 성능 차이를 설명해보세요.

    ## Context API — value 전체 구독

    Context API는 value 객체 전체를 하나의 단위로 취급한다.
    Provider에 전달한 value 객체의 참조가 바뀌는 순간, 그 안의 어떤 속성이 바뀌었는지와 무관하게 `useContext`를 사용하는 **모든 컴포넌트가 재평가**된다.
    예를 들어 `user`와 `theme`을 하나의 Context에 담아두면,
    - `theme`만 변경해도 → `user`만 쓰는 컴포넌트까지 재렌더링
    - `user`만 변경해도 → `theme`만 쓰는 컴포넌트까지 재렌더링
      `useMemo`로 최적화를 시도할 수 있지만, value 내부의 어떤 필드가 바뀌었는지 추적 자체가 불가능하기 때문에 근본적인 해결책이 되지 못한다.

    ```tsx
    // theme만 바뀌어도 user를 쓰는 컴포넌트도 재렌더링된다
    const { user } = useContext(UserContext);
    const { theme } = useContext(UserContext);
    ```

    ***

    ## Zustand — selector 기반 구독

    Zustand는 **module-level 외부 저장소** + **selector 기반 구독** 방식으로 이 문제를 해결한다.
    `useSyncExternalStore`를 활용해 React 컴포넌트 트리 바깥에 store를 두고, 각 컴포넌트가 필요한 값만 selector로 골라 구독한다.
    상태가 변경될 때 내부 동작 흐름은 아래와 같다.

    ```
    상태 변경
      → selector(getState()) 재실행
      → Object.is(이전값, 새값) 비교
      → 반환값이 달라진 컴포넌트만 재렌더링
    ```

    ```tsx
    // user가 바뀔 때만 재렌더링, theme 변경은 무시된다
    const user = useUserStore((state) => state.user);

    // theme이 바뀔 때만 재렌더링, user 변경은 무시된다
    const theme = useUserStore((state) => state.theme);
    ```

    ***

    ## 성능 차이 한눈에 보기

    | 항목                               | Context API          | Zustand                  |
    | ---------------------------------- | -------------------- | ------------------------ |
    | 재렌더링 기준                      | value 객체 참조 변경 | selector 반환값 변경     |
    | 선택적 구독                        | 불가능               | 가능 (selector)          |
    | 비교 방식                          | 참조 비교 (===)      | Object.is                |
    | 100개 컴포넌트 중 1개 상태 변경 시 | 100개 모두 재평가    | 해당 컴포넌트만 재렌더링 |

  - **`Jotai`**의 **`atom`** 조합 방식이 파생 상태 관리에서 Zustand 대비 갖는 장점을 의존성 추적 관점에서 설명해보세요.

    ## Zustand의 파생 상태 한계

    Zustand에서 파생 상태를 만들려면 selector 함수를 **컴포넌트 안에서 직접 계산**해야 한다.
    여러 상태를 조합한 복잡한 파생값이 필요할 때, selector 로직이 컴포넌트 곳곳에 흩어지거나 중복 계산이 발생하기 쉽다.

    ***

    ## Jotai — 의존성 자동 추적

    Jotai는 **atom 자체에 의존성 그래프를 내장**한다.
    파생 atom을 선언할 때 `get` 함수로 다른 atom을 읽으면, Jotai가 그 호출을 자동으로 추적해서 의존성으로 등록한다. 이후 의존하는 atom 값이 바뀌면 파생 atom이 자동으로 재계산되고, 그것을 구독하는 컴포넌트만 재렌더링된다.

    ```tsx
    const productsAtom = atom([...])
    const categoryFilterAtom = atom('전자기기')
    const minPriceAtom = atom(0)

    // get으로 읽는 순간 의존성이 자동 등록된다
    const filteredProductsAtom = atom((get) => {
      const products = get(productsAtom)        // 의존성 자동 등록
      const category = get(categoryFilterAtom)  // 의존성 자동 등록
      const minPrice = get(minPriceAtom)        // 의존성 자동 등록

      return products.filter(
        (p) => p.category === category && p.price >= minPrice
      )
    })
    ```

    변경 전파 흐름은 아래와 같다.

    ```
    categoryFilterAtom 변경
      → filteredProductsAtom 자동 재계산
      → filteredProductsAtom을 구독하는 컴포넌트만 재렌더링
      → productsAtom을 직접 구독하는 컴포넌트는 영향 없음
    ```

    ***

    ## 내부 구조

    각 atom의 상태는 **WeakMap**에 저장되고, atom별 `Set<listener>`로 구독자를 관리한다.
    - atom 객체가 가비지 컬렉션되면 상태도 자동으로 제거된다
    - 메모리 누수가 발생하지 않는다
    - Provider별로 독립적인 WeakMap을 가져 스코프 분리가 가능하다

    ***

    ## Zustand 대비 핵심 장점

    의존성을 수동으로 관리할 필요가 없다는 점이다.
    atom을 `get`으로 읽기만 하면 의존성이 자동 추적되기 때문에, 복잡한 연쇄 파생 상태도 각 단계를 atom으로 선언하는 것만으로 깔끔하게 표현할 수 있다.
    | 항목 | Zustand | Jotai |
    | ---------------- | ------------------------- | ------------------------------ |
    | 파생 상태 선언 | 컴포넌트 내 selector 함수 | 파생 atom 선언 |
    | 의존성 추적 | 수동 | 자동 (get 호출 추적) |
    | 재계산 시점 | selector 호출 시 | 의존 atom 변경 시 자동 |
    | 복잡한 연쇄 파생 | 로직이 흩어지기 쉬움 | atom 조합으로 선언적 표현 가능 |

  - 서버 상태를 **`useEffect`**로 관리할 때 발생하는 캐싱/중복 요청/불일치 문제를 설명해보세요.

    ## 문제 1 — 캐싱 없음

    `useEffect` + `useState` 조합으로 API 데이터를 관리하면, 컴포넌트가 **unmount될 때 데이터가 사라진다**.
    다시 mount되면 동일한 API를 또 호출한다. 데이터를 잠깐 캐시해두고 재사용하는 로직이 전혀 없기 때문에 불필요한 네트워크 요청이 계속 반복된다.

    ***

    ## 문제 2 — 중복 요청

    같은 데이터가 필요한 컴포넌트가 여러 개 있으면, 각 컴포넌트가 **독립적으로 fetch를 실행**한다.
    `ProductList`와 `ProductCount`가 모두 `/api/products`를 필요로 한다면 요청이 두 번 나간다. 요청을 중복 제거하는 deduplication 로직이 없기 때문이다.

    ***

    ## 문제 3 — 서버-클라이언트 불일치

    서버 상태는 우리가 완전히 통제할 수 없다.
    좋아요 버튼을 눌렀을 때 `setIsLiked(true)`로 UI를 먼저 바꿔도, 그 사이에 다른 사용자가 상태를 변경했거나 서버 응답이 예상과 다르면 화면에 보이는 값과 실제 서버 값이 어긋난다. 새로고침하기 전까지 사용자는 틀린 정보를 보게 된다.

    ```tsx
    function LikeButton({ postId }) {
      const [isLiked, setIsLiked] = useState(false);

      useEffect(() => {
        // ❌ 문제 1: unmount 시 데이터 소실 → 다시 mount 시 재요청
        // ❌ 문제 2: 같은 postId를 쓰는 다른 컴포넌트와 중복 요청 발생
        fetch(`/api/posts/${postId}`)
          .then((res) => res.json())
          .then((data) => setIsLiked(data.isLiked));
      }, [postId]);

      const handleLike = async () => {
        setIsLiked(true); // UI 먼저 반영
        await fetch(`/api/posts/${postId}/like`, { method: "POST" });
        // ❌ 문제 3: 성공해도 서버의 실제 값과 일치한다는 보장 없음
      };
    }
    ```

    ***

    ## 정리

    이 세 가지 문제를 `useEffect`로 수동 해결하려면 캐시 레이어, deduplication, 폴링/재검증, 낙관적 업데이트 롤백 로직을 모두 직접 구현해야 한다.
    | 문제 | 원인 | 결과 |
    | ----------- | ---------------------------- | ------------------------- |
    | 캐싱 없음 | unmount 시 데이터 소실 | 동일 API 반복 호출 |
    | 중복 요청 | 컴포넌트별 독립 fetch | 불필요한 네트워크 낭비 |
    | 상태 불일치 | 서버 상태를 완전히 통제 불가 | 화면과 실제 데이터 어긋남 |
    이것이 **TanStack Query, SWR** 같은 서버 상태 전용 라이브러리가 필요한 이유다.
