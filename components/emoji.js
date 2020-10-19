import { MDBIcon } from "mdbreact";

export const Emoji = () => {
  const style = {
    icon: {
      color: "yellow",
    },
    main: {
      width: "50%",
      margin: "auto",
    },
  };
  return (
    <div style={style.main} className="grey-text">
      <div>
        <MDBIcon far icon="meh-rolling-eyes" size="9x" />
      </div>
      <div className="h1-responsive mt-3">Ressource introuvable</div>
    </div>
  );
};
