import AdminLayout from "../../../components/layout/Admin";
import { formatNumericDate } from "../../../utils/formats";
import { MDBContainer, MDBDataTableV5, MDBIcon } from "mdbreact";
import useSWR from "swr";
import { fetcher } from "../../../actions/fetcher";
import { useTheme } from "next-themes";
import { useMounted } from "../../../utils/mounted";

export default function AdminReportChildComments() {
  const { theme } = useTheme();
  const isMounted = useMounted();

  const { data: comments } = useSWR(
    "/report-child-comments?limit=2000",
    fetcher
  );

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
        label: "Utilisateur",
        field: "userId",
        sort: "asc",
      },
      {
        label: "Commentaire",
        field: "subject",
        sort: "asc",
      },
      {
        label: "Commentaire",
        field: "childCommentId",
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
          subject: comment.subject,
          userId: comment.userId,
          childCommentId: comment.childCommentId,
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
                      console.log("issou");
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
        noRecordsFoundLabel="Pas de signalement pour l'instant"
        small
        theadTextWhite={isMounted && theme === "dark"}
        tbodyTextWhite={isMounted && theme === "dark"}
        entriesLabel="Signalements de com.. enfants par page"
        infoLabel={["Affiche", "à", "de", "signalements"]}
      />
    </MDBContainer>
  );
}

AdminReportChildComments.Layout = AdminLayout;
