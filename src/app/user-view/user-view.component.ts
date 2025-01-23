import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Applicant, Assessment, BorrowersInformation, CoMakersInformation, LoanDetails } from '../interface/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationService } from '../services/application.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DOC_URL } from '../constant';
import { EndorseComponent } from '../endorse/endorse.component';

@Component({
  selector: 'app-user-view',
  standalone: false,

  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
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
    private domSanitizer: DomSanitizer
  ) {

  }

  goBack(): void {
    this.router.navigate(['/forward-view']);
  }

  openEndorse(): void {
    this.dialog.open(EndorseComponent, { width: '40rem', maxWidth: '40rem', height: '12.5rem', data: { application_id: this.application_id } })
  }

  transform(url: string) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  url: {
    authorityToDeduct: SafeResourceUrl,
    csc: SafeResourceUrl,
    emergency: SafeResourceUrl,
    idApplicant: SafeResourceUrl,
    idComaker: SafeResourceUrl,
    payslipApplicant: SafeResourceUrl,
    payslipComaker: SafeResourceUrl
  } = {
    authorityToDeduct: '',
    csc: '',
    emergency: '',
    idApplicant: '',
    idComaker: '',
    payslipApplicant: '',
    payslipComaker: ''
  };

  ngOnInit(): void {
    this.loanDetails = [history.state.loanDetails];
    this.application_id = this.loanDetails[0].application_id;
    this.applicant_id = this.loanDetails[0].applicant_id;

    console.log(this.application_id);

    const baseUrl = `${DOC_URL}/${this.applicant_id}/documents/${this.application_id}`;

    this.url = {
      authorityToDeduct: this.transform(`${baseUrl}/authorityToDeduct.pdf`),
      csc:  this.transform(`${baseUrl}/csc.pdf`),
      emergency:  this.transform(`${baseUrl}/emergency.pdf`),
      idApplicant:  this.transform(`${baseUrl}/idApplicant.pdf`),
      idComaker:  this.transform(`${baseUrl}/idComaker.pdf`),
      payslipApplicant:  this.transform(`${baseUrl}/payslipApplicant.pdf`),
      payslipComaker:  this.transform(`${baseUrl}/payslipComaker.pdf`),
    }

    this.applicationService.getBorrowersInformationById(this.application_id).subscribe(borrowers => {
      this.borrowersInformation = Array.isArray(borrowers) ? borrowers : [borrowers];
    })


    this.applicationService.getCoMakersInformationById(this.application_id).subscribe(comakers => {
      this.coMakersInformation = Array.isArray(comakers) ? comakers : [comakers];
    })

    this.applicationService.getAssessmentDetailsById(this.application_id).subscribe(assessment => {
      this.assessmentDetails = Array.isArray(assessment) ? assessment : [assessment];
      console.log(assessment)
    })

    this.applicationService.getLoanApplicantById(this.applicant_id).subscribe(applicant => {
      this.applicantDetails = Array.isArray(applicant) ? applicant : [applicant];
    })

    console.log(this.assessmentDetails[0]);
  }
}
