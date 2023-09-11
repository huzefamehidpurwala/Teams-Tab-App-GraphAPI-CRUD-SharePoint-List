import { TableRow } from "@fluentui/react-components";
import DefaultCell from "./DefaultCell";
import EditCell from "./EditCell";
import { useState } from "react";
import axios from "axios";

const Row = (props) => {
  const [showEdit, setShowEdit] = useState(false);

  const accessToken = props.accessToken;

  const HandleEdit = () => {
    // alert("HandleEdit " + msg);
    // console.log("HandleEdit ", msg);
    setShowEdit(!showEdit);
  };

  const HandleDelete = async () => {
    if (window.confirm("Sure Delete!")) {
      await axios
        .delete(
          `https://graph.microsoft.com/v1.0/sites/607af17b-3466-43ec-8d7b-1047efcf6a27/lists/ed863f13-0229-4832-9770-98ed8dbcad1d/items/${props?.data?.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 204) {
            alert("successful delete");
          } else {
            alert("delete failed");
          }
        });

      window.location.reload();
    }

    // setShowEdit(!showEdit);
  };

  const HandleSubmit = async (msg) => {
    // alert("HandleDelete " + msg);
    // console.log("HandleDelete ", msg);

    await axios
      .patch(
        `https://graph.microsoft.com/v1.0/sites/607af17b-3466-43ec-8d7b-1047efcf6a27/lists/ed863f13-0229-4832-9770-98ed8dbcad1d/items/${props?.data?.id}/fields`,
        { ...msg },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setShowEdit(!showEdit);
          alert("successful update");
        } else {
          alert("update failed");
        }
      });

    window.location.reload();
  };

  return (
    <>
      <TableRow key={props?.data?.id}>
        {showEdit ? (
          <EditCell
            {...props?.data}
            submit={HandleSubmit}
            cancel={HandleEdit}
          />
        ) : (
          <DefaultCell
            {...props?.data}
            edit={HandleEdit}
            delete={HandleDelete}
          />
        )}
        {/* {console.log(props.data)} */}
      </TableRow>
    </>
  );
};

export default Row;
