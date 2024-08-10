"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Img from "./Images";
import { cn } from "@/lib/utils";
import Status from "./Status"

const Images = Img;
interface Todo {
  title: string;
  disc: string;
  icon: number;
  status: number;
}
function TodoList() {
  const [updateId, setUpdateId]= useState(0);
  const [addMenu, setAddMenu] = useState(false);
  const [upadteMenu,setUpdateMenu] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDisc, setTaskDisc] = useState("");
  const [taskImg, setTaskImg] = useState(0);
  const [taskStatus, setTaskStatus] = useState(0);


  useEffect(() => {
    const storedTodos = localStorage.getItem("todoss");
   
    if (storedTodos) {
   
        const parsedTodos: Todo[] = JSON.parse(storedTodos);
        setTodos(parsedTodos);
     
    }
  },[]);

  useEffect(()=>{
    if (todos.length > 0) {
    
      localStorage.setItem("todoss", JSON.stringify(todos));
    }
  },[todos])

  


  const addTodo = () => {
    const newTodo: Todo = {
      title: taskTitle,
      disc: taskDisc,
      icon: taskImg,
      status: taskStatus,
    };
    setTodos([...todos, newTodo]);

    setTaskDisc("");
    setTaskTitle("");
    setTaskImg(0);
    setTaskStatus(0);
    setAddMenu(false)
  };

  const updateTodo =()=>{
   
    const updatedTodos = todos.map((todo, i) => {
      if (i === updateId) {
        return {...todo,  title:taskTitle, disc:taskDisc, icon:taskImg, status:taskStatus };
      }
      return todo;
    });
    setTodos(updatedTodos);

    setTaskDisc("");
    setTaskTitle("");
    setTaskImg(0);
    setTaskStatus(0);
    setUpdateMenu(false)

  }

  const del =()=>{
      const updatedTodos = todos.filter((todo,i)=>i!==updateId);
      setTodos(updatedTodos)
      setTaskDisc("");
      setTaskTitle("");
      setTaskImg(0);
      setTaskStatus(0);
      setUpdateMenu(false)
  }
  const update=()=>{
   
    setTaskDisc("");
    setTaskTitle("");
    setTaskImg(0);
    setTaskStatus(0);
    setUpdateMenu(false)
  }

  const add =()=>{
    setTaskDisc("");
    setTaskTitle("");
    setTaskImg(0);
    setTaskStatus(0);
    setAddMenu(false)
  }
  console.log(todos);

  return (
    <div className=" tracking-wide w-screen max-w-screen-sm  md:p-16 p-6   ">
      <div>
        <div className="flex  gap-4   items-start ">
          <Image src={"/Logo.svg"} alt={""} height={40} width={40} />

          <div className="flex flex-col gap-2">
            <div className="md:text-4xl tracking-wider text-2xl flex items-center gap-3">
              My Task Board
              <Image
                src={"/Edit_duotone.svg"}
                alt={""}
                width={20}
                height={20}
              />
            </div>
            <h2>Tasks to keep organised</h2>
          </div>
        </div>
      </div>
      {/* tasks */}

      <div>
        {todos.map((items, index) => (
         index>=1&&(
          <button key={index}
          onClick={() => {setUpdateMenu(!upadteMenu)
            setUpdateId(index)
            setTaskImg(items.icon)
            setTaskTitle(todos[index].title)
            setTaskDisc(todos[index].disc)
            
          }}
          className={cn("bg-[#F5E8D5] mt-5 h-full w-full py-[15px] px-[15px] rounded-xl flex gap-3 items-center",Status[items.status].status_bg)}
        >
          <div className={" w-[40px] h-[40px] rounded-lg flex items-center justify-center"}>
            <Image
              src={Images[items.icon]}
              alt={""}
              height={30}
              width={30}
            />
          </div>
          <div className=" h-full w-[80%] flex flex-col justify-start items-start ">
              <div className="text-md font-semibold">{items.title}</div>
              <div className="text-sm">{items.disc}</div>
          </div>
          {
            Status[items.status].image&&(
              <div
              className={cn(
                "w-[30px] h-[30px] rounded-lg flex items-center justify-center ",
                Status[items.status].img_bg
              )}
            >
              <Image src={Status[items.status].image} alt={""} height={20} width={20} />
            </div>
            )
          }
        </button>
         )
        ))}
      </div>

      {/* AddTask */}

      <button
        onClick={() => setAddMenu(!addMenu)}
        className="bg-[#F5E8D5] mt-5 w-full py-[15px] px-[15px] rounded-xl flex gap-3 items-center"
      >
        <div className="bg-[#E9A23B] w-[40px] h-[40px] rounded-lg flex items-center justify-center">
          <Image
            src={"/Add_round_duotone.svg"}
            alt={""}
            height={30}
            width={30}
          />
        </div>
        <div className="text-sm  font-semibold">Add New Task</div>
      </button>

      {/* ADD MENU */}

      {addMenu && (
        <div className="w-[100vw] h-[100vh]   absolute z-[1] top-0 left-0">
          <div
            onClick={add}
            className=" blur-xl grayscale opacity-40 bg-black z-[1] w-[100vw] h-[100vh] absolute "
          ></div>
          <div className="z-[2] h-[100vh] absolute right-0 p-10 w-screen max-w-screen-sm ">
            <div className="bg-[#f8fafc] h-full relative  p-4 rounded-xl">
              <div className="flex relative justify-between">
                <h1 className="text-xl font-semibold">Task Details</h1>
                <button
                  onClick={add}
                  className="  w-[35px] h-[35px] border items-center justify-center flex rounded-xl"
                >
                  <Image
                    src={"/close_ring_duotone-1.svg"}
                    alt={""}
                    height={30}
                    width={30}
                  />
                </button>
              </div>
              {/*task INPUTS*/}

              <div className=" flex flex-col pt-3 gap-[3px] ">
                <h1 className="opacity-60 text-xs">Task name</h1>
                <input
                  type="text"
                  onChange={(event) => setTaskTitle(event.target.value)}
                  value={taskTitle}
                  className=" outline-[#3662E3] rounded-lg py-2 px-4 border-2 border-gray-400"
                  placeholder="Enter task"
                />
              </div>
              <div className=" flex flex-col pt-3 gap-[3px] ">
                <h1 className="opacity-60 text-xs">Description</h1>
                <textarea
                  
                  value={taskDisc}
                  onChange={(event) => setTaskDisc(event.target.value)}
                  className=" outline-[#3662E3] h-[100px] md:h-[170px] resize-none rounded-lg py-2 px-4 border-2 border-gray-400"
                  placeholder="Enter a short description"
                />
              </div>

              {/* icon  */}

              <div>
                <h1 className="opacity-60 text-xs pt-5">icons</h1>
                <div className="grid grid-cols-4 md:grid-cols-5 pt-1 gap-6">
                  {Images.map((items, index) => {
                    return (
                      (taskImg == index && (
                        <button
                          key={index}
                          onClick={() => {
                            setTaskImg(index);
                          }}
                          className="border-2 border-[#3662E3]  flex w-[50px] h-[50px] items-center rounded-lg justify-center bg-[#E3E8EF] "
                        >
                          <Image src={items} alt={""} width={30} height={30} />
                        </button>
                      )) || (
                        <button
                          key={index}
                          onClick={() => {
                            setTaskImg(index);
                          }}
                          className="  flex w-[50px] h-[50px] items-center rounded-lg justify-center bg-[#E3E8EF] "
                        >
                          <Image src={items} alt={""} width={30} height={30} />
                        </button>
                      )
                    );
                  })}
                </div>
              </div>
              <div className=" absolute bg-10 text-0 px-5 py-1 rounded-2xl right-4 bottom-3 ">
                <button
                  onClick={addTodo}
                  className="flex items-center justify-center gap-2"
                >
                  Save
                  <Image
                    src={"/Done_round.svg"}
                    alt={""}
                    height={20}
                    width={20}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

        {/* UpdateMenu */}

     {
      upadteMenu&&(
        <div className="w-[100vw] h-[100vh]   absolute z-[1] top-0 left-0">
          <div
            onClick={update}
            className=" blur-xl grayscale opacity-40 bg-black z-[1] w-[100vw] h-[100vh] absolute "
          ></div>
          <div className="z-[2] h-[100vh] absolute right-0 p-10 w-screen max-w-screen-sm ">
            <div className="bg-[#f8fafc] h-full relative  p-4 rounded-xl">
              <div className="flex relative justify-between">
                <h1 className="text-xl font-semibold">Task Details</h1>
                <button
                  onClick={update}
                  className="  w-[35px] h-[35px] border items-center justify-center flex rounded-xl"
                >
                  <Image
                    src={"/close_ring_duotone-1.svg"}
                    alt={""}
                    height={30}
                    width={30}
                  />
                </button>
              </div>
              {/*task INPUTS*/}

              <div className=" flex flex-col pt-3 gap-[3px] ">
                <h1 className="opacity-60 text-xs">Task name</h1>
                <input
                  type="text"
                  onChange={(event) => setTaskTitle(event.target.value)}
                  value={taskTitle}
                  className=" outline-[#3662E3] rounded-lg py-2 px-4 border-2 border-gray-400"
                  placeholder="Enter task"
                />
              </div>
              <div className=" flex flex-col pt-3 gap-[3px] ">
                <h1 className="opacity-60 text-xs">Description</h1>
                <textarea
                  
                  value={taskDisc}  
                  onChange={(event) => setTaskDisc(event.target.value)}
                  className=" outline-[#3662E3] h-[100px] md:h-[160px] resize-none rounded-lg py-2 px-4 border-2 border-gray-400"
                  placeholder="Enter a short description"
                />
              </div>

              {/* icon  */}

              <div>
                <h1 className="opacity-60 text-xs pt-5">icons</h1>
                <div className="grid grid-cols-4 md:grid-cols-5 pt-1 gap-6">
                  {Images.map((items, index) => {
                    return (
                      (taskImg == index && (
                        <button
                          key={index}
                          onClick={() => {
                            setTaskImg(index);
                          }}
                          className="border-2 border-[#3662E3]  flex w-[50px] h-[50px] items-center rounded-lg justify-center bg-[#E3E8EF] "
                        >
                          <Image src={items} alt={""} width={30} height={30} />
                        </button>
                      )) || (
                        <button
                          key={index}
                          onClick={() => {
                            setTaskImg(index);
                          }}
                          className="  flex w-[50px] h-[50px] items-center rounded-lg justify-center bg-[#E3E8EF] "
                        >
                          <Image src={items} alt={""} width={30} height={30} />
                        </button>
                      )
                    );
                  })}
                </div>
              </div>
           
              
              {/* Task Status */}

              <div className="pt">
                <h1 className="opacity-60 text-xs pt-5">Status</h1>
                <div className="grid md:grid-cols-2 tracking-wider gap-3 pt-2">
                  {Status.map((items, index) => {
                    return(
                      index!=0&&(
                        taskStatus==index&& (
                          <button
                          onClick={() => {
                            setTaskStatus(index);
                          }}
                          key={index}
                          className="relative border-[#3662E3]  p-2 flex gap-2 items-center rounded-xl   border-2 "
                        >
                          <div
                            className={cn(
                              "w-[40px] h-[40px] flex items-center rounded-lg justify-center",
                              items.img_bg
                            )}
                          >
                            <Image
                              src={items.image}
                              alt={""}
                              height={20}
                              width={20}
                            />
                          </div>
                          {items.status_title}
    
                         
                            <div className=" absolute right-3  h-[20px] w-[20px] rounded-full flex items-center justify-center bg-[#3662E3]">
                              <Image
                                src={"/Done_round.svg"}
                                alt={""}
                                height={15}
                                width={15}
                              />
                            </div>
                          
                        </button>
                        )||(
                          <button
                          onClick={() => {
                           
                          setTaskStatus(index)}}
                          key={index}
                          className="relative   p-2 flex gap-2 items-center rounded-xl   border-2 "
                        >
                          <div
                            className={cn(
                              "w-[40px] h-[40px] flex items-center rounded-lg justify-center",
                              items.img_bg
                            )}
                          >
                            <Image
                              src={items.image}
                              alt={""}
                              height={20}
                              width={20}
                            />
                          </div>
                          {items.status_title}
    
                        
                        </button>
                        )
                      )
                    )
                  }
                   
                  )}
                </div>
              </div>
            
            {/* buttons */}
            <div className="absolute bottom-0 right-0 flex gap-3 pb-2 pr-2">
            <div className="  bg-9 text-0 px-5 py-1 rounded-2xl   ">
                <button
                  onClick={del}
                  className="flex items-center justify-center gap-2"
                >
                  Delete
                  <Image
                    src={"/Trash.svg"}
                    alt={""}
                    height={20}
                    width={20}
                  />
                </button>
              </div>
            

              <div className="  bg-10 text-0 px-5 py-1 rounded-2xl ">
                <button
                  onClick={updateTodo}
                  className="flex items-center justify-center gap-2"
                >
                  Save
                  <Image
                    src={"/Done_round.svg"}
                    alt={""}
                    height={20}
                    width={20}
                  />
                </button>
              </div>
            </div>


            </div>
          </div>
          
        </div>
      )
     }
    </div>
  );
}

export default TodoList;
