import "./App.css";
import { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [arrayOfTasks, setArrayOfTasks] = useState([]);
  const [active, setActive] = useState(0);
  const [deleting, setIsDeleting] = useState(false);
  const [alert, setAlert] = useState(false);
  const arrayOfTodo = arrayOfTasks.filter((el) => !el.isDone);
  const arrayOfDone = arrayOfTasks.filter((el) => el.isDone);
  const handleDelete = (el) => {
    const newarr = arrayOfTasks.filter((ele) => ele !== el);
    setArrayOfTasks([...newarr]);
  };
  return (
    <div className="App">
      <div className=" Todo-list">
        <div className="header ">
          <span class="logo fs-2">To-Do List</span>
        </div>
        <form class="form gap-4 d-flex justify-content-center align-items-center">
          <input
            class="d-block input"
            type="text"
            placeholder="Add Task"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          ></input>
          {value === "" ? (
            <button disabled class="create-btn">
              CREATE
            </button>
          ) : (
            <button
              class="create-btn"
              type="button "
              onClick={(event) => {
                event.preventDefault();
                const newarr = arrayOfTasks;
                newarr.push({ task: value, isDone: false });
                setArrayOfTasks(newarr);
                setValue("");
                console.log(arrayOfTasks);
              }}
            >
              CREATE{" "}
            </button>
          )}
        </form>
        <div class="tasks-buttons row text-center align-items-center">
          <div
            onClick={() => {
              setActive(0);
            }}
            class={
              active === 0
                ? `active todo col-4 d-flex flex-column  fs-4`
                : `todo col-4 d-flex flex-column  fs-4`
            }
          >
            <i class="bi bi-check-circle-fill"></i>
            <span className="counter">{arrayOfTodo.length}</span>
          </div>
          <div
            onClick={() => {
              setActive(1);
            }}
            class={
              active === 1
                ? `done  col-4 d-flex flex-column fs-4 active`
                : `done  col-4 d-flex flex-column fs-4`
            }
          >
            <i class="bi bi-calendar2-check"></i>
            <span className="counter">{arrayOfDone.length}</span>
          </div>
          <div
            onClick={() => {
              setActive(2);
            }}
            class={
              active === 2
                ? `active all col-4 d-flex flex-column  fs-4`
                : "all col-4 d-flex flex-column  fs-4"
            }
          >
            <i class="bi bi-list-ul "></i>
            <span className="counter">All({arrayOfTasks.length})</span>
          </div>
        </div>
        {deleting ? (
          <div class="clear-all ">
            <div onClick={() => setAlert(true)}>DELETE ALL TASKS</div>
          </div>
        ) : null}
        <div class=" tasks row">
          <div class={` ${active === 0 ? `d-block` : ""} todo-tasks col-12 `}>
            {arrayOfTodo.map((task) => (
              <div
                class="row task"
                key={task.task}
                onClick={() => {
                  if (deleting) {
                    handleDelete(task);
                    return;
                  }
                  const newarr = arrayOfTasks;
                  newarr.map((el) => {
                    if (el === task) el.isDone = !el.isDone;
                  });
                  console.log(newarr);
                  setArrayOfTasks([...newarr]);
                }}
              >
                <i class="d-block  col-4 bi bi-check-square done-i"></i>
                {deleting ? (
                  <i class="delete-t col-2 bi bi-trash3-fill"></i>
                ) : null}
                <div class="task-s col-8">{task.task}</div>
              </div>
            ))}
          </div>
          <div class={` ${active === 1 ? `d-block` : ""}  done-tasks col-12`}>
            {arrayOfTasks
              .filter((el) => el.isDone)
              .map((task, index) => (
                <div
                  class="row task"
                  key={task.task}
                  onClick={() => {
                    if (deleting) {
                      handleDelete(task);
                      return;
                    }
                    const newarr = arrayOfTasks;
                    newarr.map((el) => {
                      if (el === task) el.isDone = !el.isDone;
                    });
                    console.log(newarr);
                    setArrayOfTasks([...newarr]);
                  }}
                >
                  <i class="d-block  col-4 bi bi-check-square-fill done-i"></i>

                  <div class="task-s col-8">
                    {task.task}
                    {deleting ? (
                      <i class="delete-t col-2 bi bi-trash3-fill"></i>
                    ) : null}
                  </div>
                </div>
              ))}
          </div>
          <div class={` all-tasks ${active === 2 ? `d-block` : ""}   col-12`}>
            {arrayOfTasks.map((task, index) => (
              <div
                class="row task"
                key={task.task}
                onClick={() => {
                  if (deleting) {
                    handleDelete(task);
                    return;
                  }
                  const newarr = arrayOfTasks;
                  newarr[index].isDone = !newarr[index].isDone;
                  console.log(arrayOfTasks);
                  setArrayOfTasks([...newarr]);
                }}
              >
                {task.isDone ? (
                  <i class="d-block col-4 bi bi-check-square-fill done-i"></i>
                ) : (
                  <i class="d-block col-4 bi bi-check-square done-i"></i>
                )}
                <div class="task-s col-8">
                  {task.task}
                  {deleting ? (
                    <i class="delete-t col-2 bi bi-trash3-fill"></i>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          onClick={() => {
            setIsDeleting(!deleting);
          }}
          class={`${deleting ? "deleting" : ""} bin `}
        >
          <i class="bi bi-trash3"></i>
        </div>
        <div class={`${alert ? "d-block" : "d-none"} alert-overlay`}>
          <div class="alert">
            <h2 className="alert-head">Clear All Tasks</h2>
            <p className="alert-p">
              Are you sure you want to remove all tasks from the App?
            </p>
            <div class="buttons d-flex gap-4">
              <button
                onClick={() => {
                  setAlert(false);
                }}
                className="cancel"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setArrayOfTasks([]);
                  setIsDeleting(false);
                  setAlert(false);
                }}
                className="confirm"
                type="button"
              >
                confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
