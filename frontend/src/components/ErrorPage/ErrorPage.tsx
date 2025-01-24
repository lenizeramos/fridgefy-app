import "../ErrorPage/ErrorPage.scss"

const ErrorPage = () => {
  return (
    <div className="error-container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-1 fw-bold">
        4<span className="emoji">😞</span>4
      </h1>
      <p className="fs-4">Oops! The page you're looking for doesn't exist.</p>
    </div>
  )
}

export default ErrorPage