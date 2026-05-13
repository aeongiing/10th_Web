- 어떤 상황에서 **낙관적 업데이트(OptimisticUpdate)가 효율적일까요? 🍠**

  # 어떤 상황에서 **낙관적 업데이트(OptimisticUpdate)가 효율적일까요? 🍠**

  ***

  > **낙관적 업데이트(OptimisticUpdate)가 효율적인 상황은 언제일까요? 🍠**

    <aside>
    📌
    
    여기에 여러분들의 생각을 작성해주세요!
    
    **1. 성공 가능성이 매우 높은 요청일 때**
    
    서버가 안정적이고 요청 실패율이 낮은 환경에서는 굳이 서버 응답을 기다릴 필요가 없습니다. 예를 들어 좋아요 버튼, 팔로우, 북마크처럼 단순한 토글 액션은 거의 항상 성공하기 때문에 UI를 먼저 바꿔도 무방합니다.
    
    **2. 즉각적인 피드백이 UX에 중요할 때**
    
    SNS의 좋아요나 댓글 작성처럼 사용자가 "내 액션이 반영됐다"는 느낌을 즉시 받아야 하는 경우에 효과적입니다. 네트워크 지연이 있어도 앱이 빠르게 반응하는 것처럼 느껴집니다.
    
    **3. 롤백 처리가 비교적 간단한 경우**
    
    실패 시 이전 상태로 되돌리기 쉬운 구조라면 낙관적 업데이트를 적용했을 때의 이점이 리스크보다 큽니다. TanStack Query의 `onMutate` / `onError` 조합으로 깔끔하게 구현 가능한 경우가 여기에 해당합니다.
    
    **4. 오프라인 우선(Offline-first) 전략을 취할 때**
    
    네트워크 상태가 불안정한 환경(모바일 앱 등)에서 로컬 상태를 먼저 반영하고 나중에 서버와 동기화하는 방식을 채택할 때 낙관적 업데이트는 핵심 패턴입니다.
    
    </aside>
    
    > **낙관적 업데이트(OptimisticUpdate)를 피해야 하는 상황 언제일까요? 🍠**
    > 
    
    <aside>
    📌
    
    여기에 여러분들의 생각을 작성해주세요!
    
    **1. 실패 시 롤백 비용이 클 때**
    
    결제, 송금, 예약처럼 한 번의 실패가 사용자에게 혼란이나 손해를 줄 수 있는 작업은 서버 응답을 확인한 후 UI를 업데이트해야 합니다. 사용자가 "완료됐다"고 믿고 행동한 뒤 실패 알림을 받으면 신뢰가 크게 떨어집니다.
    
    **2. 서버에서 데이터가 변환되어 돌아오는 경우**
    
    클라이언트가 예측할 수 없는 값(서버에서 계산된 ID, 타임스탬프, 정렬 순서 등)이 응답에 포함된다면, 낙관적으로 표시한 값과 실제 서버 응답이 달라져 UI 불일치가 발생할 수 있습니다.
    
    **3. 동시성 충돌이 발생할 수 있는 경우**
    
    여러 사용자가 같은 리소스를 동시에 수정하는 상황(공동 편집, 재고 차감 등)에서는 낙관적 업데이트가 잘못된 상태를 보여줄 위험이 있습니다. 서버가 최종 중재자 역할을 해야 합니다.
    
    **4. 사용자에게 정확한 상태가 반드시 보장되어야 할 때**
    
    재고 수량, 잔액, 보안 관련 권한 변경처럼 정확성이 UX보다 우선시되는 경우에는 서버 응답 후 렌더링이 원칙입니다.
    
    </aside>

- **낙관적 업데이트(OptimisticUpdate) 블로그 읽고 개념 정리하기 🍠**

  # **낙관적 업데이트(OptimisticUpdate) 블로그 읽고 개념 정리하기 🍠**

  ***

  [개발자 매튜 | 실제 서비스에서 낙관적 업데이트(Optimistic Update)를 활용하여, 유저의 답답함 줄이기](https://www.yolog.co.kr/post/optimistic-update)
  - **낙관적 업데이트(OptimisticUpdate)**를 왜 도입해야 하는지, 이 패턴이 해결하려는 문제를 실제 서비스 맥락에서 설명해보세요.
    ### 실제 서비스에서 발생하는 문제
    사용자가 좋아요 버튼을 누르거나 댓글을 작성할 때, 내부적으로는 이런 일이 벌어집니다.
    ```
    사용자 클릭 → API 요청 → 서버 처리 → 응답 수신 → UI 반영
    ```
    이 흐름에서 **API 요청 ~ 응답 수신** 구간이 문제입니다. 평균 LTE 환경에서도 100~300ms, 느린 환경에서는 1~2초 이상 걸릴 수 있고, 그 동안 UI는 아무 변화가 없습니다. 사용자 입장에서는 _"내가 누른 게 맞나?"_ 하고 다시 클릭하거나 이탈하게 됩니다.
    ### 낙관적 업데이트가 해결하는 것
    "요청이 성공할 것이라고 **낙관적으로 가정**하고 UI를 먼저 바꾼다"는 전략입니다.
    ```
    사용자 클릭 → UI 즉시 반영 → API 요청 (백그라운드)
                                  ↓
                        성공 → 서버 데이터로 동기화
                        실패 → 이전 상태로 롤백
    ```
    실제 서비스에서 좋아요, 팔로우, 북마크, 댓글 작성 같은 인터랙션은 **성공률이 99% 이상**입니다. 즉 1%의 실패를 위해 100%의 사용자에게 지연을 강요하는 것은 비효율적입니다. 낙관적 업데이트는 이 비율을 뒤집는 선택입니다.
  - TanStack Query 기반 구현 흐름을 `onMutate → (mutate) → onError → onSettled` 순서로 기술해주세요..

    ### 전체 흐름 개요

    ```
    onMutate      →    mutate(서버 요청)    →    onError / onSuccess    →    onSettled
    (UI 선반영,         (백그라운드 실행)         (실패 시 롤백,               (서버와 최종
     이전 상태 저장)                              성공 시 그대로)              동기화)
    ```

    ### 각 단계 상세 설명

    **① `onMutate` — 낙관적 업데이트의 핵심**
    `mutate` 호출 즉시 실행됩니다. 여기서 해야 할 일이 세 가지입니다.

    ```tsx
    onMutate: async (variables) => {
      // 1. 진행 중인 쿼리 취소 → 레이스 컨디션 방지
      //    (서버 응답이 뒤늦게 도착해 낙관적 UI를 덮어쓰는 상황 차단)
      await queryClient.cancelQueries({ queryKey: someKeys });

      // 2. 현재 캐시 데이터 스냅샷 저장 → 롤백용
      const previousData = queryClient.getQueryData(someKeys);

      // 3. 캐시를 낙관적으로 업데이트 → UI 즉시 반영
      queryClient.setQueryData(someKeys, (old) => /* 새 상태 */);

      // 4. context로 반환 → onError에서 꺼내 씀
      return { previousData };
    },
    ```

    `cancelQueries`가 없으면 background refetch 응답이 뒤늦게 도착해서 낙관적으로 업데이트한 UI를 이전 상태로 덮어쓸 수 있습니다. 반드시 필요합니다.
    **② `mutate` — 실제 서버 요청**
    TanStack Query가 내부적으로 처리합니다. `onMutate`가 끝난 뒤 백그라운드에서 API를 호출하고, 결과에 따라 `onError` 또는 `onSuccess`로 분기합니다.
    **③ `onError` — 실패 시 롤백**

    ```tsx
    onError: (error, variables, context) => {
      // onMutate에서 반환한 previousData를 꺼내서 복원
      queryClient.setQueryData(someKeys, context?.previousData);
    },
    ```

    `context`가 `onMutate`의 반환값입니다. 이 구조 덕분에 롤백이 단 두 줄로 끝납니다.
    **④ `onSettled` — 성공/실패 무관하게 항상 실행**

    ```tsx
    onSettled: () => {
      // 캐시 무효화 → 서버 최신 데이터로 재동기화
      queryClient.invalidateQueries({ queryKey: someKeys });
    },
    ```

    성공했더라도 서버에서 실제로 저장된 데이터(ID, timestamp, 정렬 등)가 클라이언트 예측과 다를 수 있으므로, 최종적으로 한 번 동기화합니다.

  - ToDo “생성” 및 “좋아요 토글”에 **낙관적 업데이트(OptimisticUpdate)**를 적용했을 때의 **실패/충돌 롤백 전략**을 설계해주세요.

    ### Case 1. ToDo "생성"

    **낙관적 업데이트 시 문제점**
    ToDo를 생성할 때 서버가 반환하는 `id`를 클라이언트는 미리 알 수 없습니다. 임시 ID를 사용해 낙관적으로 추가했다가, 서버 응답 후 실제 ID로 교체해야 하는 복잡성이 생깁니다.
    **롤백 전략**

    ```tsx
    useMutation({
      mutationFn: (newTodo) => createTodo(newTodo),

      onMutate: async (newTodo) => {
        await queryClient.cancelQueries({ queryKey: todoKeys.todos._def });

        const previousTodos = queryClient.getQueryData(
          todoKeys.todos.getAll().queryKey
        );

        // 임시 ID로 낙관적 추가
        queryClient.setQueryData(
          todoKeys.todos.getAll().queryKey,
          (old: TGetAllTodosResponse) => ({
            ...old,
            data: {
              ...old.data,
              todos: [
                { ...newTodo, id: `temp-${Date.now()}`, done: false }, // ← 임시 ID
                ...old.data.todos,
              ],
            },
          })
        );

        return { previousTodos }; // 롤백용 스냅샷
      },

      onError: (_error, _newTodo, context) => {
        // 실패 시: 임시 항목 제거 → 이전 상태로 원복
        queryClient.setQueryData(
          todoKeys.todos.getAll().queryKey,
          context?.previousTodos
        );
        toast.error('ToDo 생성에 실패했습니다. 다시 시도해주세요.');
      },

      onSettled: () => {
        // 성공 여부와 관계없이 서버 데이터로 재동기화
        // → 임시 ID가 실제 서버 ID로 교체됨
        queryClient.invalidateQueries({ queryKey: todoKeys.todos._def });
      },
    });
    ```

    **핵심 포인트**
    | 상황 | 처리 |
    | --------- | ---------------------------------------------------------- |
    | 성공 | `onSettled`의 `invalidateQueries`로 임시 ID → 실제 ID 교체 |
    | 실패 | `onError`에서 `previousTodos`로 목록 완전 복원 |
    | 중복 요청 | `cancelQueries`로 레이스 컨디션 차단 |

    ***

    ### Case 2. 좋아요 "토글"

    **낙관적 업데이트 시 문제점**
    좋아요는 토글이기 때문에 상태가 `true ↔ false`로 빠르게 전환됩니다. 사용자가 연속으로 클릭하면 요청이 여러 개 쌓이고, 서버 응답 순서가 보장되지 않아 최종 상태가 뒤집힐 수 있습니다(레이스 컨디션).
    **롤백 전략**

    ```tsx
    useMutation({
      mutationFn: ({ postId, isLiked }: { postId: string; isLiked: boolean }) =>
        toggleLike({ postId, isLiked }),

      onMutate: async ({ postId, isLiked }) => {
        await queryClient.cancelQueries({ queryKey: postKeys.post(postId) });

        const previousPost = queryClient.getQueryData(
          postKeys.post(postId).queryKey
        );

        // 현재 상태를 반전시켜서 낙관적 업데이트
        queryClient.setQueryData(
          postKeys.post(postId).queryKey,
          (old: TPost) => ({
            ...old,
            isLiked: !old.isLiked,
            likeCount: old.isLiked ? old.likeCount - 1 : old.likeCount + 1,
          })
        );

        return { previousPost };
      },

      onError: (_error, { postId }, context) => {
        // 실패 시: 토글 전 상태로 되돌림
        queryClient.setQueryData(
          postKeys.post(postId).queryKey,
          context?.previousPost
        );
        toast.error('좋아요 처리에 실패했습니다.');
      },

      onSettled: (_data, _error, { postId }) => {
        // 서버 최종 상태로 동기화 (likeCount 정확도 보장)
        queryClient.invalidateQueries({ queryKey: postKeys.post(postId) });
      },
    });
    ```

    **연속 클릭 레이스 컨디션 추가 방어 — debounce 적용**

    ```tsx
    // 컴포넌트에서 호출 시 debounce로 감싸기
    const debouncedToggleLike = useMemo(
      () =>
        debounce((postId: string, isLiked: boolean) => {
          toggleLikeMutate({ postId, isLiked });
        }, 300),
      [toggleLikeMutate]
    );
    ```

    **핵심 포인트**
    | 상황 | 처리 |
    | --------- | ------------------------------------------------------- |
    | 성공 | UI는 이미 반영됨, `onSettled`로 likeCount 정확히 동기화 |
    | 실패 | `previousPost`로 isLiked + likeCount 동시 복원 |
    | 연속 클릭 | `cancelQueries` + debounce로 중복 요청 방지 |

    ***

    ### 두 케이스 비교 요약

    |                 | ToDo 생성                | 좋아요 토글                   |
    | --------------- | ------------------------ | ----------------------------- |
    | 낙관적 업데이트 | 목록에 임시 항목 추가    | isLiked 반전, count ±1        |
    | 주요 리스크     | 임시 ID와 실제 ID 불일치 | 연속 클릭 레이스 컨디션       |
    | 롤백            | 이전 목록 전체 복원      | isLiked + likeCount 동시 복원 |
    | 동기화 시점     | `onSettled` invalidate   | `onSettled` invalidate        |
    | 추가 방어       | —                        | debounce                      |

### 실제 서비스 분석 🍠

<aside>
❓

“아이두” 앱을 직접 사용하며 **useMutation**, **낙관적 업데이트(OptimisticUpdate)**등이 실제로 어떻게 동작하는지 관찰하고, **웹 프론트엔드 개발자의 시각뿐만 아니라 다양한 직무의 시각**에서 구현 방법을 고민해보는 워크북입니다.

</aside>

- **미션 1 - useMutation**, **낙관적 업데이트(OptimisticUpdate)**을 체험해보기
    <aside>
    ❓
    
    서비스에 접속해서 각 페이지에 진입할 때 **데이터가 뜨기 전에** 무엇이 보이는지 관찰해보세요.
    
    ---
    
    **Q1.** **할 일 탭**에서 할 일 옆의 **체크박스를 탭**해보세요. 손가락을 떼는 순간, 체크 표시가 차는 데까지 얼마나 걸리나요? 비행기 모드를 켜고 같은 동작을 다시 해보면, 화면 반응은 어떻게 달라지나요? 잠시 후 비행기 모드를 끄면 어떤 일이 벌어지나요?
    
    **Q2.** 다음 두 쌍의 액션을 번갈아 해보면서, 화면이 반응하는 **속도와 방식**을 비교해보세요.
    
    - **A쌍 (할 일 영역 안에서)**:
        - **할 일 체크박스 탭** (완료 토글)
        - **할 일을 길게 눌러 순서 바꾸기** (드래그 후 손가락 떼는 순간)
    - **B쌍 (친구 영역 안에서)**:
        - **친구 삭제** (이미 친구인 사람을 목록에서 지우기)
        - **받은 친구 요청 수락** (요청 목록에서 수락 버튼 탭)
    - **C쌍 (다른 탭)**:
        - **메모 작성 후 저장**
        - **알림 페이지에서 안 읽은 알림 항목 탭** (읽음 처리)
    
    같은 종류의 "데이터를 바꾸는 동작"인데도 어떤 건 **거의 즉시 반영**되고, 어떤 건 **잠깐의 멈칫거림**이 있을 거예요. 어떤 액션이 어느 쪽에 속하는지 분류해보세요.
    
    **Q3.** 즉시 반영되는 액션은 사실 "서버가 성공했다고 답하기 **전에** 화면을 먼저 바꿔치기"하는 트릭(Optimistic Update)을 씁니다. 그렇다면:
    
    - **(a)** 이 트릭은 사용자에게 어떤 가치를 줄까요? 단순히 "빠르게 보인다" 외에, 모바일 환경(불안정한 네트워크, 지하철·엘리베이터)에서 어떤 차이를 만들까요?
    - **(b)** 만약 서버가 결국 실패한다면 어떻게 되어야 할까요? 직접 비행기 모드로 체크박스를 탭해보면 — 잠시 체크되어 있다가 어떻게 되는지, 그리고 그때 진동(햅틱)이 오는지 관찰해보세요. 왜 햅틱을 같이 줄까요?
    - **(c)** 그렇다면 왜 모든 액션에 이 트릭을 적용하지 않았을까요? "친구 요청 수락"이나 "메모 작성"처럼 즉시 반영되지 않는 액션들은, 즉시 반영하기에 어떤 점이 까다로울지 추측해보세요. (힌트: 한 번의 액션이 **여러 화면/목록**을 동시에 바꿔야 한다면? 서버가 새로 만들어주는 **ID**가 필요하다면?)
    </aside>
    
    - 답변
        
        <aside>
        ❓
        
        **나의 관찰**
        
        Q**1 답변.** 
        
        **평소 네트워크 환경에서는 체크박스를 탭하는 순간 거의 즉시(체감상 0ms에 가깝게) 체크 표시가 채워진다. 서버 응답을 기다리지 않고 UI가 먼저 반응하는 낙관적 업데이트가 적용되어 있기 때문이다.비행기 모드를 켜고 같은 동작을 하면, 체크가 되지 않으면서 실패를 알리는 진동(햅틱)이 온다. 서버에 요청이 닿지 않아 mutation이 즉시 실패하고, 롤백과 함께 햅틱으로 실패를 피드백하는 것으로 보인다.**
        
        ****
        Q**2 답변**.
        
        **즉시 반영되는 액션 (Optimistic Update 적용으로 추정)**
        
        - 할 일 체크박스 토글 — 탭하는 순간 바로 반영
        - 할 일 드래그 순서 변경 — 손 떼는 순간 바로 고정
        - 알림 읽음 처리 — 탭하는 순간 읽음 상태로 전환
        
        **잠깐의 딜레이가 있는 액션 (서버 응답 후 반영으로 추정)**
        
        - 친구 요청 수락 — 수락 후 짧은 로딩 이후 친구 목록 반영
        - 메모 작성 저장 — 저장 버튼 탭 후 목록에 나타나기까지 미세한 딜레이 존재
        - 친구 삭제 — 삭제 확인 후 목록 갱신까지 짧은 대기
        
        **Q3 답변.**
        
        **(a) 사용자에게 주는 가치**
        
        단순히 "빠르게 보인다"를 넘어서, **인터랙션과 피드백 사이의 인과관계를 끊기지 않게** 만들어준다. 특히 지하철이나 엘리베이터처럼 네트워크가 불안정한 환경에서 체감 차이가 크다. 낙관적 업데이트가 없으면 체크박스를 눌렀는데 1~2초 동안 아무 반응이 없고, 사용자는 "내가 제대로 누른 건가?" 싶어서 다시 탭하게 된다. 이 이중 탭이 오히려 의도치 않은 상태를 만들기도 한다. 낙관적 업데이트는 이 불안감 자체를 없애준다.
        
        **(b) 서버가 실패하면?**
        
        Q1에서 직접 관찰한 것처럼, 비행기 모드에서 체크박스를 탭하면 체크가 되지 않으면서 햅틱이 온다. 이는 롤백(이전 상태로 복원) + 햅틱 피드백의 조합이다. 햅틱을 함께 주는 이유는, 시각적 롤백만으로는 사용자가 실패를 인지하지 못할 수 있기 때문이다. 화면을 보지 않고 탭만 하고 있을 때도 "아, 안 됐구나"를 손으로 느끼게 해주는 것이다. 시각 + 촉각을 동시에 활용해 실패 인지율을 높이는 UX 전략이다.
        
        **(c) 왜 모든 액션에 적용하지 않았을까?**
        
        친구 요청 수락과 메모 작성이 즉시 반영되기 까다로운 이유는 크게 두 가지다.
        
        첫째, **한 번의 액션이 여러 화면을 동시에 바꿔야 한다.** 친구 요청을 수락하면 "받은 요청 목록"에서 사라지는 동시에 "친구 목록"에 추가되어야 한다. 두 캐시를 동시에 낙관적으로 업데이트하고, 실패 시 두 곳을 동시에 롤백하는 로직은 복잡도가 급격히 올라간다.
        
        둘째, **서버가 새로 만들어주는 값이 필요하다.** 메모를 생성하면 서버가 `id`, `createdAt` 같은 값을 새로 발급한다. 클라이언트는 이 값을 미리 알 수 없기 때문에 임시 ID로 낙관적 추가를 해도, `onSettled`에서 반드시 서버 데이터로 교체해야 한다. 이 과정에서 목록이 살짝 깜빡이거나 순서가 바뀌는 부작용이 생길 수 있어, 차라리 서버 응답 후 반영하는 쪽을 택한 것으로 보인다.
        
        </aside>
