- +) DOM 조작 핵심 키워드 정리
    
    # 🧠 DOM 조작 핵심 키워드 정리
    
    ## 1. DOM이란?
    
    👉 **HTML을 자바스크립트가 다룰 수 있게 만든 객체 구조**
    
    ```jsx
    <div>
    <p>Hello</p>
    </div>
    ```
    
    👉 내부적으로는 이렇게 트리 구조
    
    ```
    document
     └─ div
         └─ p
    ```
    
    ---
    
    # 📌 2. 요소 선택 (Selection)
    
    👉 DOM 조작의 시작 = **요소 가져오기**
    
    ```jsx
    document.getElementById('id')// 하나
    document.querySelector('.class')// 첫 번째
    document.querySelectorAll('.class')// 여러 개
    ```
    
    💡 핵심
    
    ```
    "선택 못하면 조작도 못한다"
    ```
    
    ---
    
    # 🎯 3. 이벤트 처리 (Event)
    
    👉 사용자 행동을 감지
    
    ```jsx
    element.addEventListener('click', () => {})
    ```
    
    ### 자주 쓰는 이벤트
    
    - click → 클릭
    - input → 입력
    - keydown → 키 입력
    - mouseover → 마우스 올림
    
    ---
    
    ## ❗ 이벤트 제거
    
    ```jsx
    element.removeEventListener('click',함수)
    ```
    
    👉 **같은 함수 참조여야 제거됨**
    
    ---
    
    # 🧱 4. 속성 조작 (Attribute)
    
    ```jsx
    element.getAttribute('src')
    element.setAttribute('alt','설명')
    element.removeAttribute('src')
    ```
    
    또는
    
    ```jsx
    element.id
    element.className
    ```
    
    ---
    
    # 🌳 5. DOM 탐색 (Traversal)
    
    👉 부모/자식 이동
    
    ```
    element.parentElement
    element.children
    element.firstElementChild
    element.lastElementChild
    ```
    
    💡 구조 이해 핵심
    
    ```
    "DOM은 트리 구조다"
    ```
    
    ---
    
    # 🛠 6. 요소 생성 (Create)
    
    👉 새로운 태그 만들기
    
    ```jsx
    constel=document.createElement('li')
    el.textContent='내용'
    ```
    
    ---
    
    # ➕ 7. 요소 추가 (Append)
    
    ```jsx
    parent.appendChild(el)
    parent.append(el)
    ```
    
    👉 화면에 실제로 나타나는 순간
    
    ---
    
    # 🧬 8. 요소 복제 (Clone)
    
    ```jsx
    element.cloneNode(true)// 자식까지 복사
    element.cloneNode(false)// 껍데기만
    ```
    
    ---
    
    # ⚡ 전체 흐름 (중요)
    
    👉 DOM 조작은 항상 이 순서
    
    ```
    1. 선택한다
    2. 이벤트 건다
    3. 속성/내용 바꾼다
    4. 추가/삭제한다
    ```
    
    ---
    
    # 🔥 진짜 핵심 요약
    
    ## ✔ DOM 조작 4대장
    
    ```
    선택 → 이벤트 → 수정 → 추가
    ```
    
    ---
    
    # 💡 React랑 연결되는 포인트
    
    👉 React도 결국 이거임
    
    ```
    DOM 직접 조작 ❌
    → 상태(state) 바꾸면
    → DOM 자동 업데이트
    ```
    
    ---
    
    # 🎯 한 줄 정리
    
    👉 **DOM 조작 = "HTML을 JS로 선택해서, 이벤트 걸고, 바꾸고, 추가하는 것"**