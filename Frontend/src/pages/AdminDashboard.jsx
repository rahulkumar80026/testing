import React from "react";
import AdminNavbar from "../components/Navbar";
import UpdateMenu from "../components/Uploads/UploadForm";
import Footer from "../components/Footer";

function AdminDashboard({ onMenuUpdate }) {

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar always at the top */}
      <AdminNavbar />

      {/* Content - flex-grow for filling vertical space, without forcing h-screen */}
      <main className="flex-grow pt-20 px-6 w-full">
        <UpdateMenu onMenuUpdate={onMenuUpdate} />
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}

export default AdminDashboard;
