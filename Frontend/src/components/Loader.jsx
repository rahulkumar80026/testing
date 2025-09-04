import "../assets/css/loader.css"; 

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="loader-circle-9">
        Loading...
        <span></span>
      </div>
    </div>
  );
};

export default Loader;
