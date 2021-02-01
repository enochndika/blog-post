import { formatDate } from "../utils/formats";
import { StarIcon } from "./ui/icons";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

interface PostDetailsProps {
  author: string;
  category: string;
  date: Date;
  readTime: number;
}
export const PostDetails = ({
  author,
  category,
  date,
  readTime,
}: PostDetailsProps) => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  return (
    <div className="text-gray-600 dark:text-grayer text-small">
      <div>
        <span className="text-gray-900 dark:text-white mr-1">{author}</span>
        <span className="mr-1">{t("Components.default.category")}</span>
        <span className="text-gray-900 dark:text-white mr-1">{category}</span>
      </div>
      <div className="flex">
        <span className="mr-1">{formatDate(date, locale)}</span>
        <span>&#9632;</span>
        <div className="flex ml-2">
          {readTime} {t("Components.default.estimatedRead")}{" "}
          <StarIcon size={20} className="h-3.5" space={3} />
        </div>
      </div>
    </div>
  );
};
