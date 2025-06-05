import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { DateRangePicker } from '@/components/custom/rangerPicker';
import { Button } from '@/components/ui/button';
import { DateRange } from 'react-day-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type FiltersProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  dateRange?: DateRange | undefined;
  onDateRangeChange?: (range: DateRange | undefined) => void;
  onResetFilters: () => void;
  searchPlaceHolder: string;
  status?: string;
  onStatusChange?: (value: string) => void;
  employmentType?: string;
  onEmploymentTypeChange?: (value: string) => void;
  jobType?: string;
  onJobTypeChange?: (value: string) => void;
};

export function Filters({
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  onResetFilters,
  searchPlaceHolder,
  status,
  onStatusChange,
  employmentType,
  onEmploymentTypeChange,
  jobType,
  onJobTypeChange,
}: FiltersProps) {
  const [debouncedValue, setDebouncedValue] = useState(searchQuery);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      if (debouncedValue.trim()) {
        onSearchChange(debouncedValue);
      } else {
        onSearchChange('');
      }
    }, 600);

    return () => clearTimeout(handler);
  }, [debouncedValue, onSearchChange]);

  return (
    <div className="p-6 flex gap-4 items-center">
      <Input
        placeholder={searchPlaceHolder}
        value={debouncedValue}
        onChange={(e) => setDebouncedValue(e.target.value)}
        className="w-1/3"
      />

      {status !== undefined && onStatusChange && (
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-1/4">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="OPEN">Open</SelectItem>
            <SelectItem value="CLOSED">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      {employmentType !== undefined && onEmploymentTypeChange && (
        <Select value={employmentType} onValueChange={onEmploymentTypeChange}>
          <SelectTrigger className="w-1/4">
            <SelectValue placeholder="Filter by employment type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FULL_TIME">Full-time</SelectItem>
            <SelectItem value="PART_TIME">Part-time</SelectItem>
            <SelectItem value="CONTRACT">Contract</SelectItem>
            <SelectItem value="FREELANCE">Freelance</SelectItem>
            <SelectItem value="TEMPORARY">Temporary</SelectItem>
            <SelectItem value="INTERNSHIP">Internship</SelectItem>
          </SelectContent>
        </Select>
      )}

      {jobType !== undefined && onJobTypeChange && (
        <Select value={jobType} onValueChange={onJobTypeChange}>
          <SelectTrigger className="w-1/4">
            <SelectValue placeholder="Filter by job type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="HOURLY">Hourly</SelectItem>
            <SelectItem value="CONTRACT">Contract</SelectItem>
            <SelectItem value="SALARY">Salary</SelectItem>
          </SelectContent>
        </Select>
      )}

      {onDateRangeChange && (
        <DateRangePicker value={dateRange} onChange={onDateRangeChange} />
      )}

      <Button
        onClick={onResetFilters}
        className="ml-auto underline"
        variant="ghost"
      >
        Reset Filter
      </Button>
    </div>
  );
}
