const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

type Todo = {
	id: number;
	text: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

const getTodoText = (): string => {
	return todoInput.value.trim();
};

const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
	const li = document.createElement("li");
	li.classList.add("render-container__item");
	li.dataset.id = String(todo.id); // data-id로 식별

	const span = document.createElement("span");
	span.classList.add("render-container__item-text");
	span.textContent = todo.text;

	const button = document.createElement("button");

	// 색상 지정을 TS → CSS BEM Modifier 클래스로 분리
	button.classList.add(
		"render-container__item-button",
		isDone
			? "render-container__item-button--delete"
			: "render-container__item-button--complete",
	);
	button.dataset.action = isDone ? "delete" : "complete"; // 이벤트 위임용
	button.textContent = isDone ? "삭제" : "완료";

	li.append(span, button);
	return li;
};

const addTodo = (text: string): void => {
	const todo: Todo = { id: Date.now(), text };
	todos.push(todo);
	todoInput.value = "";

	// 기존 목록에 appendChild만 (재렌더링 없음)
	todoList.appendChild(createTodoElement(todo, false));
};

const completeTodo = (id: number): void => {
	const todo = todos.find((t) => t.id === id);
	if (!todo) return;

	todos = todos.filter((t) => t.id !== id);
	doneTasks.push(todo);

	// querySelector로 해당 요소만 삭제 후 done에 추가
	const li = todoList.querySelector(`[data-id="${id}"]`);
	li?.remove();
	doneList.appendChild(createTodoElement(todo, true));
};

const deleteTodo = (id: number): void => {
	doneTasks = doneTasks.filter((t) => t.id !== id);

	// querySelector로 해당 요소만 삭제
	const li = doneList.querySelector(`[data-id="${id}"]`);
	li?.remove();
};

/* 이벤트 위임: 부모 ul에 리스너 하나씩만 */
todoList.addEventListener("click", (e: Event): void => {
	const button = (e.target as HTMLElement).closest("button");
	if (!button) return;

	const li = button.closest<HTMLLIElement>("li");
	if (!li || !li.dataset.id) return;

	const id = Number(li.dataset.id);

	if (button.dataset.action === "complete") {
		completeTodo(id);
	}
});

doneList.addEventListener("click", (e: Event): void => {
	const button = (e.target as HTMLElement).closest("button");
	if (!button) return;

	const li = button.closest<HTMLLIElement>("li");
	if (!li || !li.dataset.id) return;

	const id = Number(li.dataset.id);

	if (button.dataset.action === "delete") {
		deleteTodo(id);
	}
});

todoForm.addEventListener("submit", (event: Event): void => {
	event.preventDefault();
	const text = getTodoText();
	if (text) {
		addTodo(text);
	}
});
