// 【要件】
/*
- タスクの状態によって表示/非表示を切り替えできる
- 選択されたラジオボタンに応じて、タスクの表示を切り替える
- 「作業中」選択時に特定のタスクの状態を作業中→完了に切り替えた場合、
そのタスクが非表示になる。
- 「完了」選択時に特定の特定のタスクの状態を完了→作業中に切り替えた場合、
そのタスクが非表示になる。
- 「作業中」選択時にタスクを新規追加した場合、タスクが表示される
- 「完了」選択時にタスクを新規追加した場合、タスクは表示されない（が、裏ではちゃんと追加されている
*/

//定数
const addTaskButton = document.getElementById('add-task-button');
const inputTodo = document.getElementById('input-todo');
const todoLists = document.getElementById('todo-list');
const allTasks = document.getElementById('all-tasks');
const workingTasks = document.getElementById('working-tasks');
const doneTasks = document.getElementById('done-tasks');

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

  radioChange();
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

    //status変更ボタンクリック時の関数の呼び出し
    taskStatus.addEventListener('click', () => {
      const checkedRadio = document.getElementsByName('status');
      if (checkedRadio[0].checked) {
      changeTaskStatus(task, taskStatus);
      } else if (checkedRadio[1].checked || checkedRadio[2].checked) {
        changeTaskStatus2(task, taskStatus)
      }
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
  tasks.splice(index, 1);
  showTaskList(tasks);
};

//status変更ボタンをクリックしたらstatusを変更する関数
const changeTaskStatus = (task, taskStatus) => {
  //作業中であれば完了へ、完了であれば作業中へ変更する
  if (task.status === '作業中') {
    task.status = '完了';
  } else if (task.status === '完了') {
    task.status = '作業中'
  }
  //htmlの内容を変更後の内容に書き換える
  taskStatus.innerHTML = task.status;
  //出力
  showTaskList(tasks);
};

//status変更ボタンをクリックしたらstatusを変更する関数（作業中と完了時）
const changeTaskStatus2 = (task, taskStatus) => {
  //作業中であれば完了へ、完了であれば作業中へ変更する
  if (task.status === '作業中') {
    task.status = '完了';
    const filterdoing = tasks.filter((task) => {
      return task.status === '作業中';
    });
    return showTaskList(filterdoing);
  } else if (task.status === '完了') {
    task.status = '作業中'
    const filterDone = tasks.filter((task) => {
      return task.status === '完了';
    });
    return showTaskList(filterDone);
  }
  //htmlの内容を変更後の内容に書き換える
  taskStatus.innerHTML = task.status;
  //出力
  showTaskList(tasks);
};

//それぞれのradioボタンがクリックされた時の関数
const radioChange = () => {
  //作業中ラジオボタン
  workingTasks.addEventListener('click', () => {
    const filterdoing = tasks.filter((task) => {
      return task.status === '作業中';
    });
    //ステータスの作業中のみが出力されるよう作業中の値を渡す
    return showTaskList(filterdoing);
  });
  //完了ラジオボタン
  doneTasks.addEventListener('click', () => {
    const filterDone = tasks.filter((task) => {
      return task.status === '完了';
    });
    //ステータスの完了のみが出力されるよう作業中の値を渡す
    return showTaskList(filterDone);
  });
  //
  allTasks.addEventListener('click', () => {
    return showTaskList(tasks)
  });
}

//①追加ボタンをクリック
addTaskButton.addEventListener('click', execTodo);