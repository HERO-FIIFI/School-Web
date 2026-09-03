/* Minimal valid single-page PDF generator — used for downloadable resources. */

const esc = (s: string) =>
  s
    .replace(/[^\x20-\x7E]/g, "-")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");

export function makePdf(title: string, lines: string[]): Blob {
  const content: string[] = [
    "BT /F2 11 Tf 56 764 Td (ALDERCREST ACADEMY - INDEPENDENT DAY SCHOOL, EST. 1962) Tj ET",
    `BT /F2 19 Tf 56 732 Td (${esc(title)}) Tj ET`,
    "0.91 0.64 0.24 RG 2 w 56 718 m 556 718 l S",
    "BT /F1 10 Tf 56 700 Td (Alder Hill Road, Aldercrest - +1 (555) 014-2026 - office@aldercrest.edu) Tj ET",
    "BT /F1 11 Tf 15 TL 56 668 Td",
  ];
  lines.forEach((l, i) => {
    content.push(`(${esc(l)}) Tj`);
    if (i < lines.length - 1) content.push("T*");
  });
  content.push("ET");
  content.push("BT /F1 9 Tf 56 60 Td (Generated from aldercrest.edu - for information only.) Tj ET");
  const stream = content.join("\n");

  const objs = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];
  objs.forEach((body, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((o) => {
    pdf += `${String(o).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}

export function downloadPdf(filename: string, title: string, lines: string[]) {
  const blob = makePdf(title, lines);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 800);
}
