import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type BookingActionButtonProps = {
  label: string;
  variant?: 'default' | 'outline';
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
};

const BookingActionButton = ({ label, variant = 'default', className, icon, onClick }: BookingActionButtonProps) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={cn(
        'h-10 rounded-full px-6 text-xs font-medium uppercase tracking-wide',
        variant === 'default'
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'border-slate-300 text-slate-700 hover:bg-slate-100',
        className
      )}
    >
      {icon ? <span className="mr-0.5 inline-flex">{icon}</span> : null}
      <span>{label}</span>
    </Button>
  );
};

export default BookingActionButton;
