const Footer = () => {

  return (

    <div style={styles.footer}>
      Made by Prasad ❤️
    </div>

  );

};

const styles = {

  footer: {
    position: "fixed",
    bottom: "10px",
    right: "20px",
    fontSize: "14px",
    color: "#555",
    backgroundColor: "transparent",
    zIndex: 1000,
    fontWeight: "500"
  }

};

export default Footer;
