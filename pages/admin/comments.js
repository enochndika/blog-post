import AdminLayout from "../../components/layout/Admin";
import { formatNumericDate } from "../../utils/formats";
import { MDBContainer, MDBDataTableV5, MDBIcon } from "mdbreact";
import useSWR from "swr";
import { fetcher } from "../../actions/fetcher";
import { useTheme } from "next-themes";
import { useMounted } from "../../utils/mounted";
import { deleteCommentByAdmin } from "../../actions/commentActions";

export default function AdminComments() {
  const { data: comments, mutate } = useSWR("/comments?limit=2000", fetcher);
  const { theme } = useTheme();
  const isMounted = useMounted();

  const styles = {
    forcedInline: {
      display: "inline",
      width: "15px",
      height: "7px",
      padding: 3,
    },
  };

  const datatable = {
    columns: [
      {
        label: "Id",
        field: "id",
        sort: "asc",
      },
      {
        label: "Contenu",
        field: "content",
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
      {
        label: "Actions",
        field: "actions",
        sort: "asc",
      },
    ],
    rows:
      comments &&
      comments.map((comment) => {
        return {
          id: comment.id,
          content: comment.content,
          userId: comment.userId,
          postId: comment.postId,
          createdAt: formatNumericDate(comment.createdAt),
          actions: (
            <div>
              <div className="text-center" style={styles.forcedInline}>
                <MDBIcon
                  far
                  icon="trash-alt"
                  className="text-danger"
                  onClick={async () => {
                    if (window.confirm(`Etes-vous sûr?`)) {
                      await deleteCommentByAdmin(comment.id);
                      await mutate();
                    }
                  }}
                />
              </div>
            </div>
          ),
        };
      }),
  };

  if (!comments) {
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
        noRecordsFoundLabel="No comments found"
        small
        theadTextWhite={isMounted && theme === "dark"}
        tbodyTextWhite={isMounted && theme === "dark"}
        entriesLabel="Commentaires par page"
        infoLabel={["Affiche", "à", "de", "commentaires"]}
      />
    </MDBContainer>
  );
}

AdminComments.Layout = AdminLayout;
