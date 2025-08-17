import Class from "./Class";
import Sidebar from "./Sidebar";

 const Content = () => {
  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <Sidebar />
      <Class />
    </div>
  );
};

export default Content;
