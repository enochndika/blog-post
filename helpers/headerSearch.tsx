import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type HeaderSearchProps = {
  placeholder: string;
  close?: () => void;
};

export const HeaderSearch = ({ placeholder, close }: HeaderSearchProps) => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = (values) => {
    if (values.title.length > 0) {
      router.push({
        pathname: "/posts/search",
        query: {
          title: values.title,
          page: 1,
        },
      });
      close ? close() : null;
    }
  };

  const focusClass = `focus:outline-none focus:border-b-2 focus:border-blue-700`;
  const className = `text-black bg-white dark:text-gray-300 dark:bg-darker  border-gray-300 border-b block`;
  return (
    <form
      className="inline-block lg:w-36 xl:w-full"
      onSubmit={handleSubmit(onSubmit)}
      style={{ marginTop: "-5px" }}
    >
      <div className="my-0">
        <input
          className={`${className} ${focusClass} w-full pl-3 my-2 pb-1`}
          type="text"
          name="title"
          ref={register()}
          placeholder={placeholder}
          aria-label="Search"
        />
      </div>
    </form>
  );
};
