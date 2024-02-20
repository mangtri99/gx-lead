import clsx from "clsx";

interface Tabs {
  label: string;
  value: string;
}

interface Props {
  items: Tabs[];
  value: string;
  onChangeTab: (value: string) => void;
}

export default function Tabs(props: Props) {
  const { items, value, onChangeTab } = props;
  return (
    <ul className="list-unstyled d-flex align-items-center overflow-x-auto border-bottom">
      {items.map((item, index) => (
        <li
          className={clsx("tab-item", {
            active: item.value === value,
          })}
          key={index}
        >
          <a role="button" onClick={() => onChangeTab(item.value)}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
