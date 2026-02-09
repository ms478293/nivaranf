const MapDisplay: React.FC = () => {
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d883.1326658048743!2d85.31103152857986!3d27.700897298505456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1900477cc945%3A0xd46152ab40b73162!2sNivaran%20Foundation!5e0!3m2!1sen!2snp!4v1738239655640!5m2!1sen!2snp";

  return (
    <div className="w-full h-full">
      <iframe
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default MapDisplay;
