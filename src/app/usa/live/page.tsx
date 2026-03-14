export default function LivePage() {
  return (
    <div className="h-full min-h-fit">
      <iframe
        src="https://www.fire.ca.gov/incidents.html" // Replace with the URL of the webpage you want to embed
        width="100%" // Adjust the width as needed
        height="100%" // Adjust the height as needed
        style={{ border: "none" }}
        title="Embedded Webpage"
      />
    </div>
  );
}
