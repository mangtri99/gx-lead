function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="table-responsive">
      <table className="table">{children}</table>
    </div>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return <thead>{children}</thead>;
}

function Body({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

function Row({ children }: { children: React.ReactNode }) {
  return <tr>{children}</tr>;
}

function Head({ children }: { children?: React.ReactNode }) {
  return (
    <th
      className="fs-14"
      style={{
        backgroundColor: "#F0F0F5",
        fontWeight: "bold",
        textWrap: "nowrap",
      }}
    >
      {children}
    </th>
  );
}

function Item({ children, className }: { children?: React.ReactNode, className?: string}) {
  return <td className={`fs-12 ${className}`}>{children}</td>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Head = Head;
Table.Item = Item;

export default Table;
