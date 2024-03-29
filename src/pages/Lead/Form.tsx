import { useNavigate, useParams } from "react-router-dom";
import useLeadFormState from "./_hooks/useLeadFormState";
import Button from "../../components/Button/Button";
import CheckboxInput from "../../components/Input/CheckboxInput";
import FormOther from "./_components/Form/FormOther";
import FormGeneral from "./_components/Form/FormGeneral";
import { useContext, useState } from "react";
import { LayoutContext } from "../../layouts/context/LayoutContext";
import HeadWrapper from "../../components/General/HeadWrapper";
import LeadOptionProvider from "./_components/Provider/LeadOptionProvider";
import NotFound from "../../components/General/NotFound";

interface Props {
  isEdit: boolean;
}

export default function Form(props: Props) {
  const { isEdit } = props;
  const params = useParams();
  const navigate = useNavigate();
  const [agreement, setAgreement] = useState(false);
  const { form, onSubmit, onInvalid, coverages, isError } = useLeadFormState({
    isEdit,
  });
  const { setMarginContent } = useContext(LayoutContext);

  // if page is edit and data not found
  if (isError && isEdit) {
    return <NotFound />;
  }

  return (
    <HeadWrapper
      title={params.id ? "Edit Lead" : "Create Lead"}
      description="Lead Form"
    >
      <LeadOptionProvider>
        <div className="position-relative h-100">
          <form
            className="d-block mb-5"
            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          >
            <h1 className="fs-20 fw-medium mb-4">
              {params.id ? "Edit Lead" : "Add New Lead"}
            </h1>
            {/* General */}
            <FormGeneral form={form} coverages={coverages} />

            {/* Other Information */}
            <FormOther form={form} />
          </form>

          <div
            className="position-fixed main-content"
            style={{
              zIndex: 100,
              bottom: "0px",
              left: "0px",
              right: "0px",
              marginLeft: setMarginContent(),
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
                  checked={agreement}
                  onChange={() => setAgreement(!agreement)}
                />
              </div>
              <div className="d-flex align-items-center">
                <Button
                  variant="secondary"
                  outline
                  onClick={() => navigate("/leads")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="ms-2"
                  onClick={form.handleSubmit(onSubmit, onInvalid)}
                  disabled={!agreement}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </LeadOptionProvider>
    </HeadWrapper>
  );
}
