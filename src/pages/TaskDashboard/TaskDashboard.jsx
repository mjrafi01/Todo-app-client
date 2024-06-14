import React, { useState } from 'react';
import { TaskForm } from './TaskForm';
import { TaskCard } from '../Shared/TaskCard';
import { OnProgressCard } from '../Shared/OnProgressCard';
import { DoneCard } from '../Shared/DoneCard';
import { useDoneList, useOnProgress, useTodoList } from '../../hooks/useOnProgress';
import { UserProfile } from '../../Components/UserProfile';

export const TaskDashboard = () => {

  const [todo, refetchTodo] = useTodoList();
  const [onProgress, refetch] = useOnProgress();
  const [doneList, refetchs] = useDoneList();
  const [showTaskForm, setShowTaskForm] = useState(false);

  const toggleTaskForm = () => {
    setShowTaskForm(!showTaskForm);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
       <div className="min-w-full place-content-center  justify-center items-center text-center">
       <UserProfile/>
       </div>
       <div className="justify-center items-center text-center  place-content-center mb-8">
       <button
         data-aos="zoom-in-down" className="mb-4 btn btn-primary "
          onClick={toggleTaskForm}
        >
          {showTaskForm ? '^' : 'Add New Task'}
        </button>
       </div>

        {showTaskForm && (
          <div className="mb-4">
            <TaskForm />
          </div>
        )}

        <div className="flex flex-col gap-8 md:flex-row md:gap-8">
          {/* To Do List */}
          <div className="bg-white rounded-lg shadow-md p-6 text-black">
            <h1 className="text-xl font-bold mb-4">To Do List</h1>
            <div className="grid gap-4">
              {todo.map((item) => (
                <TaskCard
                  key={item._id}
                  priority={item.priority}
                  description={item.description}
                  deadline={item.deadline}
                  title={item.title}
                  id={item._id}
                />
              ))}
            </div>
          </div>

          {/* On Progress List */}
          <div className="bg-blue-100 rounded-lg shadow-md p-6 md:mt-0 md:ml-4 text-blue-900">
            <h1 className="text-xl font-bold mb-4">On Progress</h1>
            <div className="grid gap-4">
              {onProgress.map((item) => (
                <OnProgressCard
                  key={item._id}
                  priority={item.priority}
                  description={item.description}
                  deadline={item.deadline}
                  title={item.title}
                  id={item._id}
                />
              ))}
            </div>
          </div>

          {/* Done List */}
          <div className="bg-green-100 rounded-lg shadow-md p-6 md:mt-0 md:ml-4 text-green-900">
            <h1 className="text-xl font-bold mb-4">Done List</h1>
            <div className="grid gap-4">
              {doneList.map((item) => (
                <DoneCard
                  key={item._id}
                  priority={item.priority}
                  description={item.description}
                  deadline={item.deadline}
                  title={item.title}
                  id={item._id} // Added id to DoneCard
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
