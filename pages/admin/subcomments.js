import AdminLayout from "../../components/layout/Admin";
import { formatNumericDate } from "../../utils/formats";
import { MDBContainer, MDBDataTableV5, MDBIcon } from "mdbreact";
import useSWR from "swr";
import { fetcher } from "../../utils/actions/fetcher";
import { useTheme } from "next-themes";
import { useMounted } from "../../utils/mounted";
import { deleteCommentByAdmin } from "../../utils/actions/commentActions";

export default function AdminSubComments() {
  const { theme } = useTheme();
  const isMounted = useMounted();
  const { data: childComments } = useSWR("/child-comments?limit=2000", fetcher);

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
        label: "Commentaire",
        field: "commentId",
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
      childComments &&
      childComments.map((comment) => {
        return {
          id: comment.id,
          content: comment.content,
          userId: comment.userId,
          commentId: comment.commentId,
          createdAt: formatNumericDate(comment.createdAt),
          actions: (
            <div>
              <div className="text-center" style={styles.forcedInline}>
                <MDBIcon
                  far
                  icon="trash-alt"
                  className="text-danger"
                  onClick={async () => {
                    if (window.confirm(`Are you sure?`)) {
                      await deleteCommentByAdmin(comment.id);
                    }
                  }}
                />
              </div>
            </div>
          ),
        };
      }),
  };

  if (!childComments) {
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
        entriesLabel="Commentaires enfants par page"
        infoLabel={["Affiche", "à", "de", "com.. enfants"]}
      />
    </MDBContainer>
  );
}

AdminSubComments.Layout = AdminLayout;
