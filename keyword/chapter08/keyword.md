- **`Debounce`** 구글링 후 개념 정리 및 코드 작성해보기 🍠

  ### 📚 참고자료

  [Debounce vs Throttle: Definitive Visual Guide](https://kettanaito.com/blog/debounce-vs-throttle)

  ***
  - **`Debounce`** 개념 정리 🍠
    ## Debounce란?
    **Debounce**는 함수가 마지막으로 호출된 후 N밀리초가 지나야 실제로 실행되는 기법이에요.
    즉, 이벤트가 연속적으로 발생할 때 **일정 시간 동안 추가 호출이 없을 경우에만** 함수를 실행합니다.
    > 💡 **비유로 이해하기**
    >
    > Debounce는 **과부하된 웨이터**와 같아요.
    > 손님이 계속 주문을 바꾸면 웨이터는 무시하다가, 손님이 마침내 결정을 멈춘 후에야 주문을 처리합니다.
    ***
    ### Throttle과의 차이
    |               | Throttle                    | Debounce                    |
    | ------------- | --------------------------- | --------------------------- |
    | **실행 시점** | 일정 주기마다 한 번씩 실행  | 마지막 호출 후 N ms 뒤 실행 |
    | **중간 상태** | 반응함                      | 반응 안 함                  |
    | **비유**      | 스프링 (준비되면 바로 발사) | 웨이터 (멈출 때까지 대기)   |
    ***
    ### 언제 Debounce를 써야 할까?
    **중간 상태가 필요 없고, 이벤트의 최종 상태에만 반응하고 싶을 때** 사용해요.
    대표적인 사용 사례:
    - **검색창 자동완성** — 타이핑이 멈춘 후에만 API 요청을 보낼 때
    - **서버 업데이트 배치 처리** — 연속된 변경사항을 모아서 한 번에 처리할 때
  - **`Debounce`** 코드 작성 🍠

    ## Debounce 코드 작성

    ```jsx
    function debounce(func, duration) {
      let timeout;

      return function (...args) {
        const effect = () => {
          timeout = null;
          return func.apply(this, args);
        };

        clearTimeout(timeout); // 이전 타이머 초기화
        timeout = setTimeout(effect, duration); // 새 타이머 등록
      };
    }
    ```

    ### 동작 흐름

    ```
    이벤트 발생 → 타이머 시작
    이벤트 또 발생 → 기존 타이머 초기화 + 새 타이머 시작
    ...
    마지막 이벤트 후 duration ms 경과 → 함수 실행 ✅
    ```

    ### 사용 예시

    ```jsx
    const input = document.getElementById('search-input');

    input.addEventListener(
      'input',
      debounce(function (e) {
        console.log('검색어:', e.target.value);
        fetchSearchResults(e.target.value); // API 호출
      }, 500)
    );
    ```

    ***

    ### ⚠️ 자주 하는 실수 — 함수 재선언

    **잘못된 예시 (React)**

    ```jsx
    // ❌ 렌더링마다 새로운 debounce 인스턴스가 생성됨
    function MyComponent() {
      return <input onChange={debounce(handleChange, 500)} />;
    }
    ```

    **올바른 예시 (React)**

    ```jsx
    // ✅ debounce된 함수를 한 번만 선언
    function MyComponent() {
      const handleChange = debounce((e) => {
        console.log(e.target.value);
      }, 500);

      return <input onChange={handleChange} />;
    }

    // ✅ useCallback을 활용하면 더 안전
    const handleChange = useCallback(
      debounce((e) => {
        console.log(e.target.value);
      }, 500),
      []
    );
    ```

    > `debounce`와 `throttle`은 **같은 함수 참조**를 기반으로 동작하기 때문에, 반드시 한 번만 선언해야 효과가 적용됩니다.

- **`Throttling`** 구글링 후 개념 정리 및 코드 작성해보기 🍠

  ### 📚 참고자료

  [Debounce vs Throttle: Definitive Visual Guide](https://kettanaito.com/blog/debounce-vs-throttle)

  ***
  - **`Throttling`** 개념 정리 🍠
    ## Throttle이란?
    **Throttle**은 함수가 일정 시간 동안 **최대 한 번만** 실행되도록 제한하는 기법이에요.
    예를 들어 500ms로 설정하면, 그 시간 안에 아무리 많이 호출해도 **딱 한 번만** 실행되고 나머지 호출은 무시됩니다.
    > 💡 **비유로 이해하기**
    >
    > Throttle은 **공을 던지는 스프링**과 같아요.
    > 공이 날아가고 나면 스프링이 다시 오므라드는 시간이 필요하기 때문에, 준비가 될 때까지는 절대 공을 던질 수 없습니다.
    ***
    ### Debounce와의 차이
    |               | Throttle                      | Debounce                           |
    | ------------- | ----------------------------- | ---------------------------------- |
    | **실행 시점** | 주기마다 **즉시** 실행        | 마지막 호출 후 N ms 뒤 실행        |
    | **중간 상태** | 반응함 ✅                     | 반응 안 함 ❌                      |
    | **보장**      | 일정 주기로 **반드시** 실행됨 | 잠잠해질 때까지 실행 안 될 수 있음 |
    | **비유**      | 스프링 (준비되면 바로 발사)   | 웨이터 (멈출 때까지 대기)          |
    ***
    ### 언제 Throttle을 써야 할까?
    **빈번하게 발생하는 이벤트에 일관성 있게 반응해야 할 때** 사용해요.
    Throttle은 고정된 시간 프레임에 묶여 있기 때문에, 이벤트의 **중간 상태도 처리할 준비**가 되어 있어야 합니다.
    대표적인 사용 사례:
    - **윈도우 리사이즈** — 창 크기가 변할 때마다 일정 주기로 UI 업데이트
    - **성능이 무거운 연산** — 서버나 클라이언트에서 과부하를 방지할 때
    - **스크롤 이벤트** — 스크롤 위치를 일정 주기로만 감지할 때
  - **`Throttling`** 코드 작성 🍠

    ## Throttle 코드 작성

    ```jsx
    function throttle(func, duration) {
      let shouldWait = false;

      return function (...args) {
        if (!shouldWait) {
          func.apply(this, args); // 함수 즉시 실행
          shouldWait = true; // 대기 상태로 전환

          setTimeout(function () {
            shouldWait = false; // duration 후 대기 해제
          }, duration);
        }
      };
    }
    ```

    ### 동작 흐름

    ```
    이벤트 발생 → 함수 즉시 실행 ✅ → 대기 상태 ON
    이벤트 또 발생 → 대기 중이므로 무시 ❌
    이벤트 또 발생 → 대기 중이므로 무시 ❌
    ...
    duration ms 경과 → 대기 상태 OFF
    이벤트 발생 → 함수 즉시 실행 ✅
    ```

    ### 사용 예시

    ```jsx
    window.addEventListener(
      'resize',
      throttle(function () {
        console.log('리사이즈 감지:', window.innerWidth);
        updateLayout(); // UI 업데이트
      }, 500)
    );
    ```

    500ms마다 최대 한 번만 `updateLayout()`이 호출돼요.

    ***

    ### React에서의 사용

    ```jsx
    // ✅ throttle된 함수를 컴포넌트 외부 또는 useMemo/useCallback으로 선언
    function MyComponent() {
      const handleScroll = useCallback(
        throttle(() => {
          console.log('스크롤 위치:', window.scrollY);
        }, 200),
        []
      );

      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [handleScroll]);

      return <div>스크롤 감지 중...</div>;
    }
    ```

    ***

    ### ⚠️ 최적 duration 찾기

    정해진 정답은 없어요. 너무 짧으면 성능 최적화 효과가 없고, 너무 길면 UI가 뚝뚝 끊기는 느낌을 줍니다. 실제 사용자 환경에서 테스트하면서 조정하는 게 가장 좋아요.
