import Link from 'next/link';
import TrashAltIcon from '@/components/icons/others/trashAlt';
import EyeIcon from '@/components/icons/human/eye';
import EditIcon from '@/components/icons/others/edit';
import Props from '../../utils/defaultProps';

export default function TableProperty({ children }: Props) {
  return (
    <div className="flex dark:text-gray-200 text-gray-800">{children}</div>
  );
}

TableProperty.Edit = ({ href }: { href: string }) => (
  <div>
    <Link href={href}>
      <a>
        <EditIcon className="px-1 h-3.5 cursor-pointer" />
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
