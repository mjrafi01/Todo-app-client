import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { useAxiosSecure } from '../../hooks/useAxiosSecure';
import { useTodoList } from '../../hooks/useOnProgress';


export const TaskForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [, refetchTodo] = useTodoList(); // Use refetch function

  const onSubmit = async (data) => {
    const { title, description, deadline, priority } = data;
    console.log(data);
    reset();
    if (user && user.email) {
      const todoItem = {
        title,
        description,
        deadline,
        priority,
        email: user.email,
      };
      try {
        const res = await axiosSecure.post('/todoCollection', todoItem);
        console.log(res.data);
        refetchTodo(); // Refetch the todo list after adding a new item
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  return (
    <div data-aos="zoom-out" className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Add a New Task</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input input-bordered w-full"
          {...register('title')}
          placeholder="Title"
          required
        />
        <textarea
          className="textarea textarea-primary w-full"
          {...register('description')}
          placeholder="Description"
          required
        ></textarea>
        <input
          className="input input-bordered w-full"
          {...register('deadline')}
          type="date"
          required
        />
        <select
          className="select select-bordered w-full"
          {...register('priority')}
          required
        >
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
        </select>
        <button className="btn btn-primary w-full" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
};
