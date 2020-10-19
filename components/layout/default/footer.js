import Link from "next/link";
import { MDBContainer, MDBFooter } from "mdbreact";

export const Footer = () => {
  const styles = {
    main: {
      backgroundColor: "#111111",
    },
  };
  return (
    <MDBFooter className="font-small pt-4 mt-4" style={styles.main}>
      <MDBContainer fluid>
        <div className="text-center" style={{ width: "60%", margin: "auto" }}>
          <p>
            This application is made with React, Next js, Node js and PostgreSQL
          </p>
          <p>
            For any request for information or collaboration, please complete
            the contact form
            <Link href="/contact">
              <a className="text-primary pl-1">here</a>
            </Link>
          </p>
        </div>
      </MDBContainer>
      <div className="footer-copyright text-center py-3" style={styles.main}>
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:
          <span> ENOCH NDIKA </span>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};
