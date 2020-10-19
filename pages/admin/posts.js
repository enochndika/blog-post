import AdminLayout from "../../components/layout/Admin";
import { formatNumericDate } from "../../utils/formats";
import Link from "next/link";
import {
  MDBCol,
  MDBContainer,
  MDBDataTableV5,
  MDBIcon,
  MDBRow,
} from "mdbreact";
import useSWR from "swr";
import { fetcher } from "../../utils/actions/fetcher";
import { useTheme } from "next-themes";
import { useMounted } from "../../utils/mounted";
import { deletePostByAdmin } from "../../utils/actions/postActions";

export default function AdminPosts() {
  const { theme } = useTheme();
  const isMounted = useMounted();

  const { data: posts, mutate } = useSWR("/posts?limit=2000", fetcher);

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
        label: "Title",
        field: "title",
        sort: "asc",
      },
      {
        label: "Description",
        field: "description",
        sort: "asc",
      },
      {
        label: "Picture",
        field: "image",
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
      posts &&
      posts.map((post) => {
        return {
          id: post.id,
          title: post.title,
          description: post.description.slice(0, 60) + "...",
          category: post.posts_category.name,
          image: (
            <img src={post.image} alt={post.title} height={60} width={80} />
          ),
          createdAt: formatNumericDate(post.createdAt),
          actions: (
            <div>
              <div className="text-center" style={styles.forcedInline}>
                <Link href={`/posts/${post.slug}`}>
                  <span>
                    <MDBIcon far icon="eye" />
                  </span>
                </Link>
              </div>
              <div className="text-center" style={styles.forcedInline}>
                <MDBIcon
                  far
                  icon="trash-alt"
                  className="text-danger"
                  onClick={async () => {
                    if (window.confirm(`Etes-vous sûr?`)) {
                      await deletePostByAdmin(post.id);
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

  if (!posts) {
    return null;
  }
  return (
    <MDBContainer fluid>
      <MDBRow className="mt-4">
        <MDBCol>
          <Link href="/posts/create">
            <a>
              <MDBIcon icon="plus" className="mr-1" /> Ajouter un post
            </a>
          </Link>
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
        noRecordsFoundLabel="No posts found, why not create one?"
        small
        paging
        theadTextWhite={isMounted && theme === "dark"}
        tbodyTextWhite={isMounted && theme === "dark"}
        entriesLabel="Posts par page"
        infoLabel={["Affiche", "à", "de", "posts"]}
      />
    </MDBContainer>
  );
}

AdminPosts.Layout = AdminLayout;
