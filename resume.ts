import data from "./public/data.json" with { type: "json" };
import fs from "node:fs";
import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";
import type { Content } from "pdfmake/interfaces";

pdfMake.addVirtualFileSystem(pdfFonts);

// const fonts = {
//   Roboto: {
//     normal: "./fonts/Roboto-Regular.ttf",
//     bold: "./fonts/Roboto-Medium.ttf",
//     // italics: './fonts/Roboto-Italic.ttf',
//     // bolditalics: './fonts/Roboto-MediumItalic.ttf',
//   },
// };

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
*/

const docDefinition = {
  styles: {
    heading: {
      bold: true,
      fontSize: 18,
    },
    subheading: {
      bold: true,
      fontSize: 14,
    },
    small: {
      fontSize: 10,
    },
  },
  content: [
    {
      text: data.full_name,
      style: "heading",
    },
    data.email,
    data.phone.toString(),
    data.url,
    (data.links.find((link) => link.name === "GitHub") || {}).url,
    "\n",
    [
      {
        text: "Experience",
        style: "subheading",
      },
      {
        ul: data.experience.content.map(function (c) {
          var first_line = [c.name];
          if (c.title) {
            first_line.push(c.title);
          }

          var date = String(c.start_date.year);
          date += "-";
          if (c.end_date) {
            date += c.end_date.year;
          }
          first_line.push(date);

          // if (c.html_url) {
          //   first_line.push(c.html_url);
          // }
          return {
            ul: [
              first_line.join(" - "),
              {
                ul: ([] as string[]).concat(c.description).map(function (d) {
                  return {
                    text: d,
                    style: "small",
                  };
                }),
              },
            ],
          };
        }),
      },
    ],
    "\n",
    [
      {
        text: "Skills",
        style: "subheading",
      },
      {
        ul: data.skills.map(function (d) {
          return {
            text: d,
          };
        }),
      },
    ],
    "\n",
  ] as Content[],
};

var pdfDoc = pdfMake.createPdf(docDefinition);
const result = await pdfDoc.getBuffer();
fs.writeFileSync("./public/resume.pdf", result);
