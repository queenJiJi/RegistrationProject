/* eslint-disable react/style-prop-object */
function Modal(props) {
  const { message } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        // bottom: 50,
        top: 70,
        left: 0,
        width: "100%",
        height: 50,
      }}
    >
      <div
        style={{
          width: "30%",
          textAlign: "center",
          borderRadius: 30,
          background:"pink",
          fontSize: 20,
          color: "white",
        }}
      >
        <p style={{fontFamily:"Jua"}}>{message}</p>
      </div>
    </div>
  );
}

export default Modal;