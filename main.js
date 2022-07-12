// 【要件】
/*
- タスクの状態を変更できる
- 作業中の状態でボタンをクリックすると完了へ変更される
- 完了の状態でボタンをクリックすると作業中へ変更される
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

    //status変更ボタンクッリク時の関数の呼び出し
    taskStatus.addEventListener('click',() => {
      changeTaskStatus(task, taskStatus);
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

//status変更ボタンをクリックしたらstatusを変更する関数
const changeTaskStatus = (task, taskStatus) => {
  //作業中であれば完了へ、完了であれば作業中へ変更する
  if (task.status === '作業中'){
    task.status = '完了';
  } else if (task.status === '完了'){
    task.status = '作業中'
  }
  //htmlの内容を変更後の内容に書き換える
  taskStatus.innerHTML = task.status;
  //出力
  showTaskList(tasks);
};

//①追加ボタンをクリック
addTaskButton.addEventListener('click', execTodo);