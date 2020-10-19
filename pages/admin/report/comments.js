import AdminLayout from "../../../components/layout/Admin";
import { formatNumericDate } from "../../../utils/formats";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBDataTableV5,
  MDBIcon,
  MDBRow,
} from "mdbreact";
import useSWR from "swr";
import { fetcher } from "../../../utils/actions/fetcher";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useMounted } from "../../../utils/mounted";

export default function AdminReportComments() {
  const { theme } = useTheme();
  const isMounted = useMounted();

  const { data: comments } = useSWR("/report-comments?limit=2000", fetcher);

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
        label: "Motif",
        field: "subject",
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
      comments &&
      comments.map((comment) => {
        return {
          id: comment.id,
          subject: comment.subject,
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
      <MDBRow className="mb-4">
        <MDBCol>
          <div>
            <Link href="/admin/report/subcomments">
              <a>
                <MDBBtn size="sm" gradient="blue" className="text-capitalize">
                  Voir aussi le signalement des Commentaires enfants
                </MDBBtn>
              </a>
            </Link>
          </div>
        </MDBCol>
      </MDBRow>
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
        noRecordsFoundLabel="Aucun signalement pour l'instant"
        small
        theadTextWhite={isMounted && theme === "dark"}
        tbodyTextWhite={isMounted && theme === "dark"}
        entriesLabel="Signalements de com.. par page"
        infoLabel={["Affiche", "à", "de", "signalement"]}
      />
    </MDBContainer>
  );
}

AdminReportComments.Layout = AdminLayout;
