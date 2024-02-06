import { useState } from "react";
import Tabs from "../../components/Tabs/Index";
import { LuPlus } from "react-icons/lu";
import useSettingState from "./_hooks/useSettingState";
import Card from "./_components/Card";

export default function Index() {
  const { types, handleDelete, handleEdit } = useSettingState();
  const [tab, setTab] = useState("type" as string);
  const tabs = [
    {
      label: "Type",
      value: "type",
    },
    {
      label: "Channel",
      value: "channel",
    },
    {
      label: "Media",
      value: "media",
    },
    {
      label: "Source",
      value: "source",
    },
    {
      label: "Probability",
      value: "probability",
    },
    {
      label: "Status",
      value: "status",
    },
  ];

  const getLabelTab = () => {
    const label = tabs.find((item) => item.value === tab);
    return label ? `Lead ${label.label}` : "";
  };

  return (
    <div>
      <h1 className="mb-0 fs-20 fw-medium text-black">Lead Setting</h1>
      <div className="card bg-white mt-4 p-3 border-0">
        <Tabs items={tabs} value={tab} onChangeTab={(val) => setTab(val)} />
        <div className="mt-3 d-flex justify-content-between align-items-center">
          <p className="fs-20 mb-0 fw-medium">{getLabelTab()}</p>
          <button
            className="btn btn-sm btn-warning d-flex align-items-center me-2"
            type="button"
          >
            <span className="me-2 fs-14">Add New</span>
            <LuPlus size={24} />
          </button>
        </div>
        <div className="row g-2 mt-3">
          {types &&
            types?.length > 0 &&
            types.map((item, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-6">
                <Card
                  item={item}
                  onDelete={() => handleDelete(item.id, tab)}
                  onEdit={() => handleEdit(item.id, tab)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
