import { useEffect } from "react";
import {useState } from "react";

const Pagination = ({pages, setCurrentPage}) => {const numOfPages = [];
  for(let i=1; i<=pages; i++){
    numOfPages.push(i);
}
const [currentButton, setCurrentButton] = useState(1);

useEffect(() => {
    setCurrentPage(currentButton)
},[currentButton, setCurrentPage])

    return (
        
        <div className="clearfix">
            <ul className="pagination">
               {
                numOfPages.map((page, index) => {
                    return(
                        <li key={index} className={`${currentButton === page ? "page-item active" : "page-item"}`}><a className="page-link" href="#!"
                        onClick={()=> setCurrentButton(page)}
                        >{page}</a></li>
                    )
                })
               }
                <li className={`${currentButton === numOfPages.length ? 'page-item disabled' : 'page-item'}`}><a href="#!" className="page-link"
                onClick = { () => setCurrentButton((prev) => prev === numOfPages.length ? prev : prev + 1 )}
            >Next</a></li>

            </ul>
        </div>
    )
}

export default Pagination