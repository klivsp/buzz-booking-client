import type { FieldProps } from '@/@types/form-render';
import { debouncedSetName, isCursorPointer } from '@/utils/common-functions';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CheckIcon, ChevronDown, X } from 'lucide-react';
import type React from 'react';
import { type KeyboardEvent, useEffect, useRef, useState } from 'react';
import Spinner from '../common-cards/Spinner';
import './styles.css';

const PopoverRender = ({
  options = [],
  onChange,
  value,
  placeholder,
  lastOptionRef,
  isSearchable = true,
  setSearchValue,
  placeholderSearch,
  noValueFoundMessage,
  disabled,
  displayIcon = true,
  removeValue,
  name = '',
  setFilters,
  onSelectChange,
  commandListClassname,
  selectValue,
  selectedLabel,
  isLoading = false,
  type = 'inputText',
  className,
  ...field
}: FieldProps) => {
  const [open, setOpen] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const commandListRef = useRef<HTMLDivElement>(null);
  const [select, setSelect] = useState<string>();

  useEffect(() => {
    if (selectedLabel) {
      setSelect(selectedLabel);
    } else {
      setSelect(undefined);
    }
  }, [selectedLabel]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    if (searchMode && open && isSearchable) {
      const focusAttempts = [0, 10, 50, 100];

      focusAttempts.forEach((delay) => {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, delay);
      });
      setSearchText('');
      setSearchValue?.('');
    }
  }, [searchMode, open, isSearchable]);

  const displayLabel = options.find((item) => item.value.value === value)?.label || select;

  const onValueChange = (value: string) => {
    onChange?.(value);
    onSelectChange?.(value);
    setOpen(false);
    setSearchText('');
    setSearchValue?.('');
    setSearchMode(false);
    setFilters?.((prev: any) => ({ ...prev, [name]: value }));
  };

  const onRemoveValue = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(false);
    removeValue?.();
    setFilters?.((prev: any) => ({ ...prev, [name]: '' }));
    setSelect(undefined);
    setSearchText('');
    setSearchMode(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    if (setSearchValue) {
      debouncedSetName(value, setSearchValue);
    } else {
      const filtered = options.filter((item) => (item.label as string).toLowerCase().includes(value.toLowerCase()));
      setFilteredOptions(filtered);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      if (!searchMode) {
        setSearchMode(true);
        setSearchText(' ');
        setTimeout(() => inputRef.current?.focus(), 0);
      } else {
        setSearchText((prev) => prev + ' ');
      }
    }

    if (e.key === 'Escape') {
      setSearchMode(false);
      setOpen(false);
    } else if (e.key === 'Enter' && filteredOptions.length === 1) {
      onValueChange(filteredOptions[0].value.value as string);
    } else if (e.key === 'ArrowDown' && commandListRef.current) {
      e.preventDefault();
      const firstItem = commandListRef.current.querySelector('[role="option"]') as HTMLElement;
      if (firstItem) firstItem.focus();
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!document.activeElement?.closest('[data-radix-popper-content-wrapper]')) {
        setOpen(false);
      }
    }, 100);
  };

  const handleButtonClick = () => {
    if (!disabled) {
      if (!open) {
        setOpen(true);
        setSearchMode(true);
      } else {
        setSearchMode(!searchMode);
      }
    }
  };

  return (
    <Popover
      {...field}
      open={open}
      modal={true}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setSearchMode(false);
          setSearchText('');
          if (!setSearchValue) {
            setFilteredOptions(options);
          }
        }
      }}
    >
      <PopoverTrigger
        asChild
        className={cn(`h-9 dark:text-card ${isCursorPointer(disabled)}`, !value && 'text-muted-foreground', className)}
        disabled={disabled}
      >
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          onClick={handleButtonClick}
          className={cn(
            `relative flex h-9 w-full justify-between bg-white hover:bg-white focus:bg-white dark:bg-white dark:text-card ${isCursorPointer(disabled)}`,
            (!value || value === '') && 'font-normal text-gray-500 hover:text-gray-500',
            searchMode && 'p-0 pl-2 pr-8'
          )}
          disabled={disabled}
          type="button"
        >
          {searchMode && isSearchable ? (
            <div className="h-full flex-1">
              <input
                ref={inputRef}
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholderSearch ?? 'Search...'}
                className="no-borders h-full w-full bg-transparent p-0 pl-2 md:pl-8"
                onClick={(e) => e.stopPropagation()}
                onBlur={handleBlur}
              />
            </div>
          ) : (
            <span className={cn(!value && 'text-muted-foreground')}>{displayLabel || placeholder}</span>
          )}

          {displayIcon && Boolean(value) ? (
            <Button onClick={onRemoveValue} className="!bg-transparent p-0">
              <X size={18} className="text-black" />
            </Button>
          ) : (
            <ChevronDown className={cn('absolute right-2 h-4 w-4 shrink-0 !opacity-100')} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full min-w-80 border p-0"
        style={{ width: triggerRef.current ? `${triggerRef.current.offsetWidth}px` : 'auto' }}
      >
        <Command className="flex flex-col" shouldFilter={false}>
          <CommandList
            ref={commandListRef}
            className={cn('custom-dropdown-scroll max-h-60 touch-pan-y overflow-y-auto', commandListClassname)}
          >
            {isLoading ? (
              <Spinner className="!max-h-20 min-h-40 w-full items-center justify-center" />
            ) : (setSearchValue ? options : filteredOptions).length === 0 ? (
              <CommandEmpty>{noValueFoundMessage ?? 'No results found'}</CommandEmpty>
            ) : (
              <CommandGroup>
                {(setSearchValue ? options : filteredOptions).map((item, index) => (
                  <CommandItem
                    key={index}
                    value={item.value.value as string}
                    onSelect={() => onValueChange(item.value.value as string)}
                    className={cn(
                      'relative flex items-center gap-2 px-2 py-1.5',
                      'cursor-pointer hover:bg-secondary hover:text-secondary-foreground',
                      value === item.value.value && 'bg-secondary/10 font-medium text-secondary-foreground'
                    )}
                    ref={index === options.length - 1 ? lastOptionRef : null}
                  >
                    <CheckIcon
                      className={cn('h-4 w-4 flex-shrink-0', value === item.value.value ? 'opacity-100' : 'opacity-0')}
                    />
                    <span>{item.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverRender;
