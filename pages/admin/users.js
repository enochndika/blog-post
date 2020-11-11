import AdminLayout from "../../components/layout/Admin";
import { formatNumericDate } from "../../utils/formats";
import { MDBContainer, MDBDataTableV5, MDBIcon } from "mdbreact";
import useSWR from "swr";
import { fetcher } from "../../actions/fetcher";
import { deleteUser, deleteUserByAdmin } from "../../actions/userActions";
import { useTheme } from "next-themes";
import { useMounted } from "../../utils/mounted";

export default function AdminUsers() {
  const { data: users, mutate } = useSWR("/users?limit=2000", fetcher);
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
        label: "Username",
        field: "username",
        sort: "asc",
      },
      {
        label: "Prénom et Nom",
        field: "fullName",
        sort: "asc",
      },
      {
        label: "Role",
        field: "role",
        sort: "asc",
      },
      {
        label: "Connexion",
        field: "last_logged",
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
      users &&
      users.map((user) => {
        return {
          id: user.id,
          username: `@${user.username}`,
          fullName: user.fullName,
          role: user.role,
          last_logged: formatNumericDate(user.last_logged),
          createdAt: formatNumericDate(user.createdAt),
          actions: (
            <div>
              <div className="text-center" style={styles.forcedInline}>
                <MDBIcon
                  far
                  icon="trash-alt"
                  className="text-danger"
                  onClick={async () => {
                    if (window.confirm(`Etes-vous sûr?`)) {
                      await deleteUserByAdmin(user.id);
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

  if (!users) {
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
        noRecordsFoundLabel="No users found, why not create one?"
        small
        theadTextWhite={isMounted && theme === "dark"}
        tbodyTextWhite={isMounted && theme === "dark"}
        entriesLabel="Utilisateurs par page"
        infoLabel={["Affiche", "à", "de", "utilisateurs"]}
      />
    </MDBContainer>
  );
}

AdminUsers.Layout = AdminLayout;
