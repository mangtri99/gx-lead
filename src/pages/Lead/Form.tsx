/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import useLeadFormState from "./_hooks/useLeadFormState";
import Button from "../../components/Button/Button";
import CheckboxInput from "../../components/Input/CheckboxInput";
import FormOther from "./_components/Form/FormOther";
import FormGeneral from "./_components/Form/FormGeneral";

interface Props {
  isEdit: boolean;
}

export default function Form(props: Props) {
  const { isEdit } = props;
  const params = useParams();
  const { form, onSubmit, onInvalid, options } = useLeadFormState({ isEdit });

  return (
    <div className="position-relative h-100">
      <form
        className="d-block"
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
      >
        <h1 className="fs-20 fw-medium mb-4">
          {params.id ? "Edit Lead" : "Add New Lead"}
        </h1>
        {/* General */}
        <FormGeneral form={form} options={options} />

        {/* Other Information */}
        <FormOther form={form} options={options} />
      </form>

      <div
        className="position-fixed main-content"
        style={{
          bottom: "0px",
          left: "0px",
          right: "0px",
        }}
      >
        <div className="bg-white d-flex justify-content-between align-items-center shadow-sm py-3 px-4">
          <div>
            <CheckboxInput
              id="agreemet"
              label={
                <span>
                  I hereby certify that the information above is <br />
                  true and accurate.
                </span>
              }
            />
          </div>
          <div className="d-flex align-items-center">
            <Button
              variant="secondary"
              outline
              onClick={() => console.log("cancel")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="ms-2"
              onClick={form.handleSubmit(onSubmit, onInvalid)}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
