import { useState, useMemo } from "react";

const useSort = (items) => {
  const [sortConfig, setsortConfig] = useState(null);

  const sortedItems = useMemo(() => {
    let sortableItems = items.length !== 0 ? [...items] : [];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a.row[sortConfig.index].value < b.row[sortConfig.index].value) {
          return sortConfig.sortType === "ascending" ? -1 : 1;
        }
        if (a.row[sortConfig.index].value > b.row[sortConfig.index].value) {
          return sortConfig.sortType === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (dataRef, index) => {
    if (dataRef === null) {
      setsortConfig(null);
      return;
    }
    let sortType = "ascending";
    if (sortConfig && sortConfig.dataRef === dataRef && sortConfig.sortType === "ascending") {
      sortType = "descending";
    }
    setsortConfig({ dataRef, index, sortType });
  };

  return { items: sortedItems, sortConfig, requestSort };
};

export default useSort;
