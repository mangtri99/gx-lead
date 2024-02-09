import Card from "./Card";

interface Props {
  title?: string | number;
  subtitle?: string;
}

export default function CardWidget(props: Props) {
  const { title, subtitle } = props;
  return (
    <Card className="h-100">
      <Card.Body>
        <p className="fw-bold fs-20 text-black">{title}</p>
        <p className="fs-14 mb-0">{subtitle}</p>
      </Card.Body>
    </Card>
  );
}
