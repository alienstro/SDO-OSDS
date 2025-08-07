import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import {
  Applicant,
  ApprovalDetails,
  Assessment,
  BorrowersInformation,
  CoMakersInformation,
  DepartmentStatus,
  Documents,
  LoanApplication,
  LoanDetails,
  MergedLoanApplicationDetails,
  SignatureDetails,
} from '../interface/interfaces';
import { API_URL } from '../constant';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private _loanApplication = new BehaviorSubject<LoanApplication[]>([]);
  private _loanDetails = new BehaviorSubject<LoanDetails[]>([]);
  private _coMakersInformation = new BehaviorSubject<CoMakersInformation[]>([]);
  private _borrowersInformation = new BehaviorSubject<BorrowersInformation[]>(
    []
  );
  private _mergedLoanApplicationDetails = new BehaviorSubject<
    MergedLoanApplicationDetails[]
  >([]);
  private _assessmentForm = new BehaviorSubject<Assessment[]>([]);
  private _signatureDetails = new BehaviorSubject<SignatureDetails[]>([]);
  private _approvalDetails = new BehaviorSubject<ApprovalDetails[]>([]);
  private _departmentStatus = new BehaviorSubject<DepartmentStatus[]>([]);

  loanApplication$ = this._loanApplication.asObservable();
  loanDetails$ = this._loanDetails.asObservable();
  coMakersInformation$ = this._coMakersInformation.asObservable();
  borrowersInformation$ = this._borrowersInformation.asObservable();
  mergedLoanApplicationDetails$ =
    this._mergedLoanApplicationDetails.asObservable();
  assessmentForm$ = this._assessmentForm.asObservable();
  signatureDetails$ = this._signatureDetails.asObservable();
  approvalDetails$ = this._approvalDetails.asObservable();
  departmentStatus$ = this._departmentStatus.asObservable();

  constructor(private http: HttpClient) {
    // forkJoin({
    //   loanDetails: this.getLoanDetails(),
    // }).subscribe(({ loanDetails }) => {
    //   this._loanDetails.next(loanDetails);
    // });
  }

  private apiLoanApplication = `${API_URL}/loanApplication`;

  /// GET BY URL

  getLoanApplication(): Observable<LoanApplication[]> {
    return this.http.get<LoanApplication[]>(
      `${this.apiLoanApplication}/loanApplication`
    );
  }

  getDepartmentStatusById(
    department_id: string
  ): Observable<DepartmentStatus[]> {
    return this.http.get<DepartmentStatus[]>(
      `${this.apiLoanApplication}/getDepartmentStatus/${department_id}`
    );
  }

  getAssessmentDetails(): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(
      `${this.apiLoanApplication}/getAssessmentDetails`
    );
  }

  getLoanDetails(): Observable<LoanDetails[]> {
    return this.http.get<LoanDetails[]>(
      `${this.apiLoanApplication}/loanDetails`
    );
  }

  getCoMakersInformation(): Observable<CoMakersInformation[]> {
    return this.http.get<CoMakersInformation[]>(
      `${this.apiLoanApplication}/coMakersInformation`
    );
  }

  getBorrowersInformation(): Observable<BorrowersInformation[]> {
    return this.http.get<BorrowersInformation[]>(
      `${this.apiLoanApplication}/borrowersInformation`
    );
  }

  getMergedLoanApplicationDetails(): Observable<
    MergedLoanApplicationDetails[]
  > {
    return this.http.get<MergedLoanApplicationDetails[]>(
      `${this.apiLoanApplication}/mergedLoanApplicationDetails`
    );
  }

  getSignatureDetails(): Observable<SignatureDetails[]> {
    return this.http.get<SignatureDetails[]>(
      `${this.apiLoanApplication}/getSignatureDetails`
    );
  }

  getApprovalDetails(): Observable<ApprovalDetails[]> {
    return this.http.get<ApprovalDetails[]>(
      `${this.apiLoanApplication}/getApprovalDetails`
    );
  }

  /// GET DATA BY ID

  getAssessmentDetailsById(applicationId: number): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(
      `${this.apiLoanApplication}/getAssessmentDetailsById/${applicationId}`
    );
  }

  getCoMakersInformationById(
    applicationId: number
  ): Observable<CoMakersInformation[]> {
    return this.http.get<CoMakersInformation[]>(
      `${this.apiLoanApplication}/coMakersInformationById/${applicationId}`
    );
  }

  getBorrowersInformationById(
    applicationId: number
  ): Observable<BorrowersInformation[]> {
    return this.http.get<BorrowersInformation[]>(
      `${this.apiLoanApplication}/borrowersInformationById/${applicationId}`
    );
  }

  getLoanApplicantById(applicantId: number): Observable<Applicant[]> {
    return this.http.get<Applicant[]>(
      `${this.apiLoanApplication}/getApplicant/${applicantId}`
    );
  }

  getLoanDetailsById(applicationId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiLoanApplication}/getLoanDetailsById/${applicationId}`
    );
  }

  getSignatureDetailsByApplicationId(
    application_id: number
  ): Observable<SignatureDetails[]> {
    return this.http.get<SignatureDetails[]>(
      `${this.apiLoanApplication}/getSignatureDetailsApplicationId/${application_id}`
    );
  }

  getDocumentsByApplicationId(application_id: number): Observable<Documents[]> {
    return this.http.get<Documents[]>(
      `${this.apiLoanApplication}/getDocuments/${application_id}`
    );
  }

  /// GET DATA IN THE STATE

  getLoanApplicationState() {
    return this._loanApplication.getValue();
  }

  getDepartmentStatusState() {
    return this._departmentStatus.getValue();
  }

  getLoanDetailsState() {
    return this._loanDetails.getValue();
  }

  getCoMakersInformationState() {
    return this._coMakersInformation.getValue();
  }

  getBorrowersInformationState() {
    return this._borrowersInformation.getValue();
  }

  getSignatureDetailsState() {
    return this._signatureDetails.getValue();
  }

  /// SET NEW DATA TO STATE

  setLoanApplicationState(setLoanApplicationState: LoanApplication[]) {
    this._loanApplication.next(setLoanApplicationState);
  }

  setDepartmentStatusState(setDepartmentStatusState: DepartmentStatus[]) {
    this._departmentStatus.next(setDepartmentStatusState);
  }

  setLoanDetailsState(setLoanDetailsState: LoanDetails[]) {
    this._loanDetails.next(setLoanDetailsState);
  }

  setCoMakersInformationState(
    setCoMakersInformationState: CoMakersInformation[]
  ) {
    this._coMakersInformation.next(setCoMakersInformationState);
  }

  setBorrowersInformationState(
    setBorrowersInformationState: BorrowersInformation[]
  ) {
    this._borrowersInformation.next(setBorrowersInformationState);
  }

  setSignatureDetailsState(setSignatureDetailsState: SignatureDetails[]) {
    this._signatureDetails.next(setSignatureDetailsState);
  }

  /// UPDATE DATA

  updateSignatureDetails(signature: string, application_id: number): void {
    const currentSignatureDetails = this._signatureDetails.getValue();

    console.log(currentSignatureDetails);

    const index = currentSignatureDetails.findIndex(
      (sig) => sig.application_id === application_id
    );

    console.log(index);

    if (index !== -1) {
      currentSignatureDetails[index] = {
        ...currentSignatureDetails[index],
        signature_hr: signature,
      };
    } else {
      console.log('Error Updating Signature Details');
    }

    this._signatureDetails.next([...currentSignatureDetails]);
  }

  updateApprovalDetails(
    approval: string,
    application_id: number,
    department_id: string
  ): void {
    const currentApprovalDetails = this._approvalDetails.getValue();

    console.log(currentApprovalDetails);

    const index = currentApprovalDetails.findIndex(
      (app) => app.application_id === application_id
    );

    console.log(index);

    if (department_id === '7') {
      if (index !== -1) {
        currentApprovalDetails[index] = {
          ...currentApprovalDetails[index],
          status_asds: approval,
        };
      } else {
        console.log('Error Updating Approval Details');
      }
    } else {
      if (index !== -1) {
        currentApprovalDetails[index] = {
          ...currentApprovalDetails[index],
          status_sds: approval,
        };
      } else {
        console.log('Error Updating Approval Details');
      }
    }

    this._approvalDetails.next([...currentApprovalDetails]);
  }

  updateLoanApplicationOSDS(application_id: number) {
    let oldState = this.getLoanApplicationState();
    const toUpdateApplicant = oldState.find(
      (item) => item.application_id === application_id
    );

    oldState = oldState.filter(
      (item) => item.application_id !== application_id
    );

    if (!toUpdateApplicant) return;

    toUpdateApplicant['is_approved_osds'] = 'Approved';

    const newState: LoanApplication[] = [...oldState, toUpdateApplicant];

    this.setLoanApplicationState(newState);
  }

  updateDepartmentStatus(application_id: number) {
    let oldState = this.getDepartmentStatusState();
    const toUpdateApplicant = oldState.find(
      (item) => item.application_id === application_id
    );

    oldState = oldState.filter(
      (item) => item.application_id !== application_id
    );

    if (!toUpdateApplicant) return;

    toUpdateApplicant['status'] = 'Approved';

    const newState: DepartmentStatus[] = [...oldState, toUpdateApplicant];

    this.setDepartmentStatusState(newState);
  }
}
