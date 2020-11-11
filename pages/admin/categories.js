import AdminLayout from "../../components/layout/Admin";
import { formatNumericDate } from "../../utils/formats";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBDataTableV5,
  MDBIcon,
  MDBRow,
} from "mdbreact";
import useSWR from "swr";
import { fetcher } from "../../actions/fetcher";
import { useTheme } from "next-themes";
import { useMounted } from "../../utils/mounted";
import { useState } from "react";
import { AddCategory } from "../../helpers/AddCategory";
import { deletePostCategory } from "../../actions/postActions";

export default function AdminPostCategories() {
  const [openModal, setOpenModal] = useState(false);
  const { theme } = useTheme();
  const isMounted = useMounted();

  const { data: categories, mutate } = useSWR(
    "/post-categories?limit=2000",
    fetcher
  );

  const toggle = () => {
    setOpenModal(!openModal);
  };

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
        label: "Nom",
        field: "name",
        sort: "asc",
      },
      {
        label: "Date de creation",
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
      categories &&
      categories.map((category) => {
        return {
          id: category.id,
          name: category.name,
          userId: category.userId,
          createdAt: formatNumericDate(category.createdAt),
        };
      }),
  };

  if (!categories) {
    return null;
  }
  return (
    <MDBContainer fluid>
      <AddCategory isOpen={openModal} toggle={toggle} mutate={mutate} />
      <MDBRow>
        <MDBCol>
          <MDBBtn
            size="md"
            className="text-capitalize"
            gradient="blue"
            onClick={() => setOpenModal(true)}
          >
            Créer
          </MDBBtn>
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
        noRecordsFoundLabel="Aucun catégorie trouvé"
        small
        theadTextWhite={isMounted && theme === "dark"}
        tbodyTextWhite={isMounted && theme === "dark"}
        entriesLabel="Categories par page"
        infoLabel={["Affiche", "à", "de", "catégories"]}
      />
    </MDBContainer>
  );
}

AdminPostCategories.Layout = AdminLayout;
