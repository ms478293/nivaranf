"use client";
import { impactReportSchema } from "@/validations/validations";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import Cookies from "js-cookie";
import { z } from "zod";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  coverPage: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: "#f4f4f4", // Light gray background for cover page
  },
  coverTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  coverInfo: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  list: {
    marginLeft: 10,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: "100%", // Full width
    aspectRatio: 1, // Height matches the width for a square image
    marginBottom: 10,
  },

  table: {
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderTop: "1px solid #EEE",
    paddingTop: 8,
    paddingBottom: 8,
  },
  tableHeader: {
    borderTop: "none",
  },
  bold: {
    fontWeight: "bold",
  },
  // So Declarative and unDRY 👌
  col1: {
    width: "27%",
  },
  col2: {
    width: "15%",
  },
  col3: {
    width: "42%",
  },
  col4: {
    width: "20%",
  },
});

export const generatePDF = async (data: z.infer<typeof impactReportSchema>) => {
  const {
    yearOfPublish,
    author,
    executiveSummary,
    mission,
    vision,
    goals,
    strategicPlanning,
    callToAction,
    programIds,
    photographs,
    financialReportId,
    programData,
    financialReportData,
  } = data;

  const sections = [
    { label: "Executive Summary", key: "executiveSummary" },
    { label: "Mission and Vision", key: "missionVision" },
    { label: "Goals", key: "goals" },
    { label: "Strategic Planning", key: "strategicPlanning" },
    { label: "Call to Action", key: "callToAction" },
    { label: "Programs", key: "programs" },
    { label: "Financial Report", key: "financialReport" },
    { label: "Photographs", key: "photographs" },
  ];

  const CoverPage = ({
    title,
    date,
    author,
  }: {
    title: string;
    date: string;
    author: string;
  }) => {
    const foundationName = Cookies.get("currentFoundation");
    return (
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.coverTitle}>{title + foundationName}</Text>
        <Text style={styles.coverInfo}>{`Date of Publish: ${date}`}</Text>
        <Text style={styles.coverInfo}>{`Author: ${author}`}</Text>
      </Page>
    );
  };

  const TableOfContents = ({ sections }: { sections: { label: string }[] }) => (
    <View break style={styles.section}>
      <Text style={styles.header}>Table of Contents</Text>
      {sections.map((section, index) => (
        <Text key={index} style={styles.text}>
          {`${index + 1}. ${section.label}`}
        </Text>
      ))}
    </View>
  );

  const FinancialSection = () => {
    const incomeEntries = financialReportData?.incomeEntries;
    const expenseEntries = financialReportData?.expenseEntries;
    const startDate = financialReportData?.startDate;
    const endDate = financialReportData?.endDate;
    return (
      <View break style={styles.section}>
        <Text style={styles.header}>Financial Report</Text>
        <Text style={styles.text}>
          {financialReportId
            ? `Associated Financial Report Start Date: ${startDate} to End Date: ${endDate}`
            : "No financial report provided"}
        </Text>
        {incomeEntries && (
          <View style={styles.table}>
            <Text style={styles.header}>Income Entries</Text>
            <View style={[styles.row, styles.bold, styles.tableHeader]}>
              <Text style={styles.col1}>Amount</Text>
              <Text style={styles.col2}>Type</Text>
              <Text style={styles.col3}>Description</Text>
              <Text style={styles.col4}>Date</Text>
            </View>
            {incomeEntries.map((entries, index) => (
              <View key={index} style={styles.row} wrap={false}>
                <Text style={styles.col1}>{entries.amount}</Text>
                <Text style={styles.col2}>{entries.type}</Text>
                <Text style={styles.col3}>{entries.description}</Text>
                <Text style={styles.col1}>{entries.updatedAt}</Text>
              </View>
            ))}
          </View>
        )}

        {expenseEntries && (
          <View style={styles.table}>
            <Text style={styles.header}>Income Entries</Text>
            <View style={[styles.row, styles.bold, styles.tableHeader]}>
              <Text style={styles.col1}>Amount</Text>
              <Text style={styles.col2}>Type</Text>
              <Text style={styles.col3}>Description</Text>
              <Text style={styles.col4}>Date</Text>
            </View>
            {expenseEntries.map((entries, index) => (
              <View key={index} style={styles.row} wrap={false}>
                <Text style={styles.col1}>{entries.amount}</Text>
                <Text style={styles.col2}>{entries.type}</Text>
                <Text style={styles.col3}>{entries.description}</Text>
                <Text style={styles.col1}>{entries.updatedAt}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  const ProgramSection = () => {
    return (
      <View break style={styles.section}>
        <Text style={styles.header}>Programs</Text>
        {programIds.length > 0 ? (
          <View style={styles.section}>
            {programData?.map((program, index) => (
              <Text key={index} style={styles.list}>
                Name: {program.name} Location: {program.location}
              </Text>
            ))}
          </View>
        ) : (
          <Text style={styles.text}>No programs selected</Text>
        )}
      </View>
    );
  };

  const CallToActionSection = () => {
    return (
      <View break style={styles.section}>
        <Text style={styles.header}>Call to Action</Text>
        <Text style={styles.text}>{callToAction}</Text>
      </View>
    );
  };

  const StrategicPlanningSection = () => {
    return (
      <View break style={styles.section}>
        <Text style={styles.header}>Strategic Planning</Text>
        <Text style={styles.text}>{strategicPlanning}</Text>
      </View>
    );
  };

  const GoalsSection = () => {
    return (
      <View break style={styles.section}>
        <Text style={styles.header}>Goals</Text>
        {goals.map((goal, index) => (
          <Text key={index} style={styles.text}>{`Goal ${
            index + 1
          }: ${goal}`}</Text>
        ))}
      </View>
    );
  };

  const MissionAndVisionSection = () => {
    return (
      <View break style={styles.section}>
        <Text style={styles.header}>Mission</Text>
        <Text style={styles.text}>{mission}</Text>
        <Text style={styles.header}>Vision</Text>
        <Text style={styles.text}>{vision}</Text>
      </View>
    );
  };

  const ExecutiveSummarySection = () => {
    return (
      <View break style={styles.section}>
        <Text style={styles.header}>Executive Summary</Text>
        <Text style={styles.text}>{executiveSummary}</Text>
      </View>
    );
  };

  const ImageSection = ({
    photographs,
  }: {
    photographs?: { url?: string; label?: string; id?: number }[];
  }) => (
    <View break style={styles.section}>
      <Text style={styles.header}>Photographs</Text>
      {photographs && photographs.length > 0 ? (
        photographs.map((photo) => (
          <View key={photo.id} style={styles.imageContainer}>
            <Image
              src={`https://api.nivaranfoundation.org${photo.url}`}
              style={styles.image}
            />
            <Text style={styles.text}>{photo.label}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.text}>No photographs uploaded</Text>
      )}
    </View>
  );

  const PDFDocument = (
    <Document>
      {/* Cover Page */}
      <CoverPage
        title="Impact Report: "
        date={yearOfPublish.toDateString()}
        author={author}
      />

      <Page size="A4" style={styles.page}>
        {/* Table of Contents */}
        <TableOfContents sections={sections} />
        {/* Executive Summary */}
        <ExecutiveSummarySection></ExecutiveSummarySection>
        {/* Mission and Vision */}
        <MissionAndVisionSection></MissionAndVisionSection>
        {/* Goals */}
        <GoalsSection></GoalsSection>
        {/* Strategic Planning */}
        <StrategicPlanningSection></StrategicPlanningSection>
        {/* Call to Action */}
        <CallToActionSection></CallToActionSection>
        {/* Programs */}
        <ProgramSection></ProgramSection>
        {/* Financial Summary */}
        <FinancialSection></FinancialSection>
        {/* Photographs */}
        <ImageSection photographs={photographs ?? []} />
      </Page>
    </Document>
  );

  // Generate the PDF Blob and trigger download
  const pdfBlob = await pdf(PDFDocument).toBlob();

  // Fallback to anchor tag if saveAs fails
  try {
    saveAs(pdfBlob, "ImpactReport.pdf");
  } catch (error) {
    console.warn("File-saver failed, using anchor fallback:", error);

    const blobURL = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = blobURL;
    a.download = "ImpactReport.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobURL);
  }
};
