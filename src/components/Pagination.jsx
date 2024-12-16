import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const Pagination = ({ currentPage, setPage }) => {
    const totalPages = 10;

    return (
        <div>
            <ResponsivePagination
                current={currentPage}
                total={totalPages}
                onPageChange={setPage}
                className="flex items-center justify-center gap-5 m-5 font-roboto text-[18px] font-normal leading-[20.02px] tracking-[0.15px]  text-[#87CEEB]"
                activeClassName="bg-[#87CEEB] text-[#000] py-2 px-5 rounded-full"
            />
        </div>
    );
};

export default Pagination;
