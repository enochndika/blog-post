import { useEffect } from "react";
import { useRouter } from "next/router";

function Error({ statusCode }) {
  const router = useRouter();
  useEffect(() => {
    if (statusCode === 502) {
    }
    router.push("/");
  }, [router]);
  return (
    <div className="text-center">
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "Page Introuvable"}
      </p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
