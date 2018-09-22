// const React = require('react');
// const { ReactPDF, Page, Text, View, Document, StyleSheet } = require('@react-pdf/core');
const data = require("./public/data.json");
const fs = require("fs");
const fonts = {
  Roboto: {
    normal: "./fonts/Roboto-Regular.ttf",
    bold: "./fonts/Roboto-Medium.ttf"
    // italics: './fonts/Roboto-Italic.ttf',
    // bolditalics: './fonts/Roboto-MediumItalic.ttf',
  }
};
const PdfPrinter = require("pdfmake");
const printer = new PdfPrinter(fonts);
/*
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(<MyDocument />, `${__dirname}/resume.pdf`);
*/
const docDefinition = {
  styles: {
    heading: {
      bold: true,
      fontSize: 18
    },
    subheading: {
      bold: true,
      fontSize: 14
    },
    small: {
      fontSize: 10
    }
  },
  content: [
    {
      text: data.full_name,
      style: "heading"
    },
    data.email,
    data.phone.toString(),
    data.url,
    (data.links.find(link => link.name === "GitHub") || {}).url,
    "\n",
    [
      {
        text: "Experience",
        style: "subheading"
      },
      {
        ul: data.projects.content.map(function(c) {
          var first_line = [c.name];
          if (c.title) {
            first_line.push(c.title);
          }

          var date = c.start_date.year;
          if (c.end_date) {
            date += "-";
            date += c.end_date.year;
          }
          first_line.push(date);

          if (c.html_url) {
            first_line.push(c.html_url);
          }
          return {
            ul: [
              first_line.join(" - "),
              {
                ul: [].concat(c.description).map(function(d) {
                  return {
                    text: d,
                    style: "small"
                  };
                })
              }
            ]
          };
        })
      }
    ],
    "\n",
    [
      {
        text: "Skills",
        style: "subheading"
      },
      {
        ul: data.skills.map(function(d) {
          return {
            text: d
          };
        })
      }
    ],
    "\n"
  ]
};
var pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream("./public/resume.pdf"));
pdfDoc.end();
