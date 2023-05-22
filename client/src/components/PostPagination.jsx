import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

export default function PostPagination({ totalPosts, postsPerPage, setCurrentPage, currentPage }) {
    const [pages, setPages] = useState([]);
    useEffect(() => {
        setPages([]);
        for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
            setPages(pages => [...pages, i]);
        }
    }, [totalPosts])
    return (
        <Pagination className="mt-5 justify-content-center">
            <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage == 1} />
            <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage == 1} />
            {pages.map((page, index) => {
                if (currentPage <= index + 3 && currentPage >= index - 1) {
                    return (
                        <Pagination.Item onClick={() => setCurrentPage(page)} key={index} active={page == currentPage}>{page}</Pagination.Item>
                    );
                }
            })}
            <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage == pages.length} />
            <Pagination.Last onClick={() => setCurrentPage(pages.length)} disabled={currentPage == pages.length} />
        </Pagination>
    )
}