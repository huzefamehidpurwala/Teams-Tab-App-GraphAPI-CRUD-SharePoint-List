import {
  Button,
  Dropdown,
  Field,
  Input,
  Option,
} from "@fluentui/react-components";
import { EditDate } from "./EditDate.tsx";
import { useState } from "react";

const FillForm = () => {
  const maxDate = new Date();
  const [joiningDate, setJoiningDate] = useState();

  function ConvertDate(str) {
    if (str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [day, mnth, date.getFullYear()].join("-");
    } else {
      return null;
    }
  }

  // return (
  //   <>
  //     <form
  //       onSubmit={(e) => {
  //         e.preventDefault();
  //         alert("success");
  //       }}
  //     >
  //       <div style={{ padding: "10px", margin: "10px" }}>
  //         <Field label={"Enter Full Name:"} required>
  //           <Input placeholder="Full Name..." />
  //         </Field>
  //       </div>

  //       <div style={{ padding: "10px", margin: "10px" }}>
  //         <Field label={"Enter Salary:"}>
  //           <Input placeholder="Salary..." />
  //         </Field>
  //       </div>

  //       <div style={{ padding: "10px", margin: "10px" }}>
  //         <Field label={"Enter Department:"}>
  //           <Dropdown
  //             // className={styles.input}
  //             style={{ minWidth: "fit-content" }}
  //             // aria-labelledby={}
  //             placeholder="Select..."
  //             // {...props}
  //             defaultValue={props?.Department}
  //             onOptionSelect={(event, data) => setDepartment(data.optionValue)}
  //             // onChange={(e) => {
  //             //   setDepartment(e?.target?.value);
  //             //   console.log(e?.target?.value);
  //             // }}
  //           >
  //             <Option value="Sharepoint">Sharepoint</Option>
  //             <Option value="MS Teams">MS Teams</Option>
  //             <Option value="OpenSource">OpenSource</Option>
  //           </Dropdown>
  //         </Field>
  //       </div>

  //       <div style={{ padding: "10px", margin: "10px" }}>
  //         <Field label={"Select Joining Date:"} required>
  //           <EditDate
  //             // className={styles.input}
  //             // style={{ minWidth: "fit-content" }}
  //             placeholder="Select a date..."
  //             showMonthPickerAsOverlay={true}
  //             highlightCurrentMonth={true}
  //             maxDate={maxDate}
  //             value={joiningDate}
  //             formatDate={(date) => ConvertDate(date)}
  //             onSelectDate={(date) => setJoiningDate(date)}
  //             // allowTextInput={true}
  //             // onChange={(e, data) => {
  //             //   setJoiningDate(e?.target?.value);
  //             //   console.log(e?.target?.value);
  //             //   console.log(data);
  //             // }}
  //             // showCloseButton={true}
  //             // isMonthPickerVisible={false}
  //           />
  //         </Field>
  //       </div>

  //       <div style={{ padding: "10px", margin: "10px" }}>
  //         <Field label={"Set Status:"}>
  //           <Dropdown
  //             // className={styles.input}
  //             style={{ minWidth: "fit-content" }}
  //             // aria-labelledby={}
  //             placeholder="Select..."
  //             // {...props}
  //             defaultValue={isActive ? "Yes" : isActive !== null && "No"}
  //             // onChange={SetActiveStatusFunc}
  //             onOptionSelect={(event, data) => setIsActive(data.optionValue)}
  //           >
  //             <Option value={true}>Yes</Option>
  //             <Option value={false}>No</Option>
  //           </Dropdown>
  //         </Field>
  //       </div>

  //       <div style={{ padding: "10px", margin: "10px" }}>
  //         <Button appearance="primary" style={{ width: "100%" }} type="submit">
  //           Submit
  //         </Button>
  //       </div>
  //     </form>
  //   </>
  // );
};

export default FillForm;
