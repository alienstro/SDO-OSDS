import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  Applicant,
  Assessment,
  BorrowersInformation,
  CoMakersInformation,
  LoanDetails,
} from '../interface/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationService } from '../services/application.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DOC_URL } from '../constant';
import { EndorseComponent } from '../endorse/endorse.component';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-view',
  standalone: false,

  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css',
})
export class UserViewComponent {
  @ViewChild('pdfPreview', { static: false })
  pdfPreview!: ElementRef<HTMLIFrameElement>;

  private formPdfBytes: ArrayBuffer | null = null;

  application_id!: number;
  applicant_id!: number;

  loanDetails: LoanDetails[] = [];
  borrowersInformation: BorrowersInformation[] = [{} as BorrowersInformation];
  coMakersInformation: CoMakersInformation[] = [{} as CoMakersInformation];
  assessmentDetails: Assessment[] = [{} as Assessment];
  applicantDetails: Applicant[] = [{} as Applicant];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private applicationService: ApplicationService,
    private domSanitizer: DomSanitizer,
    private http: HttpClient
  ) {
    this.http
      .get('/Provident-Loan-Form_New-Template-2025-1.pdf', { responseType: 'arraybuffer' })
      .subscribe((bytes) => (this.formPdfBytes = bytes));
  }

  goBack(): void {
    this.router.navigate(['/forward-view']);
  }

  openEndorse(): void {
    this.dialog.open(EndorseComponent, {
      width: '40rem',
      maxWidth: '40rem',
      height: '12.5rem',
      data: { application_id: this.application_id },
    });
  }

  transform(url: string) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  url: {
    authorityToDeduct: SafeResourceUrl;
    csc: SafeResourceUrl;
    emergency: SafeResourceUrl;
    idApplicant: SafeResourceUrl;
    idComaker: SafeResourceUrl;
    payslipApplicant: SafeResourceUrl;
    payslipComaker: SafeResourceUrl;
  } = {
    authorityToDeduct: '',
    csc: '',
    emergency: '',
    idApplicant: '',
    idComaker: '',
    payslipApplicant: '',
    payslipComaker: '',
  };

  async generateAndPreviewPdf() {
    if (!this.formPdfBytes) {
      console.error('PDF template not loaded yet.');
      return;
    }

    // your hard-coded data object
    // hard-coded data
    const data = {
      // loan information
      date_submitted: '25/06/2025',
      loan_amount: '15000',
      term: '5',
      loan_application_number: '202500001',
      multi_purpose: true,
      multi_purpose_new: true,
      multi_purpose_renewal: true,
      additional: true,
      purpose_educational: true,
      purpose_hospitalization: true,
      purpose_long_medication: true,
      purpose_house_arrears: true,
      purpose_house_repair_major: true,
      purpose_house_repair_minor: true,
      purpose_payment: true,
      purpose_calamity: true,
      purpose_others: true,
      purpose_others_text: 'Car Payments',

      // borrowers' information
      borrower_surname: 'Dela Cruz',
      borrower_first_name: 'Juan',
      borrower_mi: 'P',
      borrower_address: '123 Rizal St., Olongapo City',
      borrower_position: 'Teacher I',
      borrower_employee_no: '202210599',
      borrower_employment_status: 'Employed',
      borrower_office: 'Deped Olongapo',
      borrower_date_of_birth: 'Sept 1, 2003',
      borrower_age: '26',
      borrower_monthly_salary: '50000',
      borrower_office_tel_no: '213-2323',
      borrower_years_in_service: '10 years',
      borrower_mobile_no: '09563453334',
      borrower_specimen_signature_1: 'signature',
      borrower_specimen_signature_2: 'signature1',

      // co-makers' information
      co_makers_surname: 'Dela Cruz',
      co_makers_first_name: 'Juan',
      co_makers_mi: 'P',
      co_makers_address: '123 Rizal St., Olongapo City',
      co_makers_position: 'Teacher I',
      co_makers_employee_no: '202210599',
      co_makers_employment_status: 'Employed',
      co_makers_office: 'Deped Olongapo',
      co_makers_date_of_birth: 'Sept 1, 2003',
      co_makers_age: '26',
      co_makers_monthly_salary: '50000',
      co_makers_office_tel_no: '213-2323',
      co_makers_years_in_service: '10 years',
      co_makers_mobile_no: '09563453334',
      co_makers_specimen_signature_1: 'signature',
      co_makers_specimen_signature_2: 'signature1',

      // loan agreement
      pesos_word: 'Fifteen Thousand',
      pesos_number: '15000',
      borrower_signature: 'borrower_signature',
      borrower_date: '25/06/2025',
      co_makers_signature: 'co_makers_signature',
      co_makers_date: '25/06/2025',

      // certificate of employment and credibility
      // personnel division/unit
      personnel_signature: 'signature',
      personnel_designation: 'Teacher',
      personnel_date: '25/06/2025',

      // legal services/unit
      legal_signature: 'signature',
      legal_designation: 'Teacher',
      legal_date: '25/06/2025',
    };

    // the field definitions (coordinates, fontSize, checkbox)
    // map each field through coordinates
    const fields = [
      { name: 'date_submitted', x: 190, y: 186, fontSize: 8 },
      { name: 'loan_amount', x: 209, y: 210, fontSize: 8 },
      { name: 'term', x: 319, y: 233, fontSize: 8 },
      { name: 'loan_application_number', x: 565, y: 186, fontSize: 8 },
      {
        name: 'multi_purpose',
        x: 106,
        y: 243,
        fontSize: 8,
        checkbox: true,
      },
      {
        name: 'multi_purpose_new',
        x: 123,
        y: 255,
        fontSize: 8,
        checkbox: true,
      },
      {
        name: 'multi_purpose_renewal',
        x: 123,
        y: 265,
        fontSize: 8,
        checkbox: true,
      },
      { name: 'additional', x: 106, y: 279, fontSize: 8, checkbox: true },
      {
        name: 'purpose_educational',
        x: 446,
        y: 221,
        fontSize: 8,
        checkbox: true,
      },
      {
        name: 'purpose_hospitalization',
        x: 446,
        y: 232,
        fontSize: 8,
        checkbox: true,
      },
      {
        name: 'purpose_long_medication',
        x: 446,
        y: 244,
        fontSize: 8,
        checkbox: true,
      },
      {
        name: 'purpose_house_arrears',
        x: 446,
        y: 256,
        fontSize: 8,
        checkbox: true,
      },
      {
        name: 'purpose_house_repair_major',
        x: 446,
        y: 267,
        fontSize: 8,
        checkbox: true,
      },
      {
        name: 'purpose_house_repair_minor',
        x: 446,
        y: 279,
        fontSize: 8,
        checkbox: true,
      },
      {
        name: 'purpose_payment',
        x: 446,
        y: 290,
        fontSize: 8,
        checkbox: true,
      },
      {
        name: 'purpose_calamity',
        x: 446,
        y: 302,
        fontSize: 8,
        checkbox: true,
      },
      {
        name: 'purpose_others',
        x: 446,
        y: 313,
        fontSize: 8,
        checkbox: true,
      },
      { name: 'purpose_others_text', x: 565, y: 313, fontSize: 8 },

      // borrowers' information
      { name: 'borrower_surname', x: 78, y: 348, fontSize: 8 },
      { name: 'borrower_first_name', x: 230, y: 348, fontSize: 8 },
      { name: 'borrower_mi', x: 370, y: 348, fontSize: 8 },
      { name: 'borrower_address', x: 175, y: 374, fontSize: 8 },
      { name: 'borrower_position', x: 140, y: 400, fontSize: 8 },
      { name: 'borrower_employee_no', x: 157, y: 413, fontSize: 8 },
      { name: 'borrower_employment_status', x: 345, y: 413, fontSize: 8 },
      { name: 'borrower_office', x: 130, y: 426, fontSize: 8 },
      { name: 'borrower_date_of_birth', x: 157, y: 439, fontSize: 8 },
      { name: 'borrower_age', x: 320, y: 439, fontSize: 8 },
      { name: 'borrower_monthly_salary', x: 187, y: 451, fontSize: 8 },
      { name: 'borrower_office_tel_no', x: 344, y: 453, fontSize: 8 },
      { name: 'borrower_years_in_service', x: 172, y: 464, fontSize: 8 },
      { name: 'borrower_mobile_no', x: 280, y: 464, fontSize: 8 },
      {
        name: 'borrower_specimen_signature_1',
        x: 125,
        y: 492,
        fontSize: 8,
      },
      {
        name: 'borrower_specimen_signature_2',
        x: 320,
        y: 492,
        fontSize: 8,
      },

      // co-makers' information
      { name: 'co_makers_surname', x: 420, y: 348, fontSize: 8 },
      { name: 'co_makers_first_name', x: 570, y: 348, fontSize: 8 },
      { name: 'co_makers_mi', x: 707, y: 348, fontSize: 8 },
      { name: 'co_makers_address', x: 517, y: 374, fontSize: 8 },
      { name: 'co_makers_position', x: 474, y: 400, fontSize: 8 },
      { name: 'co_makers_employee_no', x: 500, y: 413, fontSize: 8 },
      { name: 'co_makers_employment_status', x: 685, y: 413, fontSize: 8 },
      { name: 'co_makers_office', x: 465, y: 426, fontSize: 8 },
      { name: 'co_makers_date_of_birth', x: 505, y: 439, fontSize: 8 },
      { name: 'co_makers_age', x: 660, y: 439, fontSize: 8 },
      { name: 'co_makers_monthly_salary', x: 530, y: 451, fontSize: 8 },
      { name: 'co_makers_office_tel_no', x: 685, y: 453, fontSize: 8 },
      { name: 'co_makers_years_in_service', x: 510, y: 464, fontSize: 8 },
      { name: 'co_makers_mobile_no', x: 620, y: 464, fontSize: 8 },
      {
        name: 'co_makers_specimen_signature_1',
        x: 460,
        y: 492,
        fontSize: 8,
      },
      {
        name: 'co_makers_specimen_signature_2',
        x: 660,
        y: 492,
        fontSize: 8,
      },

      // loan agreement
      { name: 'pesos_word', x: 80, y: 540, fontSize: 8 },
      { name: 'pesos_number', x: 320, y: 540, fontSize: 8 },
      { name: 'borrower_signature', x: 130, y: 728, fontSize: 8 },
      { name: 'borrower_date', x: 330, y: 728, fontSize: 8 },
      { name: 'co_makers_signature', x: 460, y: 728, fontSize: 8 },
      { name: 'co_makers_date', x: 670, y: 728, fontSize: 8 },

      // certication of employment and credibility
      // personnel division/unit
      { name: 'personnel_signature', x: 210, y: 925, fontSize: 8 },
      { name: 'personnel_signature', x: 190, y: 947, fontSize: 8 },
      { name: 'personnel_signature', x: 160, y: 960, fontSize: 8 },

      // personnel division/unit
      { name: 'legal_signature', x: 540, y: 925, fontSize: 8 },
      { name: 'legal_designation', x: 530, y: 947, fontSize: 8 },
      { name: 'legal_date', x: 505, y: 960, fontSize: 8 },
    ];

    // load & stamp
    const pdfDoc = await PDFDocument.load(this.formPdfBytes);
    const page = pdfDoc.getPages()[0];
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const scaleX = width / 800;
    const scaleY = height / 1100;

    fields.forEach((f) => {
      let val = (data as any)[f.name];
      if (f.checkbox) {
        if (!val) return;
        val = 'X';
      } else {
        if (!val) return;
      }

      const xPt = f.x * scaleX;
      const yPt = height - f.y * scaleY - f.fontSize * scaleY;

      page.drawText(val.toString(), {
        x: xPt,
        y: yPt,
        size: f.fontSize * scaleY,
        font,
      });
    });

    const pdfBytes = await pdfDoc.save();
    const buffer = pdfBytes.buffer as ArrayBuffer;
    const blob = new Blob([buffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // set iframe source
    this.pdfPreview.nativeElement.src = url;
  }

  ngOnInit(): void {
    this.loanDetails = [history.state.loanDetails];
    this.application_id = this.loanDetails[0].application_id;
    this.applicant_id = this.loanDetails[0].applicant_id;

    console.log(this.application_id);

    const baseUrl = `${DOC_URL}/${this.applicant_id}/documents/${this.application_id}`;

    this.url = {
      authorityToDeduct: this.transform(`${baseUrl}/authorityToDeduct.pdf`),
      csc: this.transform(`${baseUrl}/csc.pdf`),
      emergency: this.transform(`${baseUrl}/emergency.pdf`),
      idApplicant: this.transform(`${baseUrl}/idApplicant.pdf`),
      idComaker: this.transform(`${baseUrl}/idComaker.pdf`),
      payslipApplicant: this.transform(`${baseUrl}/payslipApplicant.pdf`),
      payslipComaker: this.transform(`${baseUrl}/payslipComaker.pdf`),
    };

    this.applicationService
      .getBorrowersInformationById(this.application_id)
      .subscribe((borrowers) => {
        this.borrowersInformation = Array.isArray(borrowers)
          ? borrowers
          : [borrowers];
      });

    this.applicationService
      .getCoMakersInformationById(this.application_id)
      .subscribe((comakers) => {
        this.coMakersInformation = Array.isArray(comakers)
          ? comakers
          : [comakers];
      });

    this.applicationService
      .getAssessmentDetailsById(this.application_id)
      .subscribe((assessment) => {
        this.assessmentDetails = Array.isArray(assessment)
          ? assessment
          : [assessment];
        console.log(assessment);
      });

    this.applicationService
      .getLoanApplicantById(this.applicant_id)
      .subscribe((applicant) => {
        this.applicantDetails = Array.isArray(applicant)
          ? applicant
          : [applicant];
      });

    console.log(this.assessmentDetails[0]);
  }
}
