// 【要件】

// - 追加ボタン押下時にタスクを登録できる
// - タスクには、「ID、コメント、状態」が含まれる
// - IDは連番にする
// - コメントはフォームで入力された値が表示される
// - 状態には、「作業中」と表示される
// - 削除ボタンが表示されている（ここでは押下時の動作はつけなくてよい

// ①ボタンクリックすると実行
// ②追加したデタスクを取得する- タスクには、「ID、コメント、状態」が含まれる
// ③取得したデータに削除ボタン付与して出力させる

//定数
const addTaskButton = document.getElementById('add-task-button');
const inputTodo = document.getElementById('input-todo');
const todoLists = document.getElementById('todo-list');

const tasks = [];



//②ボタンクリック後の処理
const execTodo = () => {
  ///配列にオブジェクトとしてデータを追加する
  tasks.push({
    comment: inputTodo.value,
    status: `<button>作業中</button>`
  });

  //todoListsに子要素があれば一つになるまで削除する
  while (todoLists.firstChild) {
    console.log(todoLists.firstChild);
    todoLists.removeChild(todoLists.firstChild);
  };

  //③タグを追加して出力する関数
  const showTaskList = tasks => {
    tasks.forEach((task, index) => {
      const taskList = document.createElement('tr');
      const taskId = document.createElement('td');
      const taskComment = document.createElement('td');
      const taskStatus = document.createElement('td');
      const deleteTaskBtn = document.createElement('td');

      taskId.innerHTML = index;
      taskComment.innerHTML = task.comment;
      taskStatus.innerHTML = task.status;
      deleteTaskBtn.innerHTML = `<button style="margin-left:12px;">削除</button>`;

      todoLists.appendChild(taskList);
      taskList.appendChild(taskId);
      taskList.appendChild(taskComment);
      taskList.appendChild(taskStatus);
      taskList.appendChild(deleteTaskBtn);
    });
    inputTodo.value = '';
  };
  //③を呼び出す
  showTaskList(tasks);
};

//①追加ボタンをクリック
addTaskButton.addEventListener('click', execTodo);