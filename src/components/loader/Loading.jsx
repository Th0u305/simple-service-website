import "./load.css";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="loading-wave">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
    </div>
  );
};

export default Loading;
