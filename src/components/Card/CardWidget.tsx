
interface Props {
  title?: string | number;
  subtitle?: string;
}

export default function CardWidget(props: Props) {
  const { title, subtitle } = props;
  return (
    <div className="card bg-white border-0 shadow-sm" style={{
      height: "100%"
    }}>
      <div className="card-body">
        <p className="fw-bold fs-20 text-black">{title}</p>
        <p className="fs-14 mb-0">{subtitle}</p>
      </div>
    </div>
  );
}
