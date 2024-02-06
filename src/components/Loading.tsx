export default function Loading() {
  return (
    <div className="card w-10 h-100 p-3 d-flex justify-content-center align-items-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
