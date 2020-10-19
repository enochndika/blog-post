import AdminLayout from "../../components/layout/Admin";
import { formatNumericDate } from "../../utils/formats";
import { MDBContainer, MDBDataTableV5 } from "mdbreact";
import useSWR from "swr";
import { fetcher } from "../../utils/actions/fetcher";
import { useTheme } from "next-themes";
import { useMounted } from "../../utils/mounted";

export default function AdminLikes() {
  const { theme } = useTheme();
  const isMounted = useMounted();

  const { data: likes } = useSWR("/like-posts?limit=2000", fetcher);

  const datatable = {
    columns: [
      {
        label: "Id",
        field: "id",
        sort: "asc",
      },
      {
        label: "Utilisateur",
        field: "userId",
        sort: "asc",
      },
      {
        label: "Post",
        field: "postId",
        sort: "asc",
      },
      {
        label: "Date",
        field: "createdAt",
        sort: "asc",
      },
    ],
    rows:
      likes &&
      likes.map((like) => {
        return {
          id: like.id,
          userId: like.userId,
          postId: like.postId,
          createdAt: formatNumericDate(like.createdAt),
        };
      }),
  };

  if (!likes) {
    return null;
  }
  return (
    <MDBContainer fluid>
      <MDBDataTableV5
        data={datatable}
        entries={10}
        pagesAmount={4}
        pagingTop
        hover
        searchTop
        searchBottom={false}
        responsive
        responsiveMd
        responsiveSm
        noRecordsFoundLabel="Aucun like pour l'instant"
        small
        theadTextWhite={isMounted && theme === "dark"}
        tbodyTextWhite={isMounted && theme === "dark"}
        entriesLabel="Likes par page"
        infoLabel={["Affiche", "à", "de", "likes"]}
      />
    </MDBContainer>
  );
}

AdminLikes.Layout = AdminLayout;
