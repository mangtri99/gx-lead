import Card from "../Card/Card";

export default function Loading() {
  return (
    <Card className="w-10 h-100 p-3 d-flex justify-content-center align-items-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </Card>
  );
}
