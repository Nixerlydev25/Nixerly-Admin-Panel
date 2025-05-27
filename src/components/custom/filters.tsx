import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { DateRangePicker } from "@/components/custom/rangerPicker";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";

type FiltersProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onResetFilters: () => void; // New prop for resetting filters
  searchPlaceHolder : string
};

export function Filters({
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  onResetFilters,
  searchPlaceHolder
}: FiltersProps) {
  const [debouncedValue, setDebouncedValue] = useState(searchQuery);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(debouncedValue);
    }, 600); // Adjust the debounce delay as needed (300ms is standard)

    return () => clearTimeout(handler); // Cleanup on unmount or value change
  }, [debouncedValue, onSearchChange]);

  return (
    <div className="p-6 flex gap-4 items-center">
      {/* Search Input */}
      <Input
        placeholder={searchPlaceHolder}
        value={debouncedValue}
        onChange={(e) => setDebouncedValue(e.target.value)}
        className="w-1/3"
      />

      {/* Date Range Picker */}
      <DateRangePicker value={dateRange} onChange={onDateRangeChange} />

      {/* Reset Filters Button */}
      <Button onClick={onResetFilters} className="ml-auto underline" variant="ghost">
        Reset Filter
      </Button>
    </div>
  );
}
