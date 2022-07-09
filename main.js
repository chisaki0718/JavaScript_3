// 【要件】

// - 追加ボタン押下時にタスクを登録できる
// - タスクには、「ID、コメント、状態」が含まれる
// - IDは連番にする
// - コメントはフォームで入力された値が表示される
// - 状態には、「作業中」と表示される
// - 削除ボタンが表示されている（ここでは押下時の動作はつけなくてよい

// ①ボタンクリックすると実行
// ②追加したタスクを取得する- タスクには、「ID、コメント、状態」が含まれる
// ③取得したデータを出力、さらに削除ボタンを追加させる

//定数
const addTaskButton = document.getElementById('add-task-button');
const inputTodo = document.getElementById('input-todo');
const todoLists = document.getElementById('todo-list');

//tasksを保存する配列
const tasks = [];

//②ボタンクリック後の処理
const execTodo = () => {
  ///配列にオブジェクトとしてデータを追加する
  tasks.push({
    comment: inputTodo.value,
    status: '作業中'
  });
  //HTML上にすでに出力してある配列を空にして、追加したデータを含めた配列内のデータを出力できるようにする
  todoLists.innerHTML = '';

  //③関数を配列tasksを渡す
  showTaskList(tasks);
};

//③タグを追加して出力する関数
const showTaskList = tasks => {
  tasks.forEach((task, index) => {
    const taskList = document.createElement('tr');
    const taskId = document.createElement('td');
    const taskComment = document.createElement('td');
    const taskStatus = document.createElement('td');
    const deleteTask = document.createElement('td');

    taskId.innerHTML = index;
    taskComment.innerHTML = task.comment;

    todoLists.appendChild(taskList);
    taskList.appendChild(taskId);
    taskList.appendChild(taskComment);
    taskList.appendChild(taskStatus);
    taskList.appendChild(deleteTask);

    //ボタンを実装する関数に引数を渡す
    createTaskStatusButton(task, taskStatus);
    createTaskDleteButton(task, deleteTask);
  });
  inputTodo.value = '';
};

//statusボタンの実装関数
const createTaskStatusButton = (task, taskStatus) => {
  const taskStatusBtn = document.createElement('button');
  taskStatusBtn.innerHTML = task.status;
  taskStatus.appendChild(taskStatusBtn);
};

//削除ボタンの実装関数
const createTaskDleteButton = (task, deleteTask) => {
  const deleteTaskBtn = document.createElement('button');
  deleteTaskBtn.innerHTML = '削除';
  deleteTask.appendChild(deleteTaskBtn);
};

//①追加ボタンをクリック
addTaskButton.addEventListener('click', execTodo);