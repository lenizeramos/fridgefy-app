import "../Loading/Loading.scss";

const Loading = () => {
  return (
    <div className="loader-container d-flex justify-content-center align-items-center">
      <img
        src="../../public/gifs/loading.svg"
        alt="loading"
        className="loader"
      />
    </div>
  );
};

export default Loading;
