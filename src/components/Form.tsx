import React, {
  useState,
  useRef,
  ChangeEvent,
  FormEvent,
  JSX,
} from "react";
import TodoList from "./TodoList";
import Todo from "../index";
import { MdNoteAdd } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = (): JSX.Element => {
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const max: number = 50;
  const randomId = (): number => Math.floor(Math.random() * 1000);

  const handleAdd = (e: FormEvent): void => {
    e.preventDefault();
    if (todoList.some((val: Todo) => val.title === todo)) {
      toast.error("ห้ามตั้งชื่องานที่ซ้ำกัน!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!Boolean(todo) || todo.length === 0) {
      toast.error("ห้ามใส่ชื่องานที่ว่างเปล่า!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (todoList.length >= max) {
      toast.error(
        `ไม่สามารถเพิ่มจำนวนงานได้เกิน ${max} จำนวนโปรดเลือกลบงานที่ทำเสร็จไปแล้วเพื่อเพิ่มอันใหม่`,
        {
          position: "top-center",
          autoClose: 1800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    } else {
      const newTodo: Todo = {
        title: todo,
        id: `id-${randomId()}`,
        date: new Date().toUTCString(),
        isDone: false,
        editState: false,
      };
      setTodoList((prevTodo: Todo[]): Todo[] => [...prevTodo, newTodo]);
      inputRef.current!.value = "";
      setTodo("");
    }
  };

  const handleComplete = (
    thisId: string,
    isDone: boolean
  ): void => {
    if (!isDone) {
      setTodoList((prevTodo: Todo[]): Todo[] =>
        prevTodo.map((item: Todo): Todo => {
          if (item.id === thisId) {
            item.isDone = true;
          }
          return item;
        })
      );
    } else {
      let name: Todo[] | string = todoList.filter((val: Todo): string =>
        val.id === thisId ? val.title : ""
      );
      name = name[0].title;
      toast.error(
        `ไม่สามารถทำการกดติ็กทำงานเสร็จแล้วได้อีกครั้งเนื่องจากคุณทำ "${name}" งานนี้เสร็จไปแล้ว`,
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  };

  const handleReset = async (): Promise<void> => {
    if (todoList.length !== 0) {
      const promise: Promise<string> = new Promise((resolve) => {
        setTimeout((): void => resolve("ลบข้อมูลทั้งหมดเสร็จสิ้น"), 3000);
      });
      await toast.promise<string, string, string>(promise, {
        pending: {
          render() {
            return "กำลังลบข้อมูล ...";
          },
          theme: "colored",
          type: "info",
          position: "top-center",
          autoClose: 2300,
        },
        success: {
          render({ data }) {
            setTodoList([]);
            return data;
          },
          theme: "colored",
          type: "success",
          position: "top-center",
          autoClose: 1700,
        },
      });
    } else {
      toast.error("ไม่สามารถลบข้อมูลได้เนื่องจากไม่มีรายการข้อมูลใดๆให้ลบ!", {
        position: "top-center",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleEdit = (
    e: ChangeEvent<HTMLInputElement>,
    thisId: string,
    isDone: boolean,
    oldName : string
  ): void => {
    if (!isDone) {
      setTodoList((prevTodo: Todo[]): Todo[] =>
        prevTodo.map((item: Todo): Todo => {
          if (item.id === thisId) {
            item.title = e.target.value;
          }
          return item;
        })
      );
    }
    if(e.target.value === "" || e.target.value.length === 0){
      setTodoList((prevTodo: Todo[]): Todo[] =>
        prevTodo.map((item: Todo): Todo => {
          if (item.id === thisId) {
            item.title = oldName;
          }
          return item;
        })
      );
    }
  };

  const handleDelete = (thisId: string): void => {
    setTodoList((prevTodo: Todo[]): Todo[] => [
      ...prevTodo.filter((item: Todo): boolean => item.id !== thisId),
    ]);
  };

  return (
    <section className="container box-border w-screen h-max flex flex-col items-center">
      <form
        className="h-full w-full mx-16 mt-16 mb-4 flex flex-col items-center justify-center"
        onSubmit={(e: FormEvent): void => handleAdd(e)}
        onReset={handleReset}
      >
        <input
          className="h-12 w-1/2 border-b border-solid outline-none py-4 border-zinc-900 focus:border-teal-300
          transition ease-in-out duration-300 text-center caret-teal-300 text-2xl tracking-wider max-[450px]:text-lg"
          type="text"
          placeholder="พิมพ์งานที่คุณต้องทำ"
          ref={inputRef}
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            setTodo(e.target.value.trim())
          }
          maxLength={40}
          spellCheck={false}
          autoComplete="false"
          required
        />
        <span className="my-8 w-max h-max flex items-center justify-center max-[450px]:w-64">
          <button
            type="submit"
            className="flex flex-row items-center justify-center w-max h-12 bg-teal-300  text-slate-50 text-center font-normal mx-2 px-8 rounded-md hover:bg-teal-400 transition ease-in-out duration-150 hover:shadow-lg"
          >
            <MdNoteAdd className="text-2xl" />
            <p className="ms-1 text-md max-[450px]:text-sm">เพิ่ม</p>
          </button>
          <button
            type="reset"
            className="flex flex-row items-center justify-center w-max h-12 bg-rose-500 text-slate-50 text-center font-normal mx-2 px-4 rounded-md hover:bg-rose-700 transition ease-in-out duration-150 hover:shadow-lg"
          >
            <RiDeleteBin6Fill className="text-xl" />
            <p className="ms-1 text-md max-[450px]:text-sm">ลบรายการทั้งหมด</p>
          </button>
        </span>
      </form>
      <TodoList
        todos={todoList}
        deleteTask={handleDelete}
        editTask={handleEdit}
        taskComplete={handleComplete}
      />
      <ToastContainer />
    </section>
  );
};

export default Form;
