interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}

export const SearchBar = ({
  searchQuery,
  setSearchQuery,
  onSearch,
}: SearchBarProps) => (
  <div className="tw-mb-6 flex gap-4">
    <input
      className="tw-input"
      placeholder="Search by make..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <button onClick={onSearch} className="tw-btn-primary">
      Search
    </button>
  </div>
);
