import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ pageNum, pagiPage, setActivePage }) => {

  //to do : add prev button and next button function for pagination
  const handlePrev = id => {
    let currentPage;
      if( Number(id) <= 1 ) {
         return currentPage = 1;
      }else currentPage = id - 1

      setActivePage(currentPage)
  };

  const handleNext = id => {

    let currentPage;
    if(Number(id) >= Number(pagiPage)) {
      currentPage = pagiPage;
    }else {
      currentPage = id + 1
      
    }
    setActivePage(currentPage);
  };
  return (
    <Pagination className="mt-3">

      <Pagination.Prev 
      style={{cursor: pageNum === '1' ? 'not-allowed':'pointer'}} 
      onClick={ () =>handlePrev(pageNum)} />

      {
         Array.from({ length : pagiPage }).map((_,ind) =>(
           <Pagination.Item key={ind} 
           active={ Number(pageNum) === ind + 1 && true}
           onClick={()=>setActivePage(ind+1)}
           >
            { ind + 1}
           </Pagination.Item>
         ))
      }
      <Pagination.Next onClick={()=>handleNext(pageNum)} 
      style={{cursor: Number(pageNum) === Number(pagiPage) ? 'not-allowed':'pointer'}}  />
    </Pagination>
  );
};

export default PaginationComponent;
