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
const radioButtons = document.getElementsByName('status')

//tasksを保存する配列
let tasks = [];
let objectNum = 0;

//②追加ボタンクリック後の処理
const execTodo = () => {
  ///配列にオブジェクトとしてデータを追加する
  tasks.push({
    id: objectNum,
    comment: inputTodo.value,
    status: '作業中'
  });

  radioChange();

  objectNum++;
  tasks.id = objectNum;
};

//③タグを追加して出力する関数
const showTaskList = filteredTasks => {
  //HTML上にすでに出力してある配列を空にして、追加したデータを含めた配列内のデータを出力できるようにする
  todoLists.innerHTML = '';
  filteredTasks.forEach((task) => {
    const taskList = document.createElement('tr');
    const taskId = document.createElement('td');
    const taskComment = document.createElement('td');
    const taskStatus = document.createElement('td');
    const deleteTask = document.createElement('td');

    taskId.innerHTML = task.id;
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
      /*
      削除ボタンをclick時に全体の配列から一致するidを探す
      (filteredTasksだとfilterされた配列が対象になるため全体の配列が適切)
      */
      const searchTasks = tasks.forEach((searchTask, index) => {
        /*
        tasks配列をforEachでループして
        clickされたタスクのid(task.id)とid(searchTask.id)が
        一致したらそのタスクのindex番号を渡す（spliceの第一引数）
        */
        if (searchTask.id == task.id) {
          deleteTaskList(index);
        }
      })
    });

    //status変更ボタンクリック時の関数の呼び出し
    taskStatus.addEventListener('click', () => {
      changeTaskStatus(task, taskStatus);
    })
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
const deleteTaskList = taskIndex => {
  tasks.splice(taskIndex, 1);
  radioChange()
};

//すべてのラジオボタンにチェック時、status変更ボタンをクリックしたらステータスを変更する関数
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
  radioChange()
};

//チェックボタンの位置によって違う値を渡してshowTaskList関数を発火する
const radioChange = () => {
  // 作業中のラジオボタンがチェックされている場合
  if (radioButtons[1].checked) {
    const filterdoing = tasks.filter((task) => {
      return task.status === '作業中'
    })
    //ステータスの作業中のみが出力されるよう作業中の値を渡す
    return showTaskList(filterdoing)
  // 完了のラジオボタンがチェックされている場合
  } else if (radioButtons[2].checked) {
    const filterDone = tasks.filter((task) => {
      return task.status === '完了'
    })
    //ステータスの完了のみが出力されるよう作業中の値を渡す
    return showTaskList(filterDone)
  //すべてのラジオボタンがチェックされている場合
  } else {
    return showTaskList(tasks)
  }
}

//ラジオボタンの状態が変わったときにもradioChange関数を呼び出す
radioButtons.forEach(radio => {
  radio.addEventListener('change', () => {
    radioChange();
  });
});

//①追加ボタンをクリック
addTaskButton.addEventListener('click', execTodo);