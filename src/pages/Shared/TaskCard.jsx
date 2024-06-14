import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { axiosSecure } from '../../hooks/useAxiosSecure';
import { useAuth } from '../../hooks/useAuth';
import { useDoneList, useOnProgress, useTodoList } from '../../hooks/useOnProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlay, faCheck, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

// Initialize AOS
AOS.init();

export const TaskCard = ({
  title,
  description,
  priority,
  deadline,
  id,
}) => {
  const { user } = useAuth();
  const [todo, refetchTodo] = useTodoList();
  const [onProgress, refetchOnProgress] = useOnProgress();
  const [doneList, refetchDoneList] = useDoneList();

  const priorityClass = {
    Low: 'text-green-500',
    Moderate: 'text-yellow-500',
    High: 'text-red-500',
  }[priority] || 'text-gray-500';

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    title,
    description,
    priority,
    deadline,
  });

  const handleEditClick = () => {
    setFormData({
      title,
      description,
      priority,
      deadline,
    });
    setEditModalOpen(true);
    setDropdownOpen(false); // Close dropdown after opening edit modal
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { title, description, priority, deadline } = formData;

    axiosSecure.patch(`/todoCollection/${id}`, {
      title,
      description,
      priority,
      deadline,
    })
      .then((res) => {
        console.log('Task updated:', res.data);
        refetchTodo();
        setEditModalOpen(false); // Close modal after successful update
        Swal.fire('Success', 'Task updated successfully!', 'success');
      })
      .catch((error) => {
        console.error('Error updating task:', error);
        Swal.fire('Error', 'Failed to update task.', 'error');
      });
  };

  const handleDeleteClick = (id) => {
    console.log(`Delete clicked for task ${id}`);
  
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this task. This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/todoCollection/${id}`) // Send DELETE request
          .then((res) => {
            console.log(`Deleted task with id ${id}`, res.data);
            refetchTodo(); // Assuming refetchTodo is a function to update the list
            Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
          })
          .catch((error) => {
            console.error(`Error deleting task with id ${id}`, error);
            Swal.fire('Error!', 'Failed to delete task.', 'error');
          });
      }
    });
  };

  const handleMoveToInProgressClick = (id) => {
    const onProgressItem = {
      title,
      description,
      priority,
      deadline,
      email: user.email,
    };
  
    axiosSecure.post('/onProgressCollection', onProgressItem)
      .then((res) => {
        console.log('Task moved to In Progress:', res.data);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Task moved to In Progress successfully.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        axiosSecure.delete(`/todoCollection/${id}`)
          .then(() => {
            console.log(`Deleted task with id ${id}`);
            refetchOnProgress();
            refetchTodo();
          })
          .catch((error) => {
            console.error(`Error deleting task with id ${id}`, error);
          });
      })
      .catch((error) => {
        console.error('Error moving task to In Progress:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to move task to In Progress.',
        });
      });
  };

  const handleMoveToDoneClick = (id) => {
    console.log(`Move to Done clicked for task ${id}`);
    const DoneItem = {
      title,
      description,
      priority,
      deadline,
      email: user.email,
    };

    axiosSecure
      .post('/doneCollection', DoneItem)
      .then((res) => {
        console.log('Task moved to Done:', res.data);
        axiosSecure
          .delete(`/onProgressCollection/${id}`)
          .then((res) => {
            console.log(`Deleted task with id ${id}`, res.data);
            refetchOnProgress();
            refetchDoneList();
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Task moved to Done successfully.',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
          })
          .catch((error) => {
            console.error(`Error deleting task with id ${id}`, error);
          });
      })
      .catch((error) => {
        console.error('Error moving task to Done:', error);
        Swal.fire('Error!', 'Failed to move task to Done.', 'error');
      });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div data-aos="fade-up-right" className="relative">
      <div className="card bg-white shadow-lg rounded-lg p-4 mb-4">
        <div className="card-body relative">
          <div className="absolute top-2 right-2">
            <button onClick={toggleDropdown} className="btn btn-outline btn-secondary">
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded-lg shadow-xl z-20">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleEditClick}>
                  <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleDeleteClick(id)}>
                  <FontAwesomeIcon icon={faTrashAlt} className="mr-2" /> Delete
                </button>
              </div>
            )}
          </div>
          <h2 className="card-title text-xl font-bold mb-2">{title}</h2>
          <p className="mb-2 text-gray-700">{description}</p>
          <p className={`mb-2 font-semibold ${priorityClass}`}>Priority: {priority}</p>
          <p className="mb-2 text-gray-500">Deadline: {new Date(deadline).toLocaleDateString()}</p>
          <div className="card-actions flex justify-end space-x-2">
            <button className="btn btn-outline btn-blue hover:bg-blue-500 hover:text-white" onClick={() => handleMoveToInProgressClick(id)}>
              <FontAwesomeIcon icon={faPlay} /> Move to In Progress
            </button>
            <button className="btn btn-outline btn-green hover:bg-green-500 hover:text-white" onClick={() => handleMoveToDoneClick(id)}>
              <FontAwesomeIcon icon={faCheck} /> Move to Done
            </button>
          </div>
        </div>
      </div>

      {editModalOpen && (
        <div  data-aos="flip-right" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="form-textarea mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleFormChange}
                  className="form-select mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleFormChange}
                  className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button type="button" className="btn btn-outline" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
