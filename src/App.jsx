import React from "react";
import { Route, Routes } from "react-router-dom";
import MemberForm from "./Components/MemberForm";
import GetMembers from "./Components/GetMembers";
import GetMember from "./Components/GetMember";
import EditMember from "./Components/EditMember";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MemberForm />} />
        <Route path="/getmembers" element={<GetMembers />} />
        <Route path="/getmember/:id" element={<GetMember />} />
        <Route path="/editmember/:id" element={<EditMember />} />
      </Routes>
    </div>
  );
};

export default App;
