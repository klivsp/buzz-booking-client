import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import englishFlag from '@/public/images/en.svg';
import italianFlag from '@/public/images/it.svg';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'IT', label: 'Italiano', flag: italianFlag.src },
  { code: 'EN', label: 'English', flag: englishFlag.src },
] as const;

type BookingLanguageSelectorProps = {
  className?: string;
};

const BookingLanguageSelector = ({ className }: BookingLanguageSelectorProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<(typeof languages)[number]>(languages[0]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={cn(
          'inline-flex h-8 items-center gap-1 rounded-full border border-slate-200 px-2 text-xs font-medium text-slate-700 hover:bg-slate-100',
          className
        )}
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        <img alt={selectedLanguage.label} className="h-3.5 w-5 rounded-[2px] object-cover" src={selectedLanguage.flag} />
        <ChevronDown className="h-3 w-3" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-9 z-20 w-28 rounded-md border border-slate-200 bg-white p-1 shadow-md">
          {languages.map((language) => (
            <button
              key={language.code}
              className="flex w-full items-center gap-2 rounded px-2 py-1 text-left text-xs text-slate-700 hover:bg-slate-100"
              onClick={() => {
                setSelectedLanguage(language);
                setIsOpen(false);
              }}
              role="option"
              type="button"
            >
              <img alt={language.label} className="h-3.5 w-5 rounded-[2px] object-cover" src={language.flag} />
              <span>{language.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingLanguageSelector;
