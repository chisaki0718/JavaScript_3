// 【要件】
/*
- 削除ボタン押下時にそのタスクを削除できる
- タスク削除時はIDが振り直される
- 削除後、新たにタスクを追加するとIDが連番となっている
*/

//定数
const addTaskButton = document.getElementById('add-task-button');
const inputTodo = document.getElementById('input-todo');
const todoLists = document.getElementById('todo-list');

//tasksを保存する配列
const tasks = [];

//②追加ボタンクリック後の処理
const execTodo = () => {
  ///配列にオブジェクトとしてデータを追加する
  tasks.push({
    comment: inputTodo.value,
    status: '作業中'
  });

  //③関数を配列tasksを渡す
  showTaskList(tasks);
};

//③タグを追加して出力する関数
const showTaskList = tasks => {
  //HTML上にすでに出力してある配列を空にして、追加したデータを含めた配列内のデータを出力できるようにする
  todoLists.innerHTML = '';
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

    //削除ボタンクリック時の関数呼び出し
    deleteTask.addEventListener('click', () => {
      deleteTaskList(index);
    });
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

//削除ボタンをクリックしたらタスクを削除する関数
const deleteTaskList = (index) => {
  tasks.splice(index,1);
  showTaskList(tasks);
};

//①追加ボタンをクリック
addTaskButton.addEventListener('click', execTodo);