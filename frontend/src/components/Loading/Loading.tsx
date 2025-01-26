import "../Loading/Loading.scss";
import loading from '../../public/gifs/loading.svg'

const Loading = () => {
  return (
    <div className="loader-container d-flex justify-content-center align-items-center">
      <img
        src={loading}
        alt="loading"
        className="loader"
      />
    </div>
  );
};

export default Loading;
