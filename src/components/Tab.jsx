import { useContext, useEffect, useRef, useState } from "react";
import { TeamsFxContext } from "./Context";
import {
    Button,
    Field,
    Input,
    Spinner,
    Table,
    TableBody,
    TableHeader,
    TableHeaderCell,
    TableRow,
    Text,
    makeStyles,
    mergeClasses,
    shorthands,
    // useTableFeatures,
    // useTableSort,
} from "@fluentui/react-components";
import axios from "axios";
// import { Checkmark24Regular } from "@fluentui/react-icons";
import Row from "./Row";
import {
    Add24Regular,
    ArrowLeft32Filled,
    ArrowRight32Filled,
    Checkmark24Regular,
    Delete24Regular,
    PersonRegular,
    // Search24Regular,
} from "@fluentui/react-icons";
import EditCell from "./EditCell";
import FillForm from "./FillForm";
import { Navigate } from "react-router-dom";
import Pages from "./Pages";
// import { SearchBox } from "@fluentui/react-search-preview";
// import { TeamsUserCredential } from "@microsoft/teamsfx";

const useStyles = makeStyles({
    container: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
    },
    header: {
        // ...shorthands.gap('6px'),
        // margin: "20px",
        // border: "2px solid",
        // color: "red",
    },
    button: {
        ...shorthands.gap("20px"),
        maxWidth: "fit-content",
    },
    footer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
});

export default function Tab({ token }) {
    const { themeString } = useContext(TeamsFxContext);
    const styles = useStyles();
    const [dataList, setDataList] = useState({});
    const [displayCancel, setDisplayCancel] = useState(true);
    const [displayAddRow, setDisplayAddRow] = useState(false);
    const [loading, setLoading] = useState(true);
    let checkForNoData = true;
    const askRowsPerPage = useRef();
    const pageBody = useRef();

    const accessToken =
        "eyJ0eXAiOiJKV1QiLCJub25jZSI6ImphZVp4czcwVWxOOU9qZ0VxUDhsc2lxNXdqUVZ5anltR2F3bHRCU1c4WU0iLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC80NzE2NWQxNy0wZmRiLTRmMmEtYTU2Ny0xMTY3ODNmYWUzYTUvIiwiaWF0IjoxNjk0NDA5NjA4LCJuYmYiOjE2OTQ0MDk2MDgsImV4cCI6MTY5NDQ5NjMwOCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhVQUFBQUpJZ3pqUmpraE1xeDJzNURhWHk4a3U4bWFMd2lhakEvYUxzV3A1UjdoQTNOTjhaMlFEcEFKajRaWGxLUjFVVVMiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIEV4cGxvcmVyIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6Ik1laGlkcHVyd2FsYSIsImdpdmVuX25hbWUiOiJIdXplZmEiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxMDMuMTUuNjUuODQiLCJuYW1lIjoiSHV6ZWZhIE1laGlkcHVyd2FsYSIsIm9pZCI6IjFjYzU2MmI4LWMwY2QtNDcyYi1iNWJlLTQ1MWQyNzU4ZWQ4NiIsInBsYXRmIjoiMyIsInB1aWQiOiIxMDAzMjAwMkQyRTVCREQ2IiwicmgiOiIwLkFVb0FGMTBXUjlzUEtrLWxaeEZuZ19yanBRTUFBQUFBQUFBQXdBQUFBQUFBQUFDSkFOTS4iLCJzY3AiOiJBY2Nlc3NSZXZpZXcuUmVhZC5BbGwgQWNjZXNzUmV2aWV3LlJlYWRXcml0ZS5BbGwgQWNjZXNzUmV2aWV3LlJlYWRXcml0ZS5NZW1iZXJzaGlwIENoYW5uZWxNZXNzYWdlLlNlbmQgQ2hhdE1lc3NhZ2UuU2VuZCBEZXZpY2VNYW5hZ2VtZW50QXBwcy5SZWFkLkFsbCBEZXZpY2VNYW5hZ2VtZW50QXBwcy5SZWFkV3JpdGUuQWxsIE1haWwuUmVhZCBNYWlsLlNlbmQgTWFpbGJveFNldHRpbmdzLlJlYWQgTWFpbGJveFNldHRpbmdzLlJlYWRXcml0ZSBvcGVuaWQgcHJvZmlsZSBTaXRlcy5SZWFkLkFsbCBTaXRlcy5SZWFkV3JpdGUuQWxsIFVzZXIuSW52aXRlLkFsbCBVc2VyLlJlYWQgVXNlci5SZWFkV3JpdGUuQWxsIGVtYWlsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiRjN0WWw0UkgtMEllQXdGUzhMTlhoeHpHampIZlk4MGRMWm5EbFhrcXJHayIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJBUyIsInRpZCI6IjQ3MTY1ZDE3LTBmZGItNGYyYS1hNTY3LTExNjc4M2ZhZTNhNSIsInVuaXF1ZV9uYW1lIjoiSHV6ZWZhLk1AeWdyMTEub25taWNyb3NvZnQuY29tIiwidXBuIjoiSHV6ZWZhLk1AeWdyMTEub25taWNyb3NvZnQuY29tIiwidXRpIjoiTDk1RVJZUndXRXk0cXlLRnJzczBBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjkwOTEyNDYtMjBlOC00YTU2LWFhNGQtMDY2MDc1YjJhN2E4IiwiOWI4OTVkOTItMmNkMy00NGM3LTlkMDItYTZhYzJkNWVhNWMzIiwiZjI4YTFmNTAtZjZlNy00NTcxLTgxOGItNmExMmYyYWY2YjZjIiwiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19jYyI6WyJDUDEiXSwieG1zX3NzbSI6IjEiLCJ4bXNfc3QiOnsic3ViIjoiWHhtc0RGeG10aENGU01JcmZTcV9jNmxjbXl5WG1XYlZtUUtodkEzbG9RUSJ9LCJ4bXNfdGNkdCI6MTY3NDg1NTMyNX0.SdBHB17pDdLov7OPJ_PWdYI5BUK4JlIoF5HtVpnP7FaXmnZq-ssuZrLiqpOttfJtaKmt_g4fEN77oBHxVQs5znQSYtn5d27UQrk1LkbT5oNaKECMZ2hzByqOqscA2NYZ8dd6aKks9zhu9gMcUuc72WW3Q44uS5JPxP7eVhC_I9sISwJImc984TxwNxRKJtSKhOg6CYhdjVPkn8cUvq6v7wMUyAKx8X72t07yY7Fd_23jt4-dL7ffj4YtQDboMtdvq5VHub5NyYK-kSinNboM7PBtgtbFRZNSR0CDWAIXFh7FD4LzMH0JJ8aF9xeIl979dn1mDbxK5i0jQySgQEVA8Q";

    // const accessToken = token;
    // console.log("in tab -> ", accessToken);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [slicedDataList, setSlicedDataList] = useState([]);
    const [totalNumOfPages, setTotalNumOfPages] = useState(1);

    const Pagination = () => {
        // increment && setCurrentPage(currentPage + 1);
        // decrement && setCurrentPage(currentPage - 1);
        const indexOfLastElem = currentPage * rowsPerPage;
        const indexOfFirstElem = indexOfLastElem - rowsPerPage;
        // console.log("actualData -> ", dataList);
        if (!searchKeyword) {
            setSlicedDataList(
                dataList?.value?.slice(indexOfFirstElem, indexOfLastElem)
            );
            setTotalNumOfPages(dataList?.value?.length / rowsPerPage);
            // console.log("in the if funct = ", totalNumOfPages);
        } else {
            let arr = dataList?.value.filter((arrData) => {
                if (arrData?.fields?.Title) {
                    return arrData?.fields?.Title?.toLowerCase().includes(
                        searchKeyword?.toLowerCase()
                    );
                }
            });
            setSlicedDataList(arr?.slice(indexOfFirstElem, indexOfLastElem));
            setTotalNumOfPages(arr?.length / rowsPerPage);
            // console.log("in the else funct = ", totalNumOfPages);
        }

        // slicedDataList &&
        // setTotalNumOfPages(slicedDataList.length / rowsPerPage);

        // console.log("slicedDataList -> ", slicedDataList);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        // console.log("from pagination", slicedDataList);
    };

    // search
    const [searchKeyword, setSearchKeyword] = useState("");
    const HandleSearch = (event) => {
        setSearchKeyword(event.target.value);
        //  console.log(event);
    };
    // console.log(searchKeyword);

    useEffect(() => {
        dataList && Pagination();
    }, [dataList, currentPage, rowsPerPage, searchKeyword]);

    const fetch = async () => {
        // const credential = new TeamsUserCredential();
        // const scopes = ["https://graph.microsoft.com/User.Read"];
        // const token = await credential.getToken(scopes);
        // setAToken(token);
        // console.log("token -> ");
        setLoading(true);
        await axios
            .get(
                "https://graph.microsoft.com/v1.0/sites/607af17b-3466-43ec-8d7b-1047efcf6a27/lists/ed863f13-0229-4832-9770-98ed8dbcad1d/items?$expand=fields",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            .then((response) => {
                if (response) {
                    setDataList(response.data);
                    // Pagination();
                    // setLoading(false);
                } /* else {
          setDataList(`Error occured while fetching list!`);
        } */
            });
        // console.log("from fetch");
    };

    useEffect(() => {
        fetch();
        // console.log(process.env.PORT);
    }, []);

    const columns = [
        { columnKey: "name", label: "Name" },
        { columnKey: "salary", label: "Salary" },
        { columnKey: "department", label: "Department" },
        { columnKey: "joiningdate", label: "JoiningDate" },
        { columnKey: "isactive", label: "isActive" },
        { columnKey: "action", label: "Action" },
    ];

    const BtnClick = () => {
        setDisplayAddRow(!displayAddRow);
        setDisplayCancel(!displayCancel);
        // checkForNoData = false;
        // setLoading(true);
    };

    const HandleSubmit = async (msg) => {
        await axios
            .post(
                `https://graph.microsoft.com/v1.0/sites/607af17b-3466-43ec-8d7b-1047efcf6a27/lists/ed863f13-0229-4832-9770-98ed8dbcad1d/items`,
                {
                    fields: {
                        ...msg,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            .then((response) => {
                if (response.status === 201) {
                    // setShowEdit(!showEdit);
                    BtnClick();
                    alert("successful create");
                } else {
                    alert("create failed");
                }
            });

        window.location.reload();
    };

    // const [sortState, setSortState] = useState({
    //   sortDirection: "ascending",
    //   sortColumn: "file",
    // });
    // const {
    //   getRows,
    //   sort: { getSortDirection, toggleColumnSort, sort },
    // } = useTableFeatures(
    //   {
    //     columns,
    //     ...dataList,
    //   },
    //   [
    //     useTableSort({
    //       sortState,
    //       onSortChange: (e, nextSortState) => setSortState(nextSortState),
    //     }),
    //   ]
    // );
    // const headerSortProps = (columnId) => ({
    //   onClick: (e) => toggleColumnSort(e, columnId),
    //   sortDirection: getSortDirection(columnId),
    // });
    // const rows = sort(getRows());
    // console.log("huzefa  ", rows);

    return (
        <div
            className={mergeClasses(
                styles.container,
                themeString === "default"
                    ? "light"
                    : themeString === "dark"
                    ? "dark"
                    : "contrast"
            )}
            // style={{
            //     backgroundImage:
            //         themeString === "default"
            //             ? `url("light-background-4sljsr7fuk1zy6bo.jpg")`
            //             : themeString === "dark"
            //             ? `url("1662982847_1662982214_windows_11_black.jpg")`
            //             : `url("1662982847_1662982214_windows_11_black.jpg")`,
            //     backgroundAttachment: "fixed",
            //     backgroundRepeat: "no-repeat",
            //     backgroundPosition: "center",
            //     backgroundSize: "cover",
            // }}
        >
            {loading && (
                <div
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        // position: "fixed",
                        // top: "0",
                        // left: "0",
                        width: "100%",
                    }}
                >
                    <Spinner
                        size="huge"
                        labelPosition="below"
                        label="Fetching Data from GraphAPI..."
                    />
                </div>
            )}

            {!loading && (
                <>
                    <Text align="center" size={900}>
                        <p className={styles.header}>
                            CRUD Operations on Sharepoint List using GraphAPI
                        </p>
                    </Text>

                    <div
                        ref={pageBody}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            flexGrow: "2",
                            justifyContent: "space-between",
                        }}
                    >
                        <div>
                            {/* <Field label="Sample SearchBox" role="search">
        <SearchBox
          value={searchKeyword}
          placeholder="Enter value..."
          size="large"
          onChange={HandleSearch}
        />
      </Field> */}

                            <Field
                                label={"SearchBox"}
                                style={{
                                    maxWidth: "fit-content",
                                    margin: "auto",
                                }}
                            >
                                <Input
                                    value={
                                        searchKeyword === null
                                            ? ""
                                            : searchKeyword
                                    }
                                    placeholder="Enter Employee Name..."
                                    size="large"
                                    onChange={HandleSearch}
                                    contentBefore={<PersonRegular />}
                                    contentAfter={
                                        <Button
                                            appearance="transparent"
                                            onClick={() => {
                                                setSearchKeyword(null);
                                            }}
                                            icon={<Delete24Regular />}
                                        />
                                    }
                                />
                            </Field>

                            <Table
                                sortable
                                /* size="small" */ arial-label="Default table"
                                // style={{ flexGrow: "2" }}
                            >
                                <TableHeader>
                                    <TableRow>
                                        {columns.map((column) => {
                                            return (
                                                <TableHeaderCell
                                                    key={column.columnKey}
                                                    // {...headerSortProps(column.columnKey)}
                                                >
                                                    {column.label}
                                                </TableHeaderCell>
                                            );
                                        })}
                                    </TableRow>
                                </TableHeader>
                                {slicedDataList && (
                                    <TableBody>
                                        {/* {slicedDataList.map((data) => {
                                    if (!searchKeyword) {
                                        checkForNoData = false;
                                        return (
                                            <Row
                                                data={data?.fields}
                                                key={data?.fields?.id}
                                                accessToken={accessToken}
                                            />
                                        );
                                    } else {
                                        let titleName = data?.fields?.Title;
                                        // let titleName = JSON.stringify(data?.fields?.Title);
                                        // let titleNametype = typeof titleName;
                                        // console.log("titlename ->", titleNametype);
                                        // // let check = titleName.search("searchKeyword");
                                        // // if (check !== -1) {
                                        // //   return (
                                        // //     <Row
                                        // //       data={data?.fields}
                                        // //       key={data?.fields?.id}
                                        // //       accessToken={accessToken}
                                        // //     />
                                        // //   );
                                        // // }
                                        if (titleName) {
                                            if (
                                                titleName
                                                    .toLowerCase()
                                                    .search(
                                                        searchKeyword.toLowerCase()
                                                    ) !== -1
                                            ) {
                                                checkForNoData = false;
                                                return (
                                                    <Row
                                                        data={data?.fields}
                                                        key={data?.fields?.id}
                                                        accessToken={
                                                            accessToken
                                                        }
                                                    />
                                                );
                                            } /* else {checkForNoData = true;} */
                                        /*
                                        }
                                    }
                                })} */}
                                        {slicedDataList.map((data) => {
                                            checkForNoData = false;
                                            return (
                                                <Row
                                                    data={data?.fields}
                                                    key={data?.fields?.id}
                                                    accessToken={accessToken}
                                                />
                                            );
                                        })}
                                        {displayAddRow && (
                                            <TableRow>
                                                <EditCell
                                                    submit={HandleSubmit}
                                                    cancel={BtnClick}
                                                />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                )}
                            </Table>
                            {checkForNoData && (
                                <Text size={700}>No Data Found!</Text>
                            )}
                        </div>
                        <div className={styles.footer}>
                            <div>
                                {currentPage > 1 && (
                                    <Button
                                        icon={<ArrowLeft32Filled />}
                                        appearance="transparent"
                                        onClick={() => {
                                            // let pageNum = currentPage;
                                            setCurrentPage(currentPage - 1);
                                            // Pagination(false, true);
                                        }}
                                    >
                                        Prev..
                                    </Button>
                                )}
                                &nbsp;
                                <Text size={600}>{currentPage}</Text>
                                &nbsp;
                                {currentPage < totalNumOfPages && (
                                    <Button
                                        icon={<ArrowRight32Filled />}
                                        appearance="transparent"
                                        iconPosition="after"
                                        onClick={() => {
                                            // let pageNum = currentPage;
                                            setCurrentPage(currentPage + 1);
                                            // Pagination(true, false);
                                        }}
                                    >
                                        Next..
                                    </Button>
                                )}
                                {/* <Pages /> */}
                            </div>
                            <div className={styles.button}>
                                {displayCancel && (
                                    <Button
                                        appearance="primary"
                                        icon={<Add24Regular />}
                                        onClick={BtnClick}
                                    >
                                        Add Data
                                    </Button>
                                )}
                            </div>
                            <div>
                                <Field
                                    label={"Enter Number of rows to display:"}
                                >
                                    <Input
                                        ref={askRowsPerPage}
                                        onKeyDown={(e) => {
                                            e.key === "Enter" &&
                                                e.target.value > 0 &&
                                                setRowsPerPage(e.target.value);
                                        }}
                                        // onSubmit={(event) => {
                                        //     event.preventDefault();
                                        //     askRowsPerPage.current.value > 0 &&
                                        //         setRowsPerPage(
                                        //             askRowsPerPage.current.value
                                        //         );
                                        // }}
                                        // contentAfter={
                                        //     <Button
                                        //         appearance="transparent"
                                        //         icon={<Checkmark24Regular />}
                                        //         onClick={() => {
                                        //             askRowsPerPage.current.value > 0 &&
                                        //                 setRowsPerPage(
                                        //                     askRowsPerPage.current.value
                                        //                 );
                                        //         }}
                                        //     />
                                        // }
                                    />
                                </Field>
                            </div>
                        </div>
                    </div>

                    {/* <div
            style={{
              border: "1px solid black",
              padding: "20px",
              margin: "20px",
            }}
          >
            <FillForm />
          </div> */}

                    {/* <div className="horizontal-line"></div> */}
                </>
            )}
        </div>
    );
}
