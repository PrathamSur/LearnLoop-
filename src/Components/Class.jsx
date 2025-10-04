const Class = () => {
  const classrooms = [
    { name: "Biology Classroom", img: "/biology.png" },
    { name: "Art Classroom", img: "/art.png" },
    { name: "Economy Classroom", img: "/economy.png" },
    { name: "IT Classroom", img: "/it.png" },
    { name: "Math Classroom", img: "/math.png" },
    { name: "Physics Classroom", img: "/physics.png" },
  ];

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Our classes <span className="text-gray-500"></span>
        </h2>
      </div>

      {/* Classroom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
        {classrooms.map((classroom, i) => (
          <div
            key={i}
            className="bg-white shadow-sm rounded-xl p-4 border border-gray-200 hover:shadow-md transition"
          >
            <img
              src={classroom.img}
              alt={classroom.name}
              className="w-16 h-16 object-contain mx-auto"
            />
            <h3 className="text-center mt-4 font-semibold text-gray-800">
              {classroom.name}
            </h3>
          </div>
        ))}
      </div>

      {/* Add Classroom Button */}
      <div className="flex justify-center mt-8">
        <button className=" bg-black hover:bg-black-700 text-white px-6 py-3 rounded-full shadow-md">
          + Add new classroom
        </button>
      </div>
    </main>
  );
};

export default Class;
