import Link from 'next/link';
import { EditIcon, EyeIcon, TrashAltIcon } from './ui/icons';
import Props from '../utils/defaultProps';

export const TableProperty = ({ children }: Props) => {
  return (
    <div className="flex text-gray-800 dark:text-gray-200">{children}</div>
  );
};

TableProperty.Edit = ({ href }: { href: string }) => (
  <div>
    <Link href={href}>
      <a>
        <EditIcon className="h-3.5 px-1 cursor-pointer" />
      </a>
    </Link>
  </div>
);

TableProperty.View = ({ href }: { href: string }) => (
  <div className="px-1">
    <Link href={href}>
      <a>
        <EyeIcon className="h-3.5 cursor-pointer" />
      </a>
    </Link>
  </div>
);

TableProperty.Delete = ({ onClick }: { onClick: () => void }) => (
  <div className="px-1">
    <a onClick={onClick}>
      <TrashAltIcon className="h-3.5 text-red-500 cursor-pointer" />
    </a>
  </div>
);
