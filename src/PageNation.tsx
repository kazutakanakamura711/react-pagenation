import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

// 項目の型を定義
interface Item {
  id: number;
  name: string;
  age: number;
}

// Itemsコンポーネントのプロパティの型を定義
interface ItemsProps {
  currentItems: Item[] | null;
}

// テストデータを作成
const items = Array.from({ length: 33 }, (_, index) => ({
  id: index,
  name: `Test${index}`,
  age: 30 + (index % 10), // 例として、年齢を30から39までの値に設定
}));

const itemsPerPage = 10;

export const PageNation = () => {
  const Items = ({ currentItems }: ItemsProps) => {
    if (!currentItems) {
      return null;
    }

    return (
      <ul>
        {currentItems.map((item) => (
          <li
            key={item.id}
          >{`id: ${item.id}, name: ${item.name}, age: ${item.age}`}</li>
        ))}
      </ul>
    );
  };

  const [currentItems, setCurrentItems] = useState<Item[] | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
};
