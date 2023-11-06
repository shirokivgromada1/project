import { createContext, useContext, useState } from "react";

type typeFilterContextDefaultValues = {
  category: null | string;
  onChangeCategory: (category: string | null) => void;
  date: {
    startDate: Date | null;
    endDate: Date | null;
  };
  onChangeDate: (date: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
  search: null | string;
  onChangeSearch: (search: string | null) => void;
};

const filterContextDefaultValues: typeFilterContextDefaultValues = {
  category: null,
  onChangeCategory: () => {},
  date: {
    startDate: null,
    endDate: null,
  },
  onChangeDate: () => {},
  search: null,
  onChangeSearch: () => {},
};

const FilterContext = createContext(filterContextDefaultValues);

export function useFilter() {
  return useContext(FilterContext);
}

export function FilterProvider({ children }: { children: any }) {
  const [category, setCategory] = useState<null | string>(null);
  const [date, setDate] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });
  const [search, setSearch] = useState<null | string>(null);

  const onChangeSearch = (search: string | null) => {
    setSearch(search);
  };

  const onChangeCategory = (category: string | null) => {
    setCategory(category);
  };

  const onChangeDate = (date: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    setDate(date);
  };

  const value = {
    category,
    onChangeCategory,
    date,
    onChangeDate,
    search,
    onChangeSearch,
  };

  return (
    <>
      <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
    </>
  );
}
