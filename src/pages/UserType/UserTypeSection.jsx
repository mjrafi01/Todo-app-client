export const UserTypesSection = () => {
    return (
      <div className="bg-gray-200 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Who Uses Our To-Do List Website?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Developers */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4">Developers</h3>
              <p className="text-gray-700 text-center">
                Developers use our to-do list platform to manage their coding tasks, track project progress, and organize their development workflows efficiently.
              </p>
            </div>
  
            {/* Corporate Professionals */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4">Corporate Professionals</h3>
              <p className="text-gray-700 text-center">
                Corporate professionals leverage our to-do list tools for managing daily tasks, coordinating with team members, and enhancing overall productivity.
              </p>
            </div>
  
            {/* Bankers */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4">Bankers</h3>
              <p className="text-gray-700 text-center">
                Bankers find our to-do list app useful for tracking important deadlines, managing client meetings, and organizing financial tasks efficiently.
              </p>
            </div>
  
            {/* Students */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4">Students</h3>
              <p className="text-gray-700 text-center">
                Students use our to-do list app to keep track of assignments, manage study schedules, and stay organized throughout the academic year.
              </p>
            </div>
  
            {/* Freelancers */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4">Freelancers</h3>
              <p className="text-gray-700 text-center">
                Freelancers benefit from our to-do list platform by organizing their projects, tracking client deadlines, and managing multiple tasks efficiently.
              </p>
            </div>
  
            {/* Home Managers */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4">Home Managers</h3>
              <p className="text-gray-700 text-center">
                Home managers use our to-do list app to keep track of household chores, manage family schedules, and ensure that everything gets done on time.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  