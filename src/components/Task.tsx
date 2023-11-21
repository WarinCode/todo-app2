import React, { FC, JSX, useState, useRef, ChangeEvent , MutableRefObject} from "react";
import Todo from "../index";
import { RiEdit2Fill, RiDeleteBin5Fill } from "react-icons/ri";
import { MdFileDownloadDone } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props extends Todo {
  key: string;
  number: number;
  deleteTask: (thisId: string) => void;
  editTask: (
    e: ChangeEvent<HTMLInputElement>,
    thisId: string,
    isDone: boolean
  ) => void;
  taskComplete: (
    thisId: string,
    ref: MutableRefObject<HTMLLIElement | null>,
    isDone: boolean
  ) => void;
}

const Task: FC<Props> = ({
  key,
  title,
  id,
  date,
  isDone,
  editState,
  editTask,
  deleteTask,
  taskComplete,
  number,
}): JSX.Element => {
  const [state, setState] = useState(false);
  const liRef = useRef<null | HTMLLIElement>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const changeState = (): void => {
    if (!isDone) {
      editState = !editState;
      setState(editState);
      inputRef.current?.focus();
    } else {
      toast.error(
        `ไม่สามารถทำการแก้ไขชื่องาน "${title}" ได้เนื่องจากคุณทำเสร็จไปแล้ว!`,
        {
          position: "top-center",
          autoClose: 2100,
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

  return (
    <>
      <li
        key={`task${key}}`}
        className="w-80 max-[400px]:w-64 box-border p-6 border-none border-slate-950 rounded-lg bg-gray-200 shadow-xl transition ease-in-out duration-300 hover:shadow-2xl hover:scale-105"
        ref={liRef}
      >
        {state ? (
          <input
            type="text"
            defaultValue={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              editTask(e, id, isDone)
            }
            onMouseOut={changeState}
            className="w-full text-xl border-b border-black outline-none focus:border-teal-300
            caret-teal-300 transition ease-in-out duration-300 truncate ... mb-4 bg-transparent"
            ref={inputRef}
            spellCheck={false}
            autoSave="false"
            autoComplete="false"
            maxLength={50}
          />
        ) : (
          <h1 className="text-xl truncate ... mb-2 cursor-default">
            {number}. {title}
          </h1>
        )}
        <p className="text-sm text-amber-400 cursor-default">{date}</p>
        <span className="my-4 flex justify-end">
          <MdFileDownloadDone
            className="text-2xl text-green-400 cursor-pointer"
            onClick={():void => taskComplete(id, liRef, isDone)}
          />
          <RiDeleteBin5Fill
            className="text-2xl mx-2 cursor-pointer"
            onClick={():void => deleteTask(id)}
          />
          <RiEdit2Fill
            className="text-2xl cursor-pointer"
            onClick={changeState}
          />
        </span>
      </li>
    </>
  );
};

export default Task;
