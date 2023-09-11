import {
    Checkmark24Regular,
    Delete24Regular,
    Edit24Regular,
} from "@fluentui/react-icons";
import { Button, TableCell } from "@fluentui/react-components";

const Cell = (props) => {
    function ConvertDate(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
    }

    return (
        <>
            <TableCell> {props?.Title} </TableCell>
            <TableCell> {props?.Salary} </TableCell>
            <TableCell> {props?.Department} </TableCell>
            <TableCell> {ConvertDate(props?.JoiningDate)} </TableCell>
            <TableCell> {props?.isActive && <Checkmark24Regular />} </TableCell>
            <TableCell>
                <div className="action-btn">
                    <Button
                        icon={<Edit24Regular />}
                        appearance="primary"
                        onClick={() => {
                            props.edit(props?.id);
                        }}
                    >
                        Edit
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button
                        icon={<Delete24Regular />}
                        appearance="default"
                        onClick={() => {
                            props.delete();
                        }}
                    >
                        Delete
                    </Button>
                </div>
            </TableCell>
        </>
    );
};

export default Cell;
