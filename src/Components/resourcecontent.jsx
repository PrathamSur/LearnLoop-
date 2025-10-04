import Resource from "./resource";
import Sidebar from "./Sidebar";


 const resourcecontent = () => {
  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <Sidebar />
      <Resource />
    </div>
  );
};

export default resourcecontent;
