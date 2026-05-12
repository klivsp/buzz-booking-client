import type { FieldProps } from '@/@types/form-render';
import { debouncedSetName } from '@/utils/common-functions';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { CheckIcon, ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';
import Spinner from '../common-cards/Spinner';
import { OptionsType } from '@/@types/common';

const MultiselectRender = ({
  options = [],
  onChange,
  lastOptionRef,
  setSearchValue,
  placeholderSearch,
  noValueFoundMessage = 'No results found',
  commandListClassname,
  isLoading = false,
  multiselectValue = [],
  setSelected,
}: FieldProps) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const commandListRef = useRef<HTMLDivElement>(null);
  const [selectedItems, setSelectedItems] = useState<OptionsType[]>([]);

  const parseValue = (value: any) => {
    if (typeof value === 'string') {
      return JSON.parse(value);
    }
    return null;
  };

  const isItemSelected = (selectedOption: OptionsType) => {
    const isAlreadySelected = multiselectValue.some((item) => {
      const a = parseValue(item.value.value);
      const b = parseValue(selectedOption.value.value);
      return a?.id === b?.id;
    });

    return isAlreadySelected;
  };

  const onValueChange = (selectedOption: OptionsType) => {
    const selectedOptionData = parseValue(selectedOption.value.value);

    const newSelectedItems = isItemSelected(selectedOption)
      ? selectedItems.filter((item) => {
          const itemData = parseValue(item.value.value);
          return itemData?.id !== selectedOptionData?.id;
        })
      : [...selectedItems, selectedOption];

    setSelectedItems(newSelectedItems);
    onChange?.(newSelectedItems);
    setSelected?.(newSelectedItems);
    setSearchValue?.('');
  };

  const handleSearchChange = (e: any) => {
    setSearchValue?.(e);
    if (setSearchValue) {
      debouncedSetName(e, setSearchValue);
    }
  };

  return (
    <Command shouldFilter={false} className="relative flex w-full flex-col">
      <div
        className="relative w-full cursor-pointer rounded-md border bg-white"
        onClick={() => setOpen(!open)}
        onBlur={() => setOpen(false)}
      >
        <CommandInput
          ref={inputRef}
          onValueChange={handleSearchChange}
          placeholder={placeholderSearch ?? 'Search...'}
          className="h-10 w-full cursor-pointer  appearance-none border-input bg-transparent pl-2 pr-8 outline-none placeholder:text-muted-foreground"
        />

        <div className="pointer-events-none absolute right-2 top-3 ">
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {open && (
        <CommandList
          ref={commandListRef}
          className={cn(
            'custom-dropdown-scroll  max-h-60 touch-pan-y overflow-y-auto rounded-md border',
            commandListClassname
          )}
        >
          {isLoading ? (
            <Spinner className="!max-h-20 min-h-40 w-full items-center justify-center" />
          ) : options.length === 0 ? (
            <CommandEmpty>{noValueFoundMessage}</CommandEmpty>
          ) : (
            <CommandGroup>
              {options.map((item, index) => (
                <CommandItem
                  key={index}
                  value={item.value.value as string}
                  onSelect={() => onValueChange(item)}
                  className={cn(
                    'relative flex items-center gap-2 px-2 py-1.5',
                    'cursor-pointer hover:bg-secondary hover:text-secondary-foreground',
                    isItemSelected(item) && 'bg-disabled font-semibold text-primary',
                    item.disabled && 'cursor-not-allowed opacity-50'
                  )}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  ref={index === options.length - 1 ? lastOptionRef : null}
                >
                  <CheckIcon
                    className={cn('h-4 w-4 flex-shrink-0', isItemSelected(item) ? 'opacity-100' : 'opacity-0')}
                  />
                  <span>{item.value.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      )}
    </Command>
  );
};

export default MultiselectRender;
