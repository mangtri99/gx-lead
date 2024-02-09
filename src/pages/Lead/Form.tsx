import { useState } from "react";
import { useParams } from "react-router-dom";
import { LuHome } from "react-icons/lu";
import { IoChevronDown } from "react-icons/io5";


import Card from "../../components/Card/Card";
import clsx from "clsx";

export default function Form() {
  const params = useParams();
  const [openGeneralForm, setOpenGeneralForm] = useState(true);
  return (
    <div>
      <h1 className="fs-20 fw-medium mb-4">
        {params.id ? "Edit Lead" : "Add New Lead"}
      </h1>
      <Card className="text-neutral-700 accordion">
        <a
          role="button"
          className="accordion-head d-flex justify-content-between align-items-center p-3"
          onClick={() => setOpenGeneralForm(!openGeneralForm)}
        >
          <div className="d-flex align-items-center fw-semibold">
            <LuHome size={20} />
            <span className="ms-2 fs-18">General</span>
          </div>
          <div className="accrodio">
            <IoChevronDown size={20} />
          </div>
        </a>
        {openGeneralForm && <div className={clsx("accordion-content", {
          'show': openGeneralForm,
        })}>Show Content</div>}
      </Card>
    </div>
  );
}
