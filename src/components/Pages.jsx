import Pagination from "react-bootstrap/Pagination";

const Pages = () => {
    return (
        <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Next />
            <Pagination.Last />
        </Pagination>
    );
};

export default Pages;
