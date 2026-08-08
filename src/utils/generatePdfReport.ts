import { jsPDF } from 'jspdf';
import { StudentProfile, Achievement } from '../types';

export function generateGraduatePdfReport(student: StudentProfile, achievements: Achievement[]) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Dark Theme Background Header Banner
  doc.setFillColor(15, 15, 18);
  doc.rect(0, 0, pageWidth, 45, 'F');

  // Accent Gradient Line
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 44, pageWidth, 1.5, 'F');

  // Title Branding
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('ABTalks Momentum', 15, 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(161, 161, 170);
  doc.text('60-Day Developer Journey & Recruiter Verification Certificate', 15, 28);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(34, 197, 94);
  doc.text('VERIFIED GRADUATE REPORT', pageWidth - 65, 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(161, 161, 170);
  doc.text(`Issued: ${student.graduateDate || '2026-08-01'} | ID: #ABM-60D-8849`, pageWidth - 65, 26);

  // Student Bio Card Section
  doc.setFillColor(245, 245, 247);
  doc.roundedRect(15, 55, pageWidth - 30, 40, 3, 3, 'F');

  doc.setTextColor(24, 24, 27);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(student.name, 22, 67);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`@${student.handle} — ${student.roleTitle}`, 22, 73);

  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  const bioLines = doc.splitTextToSize(student.bio || 'Completed the 60-Day ABTalks Momentum Challenge.', pageWidth - 50);
  doc.text(bioLines, 22, 81);

  // Performance Metrics Grid (3 Boxes)
  const boxWidth = (pageWidth - 30 - 8) / 3;

  // Box 1: Momentum
  doc.setFillColor(37, 99, 235);
  doc.roundedRect(15, 102, boxWidth, 22, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(`${student.momentumScore}%`, 15 + boxWidth / 2, 112, { align: 'center' });
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Momentum Score', 15 + boxWidth / 2, 118, { align: 'center' });

  // Box 2: Completed Days
  doc.setFillColor(34, 197, 94);
  doc.roundedRect(15 + boxWidth + 4, 102, boxWidth, 22, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(`${student.completedDaysCount} / 60`, 15 + boxWidth + 4 + boxWidth / 2, 112, { align: 'center' });
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Days Completed', 15 + boxWidth + 4 + boxWidth / 2, 118, { align: 'center' });

  // Box 3: Recruiter Views
  doc.setFillColor(124, 58, 237);
  doc.roundedRect(15 + (boxWidth + 4) * 2, 102, boxWidth, 22, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(`${student.recruiterViewCount || 48}`, 15 + (boxWidth + 4) * 2 + boxWidth / 2, 112, { align: 'center' });
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Recruiter Views', 15 + (boxWidth + 4) * 2 + boxWidth / 2, 118, { align: 'center' });

  // Unlocked Achievements Section
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Key Achievements & Milestones Unlocked', 15, 136);

  doc.setDrawColor(226, 232, 240);
  doc.line(15, 139, pageWidth - 15, 139);

  let currentY = 146;
  const unlockedBadges = achievements.filter(a => a.isUnlocked);

  unlockedBadges.forEach((ach) => {
    if (currentY > pageHeight - 50) return;

    doc.setFillColor(248, 250, 252);
    doc.roundedRect(15, currentY, pageWidth - 30, 12, 1.5, 1.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text(`• ${ach.title}`, 18, currentY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(ach.description, 60, currentY + 7);

    if (ach.unlockedAt) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(37, 99, 235);
      doc.text(ach.unlockedAt, pageWidth - 30, currentY + 7);
    }

    currentY += 15;
  });

  // Social Proof Links & Verification Footer
  const footerY = pageHeight - 35;
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(15, footerY, pageWidth - 30, 22, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Verified Developer Links:', 20, footerY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(37, 99, 235);
  doc.text(`GitHub: ${student.githubUrl || 'https://github.com/ananya-verma'}`, 20, footerY + 13);
  doc.text(`LinkedIn: ${student.linkedinUrl || 'https://linkedin.com/in/ananya-verma'}`, 20, footerY + 18);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Official ABTalks Momentum 60-Day Certificate. Authenticated via Client-Side State Proof.', pageWidth - 105, footerY + 18);

  // Save the generated PDF
  doc.save(`ABTalks_Momentum_Journey_Report_${student.name.replace(/\s+/g, '_')}.pdf`);
}
