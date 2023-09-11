import {
  Button,
  Dropdown,
  Field,
  Input,
  Option,
  TableCell,
  // makeStyles,
} from "@fluentui/react-components";
import { Checkmark24Regular } from "@fluentui/react-icons";
import { EditDate } from "./EditDate.tsx";
import {
  useState,
  //  useRef,
  // useCallback,
} from "react";

// const useStyles = makeStyles({
//   input: {
//     maxWidth: "fit-content",
//   },
// });

const EditCell = (props) => {
  const joinDate = props.JoiningDate && new Date(props.JoiningDate);
  const [empName, setEmpName] = useState(props?.Title);
  const [empSalary, setEmpSalary] = useState(props?.Salary);
  const [department, setDepartment] = useState(props?.Department);
  const [joiningDate, setJoiningDate] = useState(joinDate);
  const [isActive, setIsActive] = useState(
    props.isActive ? true : props.isActive !== null ? false : null
  ); // isActive ? "Yes" : isActive !== null && "No"

  // console.log("const join date-> "+joinDate);
  // console.log("state join date->"+joiningDate);

  // const empName = useRef(props?.Title);
  // const empSalary = useRef(props?.Salary);

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

  const maxDate = new Date();
  // const styles = useStyles();

  // const SetActiveStatusFunc = useCallback((event, option) => {
  //   console.log("SetActiveStatusFunc-event" + event);
  //   console.log("SetActiveStatusFunc-option" + option);
  // }, []);

  return (
    <>
      <TableCell className="table-cell">
        <Field required>
          <Input
            // className={styles.input}
            style={{ minWidth: "fit-content" }}
            required
            type="text"
            name={"empName"}
            id={"empName"}
            placeholder="Enter name..."
            value={empName}
            onChange={(e) => {
              setEmpName(e?.target?.value);
            }}
          />
        </Field>
      </TableCell>
      <TableCell className="table-cell">
        <Input
          // className={styles.input}
          style={{ minWidth: "fit-content" }}
          type="number"
          name={"empSalary"}
          id={"empSalary"}
          placeholder="Enter salary..."
          value={empSalary}
          onChange={(e) => {
            setEmpSalary(e?.target?.value);
          }}
        />
      </TableCell>
      <TableCell className="table-cell">
        {/* <Input
          type="text"
          name={"empDepartment"}
          id={"empDepartment"}
          value={props?.Department}
        /> */}
        <Dropdown
          // className={styles.input}
          style={{ minWidth: "fit-content" }}
          // aria-labelledby={}
          placeholder="Select..."
          // {...props}
          defaultValue={props?.Department}
          onOptionSelect={(event, data) => setDepartment(data.optionValue)}
          // onChange={(e) => {
          //   setDepartment(e?.target?.value);
          //   console.log(e?.target?.value);
          // }}
        >
          <Option value="Sharepoint">Sharepoint</Option>
          <Option value="MS Teams">MS Teams</Option>
          <Option value="OpenSource">OpenSource</Option>
        </Dropdown>
      </TableCell>
      <TableCell className="table-cell">
        <Field required>
          <EditDate
            // className={styles.input}
            // style={{ minWidth: "fit-content" }}
            required
            placeholder="Select a date..."
            showMonthPickerAsOverlay={true}
            highlightCurrentMonth={true}
            maxDate={maxDate}
            value={joiningDate}
            formatDate={(date) => ConvertDate(date)}
            onSelectDate={(date) => setJoiningDate(date)}
            // allowTextInput={true}
            // onChange={(e, data) => {
            //   setJoiningDate(e?.target?.value);
            //   console.log(e?.target?.value);
            //   console.log(data);
            // }}
            // showCloseButton={true}
            // isMonthPickerVisible={false}
          />
        </Field>
      </TableCell>
      <TableCell className="table-cell">
        <Dropdown
          // className={styles.input}
          style={{ minWidth: "fit-content" }}
          // aria-labelledby={}
          placeholder="Select..."
          // {...props}
          defaultValue={isActive ? "Yes" : isActive !== null && "No"}
          // onChange={SetActiveStatusFunc}
          onOptionSelect={(event, data) => setIsActive(data.optionValue)}
        >
          <Option value={true}>Yes</Option>
          <Option value={false}>No</Option>
        </Dropdown>
      </TableCell>
      <TableCell className="table-cell">
        <Button
          // className={styles.input}
          style={{ minWidth: "fit-content" }}
          icon={<Checkmark24Regular />}
          appearance="primary"
          onClick={() => {
            if (empName && joiningDate) {
              props.submit({
                Title: empName,
                Salary: empSalary,
                Department: department,
                JoiningDate: joiningDate,
                isActive: isActive,
              });
            } else {
              alert("employee name and date cannot be empty!");
            }
          }}
        >
          Save
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button
          // className={styles.input}
          style={{ minWidth: "fit-content" }}
          // icon={<Checkmark24Regular />}
          appearance="default"
          onClick={() => {
            props.cancel();
          }}
        >
          Cancel
        </Button>
      </TableCell>

    </>
  );
};

export default EditCell;
