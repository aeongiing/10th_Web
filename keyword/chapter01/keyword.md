- null과 undefined의 차이점에 대해 직접 작성해주세요 🍠
    
    null은 변수를 선언하고 값이 없다는 걸 알려주기 위해 직접적으로 null을 입력함으로써 명시해준 것.
    
    undefined는 변수를 선언할 때 초기화해줄 값을 지정하지 않고 선언했을 때.
    
    즉, null은 변수에 ‘값이 없음’이라는 값을 넣은 것이고, undefined는 변수 선언 시, 값을 지정해서 초기화하지 않으면 자동으로 정해지는 ‘값이 할당되지 않은 상태’라고 생각하면 될 것 같다.
- 함수에서의 **`TypeScript`** 🍠
    
    ### 함수의 매개변수 타입과 반환 타입
    
    - **매개변수 타입**은 매개변수 이름 뒤에 `: 타입` 형식으로 적어요.
    - **반환 타입**은 매개변수 목록 `()` 뒤에 `: 타입`을 붙여서 함수가 어떤 값을 반환할지 명시해요.
    
    ```tsx
    // 매개변수 a, b는 number 타입이고, 반환값도 number 타입이에요
    function add(a: number, b: number): number {
      return a + b;
    }
    
    // 매개변수 name은 string 타입이고, 반환값은 string 타입이에요
    function greet(name: string): string {
      return `안녕하세요, ${name}입니다`;
    }
    ```
    
    - 함수 선언식
        
        ### 함수 선언식 예시
        
        ```tsx
        function minus(x: number, y: number): number {
          return x - y;
        }
        ```
        
        - `x: number, y: number` → 매개변수 `x`, `y`는 **숫자 타입**이에요.
        - `): number` → 이 함수는 **반환값이 number 타입**임을 의미해요.
        - `return x - y;` → 실제로 두 숫자의 차이를 계산해서 `number` 값을 반환해요.
    - 화살표 함수
        
        ### 화살표 함수 (Arrow Function)
        
        ```tsx
        const getFullname = (firstName: string, lastName: string): string => {
          return firstName + lastName;
        };
        
        const fullName = getFullname('김', '용민');
        console.log(fullName); // "김용민"
        
        ```
        
        - `(firstName: string, lastName: string)` → 매개변수 두 개를 받는데, 둘 다 **string 타입**이에요.
        - `): string => { ... }` → 이 함수의 **반환 타입은 string**이에요.
        - `return firstName + lastName;` → 두 문자열을 이어 붙여 하나의 문자열을 반환해요.
        - `const getFullname = ...` → 화살표 함수는 보통 **변수에 할당해서 함수처럼 사용**해요.
    - 함수 선언식의 특징에 대해 정리해주세요!
        
        ## ✅ 함수 선언식의 특징
        
        - `function` 키워드로 정의함
        - **호이스팅 가능** → 선언 전에 호출 가능
        - 이름이 있는 함수라서 **재사용성과 가독성 좋음**
        - `this`는 **호출 방식에 따라 결정됨**
    - 화살표 함수의 특징에 대해 정리해주세요!
        
        ## ✅ 화살표 함수의 특징
        
        - `const fn = () => {}` 형태로 작성
        - **호이스팅 안 됨** → 선언 후에만 사용 가능
        - `this`가 **상위 스코프를 그대로 사용 (lexical this)**
        - 코드가 짧고 간결함 (특히 한 줄 반환 시 `return` 생략 가능)
- 타입 스크립트에만 존재하는 타입 🍠
    - any 🍠
        
        ## 1️⃣ `any`
        
        👉 **아무 타입이나 허용 (JS처럼 동작)**
        
        ```tsx
        let value:any=10;
        value='문자';
        value=true;
        ```
        
        ✔ 타입 체크 ❌ (안 함)
        
        ✔ 에러 안 나서 편하지만 위험 ⚠️
        
        👉 **최대한 사용 지양**
        
    - unknown 🍠
        
        ## 2️⃣ `unknown`
        
        👉 **any랑 비슷하지만 더 안전함**
        
        ```tsx
        let value:unknown='hello';
        
        // 바로 사용 ❌
        value.toUpperCase();// 에러
        ```
        
        ✔ 사용하려면 타입 체크 필요 👇
        
        ```tsx
        if (typeof value==='string') {
        value.toUpperCase();// 가능
        }
        ```
        
        👉 **any의 안전한 버전**
        
    - void 🍠
        
        ## 3️⃣ `void`
        
        👉 **아무것도 반환하지 않는 함수**
        
        ```tsx
        function hello():void {
        console.log('안녕');
        }
        ```
        
        ✔ `return` 없음
        
        ✔ 또는 `return;`만 가능
        
    - never 🍠
        
        ## 4️⃣ `never`
        
        👉 **절대 끝나지 않거나 값이 절대 안 나오는 경우**
        
        ```tsx
        function error():never {
        throw new Error('에러');
        }
        ```
        
        또는
        
        ```tsx
        function infinite():never {
        while (true) {}
        }
        ```
        
        ✔ 반환 자체가 불가능
        
        ✔ **완전히 종료 안 되는 함수**