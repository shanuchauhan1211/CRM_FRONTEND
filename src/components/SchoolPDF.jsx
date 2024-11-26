// components/SchoolPDF.js
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
    border: "1px solid #000",
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2c3e50",
  },
  schoolName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  schoolInfo: {
    fontSize: 12,
  },
});

const SchoolPDF = ({ schools }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Top Matched Schools</Text>
        {schools.map((school, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.schoolName}>{school.schoolName}</Text>
            <Text style={styles.schoolInfo}>Budget: {school.schoolBudget} INR</Text>
            <Text style={styles.schoolInfo}>Match: {school.matchPercentage}%</Text>
            <Text style={styles.schoolInfo}>Ranking: {school.schoolRanking}</Text>
            <Text style={styles.schoolInfo}>Location: {school.location}</Text>
            <Text style={styles.schoolInfo}>Contact: {school.contact}</Text>
            <Text style={styles.schoolInfo}>Phone: {school.phone}</Text>
            <Text style={styles.schoolInfo}>
              Website: <a href={school.website}>{school.website}</a>
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default SchoolPDF;
