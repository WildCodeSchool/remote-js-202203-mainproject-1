const Paging = ({page,handlePage,vegetablesList,numberOfPages,pagingButtons}) => {
    return (
        <nav id="paging">
          {page !== 1 ? (
            <button className="btn-paging pointer" onClick={() => handlePage(page - 1)}>précédent</button>
          ) : (
            <span className="btn-empty"></span>
          )}
          {vegetablesList.length > 10 ? pagingButtons : ""}
          {page !== numberOfPages ? (
            <button className="btn-paging pointer" onClick={() => handlePage(page + 1)}>suivant</button>
          ) : (
            <span className="btn-empty"></span>
          )}
        </nav>
    );
};

export default Paging;