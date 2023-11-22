import React, {
  FC,
  JSX,
  useEffect,
  useRef,
  useState,
  useId,
  ChangeEvent,
} from "react";
import Todo from "../index";
import Task from "./Task";
import { Rings } from "react-loader-spinner";

interface Props {
  todos: Todo[];
  deleteTask: (thisId: string) => void;
  editTask: (
    e: ChangeEvent<HTMLInputElement>,
    thisId: string,
    isDone: boolean,
    oldName : string
  ) => void;
  taskComplete: (thisId: string, isDone: boolean) => void;
}

const TodoList: FC<Props> = ({
  todos,
  deleteTask,
  editTask,
  taskComplete,
}): JSX.Element => {
  const [list, setList] = useState<Todo[]>([]);
  const ulRef = useRef<HTMLUListElement | null>(null);
  let taskId = useId();

  useEffect(() => {
    localStorage
    setList(todos);
  }, [todos]);

  return (
    <ul
      className="grid grid-cols-3 place-items-center gap-x-12 gap-y-16 max-[640px]:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12 xl:grid-cols-3 2xl:grid-cols-3"
      ref={ulRef}
    >
      {todos.length === 0 ? (
        <div className="col-span-3 text-center flex flex-col items-center">
          <Rings
            height="230"
            width="230"
            color="rgb(94 234 212)"
            radius="10"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
          />
          <h1 className="text-3xl mt-2 max-[390px]:text-2xl">
            โปรดเพื่มงานที่ต้องทำก่อน
          </h1>
        </div>
      ) : (
        list.map((item: Todo, idx: number): JSX.Element => {
          const { title, id, date, editState, isDone }: Todo = item;
          return (
            <Task
              key={taskId}
              title={title}
              number={++idx}
              id={id}
              date={date}
              isDone={isDone}
              editState={editState}
              editTask={editTask}
              deleteTask={deleteTask}
              taskComplete={taskComplete}
            />
          );
        })
      )}
    </ul>
  );
};

export default TodoList;
